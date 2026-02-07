<script setup>
import { useRoute, useRouter } from "vue-router"
import { isAuth } from "@/auth/auth"

defineProps({
  object: {
    type: Object,
    required: true
  }
})

const route = useRoute()
const router = useRouter()

const onMoreClick = (id) => {
  if (!isAuth) {
    alert("Авторизуйтесь") // можно заменить на toast / modal
    return
  }

  router.push({ name: "person", params: { id } })
}
</script>

<template>
  <div v-if="route.name === 'alumni'" class="card-alumni border">
    <div class="photo">
      <img
        v-if="object.photo_url"
        src="/avatar.jpg"
        alt=""
      />
    </div>

    <div class="text">
      <h4>{{ object.first_name }} {{ object.last_name }}</h4>
      <h5>{{ object.graduate_profile.place_of_work }}</h5>
      <h6>{{ object.graduate_profile.year_of_graduation }} жылғы түлек</h6>
    </div>

    <button
      class="btn-card"
      @click="onMoreClick(object._id)"
    >
      Толығырақ
    </button>
  </div>
</template>

<style scoped lang="sass">
@use "../assets/styles/card"
</style>
