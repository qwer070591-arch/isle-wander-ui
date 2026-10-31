import tarokoSilks from '../assets/stays/taroko-silks.jpg'
import rippling from '../assets/stays/rippling.jpg'
import bowah from '../assets/stays/bowah.jpg'
import hygeia from '../assets/stays/hygeia.jpg'
import sugarResidence from '../assets/stays/sugar-residence.jpg'
import familyInn from '../assets/stays/family-inn.jpg'
import moonSpring from '../assets/stays/moon-spring.jpg'
import plainHouse from '../assets/stays/plain-house.jpg'

// 交通部觀光署「旅館民宿－觀光資訊資料庫」2026-10-30 快照。
// 每張照片的原始 URL 均取自該旅宿紀錄的 Images 欄位；風格及短文由本站編輯。
export const featuredStays = [
  { id: 'Hotel_A15010000H_000183', name: '太魯閣晶英酒店', style: 'forest', city: '花蓮縣', town: '秀林鄉', address: '花蓮縣秀林鄉富世村天祥路18號', license: '交觀業字第1551號', website: 'https://member.silkshotelgroup.com/SPTK', note: '位於天祥一帶；前往太魯閣前，請先確認道路、園區開放與業者營運資訊。', photo: { src: tarokoSilks, label: '山嵐客房', sourceUrl: 'https://taiwan.taiwanstay.net.tw/twpic/55930.jpg?v=20261030' }, citySlug: 'hualien' },
  { id: 'Hotel_A15010000H_000299', name: '漾之谷溫泉民宿', style: 'forest', city: '南投縣', town: '埔里鎮', address: '南投縣埔里鎮中山路一段151號', license: '南投縣民宿452號', website: 'http://rippling.com.tw/', note: '埔里山線的另一種慢行選擇；溫泉與服務內容請以業者最新公告為準。', photo: { src: rippling, label: '四人溫馨溫泉湯屋', sourceUrl: 'https://taiwan.taiwanstay.net.tw/twpic/55995.jpg?v=20261030' }, citySlug: 'nantou' },
  { id: 'Hotel_A15010000H_018203', name: '寶華大飯店', style: 'coast', city: '澎湖縣', town: '馬公市', address: '澎湖縣馬公市中正路2號', license: '交觀業字第1399號', website: 'http://www.bowahotel.com.tw', note: '從馬公港邊安排海島行程，出發前一併確認交通與季節。', photo: { src: bowah, label: '海景四人房', sourceUrl: 'https://taiwan.taiwanstay.net.tw/twpic/202119.jpg?v=20261030' }, citySlug: 'penghu' },
  { id: 'Hotel_A15010000H_002023', name: '海吉兒民宿', style: 'coast', city: '宜蘭縣', town: '頭城鎮', address: '宜蘭縣頭城鎮外澳里濱海路二段1巷11號', license: '宜蘭縣民宿546號', website: 'http://www.hygeia.tw/', note: '以頭城與外澳為旅行起點，沿海岸留一段放慢腳步的時間。', photo: { src: hygeia, label: '鰻寮雙人房', sourceUrl: 'https://taiwan.taiwanstay.net.tw/twpic/56560.jpg?v=20261030' }, citySlug: 'yilan' },
  { id: 'Hotel_A15010000H_034867', name: '東糖官邸民宿', style: 'heritage', city: '臺東縣', town: '臺東市', address: '臺東縣臺東市中興路二段200巷13號', license: '臺東縣民宿2047號', website: 'https://www.facebook.com/TT.ShareHouse', note: '資料集介紹了舊官舍背景；適合從臺東市區安排慢行。', photo: { src: sugarResidence, label: '雙人套房', sourceUrl: 'https://taiwan.taiwanstay.net.tw/twpic/277064.jpg?v=20261030' }, citySlug: 'taitung' },
  { id: 'Hotel_A15010000H_015275', name: '水調歌頭民宿', style: 'heritage', city: '金門縣', town: '金城鎮', address: '金門縣金城鎮前水頭40,41號', license: '金門縣民宿022號', website: 'http://www.familyinn.com.tw', note: '觀光署資料介紹傳統雙落大厝的格局，適合從水頭聚落認識金門。', photo: { src: familyInn, label: '閣樓房', sourceUrl: 'https://taiwan.taiwanstay.net.tw/twpic/61208.jpg?v=20261030' }, citySlug: 'kinmen' },
  { id: 'Hotel_A15010000H_000413', name: '月牙泉民宿', style: 'field', city: '宜蘭縣', town: '羅東鎮', address: '宜蘭縣羅東鎮北投街221號', license: '宜蘭縣民宿275號', website: 'http://www.yueyaquan.com.tw', note: '觀光署資料描述田園與庭院景致，適合安排羅東周邊的慢行。', photo: { src: moonSpring, label: '橘郡', sourceUrl: 'https://taiwan.taiwanstay.net.tw/twpic/56028.jpg?v=20261030' }, citySlug: 'yilan' },
  { id: 'Hotel_A15010000H_002193', name: '平凡平房民宿', style: 'field', city: '臺東縣', town: '鹿野鄉', address: '臺東縣鹿野鄉瑞豐村水源路90巷13號', license: '臺東縣民宿509號', website: 'http://13-live.blogspot.tw/', note: '以鹿野鄉為據點，安排縱谷與田野間的慢行。', photo: { src: plainHouse, label: '簡約Ａ雙人房', sourceUrl: 'https://taiwan.taiwanstay.net.tw/twpic/56608.JPG?v=20261030' }, citySlug: 'taitung' },
] as const satisfies ReadonlyArray<{
  id: string
  name: string
  style: 'forest' | 'coast' | 'heritage' | 'field'
  city: string
  town: string
  address: string
  license: string
  website: string
  note: string
  photo: { src: string; label: string; sourceUrl: string }
  citySlug: string
}>

export const featuredStaysSource = 'https://data.gov.tw/dataset/7780'
export const featuredStaysCheckedAt = '2026-10-31'
