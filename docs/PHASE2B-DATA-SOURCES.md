# Phase 2B 景點資料、匯入與媒體來源

## 官方資料

| 項目 | 紀錄 |
|---|---|
| 資料集 | 交通部觀光署「景點－觀光資訊資料庫」 |
| 資料集頁面 | https://data.gov.tw/dataset/7777 |
| JSON 壓縮檔 | https://media.taiwan.net.tw/XMLReleaseAll_public/v2.0/Zh_tw/Attraction-json.zip |
| 資料集標示授權 | 政府資料開放授權條款－第 1 版（https://data.gov.tw/licenses） |
| 取得日期 | 2026-10-29 |
| 下載檔 `UpdateTime` | 2026-10-29T14:30:04+08:00 |
| 原始／精選筆數 | 6,192／44 |

原始 ZIP 與解壓後的 JSON 暫存於被 Git 忽略的 `output/`，網站執行時不會請求整份資料。正式版只載入 `src/data/attractions.json`。官方資料會更新；本檔記錄的是這次匯入快照，並不宣稱景點目前開放。

## 匯入方式與欄位對照

下載並解壓官方 ZIP 後，在專案根目錄執行：

```powershell
node scripts/import-attractions.mjs output/attraction-source/AttractionList.json
npm.cmd run data:validate
```

`scripts/import-attractions.mjs` 用官方 `AttractionID` 白名單選 44 筆，避免跨機關重複紀錄。個別摘要由編輯根據官方 `Description` 改寫；分類與標籤為本站檢索用途，並非官方分類。少數顯示名稱移除原欄位的底線或縮短機關附註，原始官方 ID 保留以供追溯。

| 本站欄位 | 官方欄位／處理 |
|---|---|
| `officialId` | `AttractionID` 原樣保留 |
| `id`, `slug` | 編輯白名單中的穩定英文 slug；`id` 加 `attraction-` 前綴 |
| `nameZh` | `AttractionName`，少數由白名單設定可讀名稱 |
| `cityId` | `PostalAddress.City` 對照既有 22 縣市 ID；不新增第二套城市識別 |
| `category`, `tags` | 本站七種受控分類及編輯關鍵字 |
| `shortDescription` | 根據 `Description` 重新撰寫的短摘要 |
| `coordinates` | `PositionLat`, `PositionLon`；缺值為 `null`，不補猜測座標 |
| `sourceUpdatedAt` | 該筆 `UpdateTime` 的日期部分；沒有則省略 |
| `sourceUrl` | 官方資料集頁面；詳細頁另顯示官方 ID |
| `lastVerifiedAt` | 2026-10-29，本次核對資料來源日期 |
| `coverMediaId` | 僅在本站另有照片授權紀錄時設定 |

`Images`、票價、開放時間及電話沒有匯入網站。資料集中的影像連結不能直接當作本站照片使用授權。每次重新匯入後應檢查來源更新、名稱與描述變化，並重跑驗證與瀏覽器測試。

## 分布

臺北市、新北市、臺中市、南投縣、臺南市、高雄市、花蓮縣、臺東縣、宜蘭縣、嘉義縣、澎湖縣各 4 筆，共 44 筆。其他 11 縣市目前顯示景點資料整理中的提示。

分類：自然景觀 8、海岸風景 7、山林步道 3、歷史文化 9、城市街區 5、藝文建築 8、休閒體驗 4。分類 ID 見 `src/data/attraction-categories.json`。

## 媒體授權清單

| 媒體 ID | 對應景點 ID | 作者／原始照片 | 授權與修改 |
|---|---|---|---|
| `photo-qixingtan` | `attraction-qixingtan-coast` | Mamtapawar512；https://commons.wikimedia.org/wiki/File:QIXINGTAN_beach_taiwan.jpg | CC BY-SA 4.0；本站使用 Commons 縮圖，未改動檔案內容，畫面依容器比例裁切 |
| `photo-shennong-street` | `attraction-shennong-street` | Andrzej Otrębski；https://commons.wikimedia.org/wiki/File:Tainan_Shennong_St_1.jpg | CC BY-SA 4.0；本站使用 Commons 縮圖，未改動檔案內容，畫面依容器比例裁切 |

媒體欄位與授權連結集中於 `src/data/media.ts`，站內 `/sources/` 同步展示。其餘 42 筆景點維持原創 CSS 概念插畫，卡片有明確標示。未使用資料集的 `Images` 欄位，也未取得新照片。

## 待補

- 42 個景點的可辨識、授權清楚的實景照片；逐張記錄作者、來源、授權、裁切與替代文字。
- 其他 11 縣市的精選景點及可靠的地方資訊。
- 個別景點的官方頁面、現況、交通與開放資訊；核對完成前不顯示時間、票價或可進入承諾。
- 英文景點名稱與更細緻的搜尋同義詞；無來源時留空。
