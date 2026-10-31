# Data Model — 靜態 JSON + TypeScript

Phase 0 定義資料契約；此階段**沒有建立 JSON 內容、資料庫或 API**。資料檔預定 `src/data/cities.json`、`attractions.json`、`stays.json`、`stories.json`；型別預定 `src/types/content.ts`。JSON 以 UTF-8 儲存，資料載入時驗證必要欄位與跨檔 ID 參照，避免 TypeScript 型別對外部 JSON 產生虛假的安全感。

## 關聯與識別

- `id`：永久、不可從顯示名稱推導，如 `city-hualien`、`attraction-qixingtan`；名稱修改不更換 ID。`slug`：URL 友善、同類型內唯一，變更需設 redirect。
- `regionId`：`north | central | south | east | islands`；City 一對多 Attraction／Stay；Story 用 `relatedCityIds`、`relatedAttractionIds` 多對多。
- 分類與 mood tag 使用受控詞彙；前端 UI 以映射表顯示中文，不把 tag 當直接顯示文案。
- 經緯度用 WGS84 十進位，緯度 `-90..90`、經度 `-180..180`；不確定精確座標時允許 `null`，不要捏造。
- 日期用 ISO 8601：內容 `updatedAt` 為日期字串 `YYYY-MM-DD`；行程日期也是當地日曆日，不用 UTC timestamp 表示旅遊日。

## TypeScript Interface 草案

```ts
export type RegionId = 'north' | 'central' | 'south' | 'east' | 'islands';
export type EntityType = 'city' | 'attraction' | 'stay' | 'story';
export type MoodTag = 'mountain' | 'coast' | 'heritage' | 'lake' | 'local-life';
export type AttractionCategory = 'nature' | 'culture' | 'food' | 'walk' | 'viewpoint';

export interface MediaAsset {
  src: string;                 // 本站資產路徑或核准的遠端 URL
  alt: string;                 // 裝飾圖片使用空字串
  width: number;
  height: number;
  credit: string;
  sourceUrl: string;
  license: string;             // 具體授權名稱或書面許可代號
  licenseUrl?: string;
  capturedAt?: string;        // YYYY-MM-DD，若有
  desktopSrc?: string;        // 獨立桌面裁切
  mobileSrc?: string;         // 獨立手機裁切
  focalPoint?: { x: number; y: number }; // 0..1，用於 object-position
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface City {
  id: string;
  slug: string;
  nameZh: string;
  nameEn?: string;
  regionId: RegionId;
  intro: string;
  cover: MediaAsset;
  coordinates: Coordinates | null;
  moodTags: MoodTag[];
  updatedAt: string;
}

export interface Attraction {
  id: string;
  slug: string;
  cityId: string;
  nameZh: string;
  nameEn?: string;
  summary: string;
  description: string;
  category: AttractionCategory;
  moodTags: MoodTag[];
  coordinates: Coordinates | null;
  images: MediaAsset[];
  officialUrl?: string;
  sourceUrls: string[];
  updatedAt: string;
}

export interface Stay {
  id: string;
  slug: string;
  cityId: string;
  nameZh: string;
  summary: string;
  description: string;
  featureTags: string[];
  coordinates: Coordinates | null;
  images: MediaAsset[];
  officialUrl?: string;
  sourceUrls: string[];
  updatedAt: string;
  verifiedAt?: string;         // 最近一次核對營運與官網日期
}

export interface TravelStory {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: Array<
    | { type: 'paragraph'; text: string }
    | { type: 'heading'; text: string }
    | { type: 'image'; media: MediaAsset }
  >;
  cover: MediaAsset;
  author: string;
  relatedCityIds: string[];
  relatedAttractionIds: string[];
  moodTags: MoodTag[];
  publishedAt: string;
  updatedAt: string;
}

export interface ItineraryItem {
  id: string;                 // 行程內唯一 ID，不等於景點 ID
  entityType: 'attraction' | 'stay';
  entityId: string;
  note?: string;
  order: number;
}

export interface ItineraryDay {
  id: string;
  date: string;               // YYYY-MM-DD；未排日期時可在 UI 用未安排區表示
  items: ItineraryItem[];
}

export interface Itinerary {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  days: ItineraryDay[];
  createdAt: string;          // ISO timestamp
  updatedAt: string;          // ISO timestamp
  schemaVersion: 1;
}

export interface FavoriteRef {
  entityType: EntityType;
  entityId: string;
  addedAt: string;            // ISO timestamp
}
```

## JSON 形狀與儲存

每個內容 JSON 是對應物件的陣列，不將收藏布林值寫進內容 JSON。收藏狀態由 `FavoriteRef[]` 派生，避免靜態檔與本機狀態互相覆蓋。Pinia 管 UI 狀態；localStorage keys 建議 `isle-wander:favorites:v1`、`isle-wander:itineraries:v1`，值包裝成 `{ schemaVersion: 1, items: [...] }`。初始化時 `try/catch` 處理 JSON 損壞、容量不足與禁止存取，提供錯誤狀態；不要默默清空原資料。未來 schema 升級須先寫遷移函式。localStorage 無跨裝置同步、無備份與容量保證；不要存姓名、電話、付款資料。

## 資料驗證規則

1. ID 與 slug 在各集合內唯一；外鍵 ID 必須存在；路由遇到缺資料顯示 404 或關聯缺失提示。
2. 圖片必須有 `src`、尺寸、credit、sourceUrl、license；`images` 可空，但 UI 有缺圖版面。`cover` 欄位在 City／Story 為必填，資料上線前須有授權素材。
3. `sourceUrls` 留原始資訊來源；外部 URL 使用 `https:`，不得把任意輸入直接注入 HTML。文章本文只存結構化純文字，不存未經處理的 HTML。
4. `updatedAt` 只代表內容更新，不等於景點營業資訊的官方更新時間。會變動的價格、營業時間、交通資訊若要加入，另設來源、核對日期與過期策略。
5. 範例資料若使用真實地點／住宿，先核對名稱、位置與圖片權利；設計佔位資料應明示「示意」。
