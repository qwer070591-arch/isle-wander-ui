<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useFavoritesStore } from '../../stores/favorites'

const route = useRoute()
const favorites = useFavoritesStore()
const open = ref(false)
const menuButton = ref<HTMLButtonElement | null>(null)
const drawer = ref<HTMLElement | null>(null)
const links = [
  { to: '/destinations/', label: '目的地' },
  { to: '/explore/', label: '探索景點' },
  { to: '/stays/', label: '精選住宿' },
  { to: '/stories/', label: '旅行故事' },
  { to: '/planner/', label: '我的行程' },
  { to: '/favorites/', label: '收藏' },
]

function closeMenu(restoreFocus = true) {
  if (!open.value) return
  open.value = false
  document.documentElement.classList.remove('nav-open')
  if (restoreFocus) nextTick(() => menuButton.value?.focus())
}

async function toggleMenu() {
  if (open.value) { closeMenu(); return }
  open.value = true
  document.documentElement.classList.add('nav-open')
  await nextTick()
  drawer.value?.querySelector<HTMLElement>('a, button')?.focus()
}

function onKeydown(event: KeyboardEvent) {
  if (!open.value) return
  if (event.key === 'Escape') { event.preventDefault(); closeMenu(); return }
  if (event.key !== 'Tab' || !drawer.value) return
  const focusables = Array.from(drawer.value.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'))
  const first = focusables[0]
  const last = focusables.at(-1)
  if (!first || !last) return
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
}

watch(() => route.fullPath, () => closeMenu(false))
onBeforeUnmount(() => document.documentElement.classList.remove('nav-open'))
</script>

<template>
  <header class="site-header" @keydown="onKeydown">
    <div class="container site-header__inner">
      <RouterLink class="wordmark" to="/" aria-label="島嶼漫遊，返回首頁" @click="closeMenu(false)">
        <span class="wordmark__en">ISLE <i>&</i> WANDER</span>
        <span class="wordmark__zh">島嶼漫遊</span>
      </RouterLink>

      <nav class="desktop-nav" aria-label="主要導覽">
        <RouterLink v-for="link in links" :key="link.to" :to="link.to" :class="{ 'is-active': route.path.startsWith(link.to) }">{{ link.label }}<span v-if="link.to === '/favorites/' && favorites.count" class="nav-count">{{ favorites.count }}</span></RouterLink>
      </nav>

      <div class="site-header__actions">
        <RouterLink class="icon-link search-link" :to="{ path: '/explore/', hash: '#attraction-search' }" aria-label="搜尋景點" title="搜尋景點">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 5 5"/></svg>
        </RouterLink>
        <button ref="menuButton" class="icon-link menu-button" type="button" :aria-expanded="open" aria-controls="mobile-navigation" :aria-label="open ? '關閉選單' : '開啟選單'" @click="toggleMenu">
          <svg v-if="!open" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M3 7h18M3 12h18M3 17h18"/></svg>
          <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M5 5 19 19M19 5 5 19"/></svg>
        </button>
      </div>
    </div>
    <div v-if="open" class="mobile-nav__backdrop" @click="closeMenu()"></div>
    <nav v-if="open" id="mobile-navigation" ref="drawer" class="mobile-nav" aria-label="手機導覽">
      <p class="eyebrow">DISCOVER THE ISLAND</p>
      <RouterLink v-for="(link, index) in links" :key="link.to" :to="link.to" @click="closeMenu(false)">
        <span class="mobile-nav__index">0{{ index + 1 }}</span>{{ link.label }}<span v-if="link.to === '/favorites/' && favorites.count" class="mobile-nav__count">{{ favorites.count }}</span><span aria-hidden="true">↗</span>
      </RouterLink>
      <p class="mobile-nav__end">在山海之間，找回旅行的步調。</p>
    </nav>
  </header>
</template>
