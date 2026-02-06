<script setup>
import { useRoute} from "vue-router"
import { ref, watch, computed } from "vue"
import { getPerson } from "@/api/index.js"

const route = useRoute()

const person = ref(null)
const loading = ref(false)
const error = ref(null)

// загрузка данных
const loadPerson = async (id) => {
  try {
    loading.value = true
    error.value = null

    const data = await getPerson(id)

    // нормализация данных (защита шаблона)
    person.value = {
      ...data,
      graduate_profile: data.graduate_profile ?? {
        place_of_work: "",
        year_of_graduation: ""
      },
      contacts: data.contacts ?? {},
      achievements: data.achievements ?? []
    }
  } catch (e) {
    error.value = "Не удалось загрузить данные"
    console.error(e)
  } finally {
    loading.value = false
  }
}

watch(
  () => route.params.id,
  (id) => {
    if (!id) return
    loadPerson(id)
  },
  { immediate: true }
)

// computed для WhatsApp
const whatsappLink = computed(() => {
  if (!person.value?.phone_number) return "#"
  return `https://wa.me/${person.value.phone_number}`
})
</script>


<template>
  <main class="person-page">

    <!-- LOADING -->
    <div v-if="loading" class="loading">
      Загрузка...
    </div>

    <!-- ERROR -->
    <div v-else-if="error" class="error">
      {{ error }}
    </div>

    <!-- CONTENT -->
    <div v-else-if="person">

      <!-- BACK -->
      <router-link class="btn-card cancel" :to="{ name: 'alumni' }">
        ← Назад к коммюнити
      </router-link>

      <div class="person">

        <!-- HEADER -->
        <div class="header">
          <div class="photo">
            <img
              v-if="person.photo_url"
              :src="person.photo_url"
              alt="Фото"
            />
          </div>

          <div class="name">
            <h1>{{ person.first_name }} {{ person.last_name }}</h1>
            <h4>{{ person.graduate_profile.place_of_work }}</h4>
          </div>
        </div>

        <!-- ABOUT -->
        <div class="main-info">
          <h2>О себе</h2>
          <p>{{ person.about }}</p>
        </div>

        <!-- MAIN INFO -->
        <div class="main-info">
          <h2>Основная информация</h2>
          <ul class="info">
            <li>
              <h4>Место работы</h4>
              <h6>{{ person.graduate_profile.place_of_work }}</h6>
            </li>
            <li>
              <h4>Год окончания</h4>
              <h6>{{ person.graduate_profile.year_of_graduation }}</h6>
            </li>
          </ul>
        </div>

        <!-- CONTACTS -->
        <div class="main-info contact">
          <h2>Контактная информация</h2>
          <ul class="info">
            <li v-if="person.phone_number">
              📞 {{ person.phone_number }}
            </li>

            <li v-if="person.contacts.telegram">
              💬 Telegram:
              <a
                :href="`https://t.me/${person.contacts.telegram}`"
                target="_blank"
              >
                @{{ person.contacts.telegram }}
              </a>
            </li>

            <li v-if="person.contacts.email">
              ✉️ {{ person.contacts.email }}
            </li>

            <li v-if="person.phone_number">
              <a
                :href="whatsappLink"
                target="_blank"
                class="whatsapp"
              >
                WhatsApp
              </a>
            </li>
          </ul>
        </div>

        <!-- ACHIEVEMENTS -->
        <div v-if="person.achievements.length" class="main-info olimpiad">
          <h2>Достижения и олимпиады</h2>
          <ul>
            <li
              v-for="(item, index) in person.achievements"
              :key="index"
            >
              {{ item }}
            </li>
          </ul>
        </div>

      </div>
    </div>
  </main>
</template>


<style scoped lang="sass">
@use '../assets/styles/person'
</style>
