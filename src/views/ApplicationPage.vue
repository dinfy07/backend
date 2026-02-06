
<script setup>
import { ref } from 'vue';
import {application} from "@/api/index.js";

const tel = ref("")
const first_name = ref("")
const last_name = ref("")

function logIn() {
  application(first_name.value, last_name.value, tel.value)
  tel.value = "";
  first_name.value = "";
  last_name.value = "";
}
</script>

<template>
  <main>
    <h1>Оставить заявку</h1>
    <h2>Оставьте заявку для рассмотрение для входа в коммюнити</h2>
    <div class="two">
      <div class="input">
        <h6>Фамилия</h6>
        <input v-model="first_name" type="text" placeholder="Введите фамилию">
      </div>
      <div class="input">
        <h6>Имя</h6>
        <input v-model="last_name" type="text" placeholder="Введите имя">
      </div>
    </div>
    <div class="input">
      <h6>Номер телефона</h6>
      <input v-model="tel" type="text" placeholder="Введите номер телефона">
    </div>
    <h4 @click="logIn">Оставить заявку</h4>
    <router-link :to="{name: 'login'}" ><h5>Уже есть аккаунт?</h5></router-link>
  </main>
</template>

<style scoped lang="sass">
@use "../assets/styles/login"
.two
  display: flex
  width: 100%
  gap: 16px
  .input
    width: 100%
</style>
