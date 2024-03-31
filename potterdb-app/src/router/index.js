import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SpellsView from '@/views/SpellsView.vue'
import CharactersView from '@/views/CharactersView.vue'
import BooksView from '@/views/BooksView.vue'
import PotionsView from '@/views/PotionsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/spells',
      name: 'spells',
      component: SpellsView
    },
    {
      path: '/characters',
      name: 'characters',
      component: CharactersView
    },
    {
      path: '/potions',
      name: 'potions',
      component: PotionsView
    },
    {
      path: '/books',
      name: 'books',
      component: BooksView
    },
  ]
})

export default router
