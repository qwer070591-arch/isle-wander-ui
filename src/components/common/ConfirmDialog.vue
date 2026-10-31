<script setup lang="ts">
import { nextTick, ref } from 'vue'

const dialog = ref<HTMLDialogElement | null>(null)
const heading = ref('')
const description = ref('')
const action = ref('確認')
let resolvePending: ((value: boolean) => void) | null = null
let trigger: HTMLElement | null = null

async function ask(title: string, body: string, button: string): Promise<boolean> {
  if (resolvePending) return false
  trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null
  heading.value = title; description.value = body; action.value = button
  await nextTick()
  dialog.value?.showModal()
  return new Promise(resolve => { resolvePending = resolve })
}
function finish(confirmed: boolean) {
  dialog.value?.close()
  resolvePending?.(confirmed)
  resolvePending = null
  nextTick(() => trigger?.focus())
}
function onClose() { if (resolvePending) finish(false) }
defineExpose({ ask })
</script>

<template>
  <dialog ref="dialog" class="trip-confirm" aria-labelledby="trip-confirm-title" aria-describedby="trip-confirm-description" @cancel.prevent="finish(false)" @close="onClose">
    <p class="eyebrow">PLEASE CONFIRM</p><h2 id="trip-confirm-title">{{ heading }}</h2><p id="trip-confirm-description">{{ description }}</p>
    <div class="trip-confirm__actions"><button type="button" class="button trip-button--outline" autofocus @click="finish(false)">取消</button><button type="button" class="button button--primary" @click="finish(true)">{{ action }}</button></div>
  </dialog>
</template>
