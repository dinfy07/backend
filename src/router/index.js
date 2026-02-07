import { createRouter, createWebHistory } from 'vue-router'
import { admins } from "@/router/admin.js"
import { mains } from "@/router/main.js"
import { initAuth, user, isAuth, isAuthReady } from "@/auth/auth.js"

const routes = [
  ...admins,
  ...mains
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  // 🔄 ждём, пока auth восстановится
  if (!isAuthReady.value) {
    await initAuth()
  }

  // 🔒 защита админских роутов
  if (to.meta.admin) {
    if (!isAuth.value || user.value?.role !== 'admin') {
      return next('/') // или /login
    }
  }

  next()
})

export default router
