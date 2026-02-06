<script setup>
import {getRoles, registerUser} from "@/api/admin.js";
import {onMounted, ref} from "vue";

const firstName = ref()
const lastName = ref()
const telephone = ref()
const password = ref()
const role = ref()

const roles = ref([])

onMounted(async () => {
  const data = await getRoles()
  roles.value = data
})

async function register() {
  const registerData = {
    "first_name": firstName.value,
    "last_name": lastName.value,
    "phone_number": telephone.value,
    "password": password.value,
    "role": role.value
  }
  const response = await registerUser(registerData)
  console.log(response)
}
</script>

<template>
<main>
  <h1>Добавить пользователя</h1>
  <form @submit.prevent="register" method="post" >
    <div class="input">
      <label for="firstName">First name</label>
      <input v-model="firstName" placeholder="First Name" id="firstName" type="text">
    </div>
    <div class="input">
      <label for="lastName">Last name</label>
      <input v-model="lastName" placeholder="Last Name" id="lastName" type="text">
    </div>
    <div class="input">
      <label for="telephone">Telephone</label>
      <input v-model="telephone" placeholder="+7 775 400 25 76" id="telephone" type="text">
    </div>
    <div class="input">
      <label for="password">Password</label>
      <input v-model="password" placeholder="Password" id="password" type="password">
    </div>
    <div class="input">
      <label for="role">Role</label>
      <select v-model="role" name="role" id="role">
        <option :value="role.name" v-for="(role,index) in roles"
                :key="index">
          {{ role.name }}
        </option>
      </select>
    </div>
    <button type="submit">Добавить</button>
  </form>
</main>
</template>

<style scoped lang="sass">
@use '@/assets/styles/admin/register'
</style>
