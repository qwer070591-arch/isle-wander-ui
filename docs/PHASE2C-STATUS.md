# Phase 2C 景點詳情與 Explore 篩選器

## 內容狀態

- 44 筆景點沿用 Phase 2B 的 `id`、`slug`、城市與分類，均有 `/attractions/:slug/` 詳情頁、來源、座標、相關景點及返回入口。
- 10 筆編輯詳述：臺中國家歌劇院、高美濕地、臺中公園、七星潭、神農街、清水斷崖、阿里山森林遊樂區、野柳地質公園、太平山森林遊樂區、雙心石滬。文案以交通部觀光署既有景點資料核對，沒有即時開放、票價或班次承諾。
- 其餘 34 筆保留經核對摘要與標籤，並明示深入內容持續整理；不以重複文案填滿版面。
- `attraction-visit.json` 由已下載的官方 `AttractionList.json` 以 `officialId` 對應萃取，不修改既有景點主檔；40 筆有街道地址，4 筆（大稻埕街區、國立故宮博物院、華山1914、象山親山步道）來源缺少街道地址，頁面省略。5 筆有 HTTPS 官方網站。座標沿用原景點主檔。產生方式：`node scripts/extract-attraction-visit.cjs`，執行前需有既有官方快照 `output/attraction-source/AttractionList.json`。
- 景點資訊來源：[交通部觀光署資料集](https://data.gov.tw/dataset/7777)。圖片來源與景點資料來源分開記錄。

## 攝影素材與授權

站內目前有 6 筆景點實景影像，其他 38 筆維持明示的概念視覺。只儲存縮圖，利用 CSS `object-fit` 顯示裁切；圖片檔案未再加工。以下新增照片原始頁與授權已核對：

| 景點 | 攝影者 | 授權 | 原始圖片頁 |
| --- | --- | --- | --- |
| 高美濕地 | Chang660614 | CC BY-SA 4.0 | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Gaomei_Wetland_-2-WDPA_ID555594035.jpg) |
| 野柳地質公園 | Balon Greyjoy | CC0 1.0 | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:20190415_Yehliu_geopark-1.jpg) |
| 太平山森林遊樂區 | Bob Tan | CC BY 4.0 | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Taiping_Mountain%27s_Forest_Railway_Station.jpg) |

七星潭、神農街與清水斷崖使用 Phase 1B 已核對的照片，作者、授權及來源見 `src/data/media.ts`。CC BY-SA 照片在頁面提供作者、原頁、授權連結及顯示方式；後續若修改圖檔或重用於其他作品，須再核對相應授權義務。

臺中國家歌劇院、臺中公園、阿里山、雙心石滬尚待適合且可追溯的照片。曾找到臺中國家歌劇院的 CC BY-SA 4.0 原頁，但下載遇到 Wikimedia 限流，未納入。不得把原始資料集的 `Images` 欄位直接當成授權許可。

## 篩選器互動

- Phase 2C-1 更新 `ExploreFilterPicker`：縣市先切換五大旅遊區域，再從該區網格選擇；開啟時預設顯示已選縣市的區域，未選則顯示北部。桌面為精簡 Popover，手機在欄位下方展開並推開結果。提供「全部縣市」清除入口。
- 景點類型改為七類與「全部類型」的單選 Chips。區域、縣市與類型均使用原生 `button` 及 `aria-pressed` 表示狀態；Esc、外部點擊與選取後關閉縣市面板，Esc 與選取後焦點回到觸發按鈕。沒有頁面捲動鎖定。
- URL `q`、`city`、`category` 與 350ms debounce 保留，選取篩選使用 History push，文字搜尋使用 replace。從篩選結果進入詳情時以 `from` Query 保存返回位置，只接受站內 `/explore` 路徑。
- 未新增套件。舊 `/explore/:slug/` 重導至新的詳情網址。

## 待補

- 38 筆景點正式攝影、34 筆深入介紹、4 筆來源缺少的街道地址。開放時間、票務與交通班次未納入靜態資料。
- 此資料快照不會自動更新；正式發布前應再核對來源與授權狀態。

## 驗證

- `npm.cmd run data:validate`：44 景點、22 城市 ID、7 類別、6 媒體 ID 均通過；參訪補充資料的 ID、地址與 HTTPS 官網亦受檢查。
- `npm.cmd run build`：TypeScript 與 Vite 正式建置通過。
- Playwright 在本機 `localhost:5173` 驗證 44 個 slug、無效 slug、320/390/768/1024/1440/1920px 的首頁／目的地／城市／Explore／詳情頁、圖片載入、水平溢出、瀏覽器錯誤、篩選、URL 上下頁、從詳情返回含 `q` 的篩選狀態、手機 Drawer、Esc、Tab、方向鍵、End、Enter、焦點返回與 reduced motion。截圖與 JSON 結果存於 Git 忽略的 `output/playwright/`。
- Phase 2C-1 Playwright 另驗證兩層式區域切換、22 個縣市選取、七類與全部類型、組合搜尋、重設、空結果、觸控、鍵盤、六種視窗寬度及面板與卡片不重疊；結果與五張截圖同樣位於 `output/playwright/`。
