import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignUp from '../views/SignUp.vue'
import ModerationView from '../views/ModerationView.vue'
import ArtsView from '../views/ArtsView.vue'
import IdeasView from '../views/IdeasView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    },
    {
      path: '/moderation',
      name: 'moderation',
      component: ModerationView
    },
    {
      path: '/moderation/arts',
      name: 'arts',
      component: ArtsView
    },
    {
      path: '/moderation/ideas',
      name: 'ideas',
      component: IdeasView
    }
  ]
})

export default router
