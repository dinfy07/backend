<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  registerUser,
  createAlumni
} from '@/api/admin.js'

const route = useRoute()
const router = useRouter()

// ===== refs =====
const firstName = ref('')
const lastName = ref('')
const telephone = ref('')
const password = ref('')
const role = ref('user')

// alumni extra
const about = ref('')
const placeOfWork = ref('')
const graduationYear = ref('')
const telegram = ref('')
const email = ref('')

watch(
  () => route.path,
  (path) => {
    if (path === '/admin/addalumni') {
      role.value = 'alumni'
      password.value = ''
    }
  },
  { immediate: true }
)

async function register() {
  if (!validateForm()) {
    notice.value = 'Исправьте ошибки в форме'
    noticeType.value = 'error'
    return
  }

  try {
    if (role.value === 'alumni') {
      await createAlumni({
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
    } else {
      await registerUser({
        first_name: firstName.value,
        last_name: lastName.value,
        phone_number: telephone.value,
        password: password.value,
        role: role.value
      })
    }

    notice.value = 'Успешно создано'
    noticeType.value = 'success'

    // ✅ редирект в админку
    router.push('/admin')

  } catch (error) {
    notice.value = 'Ошибка при сохранении'
    noticeType.value = 'error'
  }
}

const errors = ref({})
const notice = ref('')
const noticeType = ref('') // success | error

function validateForm() {
  errors.value = {}
  notice.value = ''

  if (!firstName.value.trim()) {
    errors.value.firstName = 'Введите имя'
  }

  if (!lastName.value.trim()) {
    errors.value.lastName = 'Введите фамилию'
  }

  const phone = telephone.value.replace(/\s+/g, '')

  if (!phone) {
    errors.value.telephone = 'Введите номер телефона'
  } else if (!/^(?:\+7|7|8)\d{10}$/.test(phone)) {
    errors.value.telephone = 'Неверный формат телефона'
  }

  if (role.value !== 'alumni') {
    if (!password.value || password.value.length < 6) {
      errors.value.password = 'Пароль минимум 6 символов'
    }
  }

  if (role.value === 'alumni') {
    if (!about.value.trim()) {
      errors.value.about = 'Заполните описание'
    }

    if (!placeOfWork.value.trim()) {
      errors.value.placeOfWork = 'Укажите место работы'
    }

    if (
      !graduationYear.value ||
      isNaN(graduationYear.value) ||
      graduationYear.value < 1900 ||
      graduationYear.value > new Date().getFullYear()
    ) {
      errors.value.graduationYear = 'Некорректный год выпуска'
    }

    if (email.value && !/^\S+@\S+\.\S+$/.test(email.value)) {
      errors.value.email = 'Некорректный email'
    }
  }

  return Object.keys(errors.value).length === 0
}
</script>

<template>
  <!-- ================= USER / ADMIN ================= -->
  <main v-if="route.path === '/admin/register'">

    <p v-if="notice" :class="['notice', noticeType]">
      {{ notice }}
    </p>

    <h1>Добавить пользователя</h1>

    <form @submit.prevent="register">

      <div class="field">
        <input v-model="firstName" placeholder="First name" />
        <span class="error" v-if="errors.firstName">{{ errors.firstName }}</span>
      </div>

      <div class="field">
        <input v-model="lastName" placeholder="Last name" />
        <span class="error" v-if="errors.lastName">{{ errors.lastName }}</span>
      </div>

      <div class="field">
        <input v-model="telephone" placeholder="Phone number" />
        <span class="error" v-if="errors.telephone">{{ errors.telephone }}</span>
      </div>

      <div class="field">
        <input v-model="password" type="password" placeholder="Password" />
        <span class="error" v-if="errors.password">{{ errors.password }}</span>
      </div>

      <div class="field">
        <select v-model="role">
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <button type="submit">Создать</button>
    </form>
  </main>

  <!-- ================= ALUMNI ================= -->
  <main v-if="route.path === '/admin/addalumni'">

    <p v-if="notice" :class="['notice', noticeType]">
      {{ notice }}
    </p>

    <h1>Добавить alumni</h1>

    <form @submit.prevent="register">

      <div class="field">
        <input v-model="firstName" placeholder="First name" />
        <span class="error" v-if="errors.firstName">{{ errors.firstName }}</span>
      </div>

      <div class="field">
        <input v-model="lastName" placeholder="Last name" />
        <span class="error" v-if="errors.lastName">{{ errors.lastName }}</span>
      </div>

      <div class="field">
        <input v-model="telephone" placeholder="Phone number" />
        <span class="error" v-if="errors.telephone">{{ errors.telephone }}</span>
      </div>

      <div class="field">
        <textarea v-model="about" placeholder="About"></textarea>
        <span class="error" v-if="errors.about">{{ errors.about }}</span>
      </div>

      <div class="field">
        <input v-model="placeOfWork" placeholder="Place of work" />
        <span class="error" v-if="errors.placeOfWork">{{ errors.placeOfWork }}</span>
      </div>

      <div class="field">
        <input
          v-model.number="graduationYear"
          type="number"
          placeholder="Graduation year"
          min="1900"
          :max="new Date().getFullYear()"
        />
        <span class="error" v-if="errors.graduationYear">{{ errors.graduationYear }}</span>
      </div>

      <div class="field">
        <input v-model="telegram" placeholder="Telegram" />
      </div>

      <div class="field">
        <input v-model="email" placeholder="Email" />
        <span class="error" v-if="errors.email">{{ errors.email }}</span>
      </div>

      <button type="submit">Создать</button>
    </form>
  </main>
</template>

<style scoped lang="sass">
@use '@/assets/styles/admin/create'
</style>
