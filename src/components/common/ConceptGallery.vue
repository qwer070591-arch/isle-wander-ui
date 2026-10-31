<script setup lang="ts">
import { computed, ref } from 'vue'
import type { ConceptImage } from '../../data/stitch-visuals'
import ConceptVisual from './ConceptVisual.vue'

const props = defineProps<{ title: string; items: ConceptImage[]; description?: string }>()
const dialog = ref<HTMLDialogElement | null>(null)
const selectedIndex = ref<number | null>(null)
const selected = computed(() => selectedIndex.value === null ? null : props.items[selectedIndex.value] ?? null)
function open(index: number) {
  if (!props.items[index]) return
  selectedIndex.value = index
  dialog.value?.showModal()
}
function close() { dialog.value?.close() }
function move(direction: number) {
  if (selectedIndex.value === null || !props.items.length) return
  selectedIndex.value = (selectedIndex.value + direction + props.items.length) % props.items.length
}
function onKeydown(event: KeyboardEvent) {
  if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1) }
  if (event.key === 'ArrowRight') { event.preventDefault(); move(1) }
}
</script>

<template>
  <section class="container concept-gallery" aria-labelledby="concept-gallery-title">
    <div class="concept-gallery__head"><div><p class="eyebrow">VISUAL NOTES</p><h2 id="concept-gallery-title">{{ title }}</h2></div><p>{{ description ?? '影像提案，非實景攝影。' }} <RouterLink to="/sources/">影像來源 ↗</RouterLink></p></div>
    <div class="concept-gallery__grid"><button v-for="(item, index) in items" :key="item.src" type="button" :aria-label="`放大檢視${item.title}`" @click="open(index)"><ConceptVisual :visual="item" /><span>{{ item.title }} <span aria-hidden="true">↗</span></span></button></div>
    <dialog ref="dialog" class="concept-gallery__dialog" aria-label="影像預覽" @close="selectedIndex = null" @keydown="onKeydown">
      <button type="button" class="concept-gallery__close" aria-label="關閉影像預覽" @click="close">×</button>
      <figure v-if="selected"><img :src="selected.src" :alt="selected.title" /><figcaption aria-live="polite">{{ selected.title }}</figcaption></figure>
      <div v-if="selected && items.length > 1" class="concept-gallery__controls">
        <button type="button" aria-label="上一張影像" @click="move(-1)">←</button>
        <span aria-label="影像順序">{{ (selectedIndex ?? 0) + 1 }} / {{ items.length }}</span>
        <button type="button" aria-label="下一張影像" @click="move(1)">→</button>
      </div>
    </dialog>
  </section>
</template>
