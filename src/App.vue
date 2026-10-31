<script setup lang="ts">
import SiteHeader from './components/layout/SiteHeader.vue'
import SiteFooter from './components/layout/SiteFooter.vue'
import FavoriteNotice from './components/common/FavoriteNotice.vue'
import AddToTripDialog from './components/common/AddToTripDialog.vue'
import BackToTop from './components/common/BackToTop.vue'
import { useFavoritesStore } from './stores/favorites'
import { useTripsStore } from './stores/trips'

useFavoritesStore().initialize()
useTripsStore().initialize()
</script>

<template>
  <a class="skip-link" href="#main-content">跳至主內容</a>
  <SiteHeader />
  <main id="main-content" tabindex="-1"><RouterView /></main>
  <SiteFooter />
  <FavoriteNotice />
  <AddToTripDialog />
  <BackToTop />
</template>
