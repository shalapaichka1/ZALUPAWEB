import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignUp from '../views/SignUp.vue'
import ModerationView from '../views/ModerationView.vue'
import ArtsView from '../views/ArtsView.vue'
import IdeasView from '../views/IdeasView.vue'
import VideosView from '../views/VideosView.vue'
import Events from '../views/EventsView.vue'
import MerchView from '@/views/MerchView.vue'
import MiniGamesView from '@/views/MiniGamesView.vue'
import CalendarOfEvents from '@/views/CalendarOfEvents.vue'
import PracticalJokesView from '@/views/PracticalJokesView.vue'
import QAView from '@/views/QAView.vue'
import ModerationVideoView from '@/views/ModerationVideoView.vue'

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
      path: '/moderation/ideas',
      name: 'ideas',
      component: IdeasView
    },
    {
      path: '/ideas',
      name: 'ideas',
      component: IdeasView
    },
    {
      path: '/videos',
      name: 'videos',
      component: VideosView
    },
    {
      path: '/q&a',
      name: 'qa',
      component: QAView
    },
    {
      path: '/moderation/videos',
      name: 'moderation-videos',
      component: ModerationVideoView
    }
  ]
})

export default router
