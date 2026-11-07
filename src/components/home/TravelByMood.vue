<script setup lang="ts">
import { moods } from '../../data/home'
import MediaSlot from '../common/MediaSlot.vue'
import SectionHeading from './SectionHeading.vue'
import type { MoodId } from '../../types/content'
const moodQueries: Record<MoodId, string> = { mountain: '森林', coast: '海岸', heritage: '老街', lake: '湖', 'local-life': '街區' }
</script>

<template>
  <section class="section mood-section" aria-labelledby="mood-title">
    <div class="container"><div class="section-top"><SectionHeading number="05" eyebrow="TRAVEL BY MOOD" heading-id="mood-title" title="今天，想走進哪一種風景？" description="讓心情帶路，從喜歡的風景開始尋找旅程。" /></div>
      <div class="mood-grid"><RouterLink v-for="(mood, index) in moods" :key="mood.id" class="mood-card" :class="`mood-card--${index}`" :to="{ path: '/explore/', query: { q: moodQueries[mood.id] } }" :aria-label="`探索${mood.title}相關景點`"><MediaSlot :art="mood.art" :photo="mood.photo" :show-note="false" sizes="(max-width: 767px) 45vw, 25vw" /><span class="mood-card__body"><span class="eyebrow">0{{ index + 1 }} / {{ mood.subtitle }}</span><strong>{{ mood.title }}</strong><span class="card-link">探索主題 <span aria-hidden="true">↗</span></span></span></RouterLink></div>
    </div>
  </section>
</template>
