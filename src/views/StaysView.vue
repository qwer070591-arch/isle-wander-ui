<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { stayStyles } from '../data/editorial'
import { featuredStays, featuredStaysCheckedAt, featuredStaysSource } from '../data/featured-stays'

const route = useRoute()
const router = useRouter()
const resultsHeading = ref<HTMLElement | null>(null)
const search = ref('')
const failedImages = ref<string[]>([])
const selectedStyle = computed(() => {
  const value = route.query.style
  return typeof value === 'string' && stayStyles.some(item => item.id === value) ? value : 'all'
})
const visibleStays = computed(() => {
  const term = search.value.trim().normalize('NFKC').toLocaleLowerCase('zh-TW')
  return featuredStays.filter(stay => {
    if (selectedStyle.value !== 'all' && stay.style !== selectedStyle.value) return false
    if (!term) return true
    return [stay.name, stay.city, stay.town, stay.address, stay.license]
      .some(value => value.normalize('NFKC').toLocaleLowerCase('zh-TW').includes(term))
  })
})
const styleName = (id: string) => stayStyles.find(item => item.id === id)?.label ?? ''
const mapUrl = (address: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
const stayImageSizes = '(max-width: 767px) calc(100vw - 32px), (max-width: 1100px) calc((100vw - 64px) / 2), 540px'
async function clearFilters() {
  search.value = ''
  await selectStyle('all')
}
async function selectStyle(id: string) {
  if (selectedStyle.value === id) return
  await router.push({ query: { ...route.query, style: id === 'all' ? undefined : id } })
  if (window.matchMedia('(max-width: 767px)').matches) {
    await nextTick()
    resultsHeading.value?.focus({ preventScroll: true })
    resultsHeading.value?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' })
  }
}
</script>

<template>
  <div class="editorial-page stays-page">
    <div class="container editorial-page__topline"><span>ISLE & WANDER / BEAUTIFUL STAYS</span><span>觀光署資料選輯 · 旅宿實景照片</span></div>
    <header class="container editorial-page__intro">
      <p class="eyebrow">A PLACE TO PAUSE</p>
      <h1>停留，也是一種旅行方式。</h1>
      <p>從山林、海岸、老屋到田野，依喜歡的旅行節奏找到停留地點。旅宿資訊與各卡片的房型照片均來自交通部觀光署開放資料。</p>
    </header>

    <section class="container stays-guide" aria-labelledby="stays-guide-title">
      <div class="stays-guide__intro"><p class="eyebrow">FIND YOUR PACE</p><h2 id="stays-guide-title">你想把夜晚留給哪一種風景？</h2><p>點選風格，探索相應的住宿名單。風格分類由本站編輯整理。</p></div>
      <div class="stays-guide__options" role="group" aria-label="篩選住宿風格">
        <button type="button" :aria-pressed="selectedStyle === 'all'" @click="selectStyle('all')"><strong>全部風格</strong><span>看見所有旅宿</span></button>
        <button v-for="style in stayStyles" :key="style.id" type="button" :aria-pressed="selectedStyle === style.id" @click="selectStyle(style.id)"><strong>{{ style.label }}</strong><span>{{ style.description }}</span></button>
      </div>
    </section>

    <section class="container stays-collection" aria-labelledby="stays-collection-title">
      <div class="editorial-page__section-head"><div><p class="eyebrow">THE STAY EDIT</p><h2 id="stays-collection-title" ref="resultsHeading" tabindex="-1">{{ selectedStyle === 'all' ? '精選旅宿' : styleName(selectedStyle) }}</h2></div><p aria-live="polite">{{ visibleStays.length }} 間旅宿</p></div>
      <label class="stays-tools__search" for="stay-search"><span>尋找旅宿或地點</span><input id="stay-search" v-model="search" type="search" placeholder="例如：澎湖、鹿野、民宿名稱" autocomplete="off" /></label>
      <div class="stays-collection__grid">
        <article v-for="(stay, index) in visibleStays" :key="stay.id" class="stay-idea">
          <div class="stay-idea__image"><img v-if="!failedImages.includes(stay.id)" :src="stay.photo.src" :srcset="`${stay.photo.smallSrc} 720w, ${stay.photo.src} 1200w`" :sizes="stayImageSizes" :width="stay.photo.width" :height="stay.photo.height" :alt="`${stay.name}：${stay.photo.label}的資料照片`" :loading="index < 2 ? 'eager' : 'lazy'" decoding="async" @error="failedImages.push(stay.id)" /><span v-else class="stay-idea__image-fallback" role="img" :aria-label="`${stay.name}的房型照片暫時無法載入`">房型照片暫時無法載入</span><a class="stay-idea__image-label" :href="stay.photo.sourceUrl" target="_blank" rel="noopener noreferrer" :aria-label="`查看${stay.name}${stay.photo.label}的原始照片`">實景 · {{ stay.photo.label }} ↗</a></div>
          <div class="stay-idea__body">
            <span class="stay-idea__number">{{ String(index + 1).padStart(2, '0') }} / {{ styleName(stay.style) }} · {{ stay.city }}{{ stay.town }}</span>
            <h3>{{ stay.name }}</h3>
            <p>{{ stay.note }}</p>
            <dl class="stay-idea__facts"><div><dt>登記字號</dt><dd>{{ stay.license }}</dd></div><div><dt>地址</dt><dd>{{ stay.address }}</dd></div></dl>
            <div class="stay-idea__links"><a :href="stay.website" target="_blank" rel="noopener noreferrer">業者連結 <span aria-hidden="true">↗</span></a><a :href="mapUrl(stay.address)" target="_blank" rel="noopener noreferrer">Google 地圖 <span aria-hidden="true">↗</span></a><RouterLink :to="`/destinations/${stay.citySlug}/`">探索目的地 <span aria-hidden="true">↗</span></RouterLink></div>
          </div>
        </article>
      </div>
      <div v-if="visibleStays.length === 0" class="stays-empty"><h3>沒有符合條件的旅宿</h3><p>試試其他地點或風格。</p><button type="button" @click="clearFilters">清除篩選，查看全部旅宿</button></div>
    </section>
    <aside class="container editorial-page__notice"><strong>資料與影像說明</strong><p>旅宿資訊與房型照片摘自交通部觀光署<a :href="featuredStaysSource" target="_blank" rel="noopener noreferrer">旅館民宿開放資料</a>，本站於 {{ featuredStaysCheckedAt }} 取得，依政府資料開放授權條款第 1 版標示來源。照片僅呈現資料集所列的特定房型，實際狀況可能變動；此為編輯選輯，不代表觀光署背書。房價、空房、營業與服務請向業者及<a href="https://www.taiwanstay.net.tw/TSA/web_page/TSA020100.jsp" target="_blank" rel="noopener noreferrer">觀光署旅宿網</a>再次核對。<RouterLink to="/sources/">查看資料來源 ↗</RouterLink></p></aside>
  </div>
</template>
