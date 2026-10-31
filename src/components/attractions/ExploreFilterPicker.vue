<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref } from 'vue'
import { cities } from '../../data/cities'
import type { RegionId } from '../../types/content'

const props = defineProps<{ modelValue: string }>()
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()
const regionOptions: { id: RegionId; label: string }[] = [
  { id: 'north', label: '北部' }, { id: 'central', label: '中部' },
  { id: 'south', label: '南部' }, { id: 'east', label: '東部' },
  { id: 'islands', label: '離島' },
]
const root = ref<HTMLElement | null>(null)
const trigger = ref<HTMLButtonElement | null>(null)
const panel = ref<HTMLElement | null>(null)
const open = ref(false)
const activeRegion = ref<RegionId>('north')
const selectedCity = computed(() => cities.find(city => city.slug === props.modelValue))
const visibleCities = computed(() => cities.filter(city => city.regionId === activeRegion.value))
const activeLabel = computed(() => regionOptions.find(region => region.id === activeRegion.value)?.label)

function close(restoreFocus = false) {
  open.value = false
  if (restoreFocus) void nextTick(() => trigger.value?.focus())
}
async function toggle() {
  if (open.value) return close(true)
  activeRegion.value = selectedCity.value?.regionId ?? 'north'
  open.value = true
  await nextTick()
  if (!panel.value || getComputedStyle(panel.value).position !== 'static') return
  const bottom = panel.value?.getBoundingClientRect().bottom
  if (bottom && bottom > window.innerHeight - 16) window.scrollBy(0, bottom - window.innerHeight + 16)
}
function choose(slug: string) {
  emit('update:modelValue', slug)
  close(true)
}
function onKeydown(event: KeyboardEvent) {
  if (open.value && event.key === 'Escape') {
    event.preventDefault()
    close(true)
  }
}
function onPointerDown(event: PointerEvent) {
  if (open.value && !root.value?.contains(event.target as Node)) close()
}
document.addEventListener('pointerdown', onPointerDown)
onBeforeUnmount(() => document.removeEventListener('pointerdown', onPointerDown))
</script>

<template>
  <div ref="root" class="explore-city-picker" :class="{ 'explore-city-picker--open': open }" @keydown="onKeydown">
    <span id="explore-city-label" class="explore-city-picker__label">縣市</span>
    <button id="explore-city" ref="trigger" type="button" class="explore-city-picker__trigger" :aria-expanded="open" aria-controls="explore-city-panel" aria-labelledby="explore-city-label explore-city-value" @click="toggle">
      <span id="explore-city-value">{{ selectedCity?.nameZh ?? '全部縣市' }}</span><svg class="explore-city-picker__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="m5 8 7 8 7-8" /></svg>
    </button>
    <div v-if="open" id="explore-city-panel" ref="panel" class="explore-city-picker__panel" aria-label="選擇縣市">
      <div class="explore-city-picker__heading"><div><p class="eyebrow">DISCOVER BY REGION</p><p>先選區域，再選縣市</p></div></div>
      <div class="explore-city-picker__regions" role="group" aria-label="旅遊區域">
        <button v-for="region in regionOptions" :key="region.id" type="button" :aria-pressed="activeRegion === region.id" @click="activeRegion = region.id">{{ region.label }}</button>
      </div>
      <div class="explore-city-picker__places" role="group" :aria-label="`${activeLabel}縣市`">
        <button v-for="place in visibleCities" :key="place.id" type="button" :aria-pressed="modelValue === place.slug" @click="choose(place.slug)">{{ place.nameZh }}</button>
      </div>
      <div class="explore-city-picker__footer"><button type="button" class="explore-city-picker__all" :aria-pressed="!modelValue" @click="choose('')">全部縣市／清除選擇</button></div>
    </div>
  </div>
</template>
