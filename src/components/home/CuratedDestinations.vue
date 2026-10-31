<script setup lang="ts">
import { destinations } from '../../data/home'
import MediaSlot from '../common/MediaSlot.vue'
import SectionHeading from './SectionHeading.vue'
</script>

<template>
  <section class="section destinations-section" aria-labelledby="destinations-title">
    <div class="container">
      <div class="section-top"><SectionHeading number="03" eyebrow="CURATED DESTINATIONS" heading-id="destinations-title" title="值得多停留一天的地方" description="不趕行程，從一座城市、一條街道，重新遇見島嶼。" /><RouterLink class="text-link section-top__link" to="/destinations/">探索所有目的地 <span aria-hidden="true">↗</span></RouterLink></div>
      <div class="destinations-grid">
        <article v-for="(destination, index) in destinations" :key="destination.id" class="destination-card" :class="`destination-card--${index}`">
          <RouterLink :to="`/destinations/${destination.slug}/`" :aria-label="`探索${destination.name}`">
            <div class="destination-card__visual"><MediaSlot :art="destination.art" :photo="destination.photo" loading="lazy" /><span class="destination-card__num">0{{ index + 1 }}</span></div>
            <div class="destination-card__body"><p class="eyebrow">{{ destination.city }} <span>·</span> {{ destination.category }}</p><h3>{{ destination.name }}</h3><p>{{ destination.summary }}</p><span class="card-link">走進這座城市 <span aria-hidden="true">↗</span></span></div>
          </RouterLink>
        </article>
      </div>
      <RouterLink class="text-link mobile-only destinations-section__more" to="/destinations/">探索所有目的地 <span aria-hidden="true">↗</span></RouterLink>
    </div>
  </section>
</template>
