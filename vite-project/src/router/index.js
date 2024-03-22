import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import Lobby from '@/views/Lobby.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Login
    },
    {
      path: '/lobby',
      name: 'lobby',
      component: Lobby
    },
  ]
})

export default router
