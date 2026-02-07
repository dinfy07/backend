import axios from "axios"
import { getAccessToken } from "@/auth/token.js"
import api from "@/api/index.js"
// 🔴 LIVE BACKEND
const API_URL = "https://backend-ktl2.onrender.com/api/v1"
const adminApi = axios.create({
  baseURL: API_URL,
  withCredentials: true,
})

// access token
adminApi.interceptors.request.use((config) => {
  const token = getAccessToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// ================= ADMIN USERS =================

// GET users
export const getUsers = async ({ page = 1, limit = 10 } = {}) => {
  const { data } = await adminApi.get(`user?page=${page}&limit=${limit}`)
  return data
}

export const getAlumni = async ({ page = 1, limit = 10 } = {}) => {
  const { data } = await adminApi.get(`alumni?page=${page}&limit=${limit}`)
  return data
}

// REGISTER user / admin
export const registerUser = async (userData) => {
  const { data } = await adminApi.post("auth/register", userData)
  return data
}

// UPDATE user
// src/api/admin.js
export const updateUser = async (id, userData) => {
  const { data } = await adminApi.patch(`user/${id}`, userData)
  return data
}


// DELETE user
export const deleteUser = async (id) => {
  const { data } = await adminApi.delete(`user/${id}`)
  return data
}

// ALUMNI
export const updateAlumni = async (id, userData) => {
  const { data } = await adminApi.put(`alumni/${id}`, userData)
  return data
}

export const deleteAlumni = async (id) => {
  const { data } = await adminApi.delete(`alumni/${id}`)
  return data
}

export const createAlumni = async (alumniData) => {
  const { data } = await adminApi.post("alumni", alumniData)
  return data
}


export const getUserById = async (id) => {
  const { data } = await api.get(`user/${id}`)
  return data
}
