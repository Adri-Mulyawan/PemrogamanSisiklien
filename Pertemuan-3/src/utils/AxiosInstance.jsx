import axios from "axios";

const AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3001", // alamat json-server
    headers: {
        "Content-Type": "application/json",
    },
});

export default AxiosInstance;