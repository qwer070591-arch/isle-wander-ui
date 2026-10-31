import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { attractions } from '../data/attractions'
import { MAX_BACKUP_TRIPS } from '../data/trip-backup'
import type { Itinerary, ItineraryDay } from '../types/trip'

export const TRIPS_STORAGE_KEY = 'isle-and-wander:trips:v1'
const validAttractionIds = new Set(attractions.map(item => item.id))
const datePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/

function readTrips(raw: string | null): Itinerary[] {
  if (!raw) return []
  try {
    const value: unknown = JSON.parse(raw)
    if (!Array.isArray(value)) return []
    const seen = new Set<string>()
    const result: Itinerary[] = []
    for (const entry of value) {
      if (!entry || typeof entry !== 'object') continue
      const item = entry as Record<string, unknown>
      if (typeof item.id !== 'string' || !item.id || seen.has(item.id) ||
        typeof item.title !== 'string' || !item.title.trim() ||
        typeof item.createdAt !== 'string' || !datePattern.test(item.createdAt) ||
        typeof item.updatedAt !== 'string' || !datePattern.test(item.updatedAt) ||
        !Array.isArray(item.days) || item.days.length < 1 || item.days.length > 7) continue
      const days: ItineraryDay[] = []
      for (let index = 0; index < item.days.length; index++) {
        const day = item.days[index]
        if (!day || typeof day !== 'object' || day.dayNumber !== index + 1 || !Array.isArray(day.attractionIds)) break
        const ids = (day.attractionIds as unknown[]).filter((id): id is string => typeof id === 'string' && validAttractionIds.has(id))
        days.push({ dayNumber: index + 1, attractionIds: [...new Set(ids)] })
      }
      if (days.length !== item.days.length) continue
      seen.add(item.id)
      result.push({ id: item.id, title: item.title.trim().slice(0, 80), createdAt: item.createdAt, updatedAt: item.updatedAt, days })
    }
    return result
  } catch { return [] }
}

export const useTripsStore = defineStore('trips', () => {
  const trips = ref<Itinerary[]>([])
  const initialized = ref(false)
  const storageAvailable = ref(true)
  const initialReadFailed = ref(false)
  const announcement = ref('')
  const announcementVersion = ref(0)
  const picker = ref<{ attractionId?: string; tripId?: string; dayNumber?: number } | null>(null)
  const count = computed(() => trips.value.length)

  function announce(message: string) { announcement.value = message; announcementVersion.value += 1 }
  function onStorage(event: StorageEvent) {
    if (event.key !== TRIPS_STORAGE_KEY && event.key !== null) return
    trips.value = readTrips(event.key === null ? null : event.newValue)
  }
  function initialize() {
    if (initialized.value) return
    initialized.value = true
    if (typeof window === 'undefined') return
    try { trips.value = readTrips(window.localStorage.getItem(TRIPS_STORAGE_KEY)) }
    catch { storageAvailable.value = false; initialReadFailed.value = true }
    window.addEventListener('storage', onStorage)
  }
  function persist(message: string) {
    if (storageAvailable.value) {
      try { window.localStorage.setItem(TRIPS_STORAGE_KEY, JSON.stringify(trips.value)) }
      catch { storageAvailable.value = false }
    }
    announce(`${message}${storageAvailable.value ? '' : '；儲存不可用，僅在本次瀏覽期間保留'}`)
  }
  function retrySave() {
    try {
      if (initialReadFailed.value) {
        const existing = window.localStorage.getItem(TRIPS_STORAGE_KEY)
        if (existing && existing !== '[]') {
          announce('偵測到原有行程資料；請先匯出目前行程，再重新整理以免覆蓋。')
          return false
        }
      }
      window.localStorage.setItem(TRIPS_STORAGE_KEY, JSON.stringify(trips.value))
      storageAvailable.value = true
      initialReadFailed.value = false
      announce('行程已重新儲存在此瀏覽器')
      return true
    } catch {
      storageAvailable.value = false
      announce('仍無法寫入瀏覽器；行程僅在本次瀏覽期間保留')
      return false
    }
  }
  function find(id: string) { return trips.value.find(trip => trip.id === id) }
  function create(title: string, length: number): string | null {
    const clean = title.trim()
    if (!clean || clean.length > 80 || !Number.isInteger(length) || length < 1 || length > 7) return null
    if (trips.value.length >= MAX_BACKUP_TRIPS) { announce('行程已達 100 筆上限，請先匯出或刪除舊行程'); return null }
    const now = new Date().toISOString()
    const id = `trip-${crypto.randomUUID()}`
    trips.value = [{ id, title: clean, createdAt: now, updatedAt: now, days: Array.from({ length }, (_, index) => ({ dayNumber: index + 1, attractionIds: [] })) }, ...trips.value]
    persist('行程已建立')
    return id
  }
  function update(id: string, title: string, length: number): boolean {
    const trip = find(id)
    const clean = title.trim()
    if (!trip || !clean || clean.length > 80 || !Number.isInteger(length) || length < 1 || length > 7) return false
    const nextDays = Array.from({ length }, (_, index) => trip.days[index] ?? { dayNumber: index + 1, attractionIds: [] })
    trips.value = trips.value.map(item => item.id === id ? { ...item, title: clean, days: nextDays, updatedAt: new Date().toISOString() } : item)
    persist('行程已更新')
    return true
  }
  function removeTrip(id: string) {
    if (!find(id)) return false
    trips.value = trips.value.filter(trip => trip.id !== id)
    persist('行程已刪除')
    return true
  }
  function changeDay(id: string, dayNumber: number, nextIds: string[], message: string): boolean {
    const trip = find(id)
    if (!trip || dayNumber < 1 || dayNumber > trip.days.length || !Number.isInteger(dayNumber)) return false
    trips.value = trips.value.map(item => item.id === id ? { ...item, updatedAt: new Date().toISOString(), days: item.days.map(day => day.dayNumber === dayNumber ? { ...day, attractionIds: nextIds } : day) } : item)
    persist(message)
    return true
  }
  function addAttraction(id: string, dayNumber: number, attractionId: string): 'added' | 'duplicate' | 'invalid' {
    const day = find(id)?.days[dayNumber - 1]
    if (!day || day.dayNumber !== dayNumber || !validAttractionIds.has(attractionId)) return 'invalid'
    if (day.attractionIds.includes(attractionId)) { announce('已加入這一天'); return 'duplicate' }
    changeDay(id, dayNumber, [...day.attractionIds, attractionId], '景點已加入行程')
    return 'added'
  }
  function removeAttraction(id: string, dayNumber: number, attractionId: string) {
    const day = find(id)?.days[dayNumber - 1]
    if (!day || !day.attractionIds.includes(attractionId)) return false
    return changeDay(id, dayNumber, day.attractionIds.filter(item => item !== attractionId), '景點已從行程移除')
  }
  function moveAttraction(id: string, dayNumber: number, index: number, direction: -1 | 1) {
    const day = find(id)?.days[dayNumber - 1]
    if (!day || index < 0 || index >= day.attractionIds.length || index + direction < 0 || index + direction >= day.attractionIds.length) return false
    const ids = [...day.attractionIds]
    ;[ids[index], ids[index + direction]] = [ids[index + direction]!, ids[index]!]
    return changeDay(id, dayNumber, ids, '景點順序已更新')
  }
  function moveToDay(id: string, fromDay: number, toDay: number, attractionId: string): 'moved' | 'duplicate' | 'invalid' {
    const trip = find(id)
    const source = trip?.days[fromDay - 1]
    const target = trip?.days[toDay - 1]
    if (!trip || !source || !target || source.dayNumber !== fromDay || target.dayNumber !== toDay || fromDay === toDay || !source.attractionIds.includes(attractionId)) return 'invalid'
    if (target.attractionIds.includes(attractionId)) { announce('目標日期已有這個景點，原安排已保留'); return 'duplicate' }
    trips.value = trips.value.map(item => item.id === id ? { ...item, updatedAt: new Date().toISOString(), days: item.days.map(day => day.dayNumber === fromDay ? { ...day, attractionIds: day.attractionIds.filter(place => place !== attractionId) } : day.dayNumber === toDay ? { ...day, attractionIds: [...day.attractionIds, attractionId] } : day) } : item)
    persist(`景點已移到 Day ${String(toDay).padStart(2, '0')}`)
    return 'moved'
  }
  function duplicateTrip(id: string): string | null {
    const trip = find(id)
    if (!trip) return null
    if (trips.value.length >= MAX_BACKUP_TRIPS) { announce('行程已達 100 筆上限，無法複製'); return null }
    const now = new Date().toISOString()
    const copyId = `trip-${crypto.randomUUID()}`
    const copy: Itinerary = { id: copyId, title: `${trip.title.slice(0, 77)} 副本`, createdAt: now, updatedAt: now, days: trip.days.map(day => ({ dayNumber: day.dayNumber, attractionIds: [...day.attractionIds] })) }
    trips.value = [copy, ...trips.value]
    persist('行程已複製')
    return copyId
  }
  function copyDay(id: string, fromDay: number, toDay: number): 'copied' | 'nothing' | 'invalid' {
    const trip = find(id)
    const source = trip?.days[fromDay - 1]
    const target = trip?.days[toDay - 1]
    if (!trip || !source || !target || fromDay === toDay || source.dayNumber !== fromDay || target.dayNumber !== toDay) return 'invalid'
    const additions = source.attractionIds.filter(place => !target.attractionIds.includes(place))
    if (!additions.length) { announce('目標日期已有全部景點，未變更安排'); return 'nothing' }
    return changeDay(id, toDay, [...target.attractionIds, ...additions], '單日安排已合併') ? 'copied' : 'invalid'
  }
  function importTrips(incoming: Itinerary[], mode: 'merge' | 'replace') {
    if ((mode === 'merge' ? trips.value.length : 0) + incoming.length > MAX_BACKUP_TRIPS) return null
    const used = new Set(mode === 'merge' ? trips.value.map(item => item.id) : [])
    let remapped = 0
    const copied = incoming.map(item => {
      let id = item.id
      if (used.has(id)) { id = `trip-${crypto.randomUUID()}`; remapped++ }
      used.add(id)
      return { ...item, id, days: item.days.map(day => ({ dayNumber: day.dayNumber, attractionIds: [...day.attractionIds] })) }
    })
    trips.value = mode === 'merge' ? [...copied, ...trips.value] : copied
    persist(`已${mode === 'merge' ? '合併' : '取代'} ${copied.length} 筆行程`)
    return { imported: copied.length, remapped, saved: storageAvailable.value }
  }
  function openPicker(attractionId?: string, tripId?: string, dayNumber?: number) { picker.value = { attractionId, tripId, dayNumber } }
  function closePicker() { picker.value = null }

  return { trips, initialized, storageAvailable, announcement, announcementVersion, picker, count, initialize, retrySave, find, create, update, removeTrip, addAttraction, removeAttraction, moveAttraction, moveToDay, duplicateTrip, copyDay, importTrips, openPicker, closePicker }
})
