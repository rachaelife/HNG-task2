import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '../utils/auth'
import Landing from '../views/Landing.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import Dashboard from '../views/Dashboard.vue'
import TicketManagement from '../views/TicketManagement.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: Landing,
    },
    {
      path: '/auth/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/auth/signup',
      name: 'signup',
      component: Signup,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: { requiresAuth: true },
    },
    {
      path: '/tickets',
      name: 'tickets',
      component: TicketManagement,
      meta: { requiresAuth: true },
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !auth.isAuthenticated()) {
    next('/auth/login')
  } else {
    next()
  }
})

export default router
