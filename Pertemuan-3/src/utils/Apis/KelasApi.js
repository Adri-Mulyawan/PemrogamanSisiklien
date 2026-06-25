import axios from "@/utils/AxiosInstance";

export const getAllKelas = () => axios.get("/kelas");
export const storeKelas = (data) => axios.post("/kelas", data);
export const updateKelas = (id, data) => axios.put(`/kelas/${id}`, data);
export const deleteKelas = (id) => axios.delete(`/kelas/${id}`);
