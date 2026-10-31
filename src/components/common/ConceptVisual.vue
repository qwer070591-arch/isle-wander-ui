<script setup lang="ts">
import { computed } from 'vue'
import { smallConceptImage, type ConceptImage } from '../../data/stitch-visuals'

const props = withDefaults(defineProps<{ visual: ConceptImage; loading?: 'lazy' | 'eager'; sizes?: string }>(), {
  loading: 'lazy',
  sizes: '(max-width: 767px) calc(100vw - 32px), 50vw',
})
const srcset = computed(() => {
  const small = smallConceptImage(props.visual.src)
  return small ? `${small} 900w, ${props.visual.src} 1400w` : undefined
})
</script>

<template>
  <div class="concept-visual">
    <img :src="visual.src" :srcset="srcset" :sizes="sizes" :alt="visual.title" :loading="loading" decoding="async" />
  </div>
</template>
