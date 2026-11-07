<script setup lang="ts">
import { featuredStays } from '../../data/featured-stays'
import MediaSlot from '../common/MediaSlot.vue'
import SectionHeading from './SectionHeading.vue'
import type { PhotoAsset } from '../../types/content'

const homeStays = featuredStays
  .filter(stay => stay.id === 'Hotel_A15010000H_000299' || stay.id === 'Hotel_A15010000H_018203')
  .map(stay => ({
    ...stay,
    media: {
      src: stay.photo.smallSrc,
      alt: `${stay.name}：${stay.photo.label}的資料照片`,
      width: 720,
      height: Math.round(stay.photo.height * 720 / stay.photo.width),
      credit: '交通部觀光署旅館民宿資料集',
      sourceUrl: stay.photo.sourceUrl,
      license: '政府資料開放授權條款第 1 版',
      licenseUrl: 'https://data.gov.tw/license',
      caption: `實景 · ${stay.photo.label}`,
    } satisfies PhotoAsset,
  }))
</script>

<template>
  <section class="section stays-section" aria-labelledby="stays-title">
    <div class="container stays-layout">
      <div class="stays-intro"><SectionHeading number="04" eyebrow="BEAUTIFUL STAYS" heading-id="stays-title" title="把夜晚，留給喜歡的地方" description="從埔里山線到澎湖港邊，找一處適合慢下來的停留。" /><p class="stays-disclaimer">以下為觀光署資料選輯與所列房型照片；房型、營業與服務請向業者再次確認。</p><RouterLink class="text-link" to="/stays/">探索精選旅宿 <span aria-hidden="true">↗</span></RouterLink></div>
      <div class="stays-cards">
        <article v-for="(stay, index) in homeStays" :key="stay.id" class="stay-card" :class="`stay-card--${index}`">
          <MediaSlot art="interior" :photo="stay.media" caption="房型照片暫時無法載入" :show-note="false" />
          <p class="eyebrow">{{ stay.city }} {{ stay.town }} · 觀光署資料選輯</p><h3>{{ stay.name }}</h3><p>{{ stay.note }}</p>
          <div class="stay-card__tags"><span>{{ stay.photo.label }}</span><span>{{ stay.city }}</span></div>
          <RouterLink class="stay-card__link" :to="{ path: '/stays/', query: { style: stay.style } }">查看旅宿 <span aria-hidden="true">↗</span></RouterLink>
        </article>
      </div>
    </div>
  </section>
</template>
