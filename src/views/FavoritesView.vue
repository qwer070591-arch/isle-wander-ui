<script setup lang="ts">
import { nextTick } from 'vue'
import AttractionCard from '../components/attractions/AttractionCard.vue'
import { useFavoritesStore } from '../stores/favorites'
import { useTripsStore } from '../stores/trips'

const favorites = useFavoritesStore()
const trips = useTripsStore()

async function onFavoriteChange(active: boolean, index: number) {
  if (active) return
  await nextTick()
  const buttons = [...document.querySelectorAll<HTMLButtonElement>('.favorites-page .attraction-card__favorite')]
  const next = buttons[index] ?? buttons[index - 1]
  if (next) next.focus()
  else document.querySelector<HTMLElement>('.favorites-empty .button')?.focus()
}
</script>

<template>
  <div class="favorites-page">
    <header class="container favorites-hero">
      <p class="eyebrow"><span class="eyebrow__line"></span> PLACES TO KEEP</p>
      <div class="favorites-hero__layout"><div><h1>把喜歡的地方，<br /><em>留給下一次出發。</em></h1><p>從山海與街區中，慢慢收集想親自走訪的景點。</p></div><p class="favorites-hero__count" role="status">{{ favorites.count }} <span>個收藏景點</span></p></div>
    </header>
    <nav class="container favorites-tabs" aria-label="旅程與收藏"><RouterLink to="/planner/">自訂行程 <span>{{ trips.count }}</span></RouterLink><RouterLink to="/favorites/" aria-current="page">我的收藏 <span>{{ favorites.count }}</span></RouterLink></nav>
    <section class="container favorites-content" aria-labelledby="favorites-list-title">
      <div v-if="favorites.count"><div class="favorites-content__heading"><div><p class="eyebrow">YOUR EDITED SELECTION</p><h2 id="favorites-list-title">我的景點收藏</h2></div><RouterLink class="text-link" to="/explore/">繼續探索景點 <span aria-hidden="true">↗</span></RouterLink></div><div class="attraction-grid favorites-grid"><AttractionCard v-for="(item, index) in favorites.items" :key="item.id" :attraction="item" @favorite-change="onFavoriteChange($event, index)" /></div></div>
      <div v-else class="favorites-empty"><p class="eyebrow">A JOURNEY BEGINS HERE</p><h2 id="favorites-list-title">旅程的起點，從喜歡的地方開始。</h2><p>還沒有收藏景點。先探索台灣的山海與街區，把想去的地方留在這裡。</p><RouterLink class="button button--primary" to="/explore/">探索景點 <span aria-hidden="true">↗</span></RouterLink></div>
      <p class="favorites-content__storage">{{ favorites.storageAvailable ? '收藏保存在目前瀏覽器。清除瀏覽資料後，收藏可能消失。' : '目前無法存入瀏覽器；收藏僅在本次瀏覽期間保留，重新整理後可能消失。' }}</p>
    </section>
  </div>
</template>
