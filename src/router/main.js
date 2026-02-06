import ProjectPage from "@/views/ProjectPage.vue";

const AlumniPage = () => import("../views/AlumniPage.vue");
const PersonPage = () => import("../views/PersonPage.vue");
const ReportsPage = () => import("@/views/ReportsPage.vue");
const ProjectsPage = () => import("@/views/ProjectsPage.vue");
const IdeasPage = () => import("@/views/IdeasPage.vue");
const ReportPage = () => import("@/views/ReportPage.vue");
const IdeaPage = () => import("@/views/IdeaPage.vue");
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
    path: '/report',
    name: 'reports',
    component: ReportsPage,
  },
  {
    path: '/report/:id',
    name: 'report',
    component: ReportPage,
  },
  {
    path: '/project',
    name: 'projects',
    component: ProjectsPage,
  },
  {
    path: '/project/:id',
    name: 'project',
    component: ProjectPage,
  },
  {
    path: '/idea',
    name: 'ideas',
    component: IdeasPage,
  },
  {
    path: '/idea/:id',
    name: 'idea',
    component: IdeaPage,
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
];
