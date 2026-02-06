<script setup>
import HeaderComponent from "@/components/admin/HeaderComponent.vue"
import { onMounted, ref, watch } from "vue"
import {getUsers, getAlumni, deleteAlumni, deleteUser} from "@/api/admin.js"
import {useRoute, useRouter} from "vue-router"
import { computed} from "vue"

const searchQuery = ref("")
const filteredUsers = computed(() => {
  if (!searchQuery.value) return users.value

  return users.value.filter(u =>
    `${u.first_name} ${u.last_name}`
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase())
  )
})
const filteredAlumni = computed(() => {
  if (!searchQuery.value) return alumni.value

  return alumni.value.filter(a =>
    `${a.first_name} ${a.last_name}`
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase())
  )
})

const route = useRoute()
const router = useRouter()

const users = ref([])
const alumni = ref([])
const pagination = ref({
  page: 1,
  pages: 1
})

const goToEdit = (id) => {
  // если мы на users
  if (route.path === '/admin') {
    router.push(`/admin/users/${id}/edit`)
  }

  // если мы на alumni
  if (route.path === '/admin/alumni') {
    router.push(`/admin/alumni/${id}/edit`)
  }
}
const changePage = async (page) => {
  pagination.value.page = page
  await loadData()
}
watch(() => route.path, () => {
  pagination.value.page = 1
  loadData()
})

const loadData = async () => {
  if (route.path === "/admin") {
    const res = await getUsers({
      page: pagination.value.page,
      limit: 10
    })

    users.value = res.items
    pagination.value.pages = res.pagination.pages
  } else {
    const res = await getAlumni({
      page: pagination.value.page,
      limit: 10
    })

    alumni.value = res.items
    pagination.value.pages = res.pagination.pages
  }
}


const removeAlumni = async (id) => {
  if (!confirm("Удалить alumni?")) return

  await deleteAlumni(id)
  alumni.value = alumni.value.filter(a => a._id !== id)
}
const removeUser = async (id) => {
  if (!confirm("Удалить user?")) return

  await deleteUser(id)
  users.value = users.value.filter(u => u._id !== id)
}
onMounted(loadData)
watch(() => route.path, loadData)
</script>


<template>
<main v-if="route.path === '/admin'">
  <header-component
    title="Пользователи"
    v-model="searchQuery"
  />

  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>ФИО</th>
        <th>Роль</th>
        <th>Дата регистрации</th>
        <th>Действия</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(user, index) in filteredUsers"
        :key="index"
      >
        <td>{{ user._id }}</td>
        <td>{{ user.first_name }} {{ user.last_name }}</td>
        <td>{{ user.role }}</td>
        <td>{{ user.createdAt }}</td>
        <td>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            style="cursor: pointer"
            @click="goToEdit(user._id)"
          >

          <g clip-path="url(#clip0_2_3132)">
              <path d="M14.7375 0.67832C14.0531 -0.0060547 12.9469 -0.0060547 12.2625 0.67832L11.3219 1.61582L14.3813 4.6752L15.3219 3.73457C16.0063 3.0502 16.0063 1.94395 15.3219 1.25957L14.7375 0.67832ZM5.3875 7.55332C5.19687 7.74395 5.05 7.97832 4.96562 8.2377L4.04063 11.0127C3.95 11.2814 4.02188 11.5783 4.22188 11.7814C4.42188 11.9846 4.71875 12.0533 4.99062 11.9627L7.76562 11.0377C8.02188 10.9533 8.25625 10.8064 8.45 10.6158L13.6781 5.38457L10.6156 2.32207L5.3875 7.55332ZM3 2.0002C1.34375 2.0002 0 3.34395 0 5.0002V13.0002C0 14.6564 1.34375 16.0002 3 16.0002H11C12.6562 16.0002 14 14.6564 14 13.0002V10.0002C14 9.44707 13.5531 9.0002 13 9.0002C12.4469 9.0002 12 9.44707 12 10.0002V13.0002C12 13.5533 11.5531 14.0002 11 14.0002H3C2.44688 14.0002 2 13.5533 2 13.0002V5.0002C2 4.44707 2.44688 4.0002 3 4.0002H6C6.55312 4.0002 7 3.55332 7 3.0002C7 2.44707 6.55312 2.0002 6 2.0002H3Z" fill="#3B82F6"/>
            </g>
            <defs>
              <clipPath id="clip0_2_3132">
                <path d="M0 0H16V16H0V0Z" fill="white"/>
              </clipPath>
            </defs>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="16"
            viewBox="0 0 14 16"
            fill="none"
            style="cursor: pointer"
            @click="removeUser(user._id)"
          >
            <g clip-path="url(#clip0_2_3135)">
              <path d="M4.225 0.553125L4 1H1C0.446875 1 0 1.44687 0 2C0 2.55312 0.446875 3 1 3H13C13.5531 3 14 2.55312 14 2C14 1.44687 13.5531 1 13 1H10L9.775 0.553125C9.60625 0.2125 9.25938 0 8.88125 0H5.11875C4.74062 0 4.39375 0.2125 4.225 0.553125ZM13 4H1L1.6625 14.5938C1.7125 15.3844 2.36875 16 3.15937 16H10.8406C11.6312 16 12.2875 15.3844 12.3375 14.5938L13 4Z" fill="#EF4444"/>
            </g>
            <defs>
              <clipPath id="clip0_2_3135">
                <path d="M0 0H14V16H0V0Z" fill="white"/>
              </clipPath>
            </defs>
          </svg>
        </td>
      </tr>
    </tbody>
  </table>
  <div class="pagination" v-if="pagination.pages > 1">
    <button
      v-for="p in pagination.pages"
      :key="p"
      :class="{ active: pagination.page === p }"
      @click="changePage(p)"
    >
      {{ p }}
    </button>
  </div>

</main>
<main v-else>
  <header-component
    title="Alumni"
    v-model="searchQuery"
  />

  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>ФИО</th>
        <th>Дата регистрации</th>
        <th>Действия</th>
      </tr>
    </thead>
    <tbody>
    <tr v-for="user in filteredAlumni" :key="user._id">
      <td>{{ user._id }}</td>
      <td>{{ user.first_name }} {{ user.last_name }}</td>
      <td>{{ user.createdAt }}</td>
      <td>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          style="cursor: pointer"
          @click="goToEdit(user._id)"
        >

        <g clip-path="url(#clip0_2_3132)">
            <path d="M14.7375 0.67832C14.0531 -0.0060547 12.9469 -0.0060547 12.2625 0.67832L11.3219 1.61582L14.3813 4.6752L15.3219 3.73457C16.0063 3.0502 16.0063 1.94395 15.3219 1.25957L14.7375 0.67832ZM5.3875 7.55332C5.19687 7.74395 5.05 7.97832 4.96562 8.2377L4.04063 11.0127C3.95 11.2814 4.02188 11.5783 4.22188 11.7814C4.42188 11.9846 4.71875 12.0533 4.99062 11.9627L7.76562 11.0377C8.02188 10.9533 8.25625 10.8064 8.45 10.6158L13.6781 5.38457L10.6156 2.32207L5.3875 7.55332ZM3 2.0002C1.34375 2.0002 0 3.34395 0 5.0002V13.0002C0 14.6564 1.34375 16.0002 3 16.0002H11C12.6562 16.0002 14 14.6564 14 13.0002V10.0002C14 9.44707 13.5531 9.0002 13 9.0002C12.4469 9.0002 12 9.44707 12 10.0002V13.0002C12 13.5533 11.5531 14.0002 11 14.0002H3C2.44688 14.0002 2 13.5533 2 13.0002V5.0002C2 4.44707 2.44688 4.0002 3 4.0002H6C6.55312 4.0002 7 3.55332 7 3.0002C7 2.44707 6.55312 2.0002 6 2.0002H3Z" fill="#3B82F6"/>
          </g>
          <defs>
            <clipPath id="clip0_2_3132">
              <path d="M0 0H16V16H0V0Z" fill="white"/>
            </clipPath>
          </defs>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="16"
          viewBox="0 0 14 16"
          fill="none"
          style="cursor: pointer"
          @click="removeAlumni(user._id)"
        >
          <g clip-path="url(#clip0_2_3135)">
            <path d="M4.225 0.553125L4 1H1C0.446875 1 0 1.44687 0 2C0 2.55312 0.446875 3 1 3H13C13.5531 3 14 2.55312 14 2C14 1.44687 13.5531 1 13 1H10L9.775 0.553125C9.60625 0.2125 9.25938 0 8.88125 0H5.11875C4.74062 0 4.39375 0.2125 4.225 0.553125ZM13 4H1L1.6625 14.5938C1.7125 15.3844 2.36875 16 3.15937 16H10.8406C11.6312 16 12.2875 15.3844 12.3375 14.5938L13 4Z" fill="#EF4444"/>
          </g>
          <defs>
            <clipPath id="clip0_2_3135">
              <path d="M0 0H14V16H0V0Z" fill="white"/>
            </clipPath>
          </defs>
        </svg>
      </td>
    </tr>
    </tbody>
  </table>
  <div class="pagination" v-if="pagination.pages > 1">
    <button
      v-for="p in pagination.pages"
      :key="p"
      :class="{ active: pagination.page === p }"
      @click="changePage(p)"
    >
      {{ p }}
    </button>
  </div>

</main>
</template>

<style scoped lang="sass">
@use '@/assets/styles/admin/users'
.pagination
  display: flex
  justify-content: center
  align-items: center
  gap: 8px
  margin-top: 24px

  button
    min-width: 36px
    height: 36px
    padding: 0 12px
    border-radius: 8px
    border: 1px solid #e5e7eb
    background-color: #ffffff
    color: #374151
    font-size: 14px
    font-weight: 500
    cursor: pointer
    transition: all 0.2s ease

    &:hover
      background-color: #f3f4f6
      border-color: #d1d5db

    &.active
      background-color: #3b82f6
      border-color: #3b82f6
      color: #ffffff
      cursor: default

    &:disabled
      opacity: 0.5
      cursor: not-allowed

</style>
