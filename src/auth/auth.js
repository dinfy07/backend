import { ref } from "vue"
import { getAccessToken } from "./token.js"

export const isAuth = ref(!!getAccessToken())

export const setAuth = (value) => {
  isAuth.value = value
}
