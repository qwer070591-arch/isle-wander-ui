<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import ConceptVisual from '../components/common/ConceptVisual.vue'
import { stories } from '../data/editorial'

const route = useRoute()
const story = computed(() => stories.find(item => item.slug === route.params.slug))
const returnCategory = computed(() => {
  const value = route.query.category
  return typeof value === 'string' && stories.some(item => item.category === value) ? value : undefined
})
const collectionLink = computed(() => ({ path: '/stories/', query: returnCategory.value ? { category: returnCategory.value } : {} }))
const nextStory = computed(() => {
  if (!story.value) return undefined
  const sequence = returnCategory.value ? stories.filter(item => item.category === returnCategory.value) : stories
  const index = sequence.findIndex(item => item.slug === story.value?.slug)
  return sequence[(index + 1) % sequence.length]
})
const progress = ref(0)
const copyStatus = ref('')
function updateProgress() {
  const distance = document.documentElement.scrollHeight - window.innerHeight
  progress.value = distance > 0 ? Math.round(Math.min(100, Math.max(0, window.scrollY / distance * 100))) : 100
}
onMounted(() => {
  updateProgress()
  window.addEventListener('scroll', updateProgress, { passive: true })
  window.addEventListener('resize', updateProgress)
})
onUnmounted(() => {
  window.removeEventListener('scroll', updateProgress)
  window.removeEventListener('resize', updateProgress)
})
async function copyLink() {
  try {
    await navigator.clipboard.writeText(window.location.href)
    copyStatus.value = '故事連結已複製。'
  } catch { copyStatus.value = '無法複製連結，請使用瀏覽器的分享功能。' }
}
watch(story, async (current) => {
  await nextTick()
  updateProgress()
  document.title = current ? `${current.title}｜島嶼漫遊 ISLE & WANDER` : '找不到故事｜島嶼漫遊 ISLE & WANDER'
}, { immediate: true })
</script>

<template>
  <div v-if="story" class="editorial-page story-detail">
    <div class="story-detail__progress" aria-hidden="true"><span :style="{ width: `${progress}%` }"></span></div>
    <nav class="container story-detail__back" aria-label="麵包屑導覽"><RouterLink :to="collectionLink">旅行故事</RouterLink><span aria-hidden="true"> / </span><span aria-current="page">{{ story.category }}</span></nav>
    <article class="container story-detail__article">
      <header>
        <p class="eyebrow">FIELD NOTE / {{ story.category }} · 約 {{ story.readMinutes }} 分鐘</p>
        <h1>{{ story.title }}</h1>
        <p class="story-detail__subtitle">{{ story.subtitle }}</p>
        <div class="story-detail__actions"><a href="#story-body">開始閱讀 ↓</a><button type="button" @click="copyLink">複製連結 ↗</button></div>
        <p class="story-detail__copy-status" role="status">{{ copyStatus }}</p>
      </header>
      <figure><ConceptVisual :visual="story.visual" loading="eager" sizes="(max-width: 767px) calc(100vw - 32px), 900px" /><figcaption>概念影像，非景點實景攝影。<RouterLink to="/sources/">影像來源 ↗</RouterLink></figcaption></figure>
      <div id="story-body" class="story-detail__body"><p v-for="paragraph in story.paragraphs" :key="paragraph">{{ paragraph }}</p></div>
      <footer><p>本文為依景點資料撰寫的編輯短文，並非實地採訪或即時旅遊資訊。</p><RouterLink :to="`/attractions/${story.attraction}/`">查看相關景點與資料來源 <span aria-hidden="true">↗</span></RouterLink></footer>
    </article>
    <nav class="container story-detail__more" aria-label="繼續閱讀"><RouterLink :to="collectionLink">← 返回旅行手札</RouterLink><RouterLink v-if="nextStory && nextStory.slug !== story.slug" :to="{ path: `/stories/${nextStory.slug}/`, query: returnCategory ? { category: returnCategory } : {} }" class="story-detail__next"><span>下一篇 · {{ nextStory.category }}</span><strong>{{ nextStory.title }} ↗</strong></RouterLink></nav>
  </div>
  <div v-else class="container story-detail__missing"><h1>找不到這篇故事</h1><RouterLink to="/stories/">返回旅行手札</RouterLink></div>
</template>
