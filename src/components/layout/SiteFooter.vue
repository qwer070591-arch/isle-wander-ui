<template>
  <footer class="site-footer">
    <div class="container footer-grid">
      <div class="footer-brand">
        <RouterLink class="footer-brand__name" to="/">ISLE <i>&</i> WANDER</RouterLink>
        <p>島嶼漫遊<br />在山海之間，找回旅行的步調。</p>
        <small>A slower way to discover Taiwan.</small>
      </div>
      <nav aria-label="頁尾探索導覽"><h3>探索</h3><RouterLink to="/destinations/">目的地</RouterLink><RouterLink to="/explore/">探索景點</RouterLink><RouterLink to="/stays/">精選住宿</RouterLink><RouterLink to="/stories/">旅行故事</RouterLink></nav>
      <nav aria-label="頁尾個人導覽"><h3>旅程</h3><RouterLink to="/planner/">我的行程</RouterLink><RouterLink to="/favorites/">收藏</RouterLink></nav>
      <div class="footer-note"><h3>關於這裡</h3><p>一個探索台灣的前端作品集 Demo。住宿與行程功能目前僅供設計展示，沒有訂房服務。</p><RouterLink to="/sources/">素材與資料來源 ↗</RouterLink></div>
    </div>
    <div class="container footer-bottom"><span>© 2026 ISLE & WANDER · 島嶼漫遊</span><span>以好奇心，慢慢認識一座島。</span></div>
  </footer>
</template>
