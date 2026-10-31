# Design System — Phase 0

此文件是 Phase 1 的實作規格。值為**設計決策提案**，不是已完成的視覺驗收結果。以原生 CSS custom properties 實作，依「原始值 → 語意 → 元件」三層使用；元件不直接引用原始色值。

## Color tokens

| 原始 token | 值 | 語意用途 |
|---|---|---|
| `--color-canvas` | `#F5F1E9` | 全站背景 |
| `--color-sand` | `#D7C9B6` | 分隔、柔和區塊 |
| `--color-forest` | `#566B5E` | 品牌裝飾、輔助色；小字需驗證對比 |
| `--color-clay` | `#AE785F` | 小面積強調；不直接用作淺底小字 |
| `--color-ink` | `#282E2A` | 主要文字、深色 CTA |
| `--color-paper` | `#FFFFFF` | 卡片與輸入背景 |
| `--color-muted` | `#5C625C` | 次要文字，須對比驗證 |
| `--color-border` | `#B7B3A9` | 表單邊框 |
| `--color-error` | `#9B3D35` | 錯誤訊息 |

語意映射：`--surface-page: var(--color-canvas)`、`--surface-card: var(--color-paper)`、`--text-primary: var(--color-ink)`、`--text-secondary: var(--color-muted)`、`--action-primary-bg: var(--color-ink)`、`--action-primary-fg: var(--color-canvas)`、`--accent: var(--color-forest)`、`--border-default: var(--color-border)`。元件層如 `--header-bg: var(--surface-page)`、`--card-title-color: var(--text-primary)`。攝影上的白字必須在實際素材與遮罩上量測對比，不能只依設計稿推定。

## Typography

字族：英文展示 `"DM Serif Display", Georgia, serif`；中文展示 `"Noto Serif TC", serif`；內文 `"Noto Sans TC", "Microsoft JhengHei", sans-serif`。英文展示字型不支援中文字形，混排要分別套用，避免系統 fallback 意外改變行高。字重：展示 400；中文展示 500／600；內文 400／500／700。

| 角色 | 桌面 size / line-height | 手機 size / line-height | 備註 |
|---|---|---|---|
| Hero 中文 | 64 / 1.18 | 38 / 1.28 | 最多 2 行；英文 eyebrow 12px |
| H1 內頁 | 56 / 1.2 | 36 / 1.3 | 每頁單一 H1 |
| H2 區塊 | 40 / 1.3 | 28 / 1.35 | 中文 Noto Serif TC |
| H3 卡片 | 24 / 1.4 | 21 / 1.4 | 最多 2 行 |
| Lead | 20 / 1.7 | 17 / 1.7 | 不超過約 32 個中文字／行 |
| Body | 16 / 1.75 | 16 / 1.7 | 不小於 16px 的主要內容 |
| Small / meta | 13 / 1.5 | 13 / 1.5 | 標籤不可承擔唯一訊息 |

英文字標與 eyebrow 可以加 `letter-spacing: .08em`；中文標題以 `.02em` 為上限。正文保持正常字距。容器正文閱讀寬度 `max-width: 68ch`。

## Spacing、形狀與陰影

4px 基準：`--space-1:4`、`2:8`、`3:12`、`4:16`、`5:20`、`6:24`、`8:32`、`10:40`、`12:48`、`16:64`、`20:80`、`24:96`、`32:128`（px）。桌面區塊上下 96–128px，手機 64–80px；同一區塊標題與內容 32–48px。卡片內容內距桌面 24px、手機 16px。圓角：圖片 0–4px、按鈕 4px、輸入 4px、pill 999px。陰影僅浮層：`0 12px 32px rgb(40 46 42 / .12)`；卡片主要靠留白與邊線區分。

## Grid 與 RWD

| 範圍 | 容器與欄位 | gutter | 頁面外距 |
|---|---|---|---|
| ≥1280px | `max-width: 1320px`，12 欄 | 24px | 60px（1440 畫布） |
| 768–1279px | 8 欄 | 20px | 32px |
| ≤767px | 4 欄 | 12px | 20px（390 畫布） |

斷點建議：`768px`、`1024px`、`1280px`；必要時依**內容實際折行**微調，不針對特定裝置型號。390px 有效內容寬 350px。所有媒體 `max-width:100%`；Grid 子項 `min-width:0`；避免固定 390px 子元素造成水平溢出。安全區用 `env(safe-area-inset-*)`。

## 控制項與狀態

主要按鈕最小高度 48px，次要控制與圖示按鈕至少 44×44px；相鄰觸控目標保留間距。狀態包含 default、hover、focus-visible、pressed、disabled、loading。Hover 只用在支援 hover 的裝置；按下可微調色與位移不超過 2px。鍵盤 focus 使用至少 2px 可見外框、2px offset，與底色有清楚對比。Disabled 保留可辨文字；載入按鈕不改變寬度、用文字 `處理中…`。表單錯誤以文字說明、`aria-describedby` 連結，不能只用紅色。

轉場以 160–240ms 的 opacity、transform 為主；圖片縮放最多 1.03，避免頁面大幅滑動。`prefers-reduced-motion: reduce` 時移除非必要轉場與視差；功能不能依賴動畫完成。GSAP 只有在原生 CSS 無法清楚實現且有明確體驗收益時評估。

## Accessibility 與內容品質

目標為 WCAG 2.2 AA：一般文字對比至少 4.5:1、大字至少 3:1；鍵盤順序與視覺順序一致；提供跳至主內容、可見焦點、語意標題、表單標籤與錯誤回饋。照片依內容提供具體 alt；裝飾圖 `alt=""`。不要用圖片內嵌關鍵文案。搜尋、收藏與 Drawer 均需鍵盤操作；Drawer 開啟後焦點進入、Escape 關閉、關閉後返回觸發按鈕。路由變換後更新頁面標題並將焦點移到主標題或主內容。圖片延遲載入但首屏主圖優先載入；明確預留 aspect-ratio 以減少位移。

## 元件規格索引

共同慣例：Props 使用語意資料或 stable ID，不把任意 HTML 塞進卡片；內容不足時呈現明確 fallback。互動元件發出事件，由頁面／Pinia 決定資料更新。下表涵蓋 props、狀態、手機行為、互動及無障礙；資料欄位細節見 [DATA-MODEL.md](DATA-MODEL.md)。

| 元件 | Props 與內容規則 | 狀態／互動 | 手機與無障礙 |
|---|---|---|---|
| `SiteHeader` | `activeRoute`, `favoriteCount`；品牌字標、主要導航、搜尋入口 | 頂部／捲動後、搜尋開啟；導航至 7 個主區 | 手機只留字標、搜尋、選單；`header/nav`、跳至內容 |
| `MobileNavigation` | `open`, `items`；每項需文字標籤 | 開／關；點選路由後關閉 | 全寬 Drawer、44px 目標；焦點圈限、Escape、返回焦點、背景捲動鎖定 |
| `EditorialHero` | `title`, `eyebrow`, `summary`, `media`, `cta`；單一 H1 | 載入／圖片失敗；CTA 導向內容 | 獨立手機裁切；文字不遮住主體；圖片 alt 或裝飾空 alt |
| `RegionCard` | `region`, `image`, `count?`；名稱不可只在圖中 | default／hover／focus；進入區域篩選 | 一欄或二欄；整張卡片單一連結，標籤可讀 |
| `DestinationCard` | `city`, `image`, `description`；最多 2 行摘要 | 圖片失敗、收藏切換；進入城市頁 | 手機短卡；收藏按鈕與卡片連結分離 |
| `AttractionCard` | `attraction`, `image`；類型、城市、摘要 | 收藏與加入行程、離線資料缺圖 | 手機單欄；按鈕有具體 aria-label |
| `StayCard` | `stay`, `image`；住宿特色、地點、外站標記 | 收藏；外站開啟官網（若有） | 不顯示未驗證價格／空房；外站文字可見 |
| `StoryCard` | `story`, `image`；標題、摘要、更新日期 | 進入文章；缺圖用純色版面 | 手機可橫圖短卡；連結文字不只「閱讀」 |
| `FilterPanel` | `availableFilters`, `selected`, `resultCount` | 展開、套用、清除、無結果 | 手機底部／全屏面板；焦點管理，篩選標籤與結果數播報 |
| `SearchInput` | `modelValue`, `placeholder`, `suggestions` | 空、輸入中、無結果、錯誤；Enter 搜尋 | 48px 高、清除鍵 44px；label、建議列表鍵盤可操作 |
| `FavoriteButton` | `entityType`, `entityId`, `active` | 加入／移除、儲存失敗；更新 localStorage | 44×44px；`aria-pressed` 與「收藏○○」名稱，狀態文字回饋 |
| `ItineraryDay` | `day`, `items`, `editable` | 空日、編輯、移除、順序調整 | 直向時間線；使用上／下移動按鈕供鍵盤排序 |
| `EmptyState` | `title`, `body`, `action?` | 缺資料、無收藏、無搜尋結果等變體 | 文案說明下一步；可選明確 CTA |
| `ErrorState` | `title`, `body`, `retry?` | 資料讀取、儲存錯誤 | 使用 `role="alert"` 於即時錯誤；重試鍵可聚焦 |
| `SiteFooter` | `links`, `credits`, `lastUpdated?` | 靜態；導覽與來源連結 | 手機堆疊；`footer/nav`、外站語意、授權資訊 |

## 驗收檢查

Phase 1 視覺驗收需量測 1440／390px，另檢查 320px 與 768px 的折行及水平捲動；核查鍵盤、200% 縮放、reduced motion、圖片失敗與空清單。色彩與影像上的對比以實際渲染確認。
