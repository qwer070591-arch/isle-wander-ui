<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { attractionBySlug, categoryById, cityById } from '../data/attractions'

const route = useRoute()
const attraction = computed(() => attractionBySlug.get(String(route.params.slug)) ?? null)
const city = computed(() => attraction.value ? cityById.get(attraction.value.cityId) : null)
watchEffect(() => { document.title = attraction.value ? `${attraction.value.nameZh}｜島嶼漫遊 ISLE & WANDER` : '找不到景點｜島嶼漫遊 ISLE & WANDER' })
</script>

<template>
  <div class="container attraction-pending">
    <nav class="breadcrumb" aria-label="麵包屑導覽"><RouterLink to="/">首頁</RouterLink><span aria-hidden="true">/</span><RouterLink to="/explore">探索景點</RouterLink><span aria-hidden="true">/</span><span aria-current="page">{{ attraction?.nameZh ?? '找不到景點' }}</span></nav>
    <div v-if="attraction"><p class="eyebrow">ATTRACTION NOTES · IN PROGRESS</p><h1>{{ attraction.nameZh }}</h1><p class="attraction-pending__meta">{{ city?.nameZh }} · {{ categoryById.get(attraction.category)?.name }}</p><p class="attraction-pending__lead">{{ attraction.shortDescription }}</p><p>完整景點指南仍在整理中。出發前請以官方資料確認現況。</p><p class="attraction-pending__source-id">觀光署資料 ID：{{ attraction.officialId }}</p><div class="attraction-pending__links"><RouterLink class="button button--primary" :to="{ path: '/explore', query: { city: city?.slug } }">探索{{ city?.nameZh }}其他景點</RouterLink><a class="text-link" :href="attraction.sourceUrl" target="_blank" rel="noopener noreferrer">查看官方資料來源 ↗</a></div></div>
    <div v-else><p class="eyebrow">ATTRACTION NOT FOUND</p><h1>找不到這個景點</h1><p>景點網址可能有誤，請返回探索清單重新選擇。</p><RouterLink class="button button--primary" to="/explore">返回探索景點</RouterLink></div>
  </div>
</template>
