<script setup lang="ts">
import { useTripsStore } from '../../stores/trips'
import type { Attraction } from '../../types/content'

defineProps<{ attraction: Attraction; compact?: boolean }>()
const trips = useTripsStore()
</script>

<template>
  <button class="add-trip-button" :class="{ 'add-trip-button--compact': compact }" type="button" :aria-label="`將${attraction.nameZh}加入行程`" @click="trips.openPicker(attraction.id)">
    <span aria-hidden="true">＋</span><span>加入行程</span>
  </button>
</template>
