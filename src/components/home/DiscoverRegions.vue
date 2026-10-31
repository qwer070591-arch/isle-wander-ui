<script setup lang="ts">
import { regions } from '../../data/home'
import MediaSlot from '../common/MediaSlot.vue'
import SectionHeading from './SectionHeading.vue'
</script>

<template>
  <section class="section regions-section" aria-labelledby="regions-title">
    <div class="container regions-layout">
      <div class="regions-intro"><SectionHeading number="02" eyebrow="DISCOVER BY REGION" heading-id="regions-title" title="從一個方向，開始靠近台灣" description="五種島嶼風景，五種走進地方的方式。你想先往哪裡走？" /><RouterLink class="text-link" to="/destinations/">瀏覽所有地區 <span aria-hidden="true">↗</span></RouterLink></div>
      <div class="regions-grid">
        <RouterLink v-for="(region, index) in regions" :key="region.id" class="region-card" :class="`region-card--${index}`" :to="{ path: '/destinations/', query: { region: region.id } }" :aria-label="`探索${region.name}`">
          <MediaSlot :art="region.art" />
          <span class="region-card__meta">0{{ index + 1 }} / {{ region.english }}</span>
          <span class="region-card__title">{{ region.name }} <span aria-hidden="true">↗</span></span>
          <span class="region-card__desc">{{ region.description }}</span>
        </RouterLink>
      </div>
    </div>
  </section>
</template>
