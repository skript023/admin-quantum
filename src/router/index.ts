// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/components/Login.vue'
import Home from '@/modules/home/Home.vue'
import Activity from '@/modules/user/activity/Activity.vue'
import Tiket from '@/modules/user/support/Tiket.vue'

const routes = [
  { path: '/', component: Login },
  { path: '/dashboard', component: Home },
  { path: '/user/activity', component: Activity },
  { path: '/ticket', component: Tiket },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
