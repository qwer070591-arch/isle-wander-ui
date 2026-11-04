<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AttractionCard from '../components/attractions/AttractionCard.vue'
import ExploreFilterPicker from '../components/attractions/ExploreFilterPicker.vue'
import ConceptGallery from '../components/common/ConceptGallery.vue'
import { exploreMoodboard } from '../data/stitch-visuals'
import { attractions, attractionCategories, cityById } from '../data/attractions'
import { cities } from '../data/cities'
import type { AttractionCategoryId } from '../types/content'

const route = useRoute()
const router = useRouter()
const cityBySlug = new Map(cities.map((city) => [city.slug, city]))
const queryText = computed(() => typeof route.query.q === 'string' ? route.query.q.trim() : '')
const city = computed(() => typeof route.query.city === 'string' && cityBySlug.has(route.query.city) ? route.query.city : '')
const category = computed(() => typeof route.query.category === 'string' && attractionCategories.some((item) => item.id === route.query.category) ? route.query.category as AttractionCategoryId : '')
const invalidQuery = computed(() => Boolean((route.query.city && !city.value) || (route.query.category && !category.value)))
const draft = ref(queryText.value)
const searchInput = ref<HTMLInputElement | null>(null)
let timer: ReturnType<typeof setTimeout> | undefined

watch(queryText, (value) => { draft.value = value })
watch(() => route.hash, async (hash) => {
  if (hash !== '#attraction-search') return
  await nextTick()
  requestAnimationFrame(() => requestAnimationFrame(() => {
    searchInput.value?.focus({ preventScroll: true })
    searchInput.value?.scrollIntoView({ block: 'center', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
  }))
}, { immediate: true })
onBeforeUnmount(() => clearTimeout(timer))

function normalize(value: string) { return value.normalize('NFKC').trim().replace(/\s+/g, ' ').toLocaleLowerCase().replace(/臺/g, '台') }
function queryFor(q = draft.value, selectedCity = city.value, selectedCategory = category.value) {
  return { ...(q.trim() ? { q: q.trim().replace(/\s+/g, ' ') } : {}), ...(selectedCity ? { city: selectedCity } : {}), ...(selectedCategory ? { category: selectedCategory } : {}) }
}
function scheduleSearch() {
  clearTimeout(timer)
  timer = setTimeout(() => { void router.replace({ path: '/explore', query: queryFor() }) }, 350)
}
function submitSearch() {
  clearTimeout(timer)
  void router.push({ path: '/explore', query: queryFor() })
}
function changeCity(value: string) {
  clearTimeout(timer)
  void router.push({ path: '/explore', query: queryFor(draft.value, value, category.value) })
}
function changeCategory(value: string) {
  clearTimeout(timer)
  void router.push({ path: '/explore', query: queryFor(draft.value, city.value, value as AttractionCategoryId) })
}
function reset() {
  clearTimeout(timer)
  draft.value = ''
  void router.push('/explore')
}

const results = computed(() => {
  const needle = normalize(queryText.value)
  return attractions.filter((item) => {
    if (city.value && cityById.get(item.cityId)?.slug !== city.value) return false
    if (category.value && item.category !== category.value) return false
    if (!needle) return true
    const place = cityById.get(item.cityId)
    return [item.nameZh, item.nameEn, place?.nameZh, place?.nameEn, ...item.tags].some((text) => normalize(text ?? '').includes(needle))
  }).sort((a, b) => Number(Boolean(b.coverMediaId)) - Number(Boolean(a.coverMediaId)))
})
const hasFilters = computed(() => Boolean(queryText.value || city.value || category.value || invalidQuery.value))
const photoCount = attractions.filter((item) => item.coverMediaId).length
</script>

<template>
  <div class="explore-page">
    <div class="container explore-masthead"><span><i aria-hidden="true"></i> EDITORIAL TRAVEL ARCHIVE · SPOT DISCOVERY</span><span>探索島嶼景點</span></div>
    <div class="container explore-hero">
      <div><h1>從一個地方，走向更多風景。</h1><p class="explore-hero__lead">以腳步丈量島嶼的脈搏。漫步於山徑、海岸與街巷，找到這趟旅程的起點。</p></div>
      <div class="explore-hero__aside"><span>CURATED ARCHIVES · 典藏索引</span><p>已收錄景點 <strong>{{ attractions.length }}</strong></p><p>涵蓋縣市 <strong>{{ cities.length }}</strong></p><p>實景照片 <strong>{{ photoCount }}</strong></p></div>
    </div>

    <div class="container explore-content">
      <form class="explore-filters" role="search" @submit.prevent="submitSearch">
        <div class="explore-search"><label for="attraction-search">搜尋景點</label><div class="explore-search__field"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 5 5"/></svg><input id="attraction-search" ref="searchInput" v-model="draft" type="search" placeholder="試試海岸、老街或城市名稱" autocomplete="off" @input="scheduleSearch" /><button type="submit">搜尋</button></div></div>
        <ExploreFilterPicker :model-value="city" @update:model-value="changeCity" />
        <fieldset class="explore-category"><legend>景點類型</legend><div class="explore-category__options">
          <button type="button" :aria-pressed="!category" @click="changeCategory('')">全部類型</button>
          <button v-for="item in attractionCategories" :key="item.id" type="button" :aria-pressed="category === item.id" @click="changeCategory(item.id)">{{ item.name }}</button>
        </div></fieldset>
      </form>
      <div class="explore-listing">
      <div class="explore-results-head"><div><p class="eyebrow">THE EDITED SELECTION</p><h2>探索清單</h2><p class="explore-results-count" role="status" aria-live="polite">找到 {{ results.length }} 個景點{{ hasFilters ? ' · 已套用搜尋或篩選' : '' }}</p></div><button v-if="hasFilters" type="button" class="explore-reset" @click="reset">清除所有條件 <span aria-hidden="true">×</span></button></div>
      <p v-if="invalidQuery" class="explore-notice" role="status">網址中的縣市或類型無效，已忽略該條件。可從上方重新選擇。</p>
      <div v-if="results.length" class="attraction-grid"><AttractionCard v-for="(item, index) in results" :key="item.id" :attraction="item" :return-to="route.fullPath" :loading="index < 2 ? 'eager' : 'lazy'" /></div>
      <div v-else class="explore-empty"><span class="eyebrow">NO MATCHES YET</span><h2>還沒有找到符合的景點</h2><p>換個關鍵字或清除條件，從其他地方繼續探索。</p><button type="button" class="button button--primary" @click="reset">顯示全部景點</button></div>
      <aside class="explore-source"><span class="eyebrow">ABOUT THE DATA</span><p>本頁是從交通部觀光署「景點－觀光資訊資料庫」精選的靜態資料。資訊可能變動，行前請以官方資料為準。影像包含已核對授權的實景照片及氛圍提案；提案並非景點實拍。</p><RouterLink class="text-link" to="/sources/">查看資料與媒體來源 <span aria-hidden="true">↗</span></RouterLink></aside>
      </div>
    </div>
    <ConceptGallery title="景點影像提案" :items="exploreMoodboard" description="景點氛圍示意影像，並非景點實拍或本站景點清單。" />
  </div>
</template>
