import { exploreMoodboard, stayMoodboard } from './stitch-visuals'
import jiufenConcept from '../assets/generated/attraction-jiufen-old-street.webp'
import wetlandConcept from '../assets/generated/attraction-aogu-wetlands.webp'

export const stayStyles = [
  { id: 'forest', label: '山林慢居', description: '留給樹影、安靜與清晨的時間。', city: 'chiayi-county' },
  { id: 'coast', label: '海岸停留', description: '在海風與開闊的視野之間放慢腳步。', city: 'hualien' },
  { id: 'heritage', label: '老屋日常', description: '從街區尺度與生活細節感受地方。', city: 'tainan' },
  { id: 'field', label: '田野光景', description: '把一晚留給平原的光線與節奏。', city: 'taitung' },
] as const

export const stayIdeas = [
  { id: 'forest-cabin', style: 'forest', title: '山林木屋', detail: '想像被樹影包圍的晨間，從步道與山線開始安排旅程。', visual: stayMoodboard[0], city: 'chiayi-county' },
  { id: 'coastal-room', style: 'coast', title: '海岸居所', detail: '讓海景成為停留的背景，先確認當地可抵達的景點與交通。', visual: stayMoodboard[1], city: 'hualien' },
  { id: 'old-house', style: 'heritage', title: '老屋庭院', detail: '沿著街屋與庭院的線索，慢慢走進地方的日常。', visual: stayMoodboard[2], city: 'tainan' },
  { id: 'forest-night', style: 'forest', title: '森林夜色', detail: '保留一個沒有趕路的夜晚，也留意山區交通與天候。', visual: stayMoodboard[3], city: 'yilan' },
  { id: 'island-stone', style: 'coast', title: '離島石屋', detail: '從聚落與海岸的距離想像停留，先查詢船班與季節。', visual: stayMoodboard[4], city: 'penghu' },
  { id: 'field-home', style: 'field', title: '田野居所', detail: '用一片田野的日落，為東部慢行安排一個停頓。', visual: stayMoodboard[5], city: 'taitung' },
  { id: 'quiet-interior', style: 'heritage', title: '室內光影', detail: '從器物與空間細節，尋找適合自己的居住感受。', visual: stayMoodboard[6], city: 'tainan' },
  { id: 'soft-room', style: 'field', title: '柔光房間', detail: '在旅行裡留一些空白，讓休息也成為行程的一部分。', visual: stayMoodboard[7], city: 'taitung' },
] as const

export const stories = [
  {
    slug: 'forest-railway', category: '山林', readMinutes: 1, title: '沿著山林的舊線，慢慢看見時間',
    subtitle: '從阿里山的林業痕跡，想像一段放慢速度的步行。', visual: exploreMoodboard[1], attraction: 'alishan-forest',
    paragraphs: [
      '森林裡的路徑常讓人把注意力重新交還給腳步。阿里山的山林景觀與林業歷史，提供了理解這片山地的兩條線索：眼前的樹木，以及留下來的軌道與設施。',
      '到一個地方旅行，不必急著把所有地標收進照片。停下來看看坡度、光線與路線如何改變，也能讓熟悉的景色變得不同。',
      '園區範圍與步道開放狀態會變動。出發前請查詢管理單位公告，為天候與交通保留彈性。',
    ],
  },
  {
    slug: 'old-town-walk', category: '街區', readMinutes: 1, title: '在舊城街巷，練習走得更慢',
    subtitle: '從臺南神農街的街屋，讀一座城市的生活尺度。', visual: exploreMoodboard[2], attraction: 'shennong-street',
    paragraphs: [
      '神農街是臺南中西區舊城街巷的一部分。老屋與街道保留了昔日港道周邊的城市記憶，也仍然承載今日的店家與居民生活。',
      '比起只尋找一個拍照角度，更值得留心的是門窗、騎樓與人們如何使用這條街。地方不是旅行的背景，它本身有持續進行的日常。',
      '散步時留意行人與住戶，尊重營業和居住空間；若想深入了解建築與歷史，應再查閱官方或地方文史資料。',
    ],
  },
  {
    slug: 'coastline-notes', category: '海岸', readMinutes: 1, title: '把海留在視線裡',
    subtitle: '七星潭的礫石、海灣與山勢，提醒我們重新看待距離。', visual: exploreMoodboard[0], attraction: 'qixingtan-coast',
    paragraphs: [
      '七星潭面向太平洋。弧形海灣、礫石海岸與遠處山勢，讓這裡的風景具有鮮明的層次。',
      '海邊最吸引人的，或許是視線可以走得很遠。把時間留給岸上的散步和觀看，讓旅途有一段不急於抵達的空間。',
      '海況會變化。請留在安全的岸上區域，並遵守現場警示；影像是概念提案，不代表實際海況。',
    ],
  },
  {
    slug: 'taipingshan-morning', category: '山林', readMinutes: 1, title: '在太平山，讓路程慢下來',
    subtitle: '從森林鐵道與山地步道，讀一段被時間留下的線索。', visual: exploreMoodboard[5], attraction: 'taipingshan-forest',
    paragraphs: [
      '太平山的森林鐵道與山地景觀，讓移動本身成為旅行的一部分。沿著既有路線前進，可以留心軌道、坡度與林相如何改變。',
      '山裡的距離很難只用公里計算。轉彎後的光線、腳下的地面與一段停下來聽風的時間，往往比趕到下一個地點更值得記住。',
      '步道、交通與園區開放可能因天候調整。出發前請查詢管理單位資訊，並依當日狀況安排路線。',
    ],
  },
  {
    slug: 'jiufen-steps', category: '街區', readMinutes: 1, title: '順著九份的坡道閱讀山城',
    subtitle: '街巷的高低與轉折，讓採金年代的記憶仍有可循的線索。', visual: { src: jiufenConcept, title: '山城街巷概念影像，非九份實景攝影' }, attraction: 'jiufen-old-street',
    paragraphs: [
      '九份的街道依山勢展開，行走時總要在轉角、階梯與店家之間調整速度。這座山城與採金歷史相連，也有今日持續運作的生活。',
      '可以試著把注意力從單一觀景點移開，看看道路如何連接街屋、店面與遠方的山海。慢一點，往往才看得見地方的尺度。',
      '街巷狹窄且有住戶與商家，走訪時留意通行空間與現場指示；交通及營業資訊請在出發前確認。',
    ],
  },
  {
    slug: 'wetland-edge', category: '海岸', readMinutes: 1, title: '在高美濕地，看見海與陸的邊界',
    subtitle: '潮汐改變地景，也提醒我們留意自然的節奏。', visual: { src: wetlandConcept, title: '濕地概念影像，非高美濕地實景攝影' }, attraction: 'gaomei-wetlands',
    paragraphs: [
      '高美濕地位於河口與海岸的交界。站在岸上，能看見開闊的地平線，也能感受到地景並非固定不變。',
      '濕地適合慢慢觀察。光線、風與水位改變時，同一段步道的樣子也會不同。把觀看留給當下，不必為了拍照越過保護範圍。',
      '潮汐與步道開放狀態會變動。請依現場公告活動，並保持與潮水的安全距離。',
    ],
  },
] as const
