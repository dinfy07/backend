<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import {
  getUserById,
  updateUser,
  updateAlumni
} from '@/api/admin.js'
import {getPerson} from "@/api/index.js";

// props от router
const props = defineProps({
  id: {
    type: String,
    required: true
  }
})
const password = ref('')

const route = useRoute()

// ===== общие =====
const firstName = ref('')
const lastName = ref('')
const telephone = ref('')

// ===== alumni =====
const about = ref('')
const placeOfWork = ref('')
const graduationYear = ref('')
const telegram = ref('')
const email = ref('')

const notice = ref('')
const noticeType = ref('')

// ===== helpers =====
const isAlumniRoute = route.path.includes('/alumni/')
const isUserRoute = route.path.includes('/users/')

// ===== LOAD =====
onMounted(async () => {
  try {
    if (isAlumniRoute) {
      const a = await getPerson(props.id)

      firstName.value = a.first_name
      lastName.value = a.last_name
      telephone.value = a.phone_number
      about.value = a.about

      placeOfWork.value = a.graduate_profile?.place_of_work || ''
      graduationYear.value = a.graduate_profile?.year_of_graduation || ''
      telegram.value = a.contacts?.telegram || ''
      email.value = a.contacts?.email || ''
    }

    if (isUserRoute) {
      const u = await getUserById(props.id)

      firstName.value = u.first_name
      lastName.value = u.last_name
      telephone.value = u.phone_number

    }
  } catch (e) {
    notice.value = 'Ошибка загрузки данных'
    noticeType.value = 'error'
  }
})

// ===== UPDATE =====
async function update() {
  try {
    if (isAlumniRoute) {
      await updateAlumni(props.id, {
        first_name: firstName.value,
        last_name: lastName.value,
        phone_number: telephone.value,
        about: about.value,
        graduate_profile: {
          place_of_work: placeOfWork.value,
          year_of_graduation: Number(graduationYear.value)
        },
        contacts: {
          telegram: telegram.value,
          email: email.value
        }
      })
    }

    if (isUserRoute) {
      const payload = {
        first_name: firstName.value,
        last_name: lastName.value,
        phone_number: telephone.value
      }

      // 🔐 если ввели новый пароль — отправляем
      if (password.value && password.value.length >= 6) {
        payload.password = password.value
      }

      await updateUser(props.id, payload)
    }


    notice.value = 'Успешно обновлено'
    noticeType.value = 'success'
  } catch (e) {
    notice.value = 'Ошибка при обновлении'
    noticeType.value = 'error'
  }
}
</script>



<template>
  <!-- ========== USER ========== -->
  <main v-if="isUserRoute">
    <h1>Редактировать пользователя</h1>

    <form @submit.prevent="update">

      <div class="field">
        <label>First name</label>
        <input v-model="firstName" placeholder="First name" />
      </div>

      <div class="field">
        <label>Last name</label>
        <input v-model="lastName" placeholder="Last name" />
      </div>

      <div class="field">
        <label>Phone</label>
        <input v-model="telephone" placeholder="Phone" />
      </div>
      <div class="field">
        <label>New password</label>
        <input
          v-model="password"
          type="password"
          placeholder="Leave empty to keep current password"
        />
      </div>

      <button>Сохранить</button>
    </form>
  </main>

  <!-- ========== ALUMNI ========== -->
  <main v-if="isAlumniRoute">
    <h1>Редактировать alumni</h1>

    <form @submit.prevent="update">

      <div class="field">
        <label>First name</label>
        <input v-model="firstName" placeholder="First name" />
      </div>

      <div class="field">
        <label>Last name</label>
        <input v-model="lastName" placeholder="Last name" />
      </div>

      <div class="field">
        <label>Phone</label>
        <input v-model="telephone" placeholder="Phone" />
      </div>

      <div class="field">
        <label>About</label>
        <textarea v-model="about" placeholder="About"></textarea>
      </div>

      <div class="field">
        <label>Place of work</label>
        <input v-model="placeOfWork" placeholder="Place of work" />
      </div>

      <div class="field">
        <label>Graduation year</label>
        <input
          v-model.number="graduationYear"
          placeholder="Year"
          type="number"
        />
      </div>

      <div class="field">
        <label>Telegram</label>
        <input v-model="telegram" placeholder="Telegram" />
      </div>

      <div class="field">
        <label>Email</label>
        <input v-model="email" placeholder="Email" />
      </div>

      <button>Сохранить</button>
    </form>
  </main>
</template>



<style scoped lang="sass">
@use '@/assets/styles/admin/create'
</style>
