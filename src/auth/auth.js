import { ref } from "vue"
import {getAccessToken, setAccessToken} from "./token.js"
import {getMe, refreshToken} from "@/api/index.js"

export const isAuth = ref(false)
export const user = ref(null)
export const isAuthReady = ref(false) // 🔥 ВАЖНО

export const setAuth = (value) => {
  isAuth.value = value
}

export const initAuth = async () => {
  const token = getAccessToken()

  if (!token) {
    isAuth.value = false
    isAuthReady.value = true
    return
  }

  try {
    // пробуем восстановиться через refresh
    const { accessToken } = await refreshToken()
    setAccessToken(accessToken)

    const me = await getMe()
    user.value = me
    isAuth.value = true
  } catch {
    isAuth.value = false
    user.value = null
  } finally {
    isAuthReady.value = true
  }

}
