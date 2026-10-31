<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { attractions, cityById } from '../../data/attractions'
import { useFavoritesStore } from '../../stores/favorites'
import { useTripsStore } from '../../stores/trips'

const trips = useTripsStore()
const favorites = useFavoritesStore()
const router = useRouter()
const dialog = ref<HTMLDialogElement | null>(null)
const searchInput = ref<HTMLInputElement | null>(null)
const query = ref('')
const favoritesOnly = ref(false)
const selectedAttractionId = ref('')
const selectedTripId = ref('')
const selectedDay = ref(1)
const localMessage = ref('')
let trigger: HTMLElement | null = null

const matches = computed(() => attractions.filter(item =>
  (!favoritesOnly.value || favorites.isFavorite(item.id)) &&
  (!query.value.trim() || `${item.nameZh} ${item.nameEn ?? ''} ${cityById.get(item.cityId)?.nameZh ?? ''}`.toLocaleLowerCase().includes(query.value.trim().toLocaleLowerCase()))
).slice(0, 12))
const trip = computed(() => trips.find(selectedTripId.value))
const selectedAttraction = computed(() => attractions.find(item => item.id === selectedAttractionId.value))
const alreadyAdded = computed(() => trip.value?.days[selectedDay.value - 1]?.attractionIds.includes(selectedAttractionId.value) ?? false)

watch(() => trips.picker, async value => {
  if (!value) { if (dialog.value?.open) dialog.value.close(); return }
  trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null
  query.value = ''
  favoritesOnly.value = false
  selectedAttractionId.value = value.attractionId ?? ''
  selectedTripId.value = value.tripId && trips.find(value.tripId) ? value.tripId : trips.trips[0]?.id ?? ''
  selectedDay.value = value.dayNumber && value.dayNumber <= (trips.find(selectedTripId.value)?.days.length ?? 0) ? value.dayNumber : 1
  localMessage.value = ''
  await nextTick()
  dialog.value?.showModal()
  if (!value.attractionId) searchInput.value?.focus()
})

function close() { trips.closePicker(); trigger?.focus() }
function onDialogClose() { if (trips.picker) trips.closePicker(); trigger?.focus() }
function add() {
  const result = trips.addAttraction(selectedTripId.value, selectedDay.value, selectedAttractionId.value)
  if (result === 'added') close()
  else localMessage.value = result === 'duplicate' ? '已加入這一天。可改選其他日期。' : '請選擇景點、行程和日期。'
}
async function createTrip() { close(); await router.push('/planner/?create=1') }
</script>

<template>
  <dialog ref="dialog" class="trip-dialog" aria-labelledby="trip-dialog-title" @close="onDialogClose" @cancel="close">
    <div class="trip-dialog__heading"><div><p class="eyebrow">BUILD YOUR JOURNEY</p><h2 id="trip-dialog-title">加入旅程</h2></div><button type="button" class="trip-dialog__close" aria-label="關閉加入行程面板" @click="close">×</button></div>
    <template v-if="!trips.count"><p class="trip-dialog__empty">先建立一段旅程，再把想去的地方安排進每一天。</p><button type="button" class="button button--primary" @click="createTrip">建立行程 <span aria-hidden="true">↗</span></button></template>
    <template v-else>
      <div v-if="!trips.picker?.attractionId" class="trip-dialog__search">
        <label for="trip-attraction-search">搜尋景點名稱或縣市</label>
        <input id="trip-attraction-search" ref="searchInput" v-model="query" type="search" placeholder="例如：高美濕地" />
        <label class="trip-dialog__checkbox"><input v-model="favoritesOnly" type="checkbox" />只看收藏景點</label>
        <div class="trip-dialog__results" role="group" aria-label="選擇景點">
          <button v-for="item in matches" :key="item.id" type="button" :aria-pressed="selectedAttractionId === item.id" @click="selectedAttractionId = item.id; localMessage = ''"><span>{{ item.nameZh }}</span><small>{{ cityById.get(item.cityId)?.nameZh }}</small></button>
          <p v-if="!matches.length">沒有符合條件的景點。試試其他名稱，或取消只看收藏。</p>
        </div>
      </div>
      <p v-else class="trip-dialog__selected">{{ selectedAttraction?.nameZh }}</p>
      <div class="trip-dialog__fields"><div><label for="trip-target">選擇行程</label><select id="trip-target" v-model="selectedTripId" @change="selectedDay = 1; localMessage = ''"><option v-for="item in trips.trips" :key="item.id" :value="item.id">{{ item.title }}</option></select></div><div><label for="trip-day">安排日期</label><select id="trip-day" v-model.number="selectedDay" @change="localMessage = ''"><option v-for="day in trip?.days ?? []" :key="day.dayNumber" :value="day.dayNumber">Day {{ String(day.dayNumber).padStart(2, '0') }}</option></select></div></div>
      <p v-if="localMessage || alreadyAdded" class="trip-dialog__message" role="status">{{ localMessage || '已加入這一天。可改選其他日期。' }}</p>
      <button type="button" class="button button--primary trip-dialog__submit" :disabled="!selectedAttractionId || !selectedTripId || alreadyAdded" @click="add">{{ alreadyAdded ? '已加入這一天' : '加入這一天' }} <span aria-hidden="true">↗</span></button>
    </template>
  </dialog>
</template>
