import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '../views/HomePage.vue'
import OurClient from '../views/OurClient.vue'
import ProductPage from '../views/ProductPage.vue'
import CartPage from '../views/CartPage.vue'
import AboutPage from '../views/AboutPage.vue'

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/our-clients', name: 'Our Clients', component: OurClient },
  { path: '/product', name: 'Product', component: ProductPage },
  { path: '/cart', name: 'Cart', component: CartPage },
  { path: '/about', name: 'About', component: AboutPage },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
