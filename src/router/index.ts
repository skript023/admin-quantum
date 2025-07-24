// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/components/Login.vue'
import Home from '@/modules/home/Home.vue'

const routes = [
  { path: '/', component: Login },
  { path: '/dashboard', component: Home },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
