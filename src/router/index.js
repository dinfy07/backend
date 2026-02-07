import { createRouter, createWebHistory } from 'vue-router';
import {admins} from "@/router/admin.js";
import {mains} from "@/router/main.js";
import {initAuth, user} from "@/auth/auth.js";

const routes =[
  ...admins,
  ...mains
]

const router = createRouter({
  history: createWebHistory(),
  routes
});
router.beforeEach(async (to, from, next) => {
  // пробуем восстановить сессию
  if (!user.isAuth) {
    await initAuth()
  }

  // 🚫 если роут админский
  if (to.meta.admin) {
    if (!user.isAuth || user.role !== "admin") {
      return next("/") // или /login
    }
  }

  next()
})
export default router;
