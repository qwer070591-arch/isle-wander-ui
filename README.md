# ISLE & WANDER／島嶼漫遊

Vue 3 + Vite + TypeScript 前端作品集 Demo。包含首頁、22 縣市目的地、44 筆景點探索與詳情、精選旅宿、旅行故事、本機景點收藏及多日行程規劃；部分景點深入內容持續整理。

## 執行

```powershell
npm.cmd install
npm.cmd run dev
npm.cmd run build
npm.cmd run data:validate
```

在 Windows PowerShell 若 `npm.ps1` 被執行原則阻擋，使用 `npm.cmd`，不需修改系統設定。

## 設計與資料

- Phase 0 八份規格位於 `docs/`，未經覆蓋。
- 首頁地名與編輯摘要在 `src/data/home.ts`；22 縣市歸入五個編輯區域。
- 景點探索使用 `src/data/attractions.json` 的 44 筆靜態資料，從[交通部觀光署景點－觀光資訊資料庫](https://data.gov.tw/dataset/7777)依官方 ID 精選匯入。取得日期、授權、欄位對照、匯入指令及待補媒體見 `docs/PHASE2B-DATA-SOURCES.md`。匯入腳本需要自行下載官方 JSON，網站執行時不下載整份資料。
- 景點收藏以 Pinia 管理，僅將有效景點 ID 陣列存於目前瀏覽器的 `isle-and-wander:favorites`。若瀏覽器不允許本機儲存，收藏僅在本次瀏覽期間有效。
- 行程在 `/planner/` 建立與編輯，支援 1–7 天、景點加入、每日排序及移除。Pinia 只將行程標題、日期序號與景點 ID 等必要資料存於 `isle-and-wander:trips:v1`；不包含實際出發日期、交通時間或雲端同步。儲存不可用時，僅在本次瀏覽期間保留。操作流程及資料格式見 `docs/PHASE3B-STATUS.md`。
- 行程進階操作支援跨日移動、複製整段行程、合併單日安排，以及 JSON 備份匯出／匯入。匯入會先預覽有效與無效資料；取代全部需再次確認。格式、限制與復原方式見 `docs/PHASE3CD-STATUS.md`。
- 精選旅宿卡片使用交通部觀光署旅館民宿開放資料所列的業者房型照片；首頁的旅宿風格示意及旅行故事配圖是概念影像，不能視為實景。各照片來源與授權標示見站內「素材與資料來源」。
- DM Serif Display 自託管 Latin 子集。中文優先使用裝置已安裝的 Noto Serif TC／Noto Sans TC；若裝置缺字型則回退至系統中文字型，以免引入約百 MB 的完整 CJK 套件。正式上線前需評估合規的精簡子集與實際字形一致性。
- 本階段沒有後端、資料庫、登入、訂房或付款功能。
