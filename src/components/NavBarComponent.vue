<script setup >
import {useRoute} from "vue-router";

const route = useRoute();
import {isAuth, isAuthReady} from "@/auth/auth.js"

</script>

<template>
  <nav class="navbar">
    <div class="logo">Дарын Түлектер</div>
    <div class="pages">
      <ul class="nav-items">
        <li :class="route.path === '/' ? 'active' : ''"><router-link :to="{ name: 'alumni' }">Түлектер</router-link></li>
        <li v-if="!isAuthReady"></li> <!-- можно skeleton -->

        <li v-else-if="!isAuth">
          <router-link :to="{ name: 'login' }">Кіру</router-link>
        </li>

        <li v-else>
          <router-link :to="{ name: 'cabinet' }">Жеке кабинет</router-link>
        </li>
      </ul>
      <input type="checkbox" id="burger">
      <label for="burger"></label>
      <div class="burger-menu">
          <ul>
            <li :class="route.path === '/alumni' ? 'active' : ''"><router-link :to="{ name: 'alumni' }">Түлектер</router-link></li>
            <li v-if="!isAuthReady"></li> <!-- можно skeleton -->

            <li v-else-if="!isAuth">
              <router-link :to="{ name: 'login' }">Кіру</router-link>
            </li>

            <li v-else>
              <router-link :to="{ name: 'cabinet' }">Жеке кабинет</router-link>
            </li>
          </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped lang="sass">
  @use "../assets/styles/navbar"
</style>
