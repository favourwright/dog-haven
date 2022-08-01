import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    // lazy load this component incase it is not needed
    { path: '/view/:id', component: () => import('../views/AboutDog.vue') }
  ]
})

export default router
