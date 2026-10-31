// Concept visuals from the user-supplied Stitch export and generated image proposals.
// Neither source is verified location or lodging photography.
import { attractions } from './attractions'
// The 512px Stitch exports remain in the repository as references only.
// Every displayed concept image resolves to a 1400px WebP, including corrected screenshot-like originals.
const generatedFiles = import.meta.glob('../assets/generated/*.webp', { eager: true, query: '?url', import: 'default' }) as Record<string, string>
const smallFiles = import.meta.glob('../assets/generated/small/*.webp', { eager: true, query: '?url', import: 'default' }) as Record<string, string>
const smallBySource = new Map(Object.entries(generatedFiles).map(([path, src]) => [src, smallFiles[path.replace('/generated/', '/generated/small/')]]))
export const smallConceptImage = (src: string) => smallBySource.get(src)
const generated = (name: string) => generatedFiles[`../assets/generated/${name}.webp`] ?? ''
const highResolutionAlternates: Record<string, string> = {
  'destinations-01': 'stitch-clean-explore-01',
  'destinations-02': 'stitch-clean-explore-05',
  'destinations-07': 'stitch-clean-explore-06',
  'destinations-08': 'city-penghu-v2',
  'destinations-09': 'stitch-clean-stays-07',
  'explore-04': 'attraction-alishan-forest',
  'planner-02': 'stitch-hd-explore-03',
  'planner-03': 'stitch-clean-explore-01',
  'planner-04': 'stitch-hd-stays-01',
  'planner-05': 'stitch-clean-explore-05',
  'planner-06': 'stitch-hd-destinations-10',
  'stories-02': 'stitch-hd-destinations-10',
}
const image = (name: string) => {
  const stem = name.replace(/\.jpg$/, '')
  return generated(`stitch-hd-${stem}`) || generated(`stitch-clean-${stem}`) || generated(highResolutionAlternates[stem] ?? '')
}

export interface ConceptImage { src: string; title: string }

export const cityConcepts: Record<string, ConceptImage> = {
  taipei: { src: image('destinations-01.jpg'), title: '臺北街區意象' },
  'new-taipei': { src: generated('city-new-taipei'), title: '新北山城與海岸意象' },
  keelung: { src: generated('city-keelung'), title: '基隆港灣意象' },
  taoyuan: { src: generated('city-taoyuan'), title: '桃園埤塘與老街意象' },
  'hsinchu-city': { src: generated('city-hsinchu-city'), title: '新竹舊城意象' },
  'hsinchu-county': { src: generated('city-hsinchu-county'), title: '新竹客庄意象' },
  tainan: { src: image('destinations-02.jpg'), title: '臺南街巷意象' },
  hualien: { src: image('destinations-03.jpg'), title: '花蓮山海意象' },
  'chiayi-city': { src: image('destinations-04.jpg'), title: '嘉義木造街區意象' },
  yilan: { src: image('destinations-05.jpg'), title: '宜蘭田野意象' },
  miaoli: { src: generated('city-miaoli'), title: '苗栗丘陵與客庄意象' },
  taichung: { src: generated('city-taichung'), title: '臺中街區與山線意象' },
  changhua: { src: generated('city-changhua'), title: '彰化街市與平原意象' },
  nantou: { src: image('destinations-06.jpg'), title: '南投湖山意象' },
  yunlin: { src: generated('city-yunlin'), title: '雲林田野小鎮意象' },
  'chiayi-county': { src: generated('city-chiayi-county'), title: '嘉義山麓茶田意象' },
  kaohsiung: { src: generated('city-kaohsiung'), title: '高雄港灣意象' },
  pingtung: { src: generated('city-pingtung'), title: '屏東海岸聚落意象' },
  taitung: { src: image('destinations-07.jpg'), title: '臺東田野意象' },
  penghu: { src: image('destinations-08.jpg'), title: '澎湖聚落意象' },
  kinmen: { src: generated('city-kinmen'), title: '金門紅磚聚落意象' },
  lienchiang: { src: generated('city-lienchiang'), title: '馬祖石造聚落意象' },
}

export const destinationMoodboard: ConceptImage[] = [
  { src: image('destinations-09.jpg'), title: '地方器物' },
  { src: image('destinations-10.jpg'), title: '老屋光影' },
  { src: image('destinations-11.jpg'), title: '在地餐桌' },
]

const generatedAttractionConcepts = Object.fromEntries(
  attractions.map((item) => [item.slug, { src: generated(`attraction-${item.slug}`), title: `${item.nameZh}意象` }])
    .filter(([, visual]) => (visual as ConceptImage).src),
) as Record<string, ConceptImage>

export const attractionConcepts: Record<string, ConceptImage> = {
  ...generatedAttractionConcepts,
  'dadaocheng-streets': { src: image('explore-01.jpg'), title: '大稻埕街區意象' },
  'national-palace-museum': { src: image('explore-02.jpg'), title: '故宮周邊意象' },
}

export const exploreMoodboard: ConceptImage[] = [
  { src: image('explore-03.jpg'), title: '七星潭海岸意象' },
  { src: image('explore-04.jpg'), title: '森林鐵道意象' },
  { src: image('explore-05.jpg'), title: '臺南街巷意象' },
  { src: image('explore-06.jpg'), title: '東部田野意象' },
  { src: image('explore-07.jpg'), title: '澎湖聚落意象' },
  { src: image('explore-08.jpg'), title: '山徑溪谷意象' },
]

export const stayMoodboard: ConceptImage[] = [
  { src: image('stays-01.jpg'), title: '山林木屋意象' },
  { src: image('stays-02.jpg'), title: '海岸居所意象' },
  { src: image('stays-03.jpg'), title: '老屋庭院意象' },
  { src: image('stays-04.jpg'), title: '森林居所意象' },
  { src: image('stays-05.jpg'), title: '離島石屋意象' },
  { src: image('stays-06.jpg'), title: '田野居所意象' },
  { src: image('stays-07.jpg'), title: '室內細節意象' },
  { src: image('stays-08.jpg'), title: '房間光影意象' },
]

export const plannerMoodboard: ConceptImage[] = [
  { src: image('planner-01.jpg'), title: '東部田野意象' },
  { src: image('planner-02.jpg'), title: '七星潭海岸意象' },
  { src: image('planner-03.jpg'), title: '臺北老街意象' },
  { src: image('planner-04.jpg'), title: '山林居所意象' },
  { src: image('planner-05.jpg'), title: '臺南街巷意象' },
  { src: image('planner-06.jpg'), title: '老屋室內意象' },
]

export const storyMoodboard: ConceptImage[] = [
  { src: image('stories-01.jpg'), title: '阿里山茶席意象' },
  { src: image('stories-02.jpg'), title: '臺南老屋意象' },
  { src: image('stories-03.jpg'), title: '海鹽工坊意象' },
  { src: image('stories-04.jpg'), title: '柴燒陶藝意象' },
  { src: image('stories-05.jpg'), title: '池上田野意象' },
  { src: image('stories-06.jpg'), title: '澎湖石牆意象' },
  { src: image('stories-07.jpg'), title: '大稻埕藥鋪意象' },
]
