<script setup lang="ts">
import { computed } from 'vue'
import type { City } from '../../types/content'
import MediaSlot from '../common/MediaSlot.vue'
import ConceptVisual from '../common/ConceptVisual.vue'
import { cityConcepts } from '../../data/stitch-visuals'
import { attractionCountByCity } from '../../data/attractions'

const props = defineProps<{ city: City; regionName: string; index?: number; returnQuery?: { region?: string; q?: string; places?: string } }>()
const attractionCount = computed(() => attractionCountByCity.get(props.city.id) ?? 0)
</script>

<template>
  <article class="city-card">
    <RouterLink class="city-card__link" :to="{ path: `/destinations/${city.slug}/`, query: returnQuery }" :aria-label="`探索${city.nameZh}，${attractionCount ? `已收錄 ${attractionCount} 個景點` : '城市概覽'}`">
      <div class="city-card__media"><ConceptVisual v-if="cityConcepts[city.slug]" :visual="cityConcepts[city.slug]" sizes="(max-width: 767px) calc(100vw - 32px), (max-width: 1100px) 30vw, 24vw" /><MediaSlot v-else :art="city.art" :photo="city.cover" :show-note="false" /></div>
      <div class="city-card__body">
        <p class="city-card__meta">{{ regionName }} <span aria-hidden="true">·</span> {{ city.nameEn }}</p>
        <div class="city-card__title"><h3>{{ city.nameZh }}</h3><span v-if="index">{{ String(index).padStart(2, '0') }} / CITY NOTE</span></div>
        <p class="city-card__teaser">{{ city.teaser }}</p>
        <span class="city-card__availability" :class="{ 'city-card__availability--overview': !attractionCount }">{{ attractionCount ? `已收錄 ${attractionCount} 個景點` : '城市概覽' }}</span>
        <ul v-if="index" class="city-card__tags"><li v-for="tag in city.featureTags" :key="tag">{{ tag }}</li></ul>
        <span class="city-card__action">探索城市 <span aria-hidden="true">↗</span></span>
      </div>
    </RouterLink>
  </article>
</template>
