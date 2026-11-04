<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import DestinationCityCard from '../components/destinations/DestinationCityCard.vue'
import ConceptGallery from '../components/common/ConceptGallery.vue'
import { destinationMoodboard } from '../data/stitch-visuals'
import { cities } from '../data/cities'
import { attractions, attractionCountByCity } from '../data/attractions'
import { regions } from '../data/home'
import type { RegionId } from '../types/content'

const route = useRoute()
const router = useRouter()
const querySearch = computed(() => typeof route.query.q === 'string' ? route.query.q.trim() : '')
const draft = ref(querySearch.value)
let timer: ReturnType<typeof setTimeout> | undefined
watch(querySearch, (value) => { draft.value = value })
onBeforeUnmount(() => clearTimeout(timer))
function normalize(value: string) { return value.normalize('NFKC').trim().replace(/\s+/g, ' ').toLocaleLowerCase().replace(/臺/g, '台') }
function searchNow() {
  clearTimeout(timer)
  void router.replace({ path: '/destinations/', query: queryFor() })
}
function scheduleSearch(event?: Event) {
  if (event instanceof InputEvent && event.isComposing) return
  clearTimeout(timer)
  timer = setTimeout(searchNow, 300)
}
const queryRegion = computed(() => typeof route.query.region === 'string' ? route.query.region : '')
const selectedRegion = computed<RegionId | null>(() => regions.find((region) => region.id === queryRegion.value)?.id ?? null)
const invalidRegion = computed(() => Boolean(queryRegion.value && !selectedRegion.value))
const onlyWithPlaces = computed(() => route.query.places === '1')
const citiesWithPlacesCount = cities.filter((city) => (attractionCountByCity.get(city.id) ?? 0) > 0).length
function queryFor(region = selectedRegion.value, q = draft.value, places = onlyWithPlaces.value) {
  return { ...(region ? { region } : {}), ...(q.trim() ? { q: q.trim() } : {}), ...(places ? { places: '1' } : {}) }
}
function togglePlaces(event: Event) {
  clearTimeout(timer)
  void router.push({ path: '/destinations/', query: queryFor(selectedRegion.value, draft.value, (event.target as HTMLInputElement).checked) })
}
const searchMatches = computed(() => cities.filter((city) => {
  if (onlyWithPlaces.value && !(attractionCountByCity.get(city.id) ?? 0)) return false
  const needle = normalize(querySearch.value)
  return !needle || [city.nameZh, city.nameEn, city.teaser, ...city.featureTags].some((value) => normalize(value).includes(needle))
}))
const filteredCities = computed(() => searchMatches.value.filter((city) => !selectedRegion.value || city.regionId === selectedRegion.value))
const regionCounts = computed(() => Object.fromEntries(regions.map((region) => [region.id, searchMatches.value.filter((city) => city.regionId === region.id).length])))
const visibleRegions = computed(() => regions.filter((region) => (!selectedRegion.value || region.id === selectedRegion.value) && filteredCities.value.some((city) => city.regionId === region.id)))
const visibleCount = computed(() => filteredCities.value.length)
const selectedRegionName = computed(() => regions.find((region) => region.id === selectedRegion.value)?.name)
const cityReturnQuery = computed(() => queryFor())
</script>

<template>
  <div class="destinations-page">
    <div class="container destinations-masthead"><span><i aria-hidden="true"></i> EDITORIAL TRAVEL ARCHIVE · TAIWAN DISCOVERY</span><span>EXPLORE {{ cities.length }} DESTINATIONS</span></div>
    <div class="container destinations-hero">
      <div>
        <h1>循著風景，走進一座城市。</h1>
        <p class="destinations-hero__lead">以漫步的節奏閱讀臺灣 {{ cities.length }} 個縣市的風土紋理。從山線、老街到海岸，慢慢認識每個地方。</p>
        <a class="destinations-hero__jump" href="#destination-finder">尋找目的地 <span aria-hidden="true">↓</span></a>
      </div>
      <div class="destinations-hero__aside">
        <span>EDITOR'S NOTE</span>
        <p>先選一個想走近的地方，再留一點時間給路上的風景。這份城市索引，陪你找到旅行的起點。</p>
      </div>
    </div>
    <div class="container destinations-facts" aria-label="目前收錄內容"><div><strong>{{ cities.length }}</strong><span>縣市速寫</span></div><div><strong>{{ regions.length }}</strong><span>旅行區域</span></div><div><strong>{{ attractions.length }}</strong><span>已收錄景點</span></div></div>

    <div id="destination-finder" class="container destinations-content">
      <form class="destinations-search" role="search" @submit.prevent="searchNow">
        <label for="destination-search">搜尋想去的地方</label>
        <div class="destinations-search__controls">
          <input id="destination-search" v-model="draft" type="search" placeholder="試試臺南、海岸或老街" autocomplete="off" @input="scheduleSearch" @compositionend="scheduleSearch" />
          <button type="submit">搜尋</button>
        </div>
      </form>
      <label class="destinations-availability-filter" :class="{ 'is-active': onlyWithPlaces }"><input type="checkbox" :checked="onlyWithPlaces" @change="togglePlaces" /><span>只看已有景點的縣市</span><small>{{ citiesWithPlacesCount }}</small></label>
      <nav class="region-filter" aria-label="依旅遊區域篩選縣市">
        <RouterLink :to="{ path: '/destinations/', query: queryFor(null) }" :aria-current="!selectedRegion ? 'page' : undefined" :class="{ 'is-active': !selectedRegion }">全部縣市 <span>{{ searchMatches.length }}</span></RouterLink>
        <RouterLink v-for="region in regions" :key="region.id" :to="{ path: '/destinations/', query: queryFor(region.id) }" :aria-current="selectedRegion === region.id ? 'page' : undefined" :class="{ 'is-active': selectedRegion === region.id }">{{ region.name }} <span>{{ regionCounts[region.id] }}</span></RouterLink>
      </nav>
      <p v-if="invalidRegion" class="destinations-notice" role="status">找不到指定的旅遊區域，已顯示全部縣市。請從上方重新選擇。</p>
      <div class="destinations-results-head">
        <p class="destinations-count" role="status">{{ selectedRegionName ?? '全台灣' }}{{ querySearch ? `・「${querySearch}」` : '' }}{{ onlyWithPlaces ? '・已有景點' : '' }}，找到 {{ visibleCount }} 個縣市</p>
        <RouterLink v-if="selectedRegion || querySearch || onlyWithPlaces" class="destinations-reset" to="/destinations/">清除條件</RouterLink>
      </div>
      <p class="destinations-image-note">城市卡片為氛圍影像提案，並非地點實拍。<RouterLink to="/sources/">查看影像來源</RouterLink></p>

      <div v-if="visibleCount" class="destinations-regions">
        <section v-for="region in visibleRegions" :key="region.id" class="destination-region" :aria-labelledby="`destination-region-${region.id}`">
          <div class="destination-region__heading">
            <div><span class="destination-region__index">{{ String(regions.findIndex((item) => item.id === region.id) + 1).padStart(2, '0') }} / {{ String(regions.length).padStart(2, '0') }}</span><p class="eyebrow">{{ region.english }}</p><h2 :id="`destination-region-${region.id}`">{{ region.name }}</h2></div>
            <p>{{ region.description }}</p>
          </div>
          <div class="city-grid">
            <DestinationCityCard v-for="(city, cityIndex) in filteredCities.filter((item) => item.regionId === region.id)" :key="city.id" :city="city" :region-name="region.name" :index="cityIndex + 1" :return-query="cityReturnQuery" :loading="region.id === visibleRegions[0]?.id && cityIndex < 2 ? 'eager' : 'lazy'" />
          </div>
        </section>
      </div>
      <div v-else class="destinations-empty"><h2>沒有找到符合的縣市</h2><p>{{ onlyWithPlaces ? '目前條件下沒有已收錄景點的縣市。可以取消「只看已有景點的縣市」，或清除所有條件。' : selectedRegionName && querySearch ? `「${querySearch}」在${selectedRegionName}沒有結果，可以選擇其他區域。` : '試試其他關鍵字，或清除條件重新探索。' }}</p><RouterLink class="button button--primary" to="/destinations/">查看全部縣市</RouterLink></div>
    </div>
    <ConceptGallery title="島嶼風格筆記" :items="destinationMoodboard" />
  </div>
</template>
