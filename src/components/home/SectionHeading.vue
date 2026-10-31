<script setup lang="ts">
defineProps<{ number: string; eyebrow: string; title: string; headingId: string; description?: string; align?: 'left' | 'center' }>()
</script>

<template>
  <div class="section-heading" :class="{ 'section-heading--center': align === 'center' }">
    <p class="eyebrow"><span class="section-heading__number">{{ number }}</span> {{ eyebrow }}</p>
    <h2 :id="headingId">{{ title }}</h2>
    <p v-if="description" class="section-heading__description">{{ description }}</p>
  </div>
</template>
