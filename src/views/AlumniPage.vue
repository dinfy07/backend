<script setup>
import HeaderComponent from "../components/HeaderComponent.vue"
import CardComponent from "../components/CardComponent.vue"
import { onMounted, ref } from "vue"
import { getAlumni } from "@/api/index.js"

const title = "Дарын түлектері"
const description = "Түлектер қауымдастығы"

const alumni = ref([])
const years = ref([])

const pagination = ref({
  page: 1,
  pages: 1
})

const yearFilter = ref(null)

const loadAlumni = async () => {
  const res = await getAlumni({
    page: pagination.value.page,
    limit: 10,
    year: yearFilter.value
  })

  alumni.value = res.items
  years.value = res.years            // 🔥 ГОДЫ С БЭКА
  pagination.value.pages = res.pagination.pages
}

onMounted(loadAlumni)

const changeFilter = async (year) => {
  yearFilter.value = year
  pagination.value.page = 1
  await loadAlumni()
}

const changePage = async (page) => {
  pagination.value.page = page
  await loadAlumni()
}
</script>





<template>
  <div class="inside">
    <HeaderComponent :title="title" :description="description" />

    <!-- FILTER -->
    <div class="filter">
      <ul>
        <li
          :class="{ active: yearFilter === null }"
          @click="changeFilter(null)"
        >
          Барлығы
        </li>

        <li
          v-for="year in years"
          :key="year"
          :class="{ active: yearFilter === year }"
          @click="changeFilter(year)"
        >
          {{ year }}
        </li>
      </ul>
    </div>



    <!-- CARDS -->
    <div class="cards-alumni">
      <CardComponent
        v-for="person in alumni"
        :key="person._id"
        :object="person"
      />
    </div>

    <!-- PAGINATION -->
    <div class="pagination" v-if="pagination.pages > 1">
      <button
        v-for="p in pagination.pages"
        :key="p"
        :class="{ active: pagination.page === p }"
        @click="changePage(p)"
      >
        {{ p }}
      </button>
    </div>
  </div>
</template>



<style scoped lang="sass">
  @use "../assets/styles/alumni"
  .pagination
    display: flex
    justify-content: center
    align-items: center
    gap: 8px
    margin-top: 24px

    button
      min-width: 36px
      height: 36px
      padding: 0 12px
      border-radius: 8px
      border: 1px solid #e5e7eb
      background-color: #ffffff
      color: #374151
      font-size: 14px
      font-weight: 500
      cursor: pointer
      transition: all 0.2s ease

      &:hover
        background-color: #f3f4f6
        border-color: #d1d5db

      &.active
        background-color: #3b82f6
        border-color: #3b82f6
        color: #ffffff
        cursor: default

      &:disabled
        opacity: 0.5
        cursor: not-allowed

</style>
