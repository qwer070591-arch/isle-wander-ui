<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import AttractionCard from '../components/attractions/AttractionCard.vue'
import MediaSlot from '../components/common/MediaSlot.vue'
import ConceptVisual from '../components/common/ConceptVisual.vue'
import FavoriteButton from '../components/common/FavoriteButton.vue'
import AddToTripButton from '../components/common/AddToTripButton.vue'
import { attractionBySlug, attractions, categoryById, cityById } from '../data/attractions'
import { attractionDetailNotes, attractionVisit } from '../data/attraction-details'
import { attractionMedia } from '../data/media'
import { attractionConcepts } from '../data/stitch-visuals'
import type { Attraction } from '../types/content'

const route = useRoute()
const attraction = computed(() => attractionBySlug.get(String(route.params.slug)) ?? null)
const city = computed(() => attraction.value ? cityById.get(attraction.value.cityId) : null)
const category = computed(() => attraction.value ? categoryById.get(attraction.value.category) : null)
const detail = computed(() => attraction.value ? attractionDetailNotes[attraction.value.slug] : null)
const visit = computed(() => attraction.value ? attractionVisit[attraction.value.id] : null)
const photo = computed(() => attraction.value?.coverMediaId ? attractionMedia[attraction.value.coverMediaId] : undefined)
const concept = computed(() => attraction.value ? attractionConcepts[attraction.value.slug] : undefined)
const artByCategory: Record<Attraction['category'], string> = {
  nature: 'forest', coast: 'coast', trail: 'ridge', culture: 'terracotta',
  urban: 'street', arts: 'street', leisure: 'lake',
}
const art = computed(() => attraction.value ? artByCategory[attraction.value.category] : 'ridge')
const highlights = computed(() => detail.value?.highlights ?? attraction.value?.tags ?? [])
const exploreReturn = computed(() => {
  const from = route.query.from
  if (typeof from === 'string' && /^\/explore(?:\/|\?|$)/.test(from) && !from.startsWith('//')) return from
  if (typeof from === 'string' && /^\/planner\/trip-[a-zA-Z0-9-]+\/?$/.test(from)) return from
  return city.value ? `/explore?city=${encodeURIComponent(city.value.slug)}` : '/explore'
})
const returnLabel = computed(() => exploreReturn.value.startsWith('/planner/') ? '返回我的行程' : '返回景點探索')
const related = computed(() => {
  if (!attraction.value) return []
  const others = attractions.filter(item => item.id !== attraction.value?.id)
  return [
    ...others.filter(item => item.cityId === attraction.value?.cityId),
    ...others.filter(item => item.cityId !== attraction.value?.cityId && item.category === attraction.value?.category),
  ].slice(0, 3)
})
const mapUrl = computed(() => {
  const coordinates = attraction.value?.coordinates
  return coordinates && Number.isFinite(coordinates.lat) && Number.isFinite(coordinates.lng)
    ? `https://www.google.com/maps/search/?api=1&query=${coordinates.lat}%2C${coordinates.lng}` : null
})
const directionsUrl = computed(() => {
  const coordinates = attraction.value?.coordinates
  return coordinates && Number.isFinite(coordinates.lat) && Number.isFinite(coordinates.lng)
    ? `https://www.google.com/maps/dir/?api=1&destination=${coordinates.lat}%2C${coordinates.lng}` : null
})
watchEffect(() => { document.title = attraction.value ? `${attraction.value.nameZh}｜島嶼漫遊 ISLE & WANDER` : '找不到景點｜島嶼漫遊 ISLE & WANDER' })
</script>

<template>
  <div v-if="attraction" class="attraction-detail">
    <nav class="container breadcrumb" aria-label="麵包屑導覽">
      <RouterLink to="/">首頁</RouterLink><span aria-hidden="true">/</span>
      <RouterLink to="/explore">景點探索</RouterLink><span aria-hidden="true">/</span>
      <RouterLink v-if="city" :to="`/destinations/${city.slug}/`">{{ city.nameZh }}</RouterLink><span aria-hidden="true">/</span>
      <span aria-current="page">{{ attraction.nameZh }}</span>
    </nav>
    <header class="container attraction-detail__hero">
      <div class="attraction-detail__intro">
        <p class="eyebrow"><span class="eyebrow__line"></span> A PLACE TO WANDER · {{ category?.english }}</p>
        <h1>{{ attraction.nameZh }}</h1>
        <p v-if="attraction.nameEn" class="attraction-detail__english">{{ attraction.nameEn }}</p>
        <p class="attraction-detail__meta">{{ city?.nameZh }} <span aria-hidden="true">·</span> {{ category?.name }}</p>
        <p class="attraction-detail__lead">{{ attraction.shortDescription }}</p>
        <div class="attraction-detail__actions"><FavoriteButton :attraction="attraction" variant="text" /><AddToTripButton :attraction="attraction" /><RouterLink class="text-link" :to="exploreReturn">{{ returnLabel }} <span aria-hidden="true">↗</span></RouterLink></div>
      </div>
      <figure class="attraction-detail__visual">
        <ConceptVisual v-if="concept && !photo" :visual="concept" loading="eager" />
        <MediaSlot v-else :art="art" :photo="photo" loading="eager" priority="high" />
        <figcaption>{{ photo ? `${attraction.nameZh} · 景點攝影` : '景點影像提案，非實景攝影' }} · <RouterLink to="/sources/">查看來源</RouterLink></figcaption>
      </figure>
    </header>
    <div class="container attraction-detail__content">
      <article class="attraction-detail__article">
        <section aria-labelledby="about-place"><p class="eyebrow">01 / ABOUT THE PLACE</p><h2 id="about-place">認識這個地方</h2>
          <p v-for="paragraph in detail?.paragraphs ?? [attraction.shortDescription]" :key="paragraph">{{ paragraph }}</p>
          <p v-if="!detail" class="attraction-detail__caveat">目前以官方景點資料與精選摘要介紹此處，深入旅遊內容持續整理中。</p>
        </section>
        <section aria-labelledby="place-highlights"><p class="eyebrow">02 / HIGHLIGHTS</p><h2 id="place-highlights">旅行線索</h2><ul class="attraction-detail__tags"><li v-for="tag in highlights" :key="tag">{{ tag }}</li></ul></section>
      </article>
      <aside class="attraction-detail__visit" aria-labelledby="visit-info"><p class="eyebrow">PLAN YOUR VISIT</p><h2 id="visit-info">位置與參訪資訊</h2>
        <dl><template v-if="visit?.address"><dt>地址</dt><dd>{{ visit.address }}</dd></template><dt>所在縣市</dt><dd><RouterLink :to="`/destinations/${city?.slug}/`">{{ city?.nameZh }}</RouterLink></dd><template v-if="attraction.coordinates"><dt>座標</dt><dd>{{ attraction.coordinates.lat.toFixed(5) }}, {{ attraction.coordinates.lng.toFixed(5) }}</dd></template></dl>
        <div class="attraction-detail__visit-links"><a v-if="mapUrl" class="text-link" :href="mapUrl" target="_blank" rel="noopener noreferrer">在 Google Maps 查看位置 ↗</a><a v-if="directionsUrl" class="text-link" :href="directionsUrl" target="_blank" rel="noopener noreferrer">使用 Google Maps 規劃路線 ↗</a><a v-if="visit?.officialWebsite" class="text-link" :href="visit.officialWebsite" target="_blank" rel="noopener noreferrer">官方網站 ↗</a><a class="text-link" :href="attraction.sourceUrl" target="_blank" rel="noopener noreferrer">觀光署資料來源 ↗</a></div>
        <p class="attraction-detail__caveat">開放時間、交通與票務可能變動，出發前請以官方公告為準。</p>
      </aside>
    </div>
    <section v-if="related.length" class="container attraction-detail__related" aria-labelledby="related-title"><p class="eyebrow">CONTINUE WANDERING</p><div class="attraction-detail__related-head"><h2 id="related-title">再看看附近與同類景點</h2><RouterLink class="text-link" :to="exploreReturn">{{ returnLabel }} ↗</RouterLink></div><div class="attraction-grid"><AttractionCard v-for="item in related" :key="item.id" :attraction="item" :return-to="exploreReturn" /></div></section>
    <section class="container attraction-detail__credits" aria-labelledby="credits-title"><p class="eyebrow">DATA & IMAGE CREDITS</p><h2 id="credits-title">資料與影像註記</h2><p>景點資訊：<a :href="attraction.sourceUrl" target="_blank" rel="noopener noreferrer">交通部觀光署景點資料 ↗</a> · 官方資料 ID {{ attraction.officialId }}。最後核對：{{ attraction.lastVerifiedAt }}<span v-if="attraction.sourceUpdatedAt"> · 來源更新：{{ attraction.sourceUpdatedAt }}</span>。</p><p v-if="photo">照片：{{ photo.credit }} · <a :href="photo.licenseUrl" target="_blank" rel="noopener noreferrer">{{ photo.license }}</a> · <a :href="photo.sourceUrl" target="_blank" rel="noopener noreferrer">原始圖片頁 ↗</a>。本站僅以 CSS 裁切顯示縮圖，未修改圖檔內容。</p><p v-else-if="concept">影像：{{ concept.title }}，為影像提案，非景點實景照片。<RouterLink to="/sources/">查看影像來源 ↗</RouterLink></p><p v-else>影像：本站原創概念插畫；尚無可用的景點實景照片。</p></section>
  </div>
  <div v-else class="container attraction-detail__not-found"><p class="eyebrow">404 / ATTRACTION NOT FOUND</p><h1>找不到這個景點</h1><p>網址可能有誤，請回到探索清單重新選擇。</p><RouterLink class="button button--primary" to="/explore">返回景點探索</RouterLink></div>
</template>
