import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const read = (relative) => fs.readFileSync(path.join(root, relative), 'utf8').replace(/^\uFEFF/, '')
const attractions = JSON.parse(read('src/data/attractions.json'))
const visit = JSON.parse(read('src/data/attraction-visit.json'))
const categories = JSON.parse(read('src/data/attraction-categories.json'))
const cityIds = new Set([...read('src/data/cities.ts').matchAll(/id: '(city-[^']+)'/g)].map((match) => match[1]))
const mediaIds = new Set([...read('src/data/media.ts').matchAll(/'photo-[^']+'(?=\s*:)/g)].map((match) => match[0].slice(1, -1)))
const categoryIds = new Set(categories.map((category) => category.id))
const ids = new Set()
const slugs = new Set()
const officialIds = new Set()
const cityNames = new Set()
const errors = []

if (!Array.isArray(attractions)) errors.push('景點資料必須為陣列')
for (const [index, item] of (Array.isArray(attractions) ? attractions : []).entries()) {
  const at = `第 ${index + 1} 筆`
  for (const [key, set] of [['id', ids], ['slug', slugs], ['officialId', officialIds]]) {
    if (!item[key] || set.has(item[key])) errors.push(`${at} ${key} 缺漏或重複：${item[key]}`)
    set.add(item[key])
  }
  if (!item.nameZh?.trim()) errors.push(`${at} 景點名稱為空`)
  const cityName = `${item.cityId}:${item.nameZh?.trim()}`
  if (cityNames.has(cityName)) errors.push(`${at} 同城市景點名稱重複：${item.nameZh}`)
  cityNames.add(cityName)
  if (!cityIds.has(item.cityId)) errors.push(`${at} cityId 不存在：${item.cityId}`)
  if (!categoryIds.has(item.category)) errors.push(`${at} category 無效：${item.category}`)
  if (!item.shortDescription?.trim()) errors.push(`${at} 摘要為空`)
  if (!Array.isArray(item.tags)) errors.push(`${at} tags 需為陣列`)
  try { if (!/^https:$/.test(new URL(item.sourceUrl).protocol)) errors.push(`${at} sourceUrl 需使用 HTTPS`) }
  catch { errors.push(`${at} sourceUrl 格式無效`) }
  if (item.coverMediaId && !mediaIds.has(item.coverMediaId)) errors.push(`${at} 媒體 ID 不存在：${item.coverMediaId}`)
  if (item.coordinates) {
    const { lat, lng } = item.coordinates
    if (!Number.isFinite(lat) || !Number.isFinite(lng) || lat < 20 || lat > 27 || lng < 118 || lng > 123) errors.push(`${at} 座標不在臺灣合理範圍`)
  }
}
for (const [id, item] of Object.entries(visit)) {
  if (!ids.has(id)) errors.push(`參訪資料引用不存在的景點：${id}`)
  if (item.address !== undefined && (typeof item.address !== 'string' || !item.address.trim())) errors.push(`地址無效：${id}`)
  if (item.officialWebsite) {
    try { if (new URL(item.officialWebsite).protocol !== 'https:') errors.push(`官網需使用 HTTPS：${id}`) }
    catch { errors.push(`官網網址無效：${id}`) }
  }
}
if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1 }
else console.log(`景點資料驗證通過：${attractions.length} 筆、${cityIds.size} 個既有城市 ID、${categoryIds.size} 種分類、${mediaIds.size} 個媒體 ID。`)
