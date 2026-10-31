<script setup lang="ts">
import ConceptVisual from '../components/common/ConceptVisual.vue'
import ConceptGallery from '../components/common/ConceptGallery.vue'
import { stayMoodboard, storyMoodboard } from '../data/stitch-visuals'

defineProps<{ kind: 'stays' | 'stories' }>()
</script>

<template>
  <div class="editorial-preview">
    <div class="container editorial-preview__masthead"><span><i aria-hidden="true"></i> ISLE & WANDER EDITORIAL ARCHIVE</span><span>{{ kind === 'stays' ? 'CURATED STAYS' : 'TRAVEL STORIES' }}</span></div>
    <header class="container editorial-preview__hero">
      <div>
        <p class="eyebrow">{{ kind === 'stays' ? 'A PLACE TO PAUSE' : 'SLOW ESSAYS & FIELD NOTES' }}</p>
        <h1>{{ kind === 'stays' ? '山海之間的靜謐居所' : '慢慢手札・尋找島嶼的微小光影' }}</h1>
        <p class="editorial-preview__lead">{{ kind === 'stays' ? '我們正在整理真實旅宿資料與影像授權。未來，從山林到海岸，這裡會收錄值得停留的地方。' : '關於地方與人的長篇故事，正在編輯中。先從已收錄的縣市與景點，找到想走近的風景。' }}</p>
      </div>
      <aside class="editorial-preview__note"><span>EDITOR'S NOTE</span><p>{{ kind === 'stays' ? '好的停留，值得用真實資訊慢慢選。旅宿介紹會在資料核對完成後發表。' : '旅程不必急著抵達。故事發布前，先讓目的地與景點為你指路。' }}</p><small>ISLE & WANDER · 編輯中</small></aside>
    </header>
    <section class="container editorial-preview__feature" aria-labelledby="preview-feature-title">
      <div class="editorial-preview__image"><ConceptVisual :visual="kind === 'stays' ? stayMoodboard[0] : storyMoodboard[0]" loading="eager" /></div>
      <div class="editorial-preview__copy"><p class="eyebrow">{{ kind === 'stays' ? 'SCENERY BEFORE THE STAY' : 'SCENERY BEFORE THE STORY' }}</p><h2 id="preview-feature-title">{{ kind === 'stays' ? '先選一處風景，再決定停留的方式。' : '一座城市，有很多值得細看的日常。' }}</h2><p>{{ kind === 'stays' ? '上方是旅宿風格概念影像，並非實際旅宿或房況。' : '上方是旅行故事概念影像；完整文章尚未發布。' }}</p><RouterLink class="text-link" :to="kind === 'stays' ? '/destinations/' : '/explore/'">{{ kind === 'stays' ? '探索目的地' : '探索景點' }} <span aria-hidden="true">↗</span></RouterLink></div>
    </section>
    <ConceptGallery :title="kind === 'stays' ? '停留風格提案' : '故事影像提案'" :items="kind === 'stays' ? stayMoodboard.slice(1) : storyMoodboard.slice(1)" :description="kind === 'stays' ? '旅宿皆為概念影像，沒有對應的真實業者、價格或空房資訊。' : '這些是故事氛圍示意影像，並非已發表文章或實地採訪紀錄。'" />
  </div>
</template>
