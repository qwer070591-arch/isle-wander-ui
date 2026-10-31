<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ConfirmDialog from '../components/common/ConfirmDialog.vue'
import ConceptGallery from '../components/common/ConceptGallery.vue'
import { plannerMoodboard } from '../data/stitch-visuals'
import { makeBackup, MAX_BACKUP_BYTES, MAX_BACKUP_TRIPS, validateBackup, type BackupPreview } from '../data/trip-backup'
import { useTripsStore } from '../stores/trips'
import { useFavoritesStore } from '../stores/favorites'

const trips = useTripsStore()
const favorites = useFavoritesStore()
const router = useRouter()
const route = useRoute()
const name = ref('')
const length = ref(2)
const error = ref('')
const form = ref<HTMLElement | null>(null)
const input = ref<HTMLInputElement | null>(null)
const confirm = ref<InstanceType<typeof ConfirmDialog> | null>(null)
const backupText = ref('')
const backupName = ref('')
const backupPreview = ref<BackupPreview | null>(null)
const backupError = ref('')
const backupResult = ref('')
onMounted(async () => { if (route.query.create === '1') { await nextTick(); form.value?.scrollIntoView(); input.value?.focus() } })

async function create() {
  error.value = ''
  if (trips.count >= MAX_BACKUP_TRIPS) { error.value = '行程已達 100 筆上限，請先匯出或刪除舊行程。'; return }
  const id = trips.create(name.value, Number(length.value))
  if (!id) { error.value = '請輸入 1–80 個字的行程名稱，並選擇 1–7 天。'; input.value?.focus(); return }
  await router.push(`/planner/${id}/`)
}
async function remove(id: string, title: string) {
  if (await confirm.value?.ask('刪除這段旅程？', `「${title}」及其中安排的所有景點將從此瀏覽器移除，收藏不受影響。`, '刪除行程')) trips.removeTrip(id)
}
function placeCount(id: string) { return trips.find(id)?.days.reduce((sum, day) => sum + day.attractionIds.length, 0) ?? 0 }
function plannedDays(id: string) { return trips.find(id)?.days.filter(day => day.attractionIds.length).length ?? 0 }
function modified(value: string) { return new Intl.DateTimeFormat('zh-TW', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(value)) }
function exportBackup() {
  if (!trips.count) { backupResult.value = '目前沒有行程可匯出。'; return }
  const blob = new Blob([JSON.stringify(makeBackup(trips.trips), null, 2)], { type: 'application/json;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  const date = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Taipei', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date())
  link.href = url; link.download = `isle-and-wander-trips-${date}.json`
  link.click()
  window.setTimeout(() => URL.revokeObjectURL(url), 1000)
  backupResult.value = '行程備份已開始下載，請確認瀏覽器的下載項目。'
}
async function chooseBackup(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  backupPreview.value = null; backupError.value = ''; backupResult.value = ''; backupText.value = ''; backupName.value = file?.name ?? ''
  if (!file) return
  if (file.size > MAX_BACKUP_BYTES) { backupError.value = '備份檔超過 2 MB 上限。'; input.value = ''; return }
  try {
    const text = await file.text()
    const preview = validateBackup(text, new Set(trips.trips.map(item => item.id)))
    backupText.value = text
    backupPreview.value = preview
  } catch (error) { backupError.value = error instanceof Error ? error.message : '無法讀取備份檔。' }
  input.value = ''
}
async function applyBackup(mode: 'merge' | 'replace') {
  if (!backupText.value || !backupPreview.value) return
  let preview: BackupPreview
  try { preview = validateBackup(backupText.value, new Set(trips.trips.map(item => item.id))) }
  catch (error) { backupError.value = error instanceof Error ? error.message : '備份內容無效。'; return }
  backupPreview.value = preview
  if (!preview.valid.length) { backupError.value = '沒有可匯入的有效行程，現有資料未變更。'; return }
  if (mode === 'merge' && trips.count + preview.valid.length > MAX_BACKUP_TRIPS) { backupError.value = '合併後會超過 100 筆行程上限，現有資料未變更。'; return }
  if (mode === 'replace') {
    if (preview.rejected.length) { backupError.value = '備份含不合法行程，為避免資料遺失，無法取代全部。請先修正備份。'; return }
    if (!await confirm.value?.ask('取代全部行程？', `目前 ${trips.count} 筆行程將由備份中的 ${preview.valid.length} 筆完全取代。此操作無法復原，請先匯出現有行程。`, '確認取代全部')) return
  }
  const result = trips.importTrips(preview.valid, mode)
  if (!result) { backupError.value = '匯入後會超過 100 筆行程上限，現有資料未變更。'; return }
  backupResult.value = `${result.imported} 筆行程已${mode === 'merge' ? '合併' : '取代'}${result.remapped ? `；${result.remapped} 筆 ID 衝突已改用新 ID` : ''}。${result.saved ? '已儲存在此瀏覽器。' : '瀏覽器無法寫入，僅在本次瀏覽期間保留。'}`
  backupPreview.value = null; backupText.value = ''
}
</script>

<template>
  <div class="planner-page">
    <header class="container planner-hero"><p class="eyebrow"><span class="eyebrow__line"></span> TRAVELER'S LOG & ATELIER / 旅人工作室</p><div class="planner-hero__row"><div><h1>把想去的地方，<br /><em>編成自己的旅程。</em></h1><p>從一個景點開始，慢慢安排每天的停留。你目前有 {{ trips.count }} 段行程、{{ favorites.count }} 個收藏景點。</p></div><RouterLink class="button button--primary planner-hero__new" to="/planner/?create=1">＋ 建立新行程</RouterLink></div></header>
    <nav class="container planner-tabs" aria-label="旅程與收藏"><RouterLink to="/planner/" aria-current="page">自訂行程 <span>{{ trips.count }}</span></RouterLink><RouterLink to="/favorites/">我的收藏 <span>{{ favorites.count }}</span></RouterLink></nav>
    <div class="container planner-overview">
      <section ref="form" class="planner-create" aria-labelledby="planner-create-title"><p class="eyebrow">BEGIN A NEW JOURNEY</p><h2 id="planner-create-title">建立我的旅程</h2><form @submit.prevent="create"><label for="new-trip-name">行程名稱</label><input id="new-trip-name" ref="input" v-model="name" type="text" maxlength="80" placeholder="例如：沿著東海岸慢慢走" :aria-invalid="!!error" aria-describedby="new-trip-error" @input="error = ''" /><label for="new-trip-days">旅行天數</label><select id="new-trip-days" v-model.number="length"><option v-for="day in 7" :key="day" :value="day">{{ day }} 天</option></select><p v-if="error" id="new-trip-error" class="trip-form-error" role="alert">{{ error }}</p><button class="button button--primary" type="submit">建立行程 <span aria-hidden="true">↗</span></button></form></section>
      <section class="planner-list" aria-labelledby="planner-list-title"><p class="eyebrow">SAVED IN THIS BROWSER</p><h2 id="planner-list-title">我的行程</h2><div v-if="trips.count" class="planner-list__items"><article v-for="(trip, index) in trips.trips" :key="trip.id" class="planner-list__card"><span class="planner-list__index">{{ String(index + 1).padStart(2, '0') }}</span><div><p class="planner-list__meta">{{ trip.days.length }} 天 · {{ placeCount(trip.id) }} 個景點 · {{ plannedDays(trip.id) }} 天已安排</p><h3>{{ trip.title }}</h3><p class="planner-list__updated">最後修改：{{ modified(trip.updatedAt) }}</p><RouterLink class="text-link" :to="`/planner/${trip.id}/`">編輯旅程 <span aria-hidden="true">↗</span></RouterLink></div><div class="planner-list__actions"><button type="button" :aria-label="`複製行程：${trip.title}`" @click="trips.duplicateTrip(trip.id)">複製</button><button type="button" :aria-label="`刪除行程：${trip.title}`" @click="remove(trip.id, trip.title)">刪除</button></div></article></div><div v-else class="planner-empty"><h3>每一段旅程，都從一個想去的地方開始。</h3><p>目前還沒有行程。建立旅程後，就能從景點探索、收藏或編輯器安排每天的停留。</p><RouterLink class="text-link" to="/explore/">先探索景點 <span aria-hidden="true">↗</span></RouterLink></div></section>
    </div>
    <ConceptGallery title="旅程影像靈感" :items="plannerMoodboard" description="這些影像僅供規劃靈感參考，不代表你已儲存的行程內容或已預訂的住宿。" />
    <section class="container planner-backup" aria-labelledby="planner-backup-title"><p class="eyebrow">KEEP A COPY</p><h2 id="planner-backup-title">備份你的旅程</h2><p>下載 JSON 備份，或從本站 v1 備份檔匯入。資料仍只保存在目前瀏覽器。</p><div class="planner-backup__actions"><button type="button" class="button trip-button--outline" @click="exportBackup">匯出我的行程</button><label for="trip-backup-file" class="button trip-button--outline">匯入行程備份</label><input id="trip-backup-file" class="planner-backup__file" type="file" accept=".json,application/json" aria-describedby="trip-backup-help" @change="chooseBackup" /></div><p id="trip-backup-help" class="planner-backup__help">限 2 MB、100 筆行程；匯入前可檢視並選擇合併或取代。</p><p v-if="backupError" class="trip-form-error" role="alert">{{ backupError }}</p><p v-if="backupResult" class="planner-backup__result" role="status">{{ backupResult }}</p><div v-if="backupPreview" class="planner-backup__preview"><h3>匯入預覽 · {{ backupName }}</h3><p>備份內 {{ backupPreview.total }} 筆；可匯入 {{ backupPreview.valid.length }} 筆；不合法 {{ backupPreview.rejected.length }} 筆；與現有 ID 衝突 {{ backupPreview.conflicts }} 筆。</p><p>合併後預計 {{ trips.count + backupPreview.valid.length }} 筆（衝突 ID 重新產生）；取代後預計 {{ backupPreview.valid.length }} 筆（目前行程全部移除）。</p><ul v-if="backupPreview.rejected.length"><li v-for="item in backupPreview.rejected" :key="item.index">第 {{ item.index }} 筆：{{ item.reason }}</li></ul><p v-if="trips.count + backupPreview.valid.length > MAX_BACKUP_TRIPS" class="trip-form-error">合併後超過 100 筆上限；可改用取代模式，或先整理現有行程。</p><div class="planner-backup__apply"><button type="button" class="button button--primary" :disabled="!backupPreview.valid.length || trips.count + backupPreview.valid.length > MAX_BACKUP_TRIPS" @click="applyBackup('merge')">合併匯入</button><button type="button" class="button trip-button--outline" :disabled="!backupPreview.valid.length || !!backupPreview.rejected.length" @click="applyBackup('replace')">取代全部行程</button></div><p v-if="backupPreview.rejected.length" class="planner-backup__help">不合法行程不會在合併模式中匯入；含不合法資料的備份不可取代全部。</p></div></section>
    <div class="container planner-storage"><p>{{ trips.storageAvailable ? '行程只保存在目前瀏覽器。清除瀏覽資料後，行程可能消失。' : '目前無法存入瀏覽器；行程僅在本次瀏覽期間保留，重新整理後可能消失。' }}</p><button v-if="!trips.storageAvailable" type="button" @click="trips.retrySave()">重新嘗試儲存</button></div>
    <ConfirmDialog ref="confirm" />
  </div>
</template>
