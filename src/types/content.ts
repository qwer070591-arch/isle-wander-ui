export type RegionId = 'north' | 'central' | 'south' | 'east' | 'islands'
export type MoodId = 'mountain' | 'coast' | 'heritage' | 'lake' | 'local-life'
export type CityContentStatus = 'overview' | 'curated'
export type AttractionCategoryId = 'nature' | 'coast' | 'trail' | 'culture' | 'urban' | 'arts' | 'leisure'

export interface Attraction {
  id: string
  slug: string
  officialId: string
  nameZh: string
  nameEn?: string
  cityId: string
  category: AttractionCategoryId
  shortDescription: string
  tags: string[]
  coverMediaId?: string
  sourceUrl: string
  sourceUpdatedAt?: string
  lastVerifiedAt: string
  coordinates: { lat: number; lng: number } | null
}

export interface PhotoAsset {
  src: string
  mobileSrc?: string
  alt: string
  width: number
  height: number
  credit: string
  sourceUrl: string
  license: string
  licenseUrl: string
  caption: string
}

export interface Region {
  id: RegionId
  name: string
  english: string
  description: string
  cities: string[]
  art: string
}

// 與 docs/DATA-MODEL.md 的 City 識別、關聯、更新日期及標籤規則一致。
// 本階段授權照片不足，因此 cover 按 Phase 2A 要求為可選。
export interface City {
  id: string
  slug: string
  nameZh: string
  nameEn: string
  regionId: RegionId
  teaser: string
  intro: string
  featureTags: string[]
  moodTags: MoodId[]
  coordinates: null
  cover?: PhotoAsset
  art: string
  contentStatus: CityContentStatus
  updatedAt: string
}

export interface Destination {
  id: string
  slug: string
  city: string
  regionId: RegionId
  name: string
  category: string
  summary: string
  art: string
  photo?: PhotoAsset
}

export interface StayConcept {
  id: string
  title: string
  location: string
  description: string
  tags: string[]
  art: string
}

export interface Mood {
  id: MoodId
  title: string
  subtitle: string
  art: string
}
