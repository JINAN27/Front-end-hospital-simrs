import axios from "axios";

const API = axios.create({
  baseURL: "https://backend-hospital-simrs-production.up.railway.app/api",
});

// Tambahkan token ke setiap request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// API untuk Dokter
export const getDokter = () => API.get("/dokter");
export const createDokter = (data) => API.post("/dokter", data);
export const updateDokter = (id, data) => API.put(`/dokter/${id}`, data);
export const deleteDokter = (id) => API.delete(`/dokter/${id}`);

// API untuk Pasien
export const getPasien = () => API.get("/pasien");
export const createPasien = (data) => API.post("/pasien", data);
export const updatePasien = (id, data) => API.put(`/pasien/${id}`, data);
export const deletePasien = (id) => API.delete(`/pasien/${id}`);

// API untuk Janji Temu
export const getJanjiTemu = () => API.get("/janji");
export const createJanjiTemu = (data) => API.post("/janji", data);
export const updateJanjiTemu = (id, data) => API.put(`/janji/${id}`, data);
export const deleteJanjiTemu = (id) => API.delete(`/janji/${id}`);

// API untuk Kamar
export const getKamar = () => API.get("/kamar");
export const createKamar = (data) => API.post("/kamar", data);
export const updateKamar = (id, data) => API.put(`/kamar/${id}`, data);
export const deleteKamar = (id) => API.delete(`/kamar/${id}`);

export default API;
