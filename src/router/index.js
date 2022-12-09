import { createRouter, createWebHistory } from 'vue-router'
import Catalog from "../views/Catalog.vue"
import Favorites from "../views/Favorites.vue"

const routes = [
  {
    path: '/',
    name: 'catalog',
    component: Catalog
  },
  {
    path: "/favorites",
    name: "favorites",
    component: Favorites
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
