<script setup >
import {useRoute} from "vue-router";

const route = useRoute();


</script>

<template>
  <nav class="navbar">
    <div class="logo">Дарын Түлектер</div>
    <div class="pages">
      <ul class="nav-items">
        <li :class="route.path === '/' ? 'active' : ''"><router-link :to="{ name: 'alumni' }">Түлектер</router-link></li>
        <li :class="route.path === '/report' ? 'active' : ''"><router-link :to="{ name: 'reports' }">Отчеты</router-link></li>
        <li :class="route.path === '/idea' ? 'active' : ''"><router-link :to="{ name: 'ideas' }">Идеялар</router-link></li>
        <li :class="route.path === '/project' ? 'active' : ''"><router-link :to="{ name: 'projects' }">Жобалар</router-link></li>
        <li :class="route.path === '/login' ? 'active' : ''"><router-link :to="{ name: 'login' }">Кіру/Жеке кабинет</router-link></li>
      </ul>
      <input type="checkbox" id="burger">
      <label for="burger"></label>
      <div class="burger-menu">
          <ul>
            <li :class="route.path === '/alumni' ? 'active' : ''"><router-link :to="{ name: 'alumni' }">Түлектер</router-link></li>
            <li :class="route.path === '/report' ? 'active' : ''"><router-link :to="{ name: 'reports' }">Отчеты</router-link></li>
            <li :class="route.path === '/idea' ? 'active' : ''"><router-link :to="{ name: 'ideas' }">Идеялар</router-link></li>
            <li :class="route.path === '/project' ? 'active' : ''"><router-link :to="{ name: 'projects' }">Жобалар</router-link></li>
            <li :class="route.path === '/login' ? 'active' : ''"><router-link :to="{ name: 'login' }">Кіру/Жеке кабинет</router-link></li>
          </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped lang="sass">
  @use "../assets/styles/navbar"
</style>
