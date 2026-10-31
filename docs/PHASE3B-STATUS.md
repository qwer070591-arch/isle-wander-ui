# Phase 3B 實作狀態與 Planner 使用流程

此文件補充 Phase 0 的 [DATA-MODEL.md](DATA-MODEL.md)，不修改原始草案。Phase 3B 仍為前端 Demo，沒有實際出發日期、交通估算、帳號或雲端同步。

## 路由與流程

1. `/planner/` 輸入非空白名稱、選 1–7 天，建立後進入 `/planner/:id/`。
2. 編輯頁可調整名稱、天數；減少含景點的日期時，先列出將刪除的每日安排並要求確認。刪除整筆行程同樣要求確認。
3. 每日區塊提供快速景點選取器，可搜尋景點名稱／縣市、只看收藏，並指定 Day 01–Day 07。景點項目提供詳情、上移、下移、移除。
4. Explore、景點詳情與收藏卡片的「加入行程」共用同一選取面板。先選行程及日期；同一天不可重複加入，同一景點可加入不同日期。沒有行程時提供建立入口。
5. 收藏與行程互不依賴：移除收藏不會改變已安排的景點；刪除行程不會移除收藏。

## 資料格式

localStorage Key：`isle-and-wander:trips:v1`。值為 `Itinerary[]` 的 JSON；實際型別在 `src/types/trip.ts`。

```json
[{"id":"trip-<uuid>","title":"東海岸慢行","createdAt":"2026-10-30T00:00:00.000Z","updatedAt":"2026-10-30T00:00:00.000Z","days":[{"dayNumber":1,"attractionIds":["attraction-qixingtan"]}]}]
```

`id` 以 UUID 建立；日期序號從 1 起連續。`createdAt`／`updatedAt` 是資料修改時間，不代表旅遊日期。景點僅儲存既有穩定 ID，不複製完整資料或圖片。載入時檢查結構、天數、景點 ID 與每日重複項；無效行程略過，失效景點 ID 略過。`storage` 事件同步其他分頁，不將事件寫回以避免循環。

localStorage 被阻擋或寫入失敗時，使用者在當前 SPA 工作階段仍可操作，頁面與操作回饋會說明重新整理可能遺失。清除瀏覽器資料亦會移除行程。資料無雲端備份及匯出功能。

## Phase 3C 候選

行程匯出／匯入與資料復原提示已在 [Phase 3C–3D 補充文件](PHASE3CD-STATUS.md)記錄；本文件保留 Phase 3B 的原始實作狀態。
