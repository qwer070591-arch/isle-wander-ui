import rawAttractions from './attractions.json'
import rawCategories from './attraction-categories.json'
import { cities } from './cities'
import { attractionMedia } from './media'
import type { Attraction, AttractionCategoryId } from '../types/content'

export const attractionCategories = rawCategories as { id: AttractionCategoryId; name: string; english: string }[]

const cityIds = new Set(cities.map((city) => city.id))
const categoryIds = new Set(attractionCategories.map((category) => category.id))
const records = Array.isArray(rawAttractions) ? rawAttractions : []
export const attractions: Attraction[] = records.filter((item): item is typeof records[number] =>
  item && typeof item === 'object' &&
  typeof item.id === 'string' && item.id.length > 0 && typeof item.slug === 'string' && item.slug.length > 0 &&
  typeof item.nameZh === 'string' && item.nameZh.length > 0 &&
  cityIds.has(item.cityId) && categoryIds.has(item.category as AttractionCategoryId) &&
  typeof item.shortDescription === 'string' && Array.isArray(item.tags) && typeof item.sourceUrl === 'string' &&
  (!('coverMediaId' in item) || !item.coverMediaId || item.coverMediaId in attractionMedia),
) as Attraction[]

export const attractionBySlug = new Map(attractions.map((attraction) => [attraction.slug, attraction]))
export const attractionCountByCity = attractions.reduce((counts, attraction) => {
  counts.set(attraction.cityId, (counts.get(attraction.cityId) ?? 0) + 1)
  return counts
}, new Map<string, number>())
export const cityById = new Map(cities.map((city) => [city.id, city]))
export const categoryById = new Map(attractionCategories.map((category) => [category.id, category]))
