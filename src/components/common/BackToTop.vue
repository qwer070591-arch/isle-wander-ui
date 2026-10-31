<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const visible = ref(false)
function updateVisibility() { visible.value = window.scrollY > Math.max(700, window.innerHeight * 0.9) }
function goTop() {
  window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
  document.getElementById('main-content')?.focus({ preventScroll: true })
}
onMounted(() => {
  updateVisibility()
  window.addEventListener('scroll', updateVisibility, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', updateVisibility))
</script>

<template>
  <Transition name="back-to-top">
    <button v-if="visible" type="button" class="back-to-top" aria-label="回到頁首" title="回到頁首" @click="goTop">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 13 7-7 7 7M12 6v12" /></svg>
    </button>
  </Transition>
</template>

<style scoped>
.back-to-top { position: fixed; z-index: 30; right: max(20px, env(safe-area-inset-right)); bottom: max(20px, env(safe-area-inset-bottom)); display: inline-flex; align-items: center; justify-content: center; width: 48px; height: 48px; border: 1px solid var(--color-forest); border-radius: 50%; background: var(--color-ink); color: var(--color-paper); box-shadow: var(--shadow-float); cursor: pointer; transition: background .2s ease, transform .2s ease; }
.back-to-top svg { width: 22px; height: 22px; }
.back-to-top:hover { background: var(--color-forest); transform: translateY(-3px); }
.back-to-top:focus-visible { outline: 3px solid var(--color-clay); outline-offset: 3px; }
.back-to-top-enter-active, .back-to-top-leave-active { transition: opacity .2s ease, transform .2s ease; }
.back-to-top-enter-from, .back-to-top-leave-to { opacity: 0; transform: translateY(10px); }
:global(body.nav-open) .back-to-top { display: none; }
@media (prefers-reduced-motion: reduce) { .back-to-top, .back-to-top-enter-active, .back-to-top-leave-active { transition: none; } .back-to-top:hover { transform: none; } }
</style>
