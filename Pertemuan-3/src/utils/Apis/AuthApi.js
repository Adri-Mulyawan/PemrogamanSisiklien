import axios from "@/utils/AxiosInstance";

export const login = async (email, password) => {
    const res = await axios.get("/user", { params: { email } });
    const user = res.data[0];

    if (!user) throw new Error("Email tidak ditemukan");
    if (user.password !== password) throw new Error("Password salah");

    return user;
};

export const register = async (data) => {
    const { name, email, password } = data;

    const existing = await axios.get("/user", { params: { email } });
    if (existing.data.length > 0) {
        throw new Error("Email sudah terdaftar");
    }

    const user = {
        name,
        email,
        password,
        role: "mahasiswa",
        permission: ["krs.page", "krs.read"],
    };

    const res = await axios.post("/user", user);
    return res.data;
};