import axios from "axios";
import { getAccessToken } from "@/auth/token.js";
import api from "@/api/index.js";

const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:8000/api/v1/"
    : "/api/v1/";

const adminApi = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// access token
adminApi.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ================= ADMIN USERS =================

// 1️⃣ GET users (показать всех в админке)
export const getUsers = async ({ page = 1, limit = 10 } = {}) => {
  const { data } = await adminApi.get(`/user?page=${page}&limit=${limit}`)
  return data
}

export const getAlumni = async ({ page = 1, limit = 10 } = {}) => {
  const { data } = await adminApi.get(`/alumni?page=${page}&limit=${limit}`)
  return data
}


// 2️⃣ REGISTER user / admin
export const registerUser = async (userData) => {
  const { data } = await adminApi.post("auth/register", userData);
  return data;
};

// 3️⃣ UPDATE user (ВСЕ поля, даже если не менялись)
export const updateUser = async (id, userData) => {
  const { data } = await adminApi.put(`user/${id}`, userData);
  return data;
};

// 4️⃣ DELETE user
export const deleteUser = async (id) => {
  const { data } = await adminApi.delete(`user/${id}`);
  return data;
};

export const updateAlumni = async (id, userData) => {
  const { data } = await adminApi.put(`alumni/${id}`, userData);
  return data;
};

export const deleteAlumni = async (id) => {
  const { data } = await adminApi.delete(`alumni/${id}`);
  return data;
};

export const createAlumni = async (alumniData) => {
  const { data } = await adminApi.post("alumni", alumniData);
  return data;
};

export const getPerson = async (id) => {
  const { data } = await api.get(`alumni/${id}`)
  return data
}
export const getUserById = async (id) => {
  const { data } = await api.get(`user/${id}`)
  return data
}
