<script setup>
import { useRoute } from "vue-router"

defineProps({
  object: {
    type: Object,
    required: true
  }
})

const route = useRoute()
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

    <router-link
      :to="{ name: 'person', params: { id: object._id } }"
      class="btn-card"
    >
      Толығырақ
    </router-link>
  </div>
</template>


<style scoped lang="sass">
  @use "../assets/styles/card"
</style>
