<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ConfirmDialog from '../components/common/ConfirmDialog.vue'
import MediaSlot from '../components/common/MediaSlot.vue'
import ConceptVisual from '../components/common/ConceptVisual.vue'
import { attractionConcepts } from '../data/stitch-visuals'
import { attractions, categoryById, cityById } from '../data/attractions'
import { attractionMedia } from '../data/media'
import { useTripsStore } from '../stores/trips'
import type { Attraction } from '../types/content'

const route = useRoute()
const router = useRouter()
const trips = useTripsStore()
const trip = computed(() => trips.find(String(route.params.id)))
const title = ref('')
const length = ref(1)
const error = ref('')
const confirm = ref<InstanceType<typeof ConfirmDialog> | null>(null)
const moveTargets = ref<Record<string, string>>({})
const copyTargets = ref<Record<number, string>>({})
const copyingDay = ref<number | null>(null)
const byId = new Map(attractions.map(item => [item.id, item]))
const artByCategory: Record<Attraction['category'], string> = { nature: 'forest', coast: 'coast', trail: 'ridge', culture: 'terracotta', urban: 'street', arts: 'street', leisure: 'lake' }
const plannedDays = computed(() => trip.value?.days.filter(day => day.attractionIds.length).length ?? 0)
watch(() => trip.value?.id, () => { title.value = trip.value?.title ?? ''; length.value = trip.value?.days.length ?? 1; copyingDay.value = null }, { immediate: true })
function dayLabel(day: number) { return `Day ${String(day).padStart(2, '0')}` }
function names(ids: string[]) { return ids.map(id => byId.get(id)?.nameZh ?? '已移除的景點').join('、') }
function modified(value: string) { return new Intl.DateTimeFormat('zh-TW', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(value)) }
function targetDay(day: number) { return trip.value?.days[day - 1] }
function copyAdditions(from: number, to: number) { return targetDay(from)?.attractionIds.filter(id => !targetDay(to)?.attractionIds.includes(id)) ?? [] }

async function save() {
  if (!trip.value) return
  const clean = title.value.trim()
  if (!clean || clean.length > 80 || !Number.isInteger(Number(length.value)) || length.value < 1 || length.value > 7) { error.value = '請輸入 1–80 個字的名稱，並選擇 1–7 天。'; return }
  if (length.value < trip.value.days.length) {
    const removed = trip.value.days.slice(length.value)
    const scheduled = removed.flatMap(day => day.attractionIds.map(id => `${dayLabel(day.dayNumber)}：${byId.get(id)?.nameZh ?? '已移除的景點'}`))
    if (scheduled.length && !await confirm.value?.ask('減少旅行天數？', `將移除 ${dayLabel(length.value + 1)}～${dayLabel(trip.value.days.length)}，其中的安排也會刪除：${scheduled.join('、')}。`, '確認減少天數')) { length.value = trip.value.days.length; return }
  }
  error.value = ''
  trips.update(trip.value.id, clean, Number(length.value))
}
async function removeTrip() {
  if (!trip.value) return
  if (await confirm.value?.ask('刪除這段旅程？', `「${trip.value.title}」與全部每日安排將移除，景點收藏會保留。`, '刪除行程')) { trips.removeTrip(trip.value.id); await router.push('/planner/') }
}
function movePlace(from: number, id: string) {
  if (!trip.value) return
  const target = Number(moveTargets.value[`${from}-${id}`])
  if (trips.moveToDay(trip.value.id, from, target, id) === 'moved') delete moveTargets.value[`${from}-${id}`]
}
async function copyDay(from: number) {
  if (!trip.value) return
  const to = Number(copyTargets.value[from])
  const target = targetDay(to)
  const additions = copyAdditions(from, to)
  if (!target || !additions.length) { trips.copyDay(trip.value.id, from, to); return }
  if (target.attractionIds.length && !await confirm.value?.ask('合併單日安排？', `${dayLabel(to)} 目前有：${names(target.attractionIds)}。將在後方新增：${names(additions)}。原有順序不變。`, '確認合併')) return
  trips.copyDay(trip.value.id, from, to)
  copyingDay.value = null
}
</script>

<template>
  <div v-if="trip" class="trip-editor">
    <nav class="container breadcrumb" aria-label="麵包屑導覽"><RouterLink to="/">首頁</RouterLink><span aria-hidden="true">/</span><RouterLink to="/planner/">我的行程</RouterLink><span aria-hidden="true">/</span><span aria-current="page">{{ trip.title }}</span></nav>
    <header class="container trip-editor__hero"><p class="eyebrow"><span class="eyebrow__line"></span> A JOURNEY IN THE MAKING</p><h1>{{ trip.title }}</h1><p>{{ trip.days.length }} 天 · {{ trip.days.reduce((sum, day) => sum + day.attractionIds.length, 0) }} 個景點 · {{ plannedDays }} 天已安排。最後修改：{{ modified(trip.updatedAt) }}。</p><RouterLink class="text-link trip-editor__back" to="/planner/">返回我的行程 <span aria-hidden="true">↗</span></RouterLink></header>
    <div class="container trip-editor__layout"><aside class="trip-editor__settings"><p class="eyebrow">TRIP NOTES</p><h2>旅程設定</h2><form @submit.prevent="save"><label for="edit-trip-title">行程名稱</label><input id="edit-trip-title" v-model="title" type="text" maxlength="80" :aria-invalid="!!error" aria-describedby="edit-trip-error" @input="error = ''" /><label for="edit-trip-days">旅行天數</label><select id="edit-trip-days" v-model.number="length"><option v-for="day in 7" :key="day" :value="day">{{ day }} 天</option></select><p v-if="error" id="edit-trip-error" class="trip-form-error" role="alert">{{ error }}</p><button class="button button--primary" type="submit">儲存變更 <span aria-hidden="true">↗</span></button></form><button class="trip-editor__delete" type="button" @click="removeTrip">刪除整段旅程</button><p class="trip-editor__storage">{{ trips.storageAvailable ? '變更會保存在目前瀏覽器。' : '儲存不可用，變更僅在本次瀏覽期間保留。' }}</p><button v-if="!trips.storageAvailable" class="trip-editor__retry" type="button" @click="trips.retrySave()">重新嘗試儲存</button></aside>
      <section class="trip-editor__days" aria-label="每日行程"><article v-for="day in trip.days" :key="day.dayNumber" class="trip-day" :class="{ 'trip-day--empty': !day.attractionIds.length }">
        <div class="trip-day__head"><div><p class="eyebrow">{{ dayLabel(day.dayNumber).toUpperCase() }}</p><h2>第 {{ day.dayNumber }} 天</h2><p>{{ day.attractionIds.length }} 個景點</p></div><div class="trip-day__head-actions"><button v-if="day.attractionIds.length && trip.days.length > 1" class="trip-day__copy" type="button" :aria-expanded="copyingDay === day.dayNumber" @click="copyingDay = copyingDay === day.dayNumber ? null : day.dayNumber">複製此日安排</button><button class="trip-day__add" type="button" :aria-label="`為第 ${day.dayNumber} 天加入景點`" @click="trips.openPicker(undefined, trip.id, day.dayNumber)">＋ 加入景點</button></div></div>
        <div v-if="copyingDay === day.dayNumber" class="trip-day__copy-panel"><label :for="`copy-day-${day.dayNumber}`">複製到哪一天？</label><select :id="`copy-day-${day.dayNumber}`" v-model="copyTargets[day.dayNumber]"><option value="">選擇日期</option><option v-for="target in trip.days.filter(item => item.dayNumber !== day.dayNumber)" :key="target.dayNumber" :value="String(target.dayNumber)">{{ dayLabel(target.dayNumber) }}</option></select><template v-if="copyTargets[day.dayNumber]"><p>目標日期目前：{{ targetDay(Number(copyTargets[day.dayNumber]))?.attractionIds.length ? names(targetDay(Number(copyTargets[day.dayNumber]))!.attractionIds) : '尚無景點' }}</p><p>預計新增：{{ copyAdditions(day.dayNumber, Number(copyTargets[day.dayNumber])).length ? names(copyAdditions(day.dayNumber, Number(copyTargets[day.dayNumber]))) : '沒有新景點' }}</p></template><button type="button" class="trip-day__copy-submit" :disabled="!copyTargets[day.dayNumber] || !copyAdditions(day.dayNumber, Number(copyTargets[day.dayNumber])).length" @click="copyDay(day.dayNumber)">合併安排</button></div>
        <ol v-if="day.attractionIds.length" class="trip-day__list"><li v-for="(id, index) in day.attractionIds" :key="id" class="trip-place"><template v-if="byId.get(id)"><span class="trip-place__index">{{ String(index + 1).padStart(2, '0') }}</span><div class="trip-place__media"><ConceptVisual v-if="attractionConcepts[byId.get(id)!.slug] && !byId.get(id)!.coverMediaId" :visual="attractionConcepts[byId.get(id)!.slug]" /><MediaSlot v-else :art="artByCategory[byId.get(id)!.category]" :photo="byId.get(id)!.coverMediaId ? attractionMedia[byId.get(id)!.coverMediaId!] : undefined" :show-note="false" /></div><div class="trip-place__body"><p>{{ cityById.get(byId.get(id)!.cityId)?.nameZh }} · {{ categoryById.get(byId.get(id)!.category)?.name }}</p><h3>{{ byId.get(id)!.nameZh }}</h3><RouterLink :to="{ path: `/attractions/${byId.get(id)!.slug}/`, query: { from: route.fullPath } }">查看景點 ↗</RouterLink></div><div class="trip-place__controls"><button type="button" :aria-label="`將${byId.get(id)!.nameZh}上移`" :disabled="index === 0" @click="trips.moveAttraction(trip.id, day.dayNumber, index, -1)"><span aria-hidden="true">↑</span><span class="trip-place__control-label">上移</span></button><button type="button" :aria-label="`將${byId.get(id)!.nameZh}下移`" :disabled="index === day.attractionIds.length - 1" @click="trips.moveAttraction(trip.id, day.dayNumber, index, 1)"><span aria-hidden="true">↓</span><span class="trip-place__control-label">下移</span></button><button type="button" :aria-label="`從第 ${day.dayNumber} 天移除${byId.get(id)!.nameZh}`" @click="trips.removeAttraction(trip.id, day.dayNumber, id)">移除</button></div><div v-if="trip.days.length > 1" class="trip-place__move"><label :for="`move-${day.dayNumber}-${id}`">移動到其他日期</label><select :id="`move-${day.dayNumber}-${id}`" v-model="moveTargets[`${day.dayNumber}-${id}`]"><option value="">選擇日期</option><option v-for="target in trip.days.filter(item => item.dayNumber !== day.dayNumber)" :key="target.dayNumber" :value="String(target.dayNumber)">{{ dayLabel(target.dayNumber) }}</option></select><button type="button" :disabled="!moveTargets[`${day.dayNumber}-${id}`]" :aria-label="`將${byId.get(id)!.nameZh}移動到所選日期`" @click="movePlace(day.dayNumber, id)">移動</button></div></template></li></ol>
        <div v-else class="trip-day__empty"><p>這一天還沒有安排景點。</p><button type="button" @click="trips.openPicker(undefined, trip.id, day.dayNumber)">挑一個想去的地方 ↗</button></div>
      </article></section>
    </div><ConfirmDialog ref="confirm" />
  </div>
  <div v-else class="container trip-not-found"><p class="eyebrow">404 / TRIP NOT FOUND</p><h1>找不到這段旅程</h1><p>行程可能已刪除，或網址有誤。</p><RouterLink class="button button--primary" to="/planner/">返回我的行程</RouterLink></div>
</template>
