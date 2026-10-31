import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: () => import('../views/HomeView.vue'), meta: { title: '首頁' } },
    { path: '/destinations/', component: () => import('../views/DestinationsView.vue'), meta: { title: '目的地' } },
    { path: '/destinations/:slug/', component: () => import('../views/CityView.vue'), meta: { title: '城市介紹' } },
    { path: '/explore/', component: () => import('../views/ExploreView.vue'), meta: { title: '探索景點' } },
    { path: '/explore/:slug/', redirect: (to) => ({ path: `/attractions/${String(to.params.slug)}/`, query: to.query }) },
    { path: '/attractions/', redirect: (to) => ({ path: '/explore/', query: to.query }) },
    { path: '/attractions/:slug/', component: () => import('../views/AttractionDetailView.vue'), meta: { title: '景點介紹' } },
    { path: '/stays/', component: () => import('../views/StaysView.vue'), meta: { title: '精選住宿' } },
    { path: '/stays/:slug/', component: () => import('../views/ComingSoonView.vue'), props: { title: '住宿介紹，籌備中', eyebrow: 'STAY NOTES', description: '這份住宿介紹尚未完成資料與素材核對。' }, meta: { title: '住宿介紹' } },
    { path: '/stories/', component: () => import('../views/StoriesView.vue'), meta: { title: '旅行故事' } },
    { path: '/stories/:slug/', component: () => import('../views/StoryDetailView.vue'), meta: { title: '旅行故事' } },
    { path: '/planner/', component: () => import('../views/PlannerView.vue'), meta: { title: '我的行程' } },
    { path: '/planner/:id/', component: () => import('../views/TripEditorView.vue'), meta: { title: '編輯行程' } },
    { path: '/favorites/', component: () => import('../views/FavoritesView.vue'), meta: { title: '收藏' } },
    { path: '/sources/', component: () => import('../views/SourcesView.vue'), meta: { title: '素材與資料來源' } },
    { path: '/:pathMatch(.*)*', component: () => import('../views/NotFoundView.vue'), meta: { title: '找不到頁面' } },
  ],
  scrollBehavior(to, from, savedPosition) { return savedPosition ?? (to.path === from.path ? undefined : { top: 0 }) },
})

router.afterEach((to, from) => {
  document.title = `${String(to.meta.title ?? '首頁')}｜島嶼漫遊 ISLE & WANDER`
  if (to.path !== from.path) requestAnimationFrame(() => document.getElementById('main-content')?.focus({ preventScroll: true }))
})

export default router


