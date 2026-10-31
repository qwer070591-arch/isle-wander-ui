<script setup lang="ts">
import { ref } from 'vue'
import type { PhotoAsset } from '../../types/content'

withDefaults(defineProps<{ art?: string; caption?: string; showNote?: boolean; photo?: PhotoAsset; loading?: 'eager' | 'lazy'; priority?: 'high' | 'auto' }>(), {
  art: 'ridge',
  caption: '',
  showNote: true,
  loading: 'lazy',
  priority: 'auto',
})
const imageFailed = ref(false)
</script>

<template>
  <div class="media-slot" :class="[`media-slot--${art}`, { 'media-slot--photo': photo && !imageFailed }]">
    <div v-if="!photo || imageFailed" class="media-slot__illustration" aria-hidden="true">
      <div class="media-slot__sun"></div>
      <div class="media-slot__far"></div>
      <div class="media-slot__mid"></div>
      <div class="media-slot__near"></div>
    </div>
    <picture v-if="photo && !imageFailed">
      <source v-if="photo.mobileSrc" media="(max-width: 767px)" :srcset="photo.mobileSrc" />
      <img :src="photo.src" :alt="photo.alt" :width="photo.width" :height="photo.height" :loading="loading" :fetchpriority="priority" decoding="async" @error="imageFailed = true" />
    </picture>
    <span v-if="photo && !imageFailed" class="media-slot__caption">{{ photo.caption }}</span>
    <span v-else-if="caption" class="media-slot__caption">{{ caption }}</span>
    <span v-if="showNote && (!photo || imageFailed)" class="media-slot__note">{{ caption ? 'CONCEPT VISUAL · 影像待授權補入' : '概念視覺' }}</span>
  </div>
</template>
