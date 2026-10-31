<script setup lang="ts">
import type { Attraction } from '../../types/content'
import { attractionMedia } from '../../data/media'
import { categoryById, cityById } from '../../data/attractions'
import MediaSlot from '../common/MediaSlot.vue'
import ConceptVisual from '../common/ConceptVisual.vue'
import { attractionConcepts } from '../../data/stitch-visuals'
import FavoriteButton from '../common/FavoriteButton.vue'
import AddToTripButton from '../common/AddToTripButton.vue'

const props = defineProps<{ attraction: Attraction; returnTo?: string }>()
const emit = defineEmits<{ favoriteChange: [active: boolean] }>()
const artByCategory: Record<Attraction['category'], string> = {
  nature: 'forest', coast: 'coast', trail: 'ridge', culture: 'terracotta',
  urban: 'street', arts: 'street', leisure: 'lake',
}
const photo = props.attraction.coverMediaId ? attractionMedia[props.attraction.coverMediaId] : undefined
const concept = attractionConcepts[props.attraction.slug]
const art = artByCategory[props.attraction.category]
</script>

<template>
  <article class="attraction-card">
    <RouterLink class="attraction-card__link" :to="{ path: `/attractions/${attraction.slug}/`, query: returnTo ? { from: returnTo } : undefined }" :aria-label="`查看${attraction.nameZh}的景點介紹`">
      <div class="attraction-card__media"><ConceptVisual v-if="concept && !photo" :visual="concept" /><MediaSlot v-else :art="art" :photo="photo" :show-note="false" /></div>
      <div class="attraction-card__body">
        <p class="attraction-card__meta">{{ cityById.get(attraction.cityId)?.nameZh }} <span aria-hidden="true">·</span> {{ categoryById.get(attraction.category)?.name }}</p>
        <h3>{{ attraction.nameZh }}</h3>
        <p class="attraction-card__summary">{{ attraction.shortDescription }}</p>
        <div class="attraction-card__end"><span>{{ photo ? '實景照片' : concept ? '影像提案' : '概念插畫' }}</span><span class="attraction-card__action">查看景點 <span aria-hidden="true">↗</span></span></div>
      </div>
    </RouterLink>
    <FavoriteButton class="attraction-card__favorite" :attraction="attraction" @change="emit('favoriteChange', $event)" />
    <AddToTripButton class="attraction-card__trip" :attraction="attraction" compact />
  </article>
</template>
