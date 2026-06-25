import axios from "@/utils/AxiosInstance";

export const getAllMataKuliah = () => axios.get("/mata-kuliah");
export const storeMataKuliah = (data) => axios.post("/mata-kuliah", data);
export const updateMataKuliah = (id, data) => axios.put(`/mata-kuliah/${id}`, data);
export const deleteMataKuliah = (id) => axios.delete(`/mata-kuliah/${id}`);
