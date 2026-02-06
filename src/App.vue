<script setup>
import NavBarComponent from "./components/NavBarComponent.vue";
import AdminNavBarComponent from "./components/admin/NavBarComponent.vue";
import {useRoute} from "vue-router";

const route = useRoute();


</script>

<template>
  <div class="container">
    <AdminNavBarComponent v-if="route.path.startsWith('/admin')" />
    <NavBarComponent v-else/>
    <router-view />
  </div>
</template>

