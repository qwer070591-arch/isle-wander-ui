import type { City } from '../types/content'
import { homePhotos } from './media'

// 原創編輯摘要；地理／旅遊主題以交通部觀光署的觀光景點總覽核對。
// https://www.taiwan.net.tw/m1.aspx?sNo=0001016
// overview 表示只有城市速寫，尚無核實的景點與住宿清單。
export const cities: City[] = [
  {
    id: 'city-taipei', slug: 'taipei', nameZh: '臺北市', nameEn: 'Taipei City', regionId: 'north',
    teaser: '在城市街角與近郊山徑之間，換一種步調。',
    intro: '臺北的節奏可以很快，也可以很慢。從老街區、獨立店家走向近郊山徑，城市與自然在一天裡交替出現。',
    featureTags: ['城市街區', '文化場館', '近郊步道'], moodTags: ['heritage', 'mountain', 'local-life'], coordinates: null, art: 'street', contentStatus: 'overview', updatedAt: '2026-10-29',
  },
  {
    id: 'city-new-taipei', slug: 'new-taipei', nameZh: '新北市', nameEn: 'New Taipei City', regionId: 'north',
    teaser: '從河岸、山城到海邊，讓路線慢慢展開。',
    intro: '新北的旅行方向很多：沿河岸散步、在山城停留，或到海邊看地形與天色變化。挑一條線慢慢走，比一天收集所有地點更有意思。',
    featureTags: ['山城街巷', '北海岸', '河岸散步'], moodTags: ['coast', 'heritage', 'mountain'], coordinates: null, art: 'coast', contentStatus: 'overview', updatedAt: '2026-10-29',
  },
  {
    id: 'city-keelung', slug: 'keelung', nameZh: '基隆市', nameEn: 'Keelung City', regionId: 'north',
    teaser: '港口、坡道與海風，構成一座城市的日常。',
    intro: '基隆的街道沿著港灣與山坡展開。走進市場、看見港口與海岸，能感受到這座城市鮮明的海洋氣息。',
    featureTags: ['港都生活', '市場街區', '海岸地形'], moodTags: ['coast', 'local-life', 'heritage'], coordinates: null, art: 'coast', contentStatus: 'overview', updatedAt: '2026-10-29',
  },
  {
    id: 'city-taoyuan', slug: 'taoyuan', nameZh: '桃園市', nameEn: 'Taoyuan City', regionId: 'north',
    teaser: '老街與埤塘之外，也有走向山的路。',
    intro: '桃園不只有城市轉運的印象。老街、水岸與丘陵讓旅程有不同的層次，適合從一個地方開始，慢慢探索周邊。',
    featureTags: ['老街記憶', '水岸風景', '丘陵步道'], moodTags: ['heritage', 'lake', 'mountain'], coordinates: null, art: 'lake', contentStatus: 'overview', updatedAt: '2026-10-29',
  },
  {
    id: 'city-hsinchu-city', slug: 'hsinchu-city', nameZh: '新竹市', nameEn: 'Hsinchu City', regionId: 'north',
    teaser: '在城門、街市與風之間讀一座城市。',
    intro: '新竹市的舊城尺度適合步行。沿著街市與歷史建築停留，也能在城市邊緣感受海風帶來的開闊。',
    featureTags: ['舊城散策', '街市風味', '海風'], moodTags: ['heritage', 'local-life', 'coast'], coordinates: null, art: 'street', contentStatus: 'overview', updatedAt: '2026-10-29',
  },
  {
    id: 'city-hsinchu-county', slug: 'hsinchu-county', nameZh: '新竹縣', nameEn: 'Hsinchu County', regionId: 'north',
    teaser: '循著客庄與丘陵，走進更緩慢的日常。',
    intro: '新竹縣的聚落、丘陵與山線可以串成一段放慢腳步的旅程。從地方街道到山間風景，留時間聽見不同的生活聲音。',
    featureTags: ['客庄文化', '丘陵風景', '山線聚落'], moodTags: ['heritage', 'mountain', 'local-life'], coordinates: null, art: 'ridge', contentStatus: 'overview', updatedAt: '2026-10-29',
  },
  {
    id: 'city-yilan', slug: 'yilan', nameZh: '宜蘭縣', nameEn: 'Yilan County', regionId: 'north',
    teaser: '平原、海岸與山色，讓週末有了呼吸。',
    intro: '宜蘭的平原向海延伸，山與水又在不遠處相遇。旅行可以是海岸的一段路，也可以是在田野與聚落裡慢慢停留。',
    featureTags: ['平原田野', '東北海岸', '溫泉文化'], moodTags: ['coast', 'mountain', 'local-life'], coordinates: null, art: 'lake', contentStatus: 'overview', updatedAt: '2026-10-29',
  },
  {
    id: 'city-miaoli', slug: 'miaoli', nameZh: '苗栗縣', nameEn: 'Miaoli County', regionId: 'central',
    teaser: '在丘陵間遇見工藝、聚落與季節風景。',
    intro: '苗栗的丘陵地形讓城鎮與山景彼此靠近。地方工藝與客庄生活，值得用比走馬看花更慢的方式認識。',
    featureTags: ['客庄生活', '地方工藝', '丘陵山線'], moodTags: ['heritage', 'mountain', 'local-life'], coordinates: null, art: 'ridge', contentStatus: 'overview', updatedAt: '2026-10-29',
  },
  {
    id: 'city-taichung', slug: 'taichung', nameZh: '臺中市', nameEn: 'Taichung City', regionId: 'central',
    teaser: '讓城市的文化街角，接上山線的風景。',
    intro: '臺中的城市空間與周邊山線各有節奏。可以從文化場館與舊街區出發，再把另一段時間留給綠地、聚落與遠方的山。',
    featureTags: ['文化場館', '舊街區', '山線風景'], moodTags: ['heritage', 'mountain', 'local-life'], coordinates: null, art: 'street', contentStatus: 'overview', updatedAt: '2026-10-29',
  },
  {
    id: 'city-changhua', slug: 'changhua', nameZh: '彰化縣', nameEn: 'Changhua County', regionId: 'central',
    teaser: '從街市到海線，留意日常裡的細節。',
    intro: '彰化的老街、聚落與海線有不同的地方表情。放慢腳步看建築、走進市場，再到開闊的平原與海邊換一口氣。',
    featureTags: ['老街建築', '地方市場', '平原海線'], moodTags: ['heritage', 'local-life', 'coast'], coordinates: null, art: 'terracotta', contentStatus: 'overview', updatedAt: '2026-10-29',
  },
  {
    id: 'city-nantou', slug: 'nantou', nameZh: '南投縣', nameEn: 'Nantou County', regionId: 'central',
    teaser: '讓山巒與湖光，為旅程留一段安靜。',
    intro: '南投的山與湖很適合用停留來感受。從林間光影到水邊的風，旅程不一定要排得很滿，也能留下清楚的記憶。',
    featureTags: ['山林步道', '湖畔風景', '地方聚落'], moodTags: ['mountain', 'lake', 'local-life'], coordinates: null, art: 'forest', contentStatus: 'overview', updatedAt: '2026-10-29',
  },
  {
    id: 'city-yunlin', slug: 'yunlin', nameZh: '雲林縣', nameEn: 'Yunlin County', regionId: 'central',
    teaser: '在田野與小鎮之間，找回日常的溫度。',
    intro: '雲林的平原、小鎮與地方技藝交織出鮮明的生活感。走一段街道、看看田野，讓旅程從人的日常開始。',
    featureTags: ['農村地景', '小鎮街道', '傳統技藝'], moodTags: ['local-life', 'heritage'], coordinates: null, art: 'terracotta', contentStatus: 'overview', updatedAt: '2026-10-29',
  },
  {
    id: 'city-chiayi-city', slug: 'chiayi-city', nameZh: '嘉義市', nameEn: 'Chiayi City', regionId: 'south',
    teaser: '木都記憶與街角風味，適合慢慢步行。',
    intro: '嘉義市有適合步行的城市尺度。木造建築、街市與文化空間，讓這座城市成為深入認識地方的起點。',
    featureTags: ['木都記憶', '城市散策', '街市風味'], moodTags: ['heritage', 'local-life'], coordinates: null, art: 'street', contentStatus: 'overview', updatedAt: '2026-10-29',
  },
  {
    id: 'city-chiayi-county', slug: 'chiayi-county', nameZh: '嘉義縣', nameEn: 'Chiayi County', regionId: 'south',
    teaser: '從平原向山裡走，景色與時間一同改變。',
    intro: '嘉義縣從平原延伸到山地，沿途有農村、聚落與森林景觀。讓路程本身成為旅行的一部分，會看見更多層次。',
    featureTags: ['山林景觀', '農村聚落', '地方文化'], moodTags: ['mountain', 'local-life', 'heritage'], coordinates: null, art: 'forest', contentStatus: 'overview', updatedAt: '2026-10-29',
  },
  {
    id: 'city-tainan', slug: 'tainan', nameZh: '臺南市', nameEn: 'Tainan City', regionId: 'south',
    teaser: '在巷弄、老屋與街市裡，聽城市繼續生活。',
    intro: '臺南的歷史不只在地標裡，也藏在仍有人生活的街巷。用步行的速度穿過老屋與市場，讓味道、聲音與光線帶路。',
    featureTags: ['歷史街區', '老屋日常', '地方飲食'], moodTags: ['heritage', 'local-life'], coordinates: null, cover: homePhotos.tainan, art: 'street', contentStatus: 'overview', updatedAt: '2026-10-29',
  },
  {
    id: 'city-kaohsiung', slug: 'kaohsiung', nameZh: '高雄市', nameEn: 'Kaohsiung City', regionId: 'south',
    teaser: '港灣、藝術街區與山海，構成開闊的南方。',
    intro: '高雄的港灣尺度讓城市有開闊的呼吸。沿著水岸、文化街區與城市邊緣慢慢移動，可以遇見不同的南方風景。',
    featureTags: ['港灣水岸', '藝術街區', '山海視野'], moodTags: ['coast', 'heritage', 'local-life'], coordinates: null, art: 'coast', contentStatus: 'overview', updatedAt: '2026-10-29',
  },
  {
    id: 'city-pingtung', slug: 'pingtung', nameZh: '屏東縣', nameEn: 'Pingtung County', regionId: 'south',
    teaser: '從平原走向半島，感受南方的光與風。',
    intro: '屏東的旅行可以從街市與平原延伸到海岸和半島。不同聚落與自然環境各有節奏，值得多留幾天認識。',
    featureTags: ['南方海岸', '半島風景', '地方聚落'], moodTags: ['coast', 'local-life', 'heritage'], coordinates: null, art: 'coast', contentStatus: 'overview', updatedAt: '2026-10-29',
  },
  {
    id: 'city-hualien', slug: 'hualien', nameZh: '花蓮縣', nameEn: 'Hualien County', regionId: 'east',
    teaser: '沿著山與海的交界，留一段路給風景。',
    intro: '花蓮的山脈與太平洋彼此靠近，讓移動本身成為旅程的一部分。沿著海岸與聚落停下腳步，山海的尺度會慢慢展開。',
    featureTags: ['山海交界', '東部海岸', '聚落日常'], moodTags: ['coast', 'mountain', 'local-life'], coordinates: null, cover: homePhotos.hualien, art: 'coast', contentStatus: 'overview', updatedAt: '2026-10-29',
  },
  {
    id: 'city-taitung', slug: 'taitung', nameZh: '臺東縣', nameEn: 'Taitung County', regionId: 'east',
    teaser: '把時間交給海岸、縱谷與在地生活。',
    intro: '臺東的海岸與縱谷帶來寬闊的移動感。不要急著走完每一站，留時間給地方生活與路上的風景。',
    featureTags: ['東部海岸', '縱谷風景', '地方生活'], moodTags: ['coast', 'mountain', 'local-life'], coordinates: null, art: 'coast', contentStatus: 'overview', updatedAt: '2026-10-29',
  },
  {
    id: 'city-penghu', slug: 'penghu', nameZh: '澎湖縣', nameEn: 'Penghu County', regionId: 'islands',
    teaser: '讓海風、聚落與島間距離決定旅行步調。',
    intro: '澎湖的島嶼風景有海岸、聚落與不同的地形。渡海之後，放慢移動，才有時間感受島與島之間的差異。',
    featureTags: ['群島海岸', '聚落建築', '海風日常'], moodTags: ['coast', 'heritage', 'local-life'], coordinates: null, art: 'islands', contentStatus: 'overview', updatedAt: '2026-10-29',
  },
  {
    id: 'city-kinmen', slug: 'kinmen', nameZh: '金門縣', nameEn: 'Kinmen County', regionId: 'islands',
    teaser: '在聚落與海岸之間，讀一座島的記憶。',
    intro: '金門的聚落建築與歷史痕跡讓旅行多了閱讀的層次。從街道走向海邊，島嶼生活與過去的故事仍在眼前。',
    featureTags: ['傳統聚落', '歷史地景', '島嶼海岸'], moodTags: ['heritage', 'coast', 'local-life'], coordinates: null, art: 'terracotta', contentStatus: 'overview', updatedAt: '2026-10-29',
  },
  {
    id: 'city-lienchiang', slug: 'lienchiang', nameZh: '連江縣', nameEn: 'Lienchiang County', regionId: 'islands',
    teaser: '在島與島之間，慢慢認識馬祖的海與聚落。',
    intro: '連江縣的馬祖列島由海與島間交通串起旅程。石造聚落、海岸與坡地風景，適合放下趕路的心情慢慢看。',
    featureTags: ['馬祖列島', '石造聚落', '海岸坡地'], moodTags: ['coast', 'heritage', 'local-life'], coordinates: null, art: 'islands', contentStatus: 'overview', updatedAt: '2026-10-29',
  },
]

export const cityBySlug = new Map(cities.map(city => [city.slug, city]))
