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

// Wikimedia Commons 來源照片另製作等比例縮放的 WebP；瀏覽器用 object-fit 顯示裁切。
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
