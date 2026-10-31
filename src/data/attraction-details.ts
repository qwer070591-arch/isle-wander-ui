import rawVisit from './attraction-visit.json'

export interface AttractionDetailNotes {
  paragraphs: string[]
  highlights: string[]
}

// 編輯摘要依交通部觀光署景點資料整理；不含即時開放、票價或交通承諾。
export const attractionDetailNotes: Record<string, AttractionDetailNotes> = {
  'national-taichung-theater': {
    paragraphs: ['臺中國家歌劇院位於西屯區，是建築師伊東豊雄設計的表演藝術場館。曲面牆體讓室內空間呈現連續而流動的樣貌。', '除了劇場演出，場館也設有公共空間與戶外區域。若想參觀特定空間或觀看節目，請先查詢場館公告。'],
    highlights: ['表演藝術', '曲面建築', '公共空間'],
  },
  'gaomei-wetlands': {
    paragraphs: ['高美濕地位於臺中清水、鄰近大甲溪出海口。海岸濕地與潮汐環境構成這裡主要的自然景觀，也讓它成為鳥類與其他生物的棲地。', '濕地具有保育價值。到訪時應留在開放的動線上，並以現場公告確認可進入範圍。'],
    highlights: ['海岸濕地', '潮汐地景', '生態保育'],
  },
  'taichung-park': {
    paragraphs: ['臺中公園是市中心的歷史公園，湖面、湖心亭與步道是園內具辨識度的景觀。', '它適合安排在城市散步途中，從水岸與樹蔭之間認識臺中的公共空間。'],
    highlights: ['歷史公園', '湖心亭', '城市散步'],
  },
  'qixingtan-coast': {
    paragraphs: ['七星潭位於花蓮新城，是面向太平洋的礫石海岸。弧形海灣與遠處山勢形成開闊的山海景觀。', '海況會變化；觀景與散步請以岸上安全區域為主，並遵守現場警示。'],
    highlights: ['礫石海岸', '太平洋', '山海景觀'],
  },
  'shennong-street': {
    paragraphs: ['神農街位於臺南中西區，是舊城街巷的一部分。街道與老屋保留了昔日港道周邊的城市記憶。', '如今仍有店家與居民生活於此，適合以步行方式觀察街屋細節並尊重社區日常。'],
    highlights: ['歷史街巷', '街屋', '地方生活'],
  },
  'qingshui-cliffs': {
    paragraphs: ['清水斷崖位於花蓮秀林、蘇花公路一帶，陡峭山壁與太平洋相接，是東部海岸鮮明的地形景觀。', '觀景位置與道路狀況可能變動；出發前應確認官方交通與景區公告。'],
    highlights: ['海岸斷崖', '太平洋', '山海交界'],
  },
  'alishan-forest': {
    paragraphs: ['阿里山國家森林遊樂區位於嘉義縣阿里山鄉，森林景觀、巨木與林業歷史是認識這片山地的重要線索。', '園區範圍與步道資訊請以管理單位公告為準，讓山林行程保留彈性。'],
    highlights: ['山林景觀', '巨木', '林業歷史'],
  },
  'yehliu-geopark': {
    paragraphs: ['野柳地質公園位於新北萬里，海浪與風化作用形塑了具有辨識度的海岸岩石地景。', '地質景觀需要共同維護；參觀時應依園區動線行走，避免碰觸或攀爬岩石。'],
    highlights: ['海岸地質', '風化地形', '自然保育'],
  },
  'taipingshan-forest': {
    paragraphs: ['太平山國家森林遊樂區位於宜蘭大同鄉。山林景觀與過去的林業活動，在此留下鐵道與其他歷史痕跡。', '園區海拔與範圍跨度大，實際開放的步道與設施請以管理單位最新資訊為準。'],
    highlights: ['高山森林', '林業歷史', '山地步道'],
  },
  'double-heart-stone-weir': {
    paragraphs: ['雙心石滬位於澎湖七美，是以石塊構築、隨潮汐運作的傳統漁撈設施。兩個相連的心形輪廓，也讓它成為七美具代表性的文化地景。', '石滬是地方生活與海岸環境共同留下的痕跡。觀賞時請尊重現場動線與文化資產維護規範。'],
    highlights: ['傳統石滬', '潮汐文化', '島嶼地景'],
  },
}

export const attractionVisit = rawVisit as Record<string, { address?: string; officialWebsite?: string }>
