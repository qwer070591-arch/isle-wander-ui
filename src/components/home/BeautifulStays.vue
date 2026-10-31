<script setup lang="ts">
import { stayConcepts } from '../../data/home'
import MediaSlot from '../common/MediaSlot.vue'
import SectionHeading from './SectionHeading.vue'
</script>

<template>
  <section class="section stays-section" aria-labelledby="stays-title">
    <div class="container stays-layout">
      <div class="stays-intro"><SectionHeading number="04" eyebrow="BEAUTIFUL STAYS" heading-id="stays-title" title="把夜晚，留給喜歡的地方" description="一處住得舒服的空間，也能讓旅行有更深的記憶。從建築、光線到窗外風景，慢慢尋找適合自己的停留。" /><p class="stays-disclaimer">此處影像為住宿風格示意，並非旅宿實景；精選旅宿頁已收錄觀光署資料中的實際業者。</p><RouterLink class="text-link" to="/stays/">探索精選旅宿 <span aria-hidden="true">↗</span></RouterLink></div>
      <div class="stays-cards">
        <article v-for="(stay, index) in stayConcepts" :key="stay.id" class="stay-card" :class="`stay-card--${index}`">
          <MediaSlot :art="stay.art" />
          <p class="eyebrow">{{ stay.location }}</p><h3>{{ stay.title }}</h3><p>{{ stay.description }}</p>
          <div class="stay-card__tags"><span v-for="tag in stay.tags" :key="tag">{{ tag }}</span></div>
        </article>
      </div>
    </div>
  </section>
</template>
