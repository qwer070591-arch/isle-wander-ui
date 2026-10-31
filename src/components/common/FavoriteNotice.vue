<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue'
import { useFavoritesStore } from '../../stores/favorites'
import { useTripsStore } from '../../stores/trips'

const favorites = useFavoritesStore()
const trips = useTripsStore()
const visible = ref(false)
const message = ref('')
let timer: ReturnType<typeof setTimeout> | undefined
function show(value: string) {
  clearTimeout(timer)
  message.value = value
  visible.value = true
  timer = setTimeout(() => { visible.value = false }, 3200)
}
watch(() => favorites.announcementVersion, () => show(favorites.announcement))
watch(() => trips.announcementVersion, () => show(trips.announcement))
onBeforeUnmount(() => clearTimeout(timer))
</script>

<template>
  <div class="favorite-notice" role="status" aria-live="polite" aria-atomic="true">{{ visible ? message : '' }}</div>
</template>
