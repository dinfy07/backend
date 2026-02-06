<script setup>
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import { getAccessToken, clearAccessToken } from "@/auth/token.js"
import { setAuth } from "@/auth/auth.js"
import { getMe, updateMe } from "@/api/index.js"

const router = useRouter()

// ===== state =====
const user = ref(null)
const loading = ref(false)
const error = ref(null)

const isEditing = ref(false)

const firstName = ref("")
const lastName = ref("")
const phone = ref("")
const password = ref("")

// ===== auth / load =====
onMounted(async () => {
  const token = getAccessToken()
  if (!token) {
    router.replace("/login")
    return
  }

  try {
    loading.value = true
    user.value = await getMe()
  } catch (e) {
    error.value = "Не удалось загрузить данные пользователя"
  } finally {
    loading.value = false
  }
})

// ===== actions =====
const logout = () => {
  clearAccessToken()
  setAuth(false)
  router.push("/login")
}

const startEdit = () => {
  firstName.value = user.value.first_name
  lastName.value = user.value.last_name
  phone.value = user.value.phone_number
  password.value = ""
  isEditing.value = true
}

const saveProfile = async () => {
  try {
    const payload = {
      first_name: firstName.value,
      last_name: lastName.value,
      phone_number: phone.value
    }

    if (password.value) {
      payload.password = password.value
    }

    user.value = await updateMe(payload)
    isEditing.value = false
  } catch (e) {
    error.value = "Не удалось сохранить изменения"
  }
}
</script>



<template>
  <main class="cabinet-page">

    <!-- loading -->
    <div v-if="loading" class="loading">
      Загрузка...
    </div>

    <!-- error -->
    <div v-else-if="error" class="error">
      {{ error }}
    </div>

    <!-- content -->
    <!-- content -->
    <div v-else-if="user" class="cabinet">

      <h1>Жеке кабинет</h1>

      <!-- VIEW MODE -->
      <div v-if="!isEditing" class="card">
        <p><strong>Аты:</strong> {{ user.first_name }}</p>
        <p><strong>Тегі:</strong> {{ user.last_name }}</p>
        <p><strong>Телефон:</strong> {{ user.phone_number }}</p>
        <p><strong>Рөл:</strong> {{ user.role }}</p>

        <div class="actions">
          <button class="btn edit" @click="startEdit">
            Өңдеу
          </button>
          <button class="btn logout" @click="logout">
            Шығу
          </button>
        </div>
      </div>

      <!-- EDIT MODE -->
      <div v-else class="card">
        <div class="field">
          <label>Аты</label>
          <input v-model="firstName" />
        </div>

        <div class="field">
          <label>Тегі</label>
          <input v-model="lastName" />
        </div>

        <div class="field">
          <label>Телефон</label>
          <input v-model="phone" />
        </div>

        <div class="field">
          <label>Жаңа пароль</label>
          <input type="password" v-model="password" placeholder="Қалдырсаңыз — өзгермейді" />
        </div>

        <div class="actions">
          <button class="btn save" @click="saveProfile">
            Сақтау
          </button>
          <button class="btn cancel" @click="isEditing = false">
            Бас тарту
          </button>
        </div>
      </div>

    </div>


  </main>
</template>


<style scoped lang="sass">
.cabinet-page
  padding: 40px
  display: flex
  justify-content: center

.cabinet
  max-width: 500px
  width: 100%

.card
  background: #fff
  border: 1px solid #e5e7eb
  border-radius: 12px
  padding: 20px
  margin: 20px 0

.actions
  display: flex
  justify-content: flex-end

.btn.logout
  background: #ef4444
  color: white
  padding: 10px 18px
  border-radius: 8px
  cursor: pointer
  border: none

.loading, .error
  text-align: center
  font-size: 18px
</style>

