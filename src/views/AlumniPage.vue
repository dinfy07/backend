<script setup>
  import HeaderComponent from "../components/HeaderComponent.vue";
  import CardComponent from "../components/CardComponent.vue";
  import {onMounted, ref} from "vue";
  import {getAlumni} from "@/api/main.js";

  const title = "Дарын түлектері"
  const description = "  ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  const alumni = ref([])
  const yearFilter = ref(null)
  const years = []
  for (let i = 0; i < alumni.value.length; i++) {
    years.push(alumni[i].graduate_profile.year_of_graduation)
  }
  const alumniFilter = ref(alumni)
  const changeFilter = (value) => {
    yearFilter.value = value
    alumniFilter.value = []
    alumni.value.forEach(person => {
      if (person.graduate_profile.year_of_graduation == value) {
        alumniFilter.value.push(person)
      }
    })
    if (alumniFilter.value.length === 0){
      alumniFilter.value = alumni
    }
  }

  onMounted(async () => {
    alumni.value = await getAlumni()
  })
</script>

<template>
  <div class="inside">
    <HeaderComponent
      :title="title"
      :description="description"
    />
    <div class="filter">
      <ul>
        <li @click="changeFilter(null)" class="active">Барлығы</li>
        <li
          v-for="year in years"
          :key="year"
          @click="changeFilter(year)"
        >{{ year }}</li>
      </ul>
    </div>
    <div class="cards-alumni">
      <CardComponent
        :object="person"
        v-for ="(person, index) in alumniFilter"
        :key ="index"
      />
    </div>
  </div>
</template>

<style scoped lang="sass">
  @use "../assets/styles/alumni"
</style>
