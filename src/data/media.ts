import type { PhotoAsset } from '../types/content'
import qingshuiDesktop from '../assets/photos/qingshui-cliffs-1600.webp'
import qingshuiMobile from '../assets/photos/qingshui-cliffs-960.webp'
import qixingtan from '../assets/photos/qixingtan-1280.webp'
import qixingtanMobile from '../assets/photos/qixingtan-960.webp'
import tainanStreet from '../assets/photos/tainan-shennong-1280.webp'
import tainanStreetMobile from '../assets/photos/tainan-shennong-960.webp'
import gaomeiWetland from '../assets/photos/gaomei-wetland-1280.webp'
import gaomeiWetlandMobile from '../assets/photos/gaomei-wetland-960.webp'
import yehliuGeopark from '../assets/photos/yehliu-geopark-1280.webp'
import yehliuGeoparkMobile from '../assets/photos/yehliu-geopark-960.webp'
import taipingshan from '../assets/photos/taipingshan-1280.webp'
import taipingshanMobile from '../assets/photos/taipingshan-960.webp'
import sanxiantai from '../assets/photos/region-east-sanxiantai-1080.jpg'
import penghuBasalt from '../assets/photos/region-islands-penghu-basalt-960.jpg'

// Wikimedia Commons 照片部分另製等比例 WebP；地區新增照片使用原檔／Commons 縮圖，瀏覽器以 object-fit 顯示裁切。
// 新增照片前須先核對來源頁、作者、授權與使用範圍。
export const homePhotos: Record<'hero' | 'hualien' | 'tainan', PhotoAsset> = {
  hero: {
    src: qingshuiDesktop,
    mobileSrc: qingshuiMobile,
    alt: '花蓮清水斷崖的山脈沿著海岸延伸，前方是太平洋。',
    width: 1600,
    height: 1062,
    credit: 'Andrewhaimerl',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Qingshui_Cliffs.jpg',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    caption: '清水斷崖 · 花蓮',
  },
  hualien: {
    src: qixingtan,
    mobileSrc: qixingtanMobile,
    alt: '花蓮七星潭的礫石海灘、海浪與遠處散步的旅人。',
    width: 1280,
    height: 991,
    credit: 'Mamtapawar512',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:QIXINGTAN_beach_taiwan.jpg',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    caption: '七星潭 · 花蓮',
  },
  tainan: {
    src: tainanStreet,
    mobileSrc: tainanStreetMobile,
    alt: '臺南神農街的街道、老屋與沿街懸掛的燈籠。',
    width: 1280,
    height: 853,
    credit: 'Andrzej Otrębski',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Tainan_Shennong_St_1.jpg',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    caption: '神農街 · 臺南',
  },
}

// 已核對的景點照片。其他景點維持原創插畫佔位，不引用官方 JSON 的 Images 欄位。
export const attractionMedia: Record<string, PhotoAsset> = {
  'photo-qixingtan': homePhotos.hualien,
  'photo-shennong-street': homePhotos.tainan,
  'photo-qingshui-cliffs': homePhotos.hero,
  'photo-gaomei-wetland': {
    src: gaomeiWetland, mobileSrc: gaomeiWetlandMobile, alt: '高美濕地的潮間帶與草叢。', width: 1280, height: 853,
    credit: 'Chang660614', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Gaomei_Wetland_-2-WDPA_ID555594035.jpg',
    license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/', caption: '高美濕地 · 臺中',
  },
  'photo-yehliu-geopark': {
    src: yehliuGeopark, mobileSrc: yehliuGeoparkMobile, alt: '野柳地質公園的岩岸、海浪與遠處步道。', width: 1280, height: 853,
    credit: 'Balon Greyjoy', sourceUrl: 'https://commons.wikimedia.org/wiki/File:20190415_Yehliu_geopark-1.jpg',
    license: 'CC0 1.0', licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/', caption: '野柳地質公園 · 新北',
  },
  'photo-taipingshan-forest': {
    src: taipingshan, mobileSrc: taipingshanMobile, alt: '太平山森林環繞的蹦蹦車鐵道站。', width: 1280, height: 720,
    credit: 'Bob Tan', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Taiping_Mountain%27s_Forest_Railway_Station.jpg',
    license: 'CC BY 4.0', licenseUrl: 'https://creativecommons.org/licenses/by/4.0/', caption: '太平山 · 宜蘭',
  },
}

// 首頁五大旅遊區域的代表性實景；原創插畫仍作照片載入失敗時的備援。
export const regionPhotos: Record<'north' | 'central' | 'south' | 'east' | 'islands', PhotoAsset> = {
  north: attractionMedia['photo-yehliu-geopark'],
  central: attractionMedia['photo-gaomei-wetland'],
  south: homePhotos.tainan,
  east: {
    src: sanxiantai, alt: '臺東三仙台跨海步橋與東海岸岩石。', width: 1080, height: 695,
    credit: 'WEI, WAN-CHEN', sourceUrl: 'https://commons.wikimedia.org/wiki/File:East_Coast_National_Scenic_Area%2B_%E4%B8%89%E4%BB%99%E5%8F%B0.jpg',
    license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/', caption: '三仙台 · 臺東',
  },
  islands: {
    src: penghuBasalt, alt: '澎湖玄武岩自然保留區的海岸柱狀岩。', width: 960, height: 720,
    credit: 'P1340', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Penghu_Basalt.jpg',
    license: 'CC BY-SA 3.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/', caption: '玄武岩海岸 · 澎湖',
  },
}
