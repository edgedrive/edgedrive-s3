import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/wiki/storage',
      name: 'wiki-storage',
      component: () => import('../views/WikiStorageView.vue')
    }
  ]
})

export default router
