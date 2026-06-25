import axios from "@/utils/AxiosInstance";

export const getAllUsers = () => axios.get("/user");
export const updateUser = (id, data) => axios.put(`/user/${id}`, data);
