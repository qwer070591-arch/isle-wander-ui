# Phase 1B 媒體盤點與待補清單

> 2026-11-08 更新：首頁 Discover by Region 的五張卡片已補上北部野柳、中部高美濕地、南部神農街、東部三仙台與離島澎湖玄武岩的授權實景照片。前 3 張沿用本站既有媒體；後 2 張的作者、來源及授權見網站「素材與資料來源」頁。原創插畫保留為圖片載入失敗時的備援。下方表格記錄 Phase 1B 當時的盤點狀態。

> 同日續查：南投目的地補上忘憂森林照片；首頁住宿區改呈現觀光署資料集中的漾之谷溫泉民宿及寶華大飯店與對應房型照片；Travel by Mood 補上太平山、七星潭、鹿港老街與日月潭照片。首頁所有常態媒體槽位現均有圖片，原創插畫仍保留為載入失敗的備援。住宿照片只呈現資料快照所列房型，營業與房型仍需向業者核實。

依 [MEDIA-PLAN.md](MEDIA-PLAN.md) 盤點首頁 15 個影像槽位。此文件記錄 Phase 1B 的實際狀態；不覆蓋 Phase 0 規格。攝影只使用已核對的 Wikimedia Commons 來源，檔案保存在 `src/assets/photos/`，不依賴隨機外部圖片 URL。

## 修改前 → 修改後

| 類別 | 修改前 | Phase 1B | 後續待補 |
|---|---|---|---|
| Hero（1） | 山形 CSS 概念視覺 | 清水斷崖真實攝影；桌面與手機各用適當寬度的同源縮圖，保留完整海岸構圖 | 正式 Hero 選圖與品牌審稿；目前來源可繼續用 |
| Regions（5） | 同系列山形／海岸／街區插畫 | 保留五張原創插畫；手機改主卡＋雙欄，南區改成街道視覺 | 五區各一張更具地方代表性的授權照片 |
| Destinations（3） | 三張同系列概念視覺 | 花蓮七星潭、臺南神農街改真實攝影；南投暫留森林概念視覺 | 南投授權照片及內容選圖核對 |
| Stays（2） | 山景與海景插畫，容易誤認為目的地 | 改為建築外觀／室內空間的原創概念圖；維持「風格提案」標示 | 必須取得真實業者資料、建築／室內照片及使用授權，才可稱精選旅宿 |
| Travel by Mood（4） | 山、海、街、湖概念視覺 | 保留四張作主題導覽，不重複景點照片；街區構圖有別於山景 | 逐主題挑選有差異且授權清楚的旅遊照片 |

**保留的原創插畫：**五張 Region、南投目的地、四張 Mood，以及住宿的兩張概念空間圖。**已替換的照片：**Hero 一張、目的地兩張。**仍屬 Placeholder：**南投目的地與兩張住宿；Regions／Mood 目前也仍是概念視覺，沒有冒充實景。

## 已使用攝影與授權

| 槽位／本機檔案 | 作品、攝影者與來源 | 授權 | 使用方式 |
|---|---|---|---|
| Hero：`qingshui-cliffs-1600.jpg`、`qingshui-cliffs-800.jpg` | [Qingshui Cliffs — Andrewhaimerl](https://commons.wikimedia.org/wiki/File:Qingshui_Cliffs.jpg) | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) | Commons 縮圖；畫面依容器顯示裁切，手機優先載入 960px 版本 |
| 花蓮：`qixingtan-1280.jpg` | [QIXINGTAN beach taiwan — Mamtapawar512](https://commons.wikimedia.org/wiki/File:QIXINGTAN_beach_taiwan.jpg) | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) | Commons 1280px 縮圖；延遲載入、容器裁切 |
| 臺南：`tainan-shennong-1280.jpg` | [Tainan Shennong St 1 — Andrzej Otrębski](https://commons.wikimedia.org/wiki/File:Tainan_Shennong_St_1.jpg) | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) | Commons 1280px 縮圖；延遲載入、容器裁切 |

授權標示亦顯示於網站「素材與資料來源」頁。上述是對來源頁目前授權資訊的核對；若後續更換、裁製或重新散布圖檔，仍需依各照片授權條件保留作者、來源、授權與修改說明。未購買或訂閱任何圖片服務。

## 下一次素材採購／選圖

1. 南投目的地：以實際介紹的地點為準挑圖；不要再使用不符合畫面品質的照片。
2. 住宿：先取得業者授權與真實資料，逐一核對外觀、房型、地點、可用期限及署名方式。
3. 地區與 Mood：優先補與現有三張攝影**不同**的城市生活、離島、步道與湖畔場景；同一照片不要重複出現在不同內容卡。
4. 每張新增照片仍需填入 `src/data/media.ts` 等值的來源欄位：作者、來源頁、授權、alt、尺寸、手機裁切與是否修改。
