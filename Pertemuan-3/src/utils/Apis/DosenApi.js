import axios from "@/utils/AxiosInstance";

export const getAllDosen = () => axios.get("/dosen");
export const storeDosen = (data) => axios.post("/dosen", data);
export const updateDosen = (id, data) => axios.put(`/dosen/${id}`, data);
export const deleteDosen = (id) => axios.delete(`/dosen/${id}`);
