import { createRouter, createWebHistory } from 'vue-router';
import {admins} from "@/router/admin.js";
import {mains} from "@/router/main.js";

const routes =[
  ...admins,
  ...mains
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
