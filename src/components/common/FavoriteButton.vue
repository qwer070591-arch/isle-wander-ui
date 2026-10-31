<script setup lang="ts">
import { computed, ref } from 'vue'
import { useFavoritesStore } from '../../stores/favorites'
import type { Attraction } from '../../types/content'

const props = withDefaults(defineProps<{ attraction: Attraction; variant?: 'icon' | 'text'; disabled?: boolean }>(), {
  variant: 'icon',
  disabled: false,
})
const emit = defineEmits<{ change: [active: boolean] }>()
const favorites = useFavoritesStore()
const icon = ref<SVGSVGElement | null>(null)
const active = computed(() => favorites.isFavorite(props.attraction.id))
const action = computed(() => active.value ? '取消收藏' : '加入收藏')

function toggle() {
  const next = favorites.toggle(props.attraction.id)
  if (next === null) return
  emit('change', next)
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    icon.value?.getAnimations().forEach((animation) => animation.cancel())
    icon.value?.animate(
      [{ transform: 'scale(1)' }, { transform: 'scale(1.2)', offset: 0.42 }, { transform: 'scale(1)' }],
      { duration: 340, easing: 'ease-out' },
    )
  }
}
</script>

<template>
  <button type="button" class="favorite-button" :class="`favorite-button--${variant}`" :disabled="disabled" :aria-label="`${action}：${attraction.nameZh}`" :aria-pressed="active" :title="`${action}：${attraction.nameZh}`" @click="toggle">
    <svg ref="icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M20.7 5.1a5.2 5.2 0 0 0-7.4 0L12 6.4l-1.3-1.3a5.2 5.2 0 0 0-7.4 7.4L12 21l8.7-8.5a5.2 5.2 0 0 0 0-7.4Z" /></svg>
    <span v-if="variant === 'text'">{{ action }}</span>
  </button>
</template>
