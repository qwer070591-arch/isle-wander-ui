<script setup lang="ts">
defineProps<{ title: string; eyebrow: string; description: string }>()
</script>

<template><div class="container interior-page"><p class="eyebrow"><span class="eyebrow__line"></span> {{ eyebrow }}</p><p class="interior-page__status">IN THE MAKING · 即將推出</p><h1>{{ title }}</h1><p class="interior-page__lead">{{ description }}</p><div class="interior-page__actions"><RouterLink class="button button--primary" to="/">返回首頁 <span aria-hidden="true">↗</span></RouterLink><RouterLink class="text-link" to="/destinations/">看看目的地 <span aria-hidden="true">↗</span></RouterLink></div><div class="interior-page__art" aria-hidden="true"><span>TAKE THE SCENIC ROUTE</span></div></div></template>
