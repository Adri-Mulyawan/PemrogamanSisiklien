import axios from "@/utils/AxiosInstance";

export const getAllMahasiswa = () => axios.get("/mahasiswa");
export const storeMahasiswa = (data) => axios.post("/mahasiswa", data);
export const updateMahasiswa = (id, data) => axios.put(`/mahasiswa/${id}`, data);
export const deleteMahasiswa = (id) => axios.delete(`/mahasiswa/${id}`);
