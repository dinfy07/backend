import UsersPage from "@/views/admin/UsersPage.vue";
import ReportsPage from "@/views/admin/ReportsPage.vue";
import IdeasPage from "@/views/admin/IdeasPage.vue";
import ProjectsPage from "@/views/admin/ProjectsPage.vue";
import RolesPage from "@/views/admin/RolesPage.vue";
import RegisterPage from "@/views/admin/RegisterPage.vue";


export const admins =[
  {
    path: "/admin",
    name: "Users",
    component: UsersPage,
  },
  {
    path: "/admin/reports",
    name: "Report",
    component: ReportsPage,
  },
  {
    path: "/admin/ideas",
    name: "Idea",
    component: IdeasPage,
  },
  {
    path: "/admin/projects",
    name: "Project",
    component: ProjectsPage,
  },
  {
    path: "/admin/roles",
    name: "Role",
    component: RolesPage,
  },
  {
    path: "/admin/register",
    name: "Register",
    component: RegisterPage,
  },
]
