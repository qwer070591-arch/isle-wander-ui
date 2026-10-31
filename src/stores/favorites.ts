import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { attractions } from '../data/attractions'
import type { Attraction } from '../types/content'

export const FAVORITES_STORAGE_KEY = 'isle-and-wander:favorites'
const attractionById = new Map(attractions.map(attraction => [attraction.id, attraction]))

function validIds(raw: unknown): string[] {
  if (!Array.isArray(raw)) return []
  return [...new Set(raw.filter((id): id is string => typeof id === 'string' && attractionById.has(id)))]
}

function parseIds(raw: string | null): string[] {
  if (!raw) return []
  try { return validIds(JSON.parse(raw) as unknown) }
  catch { return [] }
}

export const useFavoritesStore = defineStore('favorites', () => {
  const ids = ref<string[]>([])
  const initialized = ref(false)
  const storageAvailable = ref(true)
  const announcement = ref('')
  const announcementVersion = ref(0)
  const count = computed(() => ids.value.length)
  const items = computed<Attraction[]>(() => ids.value.map(id => attractionById.get(id)).filter((item): item is Attraction => Boolean(item)).reverse())

  function announce(message: string) {
    announcement.value = message
    announcementVersion.value += 1
  }
  function onStorage(event: StorageEvent) {
    if (event.key !== FAVORITES_STORAGE_KEY && event.key !== null) return
    ids.value = parseIds(event.key === null ? null : event.newValue)
  }
  function initialize() {
    if (initialized.value) return
    initialized.value = true
    if (typeof window === 'undefined') return
    try { ids.value = parseIds(window.localStorage.getItem(FAVORITES_STORAGE_KEY)) }
    catch { storageAvailable.value = false }
    window.addEventListener('storage', onStorage)
  }
  function save() {
    if (!storageAvailable.value || typeof window === 'undefined') return
    try { window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(ids.value)) }
    catch { storageAvailable.value = false }
  }
  function isFavorite(id: string) { return ids.value.includes(id) }
  function toggle(id: string): boolean | null {
    const attraction = attractionById.get(id)
    if (!attraction) return null
    const next = !isFavorite(id)
    ids.value = next ? [...ids.value, id] : ids.value.filter(savedId => savedId !== id)
    save()
    const action = next ? '已加入收藏' : '已從收藏移除'
    announce(`${attraction.nameZh}${action}${storageAvailable.value ? '' : '，僅本次瀏覽期間保留'}`)
    return next
  }

  return { ids, initialized, storageAvailable, announcement, announcementVersion, count, items, initialize, isFavorite, toggle }
})
