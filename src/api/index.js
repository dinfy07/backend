import api from "./main.js";

// ================= USERS =================

// получить всех пользователей (admin)
export const getUsers = async () => {
  const { data } = await api.get("user");
  return data;
};

// создать user / admin
export const registerUser = async (userData) => {
  const { data } = await api.post("auth/register", userData);
  return data;
};

// изменить роль
export const updateUserRole = async (id, role) => {
  const { data } = await api.patch(`user/${id}/role`, { role });
  return data;
};

// удалить пользователя
export const deleteUser = async (id) => {
  const { data } = await api.delete(`user/${id}`);
  return data;
};

// ================= ALUMNI =================

// создать alumni (admin)
export const createAlumni = async (alumniData) => {
  const { data } = await api.post("alumni", alumniData);
  return data;
};

// получить alumni (если нужно в админке)
export const getAlumniAdmin = async () => {
  const { data } = await api.get("alumni");
  return data;
};

export default api;
