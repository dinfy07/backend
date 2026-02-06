import axios from "axios";


export const URL = window.location.hostname === "localhost" ? 'http://localhost:8000' : '';
export const PREFIX = URL + '/api/v1/';

const api = axios.create({
  baseURL: URL + '/api/v1',
  withCredentials: true,
})

export const getUsers = async function () {
  const {data} = await api.get(PREFIX + 'user/');
  return data;
}

export const getIdeas = async function () {
  const {data} = await api.get(PREFIX + 'idea/');
  return data;
}

export const getProjects = async function () {
  const {data} = await api.get(PREFIX + 'project/');
  return data;
}

export const getReports = async function () {
  const {data} = await api.get(PREFIX + 'report/');
  return data;
}

export const getRoles = async function () {
  const {data} = await api.get(PREFIX + 'roles/');
  return data;
}
