<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import MediaSlot from '../components/common/MediaSlot.vue'
import ConceptVisual from '../components/common/ConceptVisual.vue'
import DestinationCityCard from '../components/destinations/DestinationCityCard.vue'
import AttractionCard from '../components/attractions/AttractionCard.vue'
import { attractions } from '../data/attractions'
import { cities, cityBySlug } from '../data/cities'
import { regions } from '../data/home'
import { cityConcepts } from '../data/stitch-visuals'

const route = useRoute()
const city = computed(() => cityBySlug.get(String(route.params.slug)) ?? null)
const region = computed(() => regions.find((item) => item.id === city.value?.regionId))
const nearby = computed(() => cities.filter((item) => item.regionId === city.value?.regionId && item.id !== city.value?.id).slice(0, 2))
const allCityAttractions = computed(() => attractions.filter((item) => item.cityId === city.value?.id))
const cityAttractions = computed(() => allCityAttractions.value.slice(0, 3))
const returnQuery = computed(() => ({
  ...(typeof route.query.region === 'string' && regions.some((item) => item.id === route.query.region) ? { region: route.query.region } : {}),
  ...(typeof route.query.q === 'string' && route.query.q.trim() ? { q: route.query.q.trim() } : {}),
  ...(route.query.places === '1' ? { places: '1' } : {}),
}))
const returnTo = computed(() => ({ path: '/destinations/', query: returnQuery.value }))
const hasListContext = computed(() => Object.keys(returnQuery.value).length > 0)
watch(() => route.fullPath, () => {
  document.title = city.value ? `${city.value.nameZh}｜島嶼漫遊 ISLE & WANDER` : '找不到縣市｜島嶼漫遊 ISLE & WANDER'
}, { immediate: true, flush: 'post' })
</script>

<template>
  <div v-if="city" class="container city-page">
    <nav class="breadcrumb" aria-label="麵包屑導覽"><RouterLink to="/">首頁</RouterLink><span aria-hidden="true">/</span><RouterLink :to="returnTo">目的地</RouterLink><span aria-hidden="true">/</span><span aria-current="page">{{ city.nameZh }}</span></nav>
    <header class="city-page__hero">
      <div class="city-page__heading"><p class="eyebrow"><span class="eyebrow__line"></span> CITY NOTES · {{ region?.english }}</p><p class="city-page__english">{{ city.nameEn }}</p><h1>{{ city.nameZh }}</h1><p class="city-page__teaser">{{ city.teaser }}</p><span class="city-page__region">{{ region?.name }} · 城市速寫</span><div class="city-page__actions"><a v-if="cityAttractions.length" class="text-link" href="#city-attractions-title">先看本市景點 <span aria-hidden="true">↓</span></a><RouterLink v-else class="text-link" to="/explore/">探索已收錄景點 <span aria-hidden="true">↗</span></RouterLink></div></div>
      <figure class="city-page__media"><ConceptVisual v-if="!city.cover && cityConcepts[city.slug]" :visual="cityConcepts[city.slug]" loading="eager" /><MediaSlot v-else :art="city.art" :photo="city.cover" :show-note="false" /><figcaption>{{ city.cover ? `${city.cover.caption} · 實景攝影` : '城市影像提案，非實景攝影' }} · <RouterLink to="/sources/">查看來源</RouterLink></figcaption></figure>
    </header>
    <div class="city-page__editorial">
      <section aria-labelledby="city-intro-title"><p class="eyebrow">01 / GET TO KNOW</p><h2 id="city-intro-title">沿著自己的步調，<br />認識{{ city.nameZh }}。</h2><p class="city-page__intro">{{ city.intro }}</p></section>
      <section aria-labelledby="city-features-title"><p class="eyebrow">02 / TRAVEL THEMES</p><h2 id="city-features-title">旅行特色</h2><ul class="city-page__tags"><li v-for="tag in city.featureTags" :key="tag">{{ tag }}</li></ul><p class="city-page__status">{{ allCityAttractions.length ? `目前收錄 ${allCityAttractions.length} 個${city.nameZh}景點；下方先選出其中 ${cityAttractions.length} 個。` : '目前是城市概覽，本市景點資料仍在整理中。' }}</p><RouterLink v-if="allCityAttractions.length" class="text-link" :to="{ path: '/explore', query: { city: city.slug } }">瀏覽本市全部景點 <span aria-hidden="true">↗</span></RouterLink><RouterLink v-else class="text-link" to="/explore/">探索其他縣市景點 <span aria-hidden="true">↗</span></RouterLink></section>
    </div>
    <section class="city-page__attractions" aria-labelledby="city-attractions-title"><div class="city-page__attractions-heading"><div><p class="eyebrow">PLACES TO BEGIN</p><h2 id="city-attractions-title">{{ cityAttractions.length ? '精選景點' : '景點資料整理中' }}</h2></div><RouterLink class="text-link" :to="cityAttractions.length ? { path: '/explore', query: { city: city.slug } } : '/explore/'">{{ cityAttractions.length ? `探索更多${city.nameZh}景點` : '探索已收錄景點' }} <span aria-hidden="true">↗</span></RouterLink></div><div v-if="cityAttractions.length" class="attraction-grid"><AttractionCard v-for="item in cityAttractions" :key="item.id" :attraction="item" /></div><p v-else class="city-page__attractions-empty">這座城市的景點資料仍在整理中。你可以先探索其他縣市的景點，或從下方看看同區域的城市。</p></section>
    <section v-if="nearby.length" class="city-page__nearby" aria-labelledby="nearby-title"><div class="city-page__nearby-heading"><div><p class="eyebrow">KEEP WANDERING</p><h2 id="nearby-title">繼續探索{{ region?.name }}</h2></div><RouterLink class="text-link" :to="{ path: '/destinations', query: { region: city.regionId } }">返回{{ region?.name }}列表 <span aria-hidden="true">↗</span></RouterLink></div><div class="city-grid"><DestinationCityCard v-for="other in nearby" :key="other.id" :city="other" :region-name="region?.name ?? ''" /></div></section>
    <RouterLink class="city-page__back" :to="returnTo">← {{ hasListContext ? '返回目的地搜尋結果' : '返回全部目的地' }}</RouterLink>
  </div>
  <div v-else class="container city-not-found"><nav class="breadcrumb" aria-label="麵包屑導覽"><RouterLink to="/">首頁</RouterLink><span aria-hidden="true">/</span><RouterLink to="/destinations">目的地</RouterLink><span aria-hidden="true">/</span><span aria-current="page">找不到縣市</span></nav><p class="eyebrow">DESTINATION NOT FOUND</p><h1>找不到這座城市</h1><p>網址可能有誤，或這座城市尚未收錄。請返回目的地列表重新選擇。</p><RouterLink class="button button--primary" to="/destinations">返回全部目的地</RouterLink></div>
</template>
