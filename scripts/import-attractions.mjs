// 一次性精選匯入：node scripts/import-attractions.mjs output/attraction-source/AttractionList.json
// 只讀取交通部觀光署官方 JSON；依官方 ID 白名單產出小型靜態資料。
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const input = process.argv[2]
if (!input) throw new Error('請提供官方 AttractionList.json 路徑')
const source = JSON.parse(fs.readFileSync(path.resolve(projectRoot, input), 'utf8').replace(/^\uFEFF/, ''))
const byId = new Map(source.Attractions.map((row) => [row.AttractionID, row]))
const cityIds = {
  臺北市: 'city-taipei', 新北市: 'city-new-taipei', 臺中市: 'city-taichung', 南投縣: 'city-nantou',
  臺南市: 'city-tainan', 高雄市: 'city-kaohsiung', 花蓮縣: 'city-hualien', 臺東縣: 'city-taitung',
  宜蘭縣: 'city-yilan', 嘉義縣: 'city-chiayi-county', 澎湖縣: 'city-penghu',
}

// [官方 ID, 網址 slug, 編輯分類, 搜尋標籤, 顯示名稱?]
const selected = [
  ['Attraction_379000000A_000105','dadaocheng-streets','urban',['老街','迪化街'],'大稻埕街區'],
  ['Attraction_379000000A_000019','national-palace-museum','arts',['博物館','文物']],
  ['Attraction_379000000A_001592','huashan-1914','arts',['文創','藝文']],
  ['Attraction_379000000A_000185','xiangshan-trail','trail',['山徑','步道'],'象山親山步道'],
  ['Attraction_382000000A_109612','shifen-waterfall','nature',['瀑布','森林']],
  ['Attraction_382000000A_109616','yingge-ceramics-museum','arts',['陶瓷','博物館']],
  ['Attraction_382000000A_109990','jiufen-old-street','urban',['山城','老街']],
  ['Attraction_382000000A_109735','yehliu-geopark','coast',['海岸','地質']],
  ['Attraction_387000000A_000942','national-taichung-theater','arts',['建築','表演']],
  ['Attraction_387000000A_000054','gaomei-wetlands','coast',['濕地','海岸'],'高美濕地'],
  ['Attraction_387000000A_000028','taichung-park','leisure',['公園','城市']],
  ['Attraction_387000000A_000395','wuling-forest','nature',['森林','山景']],
  ['Attraction_376480000A_000301','xitou-nature-education-area','trail',['森林','自然教育']],
  ['Attraction_376480000A_000253','qingjing-farm','leisure',['高山','農場']],
  ['Attraction_376480000A_000319','checheng-station','culture',['鐵道','木業']],
  ['Attraction_345040000G_000011','aowanda-forest','nature',['森林','溪流']],
  ['Attraction_395000000A_000674','chihkan-tower','culture',['古蹟','歷史']],
  ['Attraction_395000000A_001351','shennong-street','urban',['老街','街區']],
  ['Attraction_395000000A_000671','anping-old-fort','culture',['古蹟','海港']],
  ['Attraction_395000000A_000572','chimei-museum','arts',['博物館','建築']],
  ['Attraction_397000000A_001214','sizihwan-viewpoint','coast',['海岸','觀景']],
  ['Attraction_397000000A_000182','cijin-lighthouse','culture',['燈塔','海港']],
  ['Attraction_397000000A_000579','buddha-museum','culture',['文化','建築']],
  ['Attraction_397000000A_000247','weiwuying-arts-center','arts',['表演','建築']],
  ['Attraction_376550000A_001190','qixingtan-coast','coast',['海岸','礫石']],
  ['Attraction_376550000A_001176','qingshui-cliffs','coast',['海岸','斷崖']],
  ['Attraction_376550000A_000012','pine-garden','culture',['歷史建築','藝文']],
  ['Attraction_376550000A_000293','danongdafu-forest','nature',['森林','自行車']],
  ['Attraction_376540000A_000333','sanxiantai','coast',['海岸','島嶼']],
  ['Attraction_376540000A_000283','zhiben-forest','trail',['森林','步道']],
  ['Attraction_376540000A_000450','luye-highland','nature',['高台','山景']],
  ['Attraction_376540000A_000454','taitung-forest-park','leisure',['公園','森林']],
  ['Attraction_345040000G_000001','taipingshan-forest','nature',['森林','山景']],
  ['Attraction_376420000A_000321','lanyang-museum','arts',['博物館','建築']],
  ['Attraction_376420000A_000258','dongshan-river-park','leisure',['河岸','公園']],
  ['Attraction_376420000A_000426','luodong-forestry-park','culture',['林業','鐵道']],
  ['Attraction_345040000G_000012','alishan-forest','nature',['森林','山景']],
  ['Attraction_A15010800H_000157','fenqihu-old-street','urban',['老街','鐵道']],
  ['Attraction_345040000G_020020','aogu-wetlands','nature',['濕地','賞鳥']],
  ['Attraction_376500000A_000025','southern-palace-museum','arts',['博物館','文物']],
  ['Attraction_A15010200H_000111','penghu-cross-sea-bridge','coast',['海景','橋梁']],
  ['Attraction_A15010200H_000115','erkan-village','culture',['聚落','古厝']],
  ['Attraction_A15010200H_000128','double-heart-stone-weir','culture',['石滬','海岸']],
  ['Attraction_A15010200H_000032','duxing-ten-village','urban',['眷村','街區']],
]

// 編輯摘要以官方 Description 核對後改寫，避免直接截取過長或帶促銷語氣的原文。
const editorialSummaries = {
  'dadaocheng-streets': '沿著迪化街的店屋與街道，讀淡水河畔的商業記憶。',
  'national-palace-museum': '走進外雙溪的博物館，從典藏與建築認識歷史。',
  'huashan-1914': '從舊酒廠轉身為藝文園區，保留城市裡的產業痕跡。',
  'xiangshan-trail': '循著親山步道登高，從山徑回望臺北市區。',
  'shifen-waterfall': '基隆河在岩層落差間形成瀑布與周邊地質景觀。',
  'yingge-ceramics-museum': '以陶瓷為線索，認識鶯歌與臺灣的工藝發展。',
  'jiufen-old-street': '沿著山城街巷，尋訪九份與採金年代留下的記憶。',
  'yehliu-geopark': '海蝕與風化雕刻出岬角的岩石地景。',
  'national-taichung-theater': '以曲面建築與表演空間，感受城市的藝文節奏。',
  'gaomei-wetlands': '在大甲溪出海口附近，觀察濕地與海岸的交界。',
  'taichung-park': '湖面、亭臺與曲橋，構成臺中市區的老公園風景。',
  'wuling-forest': '走進高海拔森林，感受山區植被與地形的層次。',
  'xitou-nature-education-area': '在溪頭的林間步道，認識森林與自然教育。',
  'qingjing-farm': '高山草原與步道相連，展開南投的山景視野。',
  'checheng-station': '從集集支線的終點站，走進車埕的鐵道記憶。',
  'aowanda-forest': '森林、溪流與吊橋，串起奧萬大的山林景色。',
  'chihkan-tower': '從古蹟建築，閱讀臺南早期城市發展的線索。',
  'shennong-street': '沿著五條港舊街區，觀看老屋與街道的今日生活。',
  'anping-old-fort': '從安平的堡壘遺跡，認識臺南港口的歷史。',
  'chimei-museum': '以博物館建築與展覽，留一段時間給藝術。',
  'sizihwan-viewpoint': '在西子灣的觀海平台，望向高雄的海港與夕光。',
  'cijin-lighthouse': '登上旗後的燈塔，讀高雄港的航運歷史。',
  'buddha-museum': '佛教文化、展覽與建築在這座紀念館相遇。',
  'weiwuying-arts-center': '從建築曲線走進表演場館，感受高雄的藝文生活。',
  'qixingtan-coast': '礫石海灣與太平洋相接，山的輪廓一路延伸。',
  'qingshui-cliffs': '近乎垂直的斷崖，沿著太平洋海岸展開。',
  'pine-garden': '松林環繞的歷史建築，望向美崙溪與花蓮港。',
  'danongdafu-forest': '在開闊的人造林間，感受花東縱谷的山線。',
  sanxiantai: '東海岸的島嶼與海蝕地景，勾出臺東的海岸線。',
  'zhiben-forest': '沿著知本溪附近的森林步道，認識亞熱帶林相。',
  'luye-highland': '從高台俯瞰卑南溪谷與周邊田野。',
  'taitung-forest-park': '森林、湖泊與河口濕地，交會在臺東市區旁。',
  'taipingshan-forest': '森林鐵道、高山湖泊與巨木，串起太平山的林業記憶。',
  'lanyang-museum': '從自然環境到地方文化，在博物館裡認識宜蘭。',
  'dongshan-river-park': '沿著冬山河畔，留一段親水與散步的時間。',
  'luodong-forestry-park': '從貯木池與林業遺跡，回望羅東的產業歷史。',
  'alishan-forest': '森林鐵道、神木與山景，構成阿里山的旅行線索。',
  'fenqihu-old-street': '順著鐵道聚落的街巷，走進奮起湖的老街。',
  'aogu-wetlands': '在昔日農場形成的濕地，觀察水鳥與地景變化。',
  'southern-palace-museum': '在嘉義的博物館，從展覽與建築展開文化旅程。',
  'penghu-cross-sea-bridge': '橋梁跨越白沙與西嶼之間的水道，連起島嶼旅程。',
  'erkan-village': '走進修復後的傳統聚落，認識澎湖的古厝與生活。',
  'double-heart-stone-weir': '以玄武岩與珊瑚礁砌成的石滬，留下漁業智慧。',
  'duxing-ten-village': '在舊眷村的木造宿舍之間，閱讀地方生活記憶。',
}

function date(value) {
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}/.test(value) ? value.slice(0, 10) : undefined
}
const attractions = selected.map(([officialId, slug, category, tags, displayName]) => {
  const row = byId.get(officialId)
  if (!row) throw new Error(`官方資料缺少 ${officialId}`)
  if (!editorialSummaries[slug]) throw new Error(`景點缺少編輯摘要：${slug}`)
  const cityId = cityIds[row.PostalAddress?.City]
  if (!cityId) throw new Error(`${officialId} 的城市未列入首批名單：${row.PostalAddress?.City}`)
  const coordinates = Number.isFinite(row.PositionLat) && Number.isFinite(row.PositionLon)
    ? { lat: row.PositionLat, lng: row.PositionLon } : null
  return {
    id: `attraction-${slug}`, slug, officialId, nameZh: displayName ?? row.AttractionName,
    cityId, category, shortDescription: editorialSummaries[slug], tags,
    ...(slug === 'qixingtan-coast' ? { coverMediaId: 'photo-qixingtan' } : {}),
    ...(slug === 'shennong-street' ? { coverMediaId: 'photo-shennong-street' } : {}),
    sourceUrl: 'https://data.gov.tw/dataset/7777',
    ...(date(row.UpdateTime) ? { sourceUpdatedAt: date(row.UpdateTime) } : {}),
    lastVerifiedAt: '2026-10-29',
    coordinates,
  }
})
if (new Set(attractions.map((item) => item.id)).size !== attractions.length) throw new Error('ID 重複')
if (new Set(attractions.map((item) => item.slug)).size !== attractions.length) throw new Error('slug 重複')
fs.writeFileSync(path.join(projectRoot, 'src/data/attractions.json'), `${JSON.stringify(attractions, null, 2)}\n`)
console.log(`匯入 ${attractions.length} 筆，官方資料更新：${source.UpdateTime}`)
