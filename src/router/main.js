import CabinetPage from "@/views/CabinetPage.vue";

const AlumniPage = () => import("../views/AlumniPage.vue");
const PersonPage = () => import("../views/PersonPage.vue");
const LoginPage = () => import("@/views/LoginPage.vue");
const ApplicationPage = () => import("@/views/ApplicationPage.vue");



export const mains = [
  {
    path: '/',
    name: 'alumni',
    component: AlumniPage,
  },
  {
    path: '/alumni/:id',
    name: 'person',
    component: PersonPage,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
  },
  {
    path: '/application',
    name: 'application',
    component: ApplicationPage,
  },
  {
    path: '/cabinet',
    name: 'cabinet',
    component: CabinetPage,
  },
];
