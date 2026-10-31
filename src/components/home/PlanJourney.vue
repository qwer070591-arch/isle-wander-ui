<script setup lang="ts">
import SectionHeading from './SectionHeading.vue'
</script>

<template>
  <section class="section planner-section" aria-labelledby="planner-title"><div class="container planner-grid">
    <div class="planner-copy"><SectionHeading number="06" eyebrow="PLAN YOUR JOURNEY" heading-id="planner-title" title="留一點空白，給路上的驚喜" description="把想去的地方放進一段旅程，照自己的步調安排每一天。行程功能正在製作中，這裡先示意它會如何陪你出發。" /><RouterLink class="button button--light" to="/planner/">查看行程規劃進度 <span aria-hidden="true">↗</span></RouterLink><p class="planner-disclaimer">行程示意 · 尚未提供儲存功能</p></div>
    <div class="itinerary-preview" aria-label="兩日旅程概念示意"><div class="itinerary-preview__top"><span>JOURNEY NOTES</span><span>02 DAYS / TAIWAN</span></div><div class="itinerary-preview__day"><span>DAY 01</span><div><strong>沿著海的方向</strong><p>晨光散步　·　午後在街角停留</p></div><span aria-hidden="true">↗</span></div><div class="itinerary-preview__day"><span>DAY 02</span><div><strong>留給山的時間</strong><p>走一段小徑　·　慢慢看風景</p></div><span aria-hidden="true">↗</span></div><div class="itinerary-preview__bottom">A SLOWER WAY TO GO SOMEWHERE.</div></div>
  </div></section>
</template>
