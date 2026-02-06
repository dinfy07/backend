<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from "@/api/index.js"

const router = useRouter()

const tel = ref("")
const password = ref("")
const error = ref("")

async function logIn() {
  try {
    error.value = ""
    await login(tel.value, password.value)

    // ✅ успешный логин → редирект
    router.push({ name: 'alumni' })
    // или router.push('/')

    tel.value = ""
    password.value = ""
  } catch (e) {
    error.value = "Номер телефона немесе пароль қате"
  }
}
</script>

<template>
  <main>
    <h1>Вход в систему</h1>
    <h2>Войдите в свой аккаунт для доступа к коммюнити</h2>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <div class="input">
      <h6>Номер телефона</h6>
      <input
        v-model="tel"
        type="text"
        placeholder="+7 (999) 123-45-67"
      >
    </div>

    <div class="input">
      <h6>Пароль</h6>
      <input
        v-model="password"
        type="password"
        placeholder="Введите пароль"
      >
    </div>

    <h4 @click="logIn">Войти</h4>

    <router-link :to="{ name: 'application' }">
      <h5>Оставить заявку</h5>
    </router-link>
  </main>
</template>


<style scoped lang="sass">
@use "../assets/styles/login"
</style>
