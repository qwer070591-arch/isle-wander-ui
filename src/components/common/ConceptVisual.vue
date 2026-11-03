<script setup lang="ts">
import { computed } from 'vue'
import { mediumConceptImage, smallConceptImage, type ConceptImage } from '../../data/stitch-visuals'

const props = withDefaults(defineProps<{ visual: ConceptImage; loading?: 'lazy' | 'eager'; sizes?: string }>(), {
  loading: 'lazy',
  sizes: '(max-width: 767px) calc(100vw - 32px), 50vw',
})
const srcset = computed(() => {
  const small = smallConceptImage(props.visual.src)
  const medium = mediumConceptImage(props.visual.src)
  return small ? `${small} 900w, ${medium ? `${medium} 1200w, ` : ''}${props.visual.src} 1400w` : undefined
})
</script>

<template>
  <div class="concept-visual">
    <img :src="visual.src" :srcset="srcset" :sizes="sizes" :alt="visual.title" width="1400" height="1050" :loading="loading" decoding="async" />
  </div>
</template>
