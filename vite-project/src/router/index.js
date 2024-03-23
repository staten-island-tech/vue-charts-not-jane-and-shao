import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import Lobby from '@/views/Lobby.vue'
import g1 from '@/views/g1.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Login
    },
    {
      path: '/g1/:code/:auth',
      name: 'gameone',
      component: g1
    },
    {
      path: '/lobby',
      name: 'lobby',
      component: Lobby
    },
  ]
})

export default router
