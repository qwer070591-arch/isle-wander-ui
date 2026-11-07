import type { Destination, Mood, Region, StayConcept } from '../types/content'
import { attractionMedia, homePhotos, homepageExtras, regionPhotos } from './media'

// 編輯分組；22 縣市各歸屬一個主要區域，不代表行政區劃。
export const regions: Region[] = [
  { id: 'north', name: '北台灣', english: 'THE NORTH', description: '山城、海岬與城市的日常。', cities: ['臺北市', '新北市', '基隆市', '桃園市', '新竹市', '新竹縣', '宜蘭縣'], art: 'ridge', photo: regionPhotos.north },
  { id: 'central', name: '中台灣', english: 'THE HEARTLAND', description: '循著山線，慢慢走進島嶼腹地。', cities: ['苗栗縣', '臺中市', '彰化縣', '南投縣', '雲林縣'], art: 'forest', photo: regionPhotos.central },
  { id: 'south', name: '南台灣', english: 'THE SOUTH', description: '老街、陽光與有溫度的街角。', cities: ['嘉義市', '嘉義縣', '臺南市', '高雄市', '屏東縣'], art: 'street', photo: regionPhotos.south },
  { id: 'east', name: '東台灣', english: 'THE EAST', description: '讓山與海，重新定義一日的長度。', cities: ['花蓮縣', '臺東縣'], art: 'coast', photo: regionPhotos.east },
  { id: 'islands', name: '離島', english: 'THE ISLANDS', description: '渡海之後，遇見另一種時間感。', cities: ['澎湖縣', '金門縣', '連江縣'], art: 'islands', photo: regionPhotos.islands },
]

// 地點名稱為真實地名；文字是本站原創編輯摘要。照片來源與授權見 media.ts。
export const destinations: Destination[] = [
  { id: 'city-hualien', slug: 'hualien', city: '花蓮縣', regionId: 'east', name: '花蓮・山海之間', category: '山海慢行', summary: '清晨從城市出發，沿著海岸與山的輪廓，給自己一段沒有催促的路。', art: 'coast', photo: homePhotos.hualien },
  { id: 'city-tainan', slug: 'tainan', city: '臺南市', regionId: 'south', name: '臺南・街巷日常', category: '地方文化', summary: '在巷弄裡慢下來，看見老城一直延續的生活。', art: 'terracotta', photo: homePhotos.tainan },
  { id: 'city-nantou', slug: 'nantou', city: '南投縣', regionId: 'central', name: '南投・山裡留白', category: '森林與湖', summary: '順著林間光影，為旅程留一點安靜。', art: 'forest', photo: homepageExtras.nantou },
]

// 不指涉真實旅館，亦不作房況或價格表示。正式選輯需待授權照片與內容核對。
export const stayConcepts: StayConcept[] = [
  { id: 'stay-concept-mountain', title: '山裡，住一晚', location: '中台灣／風格提案', description: '讓木質、天光與窗外的綠，成為停留的理由。', tags: ['自然光', '山居靈感'], art: 'architecture' },
  { id: 'stay-concept-coast', title: '聽海的房間', location: '東台灣／風格提案', description: '把海風與晨光，留進旅途的片刻。', tags: ['海岸', '慢住靈感'], art: 'interior' },
]

export const moods: Mood[] = [
  { id: 'mountain', title: '山徑與森林', subtitle: '跟著樹影走', art: 'forest', photo: attractionMedia['photo-taipingshan-forest'] },
  { id: 'coast', title: '海岸慢行', subtitle: '把時間交給浪', art: 'coast', photo: homePhotos.hualien },
  { id: 'heritage', title: '老街日常', subtitle: '走進街巷的故事', art: 'street', photo: homepageExtras.heritage },
  { id: 'lake', title: '湖畔留白', subtitle: '在水邊坐一會', art: 'lake', photo: homepageExtras.lake },
]
