<script setup lang="ts">
import { attractionMedia, homePhotos } from '../data/media'
import { featuredStays } from '../data/featured-stays'

const homeCredits = [homePhotos.hero, homePhotos.hualien, homePhotos.tainan]
const attractionCredits = [attractionMedia['photo-gaomei-wetland'], attractionMedia['photo-yehliu-geopark'], attractionMedia['photo-taipingshan-forest']]
</script>

<template>
  <div class="container interior-page sources-page">
    <p class="eyebrow"><span class="eyebrow__line"></span> SOURCES & CREDITS</p>
    <h1>素材與資料來源</h1>
    <p class="interior-page__lead">本站使用已核對授權的實景照片、參照使用者 Stitch 概念圖製作的高解析度影像提案，以及原創 CSS 插畫。影像提案不是實際地點、旅宿或採訪攝影。</p>
    <div class="sources-page__content">
      <h2>首頁照片</h2>
      <p>照片檔案使用 Wikimedia Commons 提供的縮圖；本站僅在畫面中依容器比例顯示裁切，未改動下載檔內容。照片的授權適用於照片本身。</p>
      <ul class="photo-credits">
        <li v-for="photo in homeCredits" :key="photo.sourceUrl">
          <strong>{{ photo.caption }}</strong> — 攝影：{{ photo.credit }}；
          <a :href="photo.sourceUrl" target="_blank" rel="noopener noreferrer">原始檔案與授權紀錄</a> ·
          <a :href="photo.licenseUrl" target="_blank" rel="noopener noreferrer">{{ photo.license }}</a>
        </li>
      </ul>
      <h2>景點詳情新增照片</h2>
      <ul class="photo-credits">
        <li v-for="photo in attractionCredits" :key="photo.sourceUrl">
          <strong>{{ photo.caption }}</strong> — 攝影：{{ photo.credit }}；
          <a :href="photo.sourceUrl" target="_blank" rel="noopener noreferrer">原始檔案與授權紀錄</a> ·
          <a :href="photo.licenseUrl" target="_blank" rel="noopener noreferrer">{{ photo.license }}</a>
        </li>
      </ul>
      <h2>景點資料</h2>
      <p>景點探索首批收錄 44 筆，精選自交通部觀光署的<a href="https://data.gov.tw/dataset/7777" target="_blank" rel="noopener noreferrer">景點－觀光資訊資料庫</a>。原始資料取得日期為 2026-10-29；資料集標示<a href="https://data.gov.tw/licenses" target="_blank" rel="noopener noreferrer">政府資料開放授權條款－第 1 版</a>。本站以官方景點 ID 對照原始紀錄，重新分類及撰寫短摘要；景點狀態與旅遊資訊可能變動，出發前請再核對官方來源。</p>
      <p>官方資料中的 Images 欄位未作為本站圖片來源。景點實景照片使用上列六張已核對授權的影像；其餘卡片使用本站生成的影像提案。清水斷崖、七星潭、神農街使用首頁既有影像。</p>
      <h2>精選旅宿資料</h2>
      <p>精選旅宿的名稱、地址、登記字號及業者連結，摘自交通部觀光署的<a href="https://data.gov.tw/dataset/7780" target="_blank" rel="noopener noreferrer">旅館民宿－觀光資訊資料庫</a>。本站於 2026-10-31 取得資料，所下載檔案的更新時間為 2026-10-30；資料集標示<a href="https://data.gov.tw/licenses" target="_blank" rel="noopener noreferrer">政府資料開放授權條款－第 1 版</a>。本站依官方旅宿 ID 選出八筆，風格分類及短文由本站編輯；此選輯不代表觀光署推薦或背書。原始資料可能比即時營業資訊慢，預訂前請在<a href="https://www.taiwanstay.net.tw/TSA/web_page/TSA020100.jsp" target="_blank" rel="noopener noreferrer">觀光署旅宿網</a>按名稱或登記字號再次核對。本站沒有提供價格或空房資訊。</p>
      <p>交通部觀光署（2026）《旅館民宿－觀光資訊資料庫》（2026-10-30 資料快照）。此開放資料依<a href="https://data.gov.tw/license" target="_blank" rel="noopener noreferrer">政府資料開放授權條款第 1 版</a>進行公眾釋出，使用者於遵守條款各項規定之前提下，得利用之。精選旅宿的八張照片均取自各旅宿紀錄的 Images 欄位，檔案未經修改，只依卡片比例顯示裁切。照片呈現資料集所列房型，不保證現在仍提供相同房型或陳設。個別攝影者未列於原始紀錄；若權利人對單張照片有疑義，請聯絡本站核對。</p>
      <ul class="photo-credits">
        <li v-for="stay in featuredStays" :key="stay.id"><strong>{{ stay.name }}・{{ stay.photo.label }}</strong> — 資料提供：交通部觀光署；<a :href="stay.photo.sourceUrl" target="_blank" rel="noopener noreferrer">原始照片</a> · <a href="https://data.gov.tw/license" target="_blank" rel="noopener noreferrer">政府資料開放授權條款第 1 版</a></li>
      </ul>
      <h2>其他圖像與內容</h2>
      <p>Stitch 原圖為 512px 概念參考，其中部分夾帶網頁標頭或按鈕；本站以高解析度重製圖或其他內容相符的概念圖替代。原圖保留供內部核對，不載入網站。城市、景點、首頁旅宿風格示意、旅行手札及行程靈感所用的生成圖，可能與實際地點或建築不同，不能作為行程判斷依據。22 縣市的區域歸類是本站編輯分組；本站沒有價格、空房或評分。正式對外發布前，仍需確認使用者提供素材的使用權。</p>
      <h2>字型</h2>
      <p>DM Serif Display 已自託管；中文優先使用裝置上的 Noto Serif TC／Noto Sans TC，若未安裝則使用系統中文字型。三者的授權檔：<a href="https://github.com/google/fonts/blob/main/ofl/dmserifdisplay/OFL.txt" target="_blank" rel="noopener noreferrer">DM Serif Display</a>、<a href="https://github.com/google/fonts/blob/main/ofl/notoseriftc/OFL.txt" target="_blank" rel="noopener noreferrer">Noto Serif TC</a>、<a href="https://github.com/google/fonts/blob/main/ofl/notosanstc/OFL.txt" target="_blank" rel="noopener noreferrer">Noto Sans TC</a>。</p>
    </div>
    <RouterLink class="text-link" to="/">返回首頁 <span aria-hidden="true">↗</span></RouterLink>
  </div>
</template>
