import { attractions } from './attractions'
import type { Itinerary } from '../types/trip'

export const MAX_BACKUP_BYTES = 2 * 1024 * 1024
export const MAX_BACKUP_TRIPS = 100
const attractionIds = new Set(attractions.map(item => item.id))
const isRecord = (value: unknown): value is Record<string, unknown> => value !== null && typeof value === 'object' && !Array.isArray(value)
const isDate = (value: unknown): value is string => typeof value === 'string' && /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d{3}Z$/.test(value) && !Number.isNaN(Date.parse(value)) && new Date(value).toISOString() === value

export interface BackupPreview {
  total: number
  valid: Itinerary[]
  rejected: { index: number; reason: string }[]
  conflicts: number
}

export function validateBackup(text: string, existingIds: ReadonlySet<string>): BackupPreview {
  if (new TextEncoder().encode(text).length > MAX_BACKUP_BYTES) throw new Error('備份檔超過 2 MB 上限。')
  let parsed: unknown
  try { parsed = JSON.parse(text) as unknown } catch { throw new Error('JSON 格式錯誤，請選擇本站匯出的行程備份。') }
  if (!isRecord(parsed) || parsed.app !== 'isle-and-wander' || parsed.schemaVersion !== 1 || !Array.isArray(parsed.trips)) throw new Error('備份標識或版本不支援，需使用 ISLE & WANDER v1 行程備份。')
  if (!isDate(parsed.exportedAt)) throw new Error('備份建立時間格式無效。')
  if (parsed.trips.length > MAX_BACKUP_TRIPS) throw new Error('備份超過 100 筆行程上限。')
  const valid: Itinerary[] = []
  const rejected: BackupPreview['rejected'] = []
  const seen = new Set<string>()
  let conflicts = 0
  for (const [index, raw] of parsed.trips.entries()) {
    let reason = ''
    if (!isRecord(raw)) reason = '不是行程資料'
    else if (typeof raw.id !== 'string' || !/^trip-[a-zA-Z0-9-]{1,100}$/.test(raw.id)) reason = '行程 ID 無效'
    else if (seen.has(raw.id)) reason = '備份內行程 ID 重複'
    else if (typeof raw.title !== 'string' || !raw.title.trim() || raw.title.trim().length > 80) reason = '名稱必須為 1–80 個字'
    else if (!isDate(raw.createdAt) || !isDate(raw.updatedAt)) reason = '建立或修改時間格式無效'
    else if (!Array.isArray(raw.days) || raw.days.length < 1 || raw.days.length > 7) reason = '天數必須為 1–7 天'
    else {
      for (const [dayIndex, day] of raw.days.entries()) {
        if (!isRecord(day) || day.dayNumber !== dayIndex + 1 || !Array.isArray(day.attractionIds) || day.attractionIds.length > attractions.length) { reason = `Day ${dayIndex + 1} 結構無效`; break }
        if (day.attractionIds.some(id => typeof id !== 'string' || !attractionIds.has(id))) { reason = `Day ${dayIndex + 1} 含不存在的景點 ID`; break }
        if (new Set(day.attractionIds).size !== day.attractionIds.length) { reason = `Day ${dayIndex + 1} 有重複景點`; break }
      }
    }
    if (reason) { rejected.push({ index: index + 1, reason }); continue }
    const item = raw as unknown as Itinerary
    seen.add(item.id)
    if (existingIds.has(item.id)) conflicts++
    valid.push({ id: item.id, title: item.title.trim(), createdAt: item.createdAt, updatedAt: item.updatedAt, days: item.days.map(day => ({ dayNumber: day.dayNumber, attractionIds: [...day.attractionIds] })) })
  }
  return { total: parsed.trips.length, valid, rejected, conflicts }
}

export function makeBackup(trips: Itinerary[]) {
  return { app: 'isle-and-wander', schemaVersion: 1, exportedAt: new Date().toISOString(), trips: trips.map(item => ({ ...item, days: item.days.map(day => ({ ...day, attractionIds: [...day.attractionIds] })) })) }
}
