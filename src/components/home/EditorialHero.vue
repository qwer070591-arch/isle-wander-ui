<template>
  <section class="hero" aria-labelledby="hero-title">
    <div class="container hero__grid">
      <div class="hero__copy">
        <p class="eyebrow"><span class="eyebrow__line"></span> ISLE & WANDER · TAIWAN</p>
        <h1 id="hero-title">在山海之間，<br />找回旅行的<span>步調。</span></h1>
        <p class="hero__en">A slower way to discover Taiwan.</p>
        <p class="hero__lead hero__lead--desktop">沿著自己的節奏，走進台灣的山、海與街巷。讓每一次停留，都成為認識地方的開始。</p>
        <p class="hero__lead hero__lead--mobile">沿著自己的節奏，走進台灣的山、海與街巷。</p>
        <div class="hero__actions"><RouterLink class="button button--primary" to="/destinations/">探索目的地 <span aria-hidden="true">↗</span></RouterLink><RouterLink class="text-link" to="/planner/">開始規劃旅程 <span aria-hidden="true">↗</span></RouterLink></div>
        <div class="hero__edition"><span>01 / 07</span><span>AN EDITORIAL JOURNEY THROUGH TAIWAN</span></div>
      </div>
      <div class="hero__visual">
        <MediaSlot art="ridge" :photo="homePhotos.hero" caption="TAIWAN · BETWEEN MOUNTAIN & SEA" loading="eager" priority="high" />
        <span class="hero__vertical" aria-hidden="true">THE ART OF SLOW TRAVEL</span>
      </div>
    </div>
    <div class="hero__scroll container"><span>SCROLL TO EXPLORE</span><span aria-hidden="true">↓</span></div>
  </section>
</template>

<script setup lang="ts">
import MediaSlot from '../common/MediaSlot.vue'
import { homePhotos } from '../../data/media'
</script>
