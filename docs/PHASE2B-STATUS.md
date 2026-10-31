# Phase 2B 完成狀態

## 已完成

- `GET /explore/`：44 筆靜態景點、文字搜尋、22 縣市及七類型篩選、結果數、空結果與重設。
- `q`、`city`、`category` URL Query 同步；搜尋輸入 350ms debounce 並以 `replace` 更新，篩選以 `push` 更新。舊 `/attractions/` 入口重導至 `/explore/`。
- 44 筆官方 ID 白名單匯入與資料驗證；景點卡導向明示詳情待整理的 `/explore/:slug/`。
- 已有資料的城市頁顯示最多三張景點卡，並提供該縣市的完整篩選入口；無資料城市顯示提示。
- Header、Footer、首頁心情卡改接有效的景點搜尋入口；首頁版面與目的地頁版面未重做。
- 既有照片授權與新資料來源列於站內 `/sources/` 及 `PHASE2B-DATA-SOURCES.md`。

## 尚未完成

- Phase 2C 景點詳情：完整內文、開放資訊、交通、相關內容及更多授權照片。
- 完整收藏與行程規劃；本階段沒有後端、資料庫或交易功能。
- 此靜態快照不會自動追蹤官方資料每天的變更，內容更新須重新匯入並審核。

## 驗證

- `npm.cmd run data:validate` 與 `npm.cmd run build`。
- Playwright：320、390、768、1024、1440、1920px；搜尋、篩選、URL 歷史、空狀態、城市整合及原頁面回歸。詳細結果與截圖位於被 Git 忽略的 `output/playwright/`。
