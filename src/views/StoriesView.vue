<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ConceptVisual from '../components/common/ConceptVisual.vue'
import { stories } from '../data/editorial'

const route = useRoute()
const router = useRouter()
const collectionHeading = ref<HTMLElement | null>(null)
const categories = ['全部', '山林', '街區', '海岸'] as const
const category = computed(() => {
  const value = route.query.category
  return typeof value === 'string' && categories.some(item => item === value) ? value : '全部'
})
const visibleStories = computed(() => category.value === '全部' ? stories : stories.filter(story => story.category === category.value))
const featuredStory = computed(() => visibleStories.value[0] ?? stories[0])
const otherStories = computed(() => visibleStories.value.filter(story => story.slug !== featuredStory.value.slug))
const storyLink = (slug: string) => ({ path: `/stories/${slug}/`, query: category.value === '全部' ? {} : { category: category.value } })

async function selectCategory(value: string) {
  if (category.value === value) return
  await router.push({ query: { ...route.query, category: value === '全部' ? undefined : value } })
  if (window.matchMedia('(max-width: 767px)').matches) {
    await nextTick()
    collectionHeading.value?.focus({ preventScroll: true })
    collectionHeading.value?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' })
  }
}
</script>

<template>
  <div class="editorial-page stories-page">
    <div class="container editorial-page__topline"><span>ISLE & WANDER / FIELD NOTES</span><span>島嶼漫遊 · 編輯手札</span></div>
    <header class="container editorial-page__intro stories-page__intro">
      <p class="eyebrow">SLOW ESSAYS & FIELD NOTES</p>
      <h1>有些地方，值得多讀一會兒。</h1>
      <p>從景點資料出發，寫下關於山林、街區與海岸的短篇導讀。這些是編輯文字與概念影像，不是實地採訪紀錄。</p>
    </header>
    <section class="container stories-collection" aria-labelledby="stories-collection-title">
      <div class="editorial-page__section-head"><div><p class="eyebrow">THE JOURNAL</p><h2 id="stories-collection-title" ref="collectionHeading" tabindex="-1">旅行手札</h2></div><p aria-live="polite">{{ visibleStories.length }} 篇短文</p></div>
      <div class="stories-collection__filters" role="group" aria-label="篩選故事主題"><button v-for="item in categories" :key="item" type="button" :aria-pressed="category === item" @click="selectCategory(item)">{{ item }}</button></div>
      <div class="stories-feature">
        <div class="stories-feature__image"><ConceptVisual :visual="featuredStory.visual" :key="featuredStory.slug" loading="eager" /></div>
        <div class="stories-feature__copy"><p class="eyebrow">FEATURED / {{ featuredStory.category }} · 約 {{ featuredStory.readMinutes }} 分鐘</p><h3>{{ featuredStory.title }}</h3><p>{{ featuredStory.subtitle }}</p><RouterLink :to="storyLink(featuredStory.slug)">閱讀這篇手札 <span aria-hidden="true">↗</span></RouterLink></div>
      </div>
      <div class="stories-collection__subhead"><h3>{{ category === '全部' ? '繼續閱讀' : `更多${category}故事` }}</h3><span>{{ otherStories.length }} 篇</span></div>
      <div class="stories-collection__grid">
        <article v-for="item in otherStories" :key="item.slug" class="story-card"><RouterLink :to="storyLink(item.slug)"><div class="story-card__image"><ConceptVisual :visual="item.visual" /></div><div class="story-card__body"><p class="eyebrow">{{ item.category }} · 約 {{ item.readMinutes }} 分鐘</p><h3>{{ item.title }}</h3><p>{{ item.subtitle }}</p><span>閱讀手札 <span aria-hidden="true">↗</span></span></div></RouterLink></article>
      </div>
    </section>
    <aside class="container editorial-page__notice"><strong>編輯說明</strong><p>短文依本站已核對的景點資料撰寫；概念影像不代表實景、當前天候或現場狀況。出發前請查看各景點的官方資訊。<RouterLink to="/sources/">查看資料與影像來源 ↗</RouterLink></p></aside>
  </div>
</template>
