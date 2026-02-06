<script setup>
import NavBarComponent from "./components/NavBarComponent.vue";
import AdminNavBarComponent from "./components/admin/NavBarComponent.vue";
import {useRoute} from "vue-router";
import {onMounted} from "vue";
import {refreshToken} from "@/api/index.js";

const route = useRoute();

async function refresh () {
  await refreshToken()
}

onMounted(async () => {
  await refresh()
})

</script>

<template>
  <div class="container">
    <AdminNavBarComponent v-if="route.path.startsWith('/admin')" />
    <NavBarComponent v-else/>
    <router-view />
  </div>
</template>

