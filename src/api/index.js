import axios from "axios"
import { setAccessToken, getAccessToken } from "@/auth/token.js"

// 🔴 LIVE BACKEND
const API_URL = "https://backend-ktl2.onrender.com/api/v1"
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
})

// access token в headers
api.interceptors.request.use((config) => {
  const token = getAccessToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// ================= AUTH =================

// login
export const login = async (phone_number, password) => {
  const { data } = await api.post("auth/login", {
    phone_number,
    password,
  })

  setAccessToken(data.accessToken)
  return data
}

// refresh
export const refreshToken = async () => {
  const { data } = await api.post("auth/refresh")

  setAccessToken(data.accessToken)
  return data
}

// application (публично)
export const application = async (first_name, last_name, phone_number) => {
  const { data } = await api.post("auth/application", {
    first_name,
    last_name,
    phone_number,
  })
  return data
}

// ================= USER =================

// 🔒 получить текущего пользователя
export const getMe = async () => {
  const { data } = await api.get("auth/me")
  return data
}

export const updateMe = async (payload) => {
  const { data } = await api.patch("auth/me", payload)
  return data
}

// ================= ALUMNI =================

export const getAlumni = async ({ page = 1, limit = 10, year = null } = {}) => {
  const params = new URLSearchParams({ page, limit })

  if (year) {
    params.append("year", year)
  }

  const { data } = await api.get(`alumni?${params.toString()}`)
  return data
}

// получить одного alumni по id
export const getPerson = async (id) => {
  const { data } = await api.get(`alumni/${id}`)
  return data
}

export default api
