import UpdateComponent from "@/components/admin/UpdateComponent.vue";

const UsersPage = () => import("@/views/admin/UsersPage.vue");
const CreateComponent = () => import("@/components/admin/CreateComponent.vue");

export const admins = [
  {
    path: '/admin',
    name: 'Users',
    component: UsersPage,
    meta: { admin: true }
  },
  {
    path: '/admin/alumni',
    name: 'Alumni',
    component: UsersPage,
    meta: { admin: true }
  },
  {
    path: '/admin/register',
    name: 'Register',
    component: CreateComponent,
    meta: { admin: true }
  },
  {
    path: '/admin/addalumni',
    name: 'AddAlumni',
    component: CreateComponent,
    meta: { admin: true }
  },

  // ===== UPDATE USER =====
  {
    path: '/admin/users/:id/edit',
    name: 'UpdateUser',
    component: UpdateComponent,
    props: true,
    meta: { admin: true }
  },

  // ===== UPDATE ALUMNI =====
  {
    path: '/admin/alumni/:id/edit',
    name: 'UpdateAlumni',
    component: UpdateComponent,
    props: true,
    meta: { admin: true }
  }
]
