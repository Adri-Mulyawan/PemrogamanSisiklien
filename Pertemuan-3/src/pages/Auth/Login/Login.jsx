import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import Input from "@/pages/Auth/Components/Input";
import Label from "@/pages/Auth/Components/Label";
import Button from "@/pages/Auth/Components/Button";
import Link from "@/pages/Auth/Components/Link";
import Card from "@/pages/Auth/Components/Card";
import Heading from "@/pages/Auth/Components/Heading";
import Form from "@/pages/Auth/Components/Form";

import { login } from "@/utils/Apis/AuthApi";
import { toastSuccess, toastError } from "@/utils/helpers/ToastHelpers";
import { useAuthStateContext } from "@/utils/Contexts/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuthStateContext();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // Jika sudah login langsung redirect
  if (user) return <Navigate to="/admin" />;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = form;

    try {
      const user = await login(email, password);

      setUser(user);

      toastSuccess("Login berhasil");

      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 10);
    } catch (err) {
      toastError(err.message);
    }
  };

  return (
    <Card className="max-w-md w-full">
      <Heading as="h2">Login</Heading>

      <Form onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Masukkan email"
            required
          />
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Masukkan password"
            required
          />
        </div>

        <div className="flex justify-between items-center">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-sm text-gray-600">
              Ingat saya
            </span>
          </label>

          <Link href="#" className="text-sm">
            Lupa password?
          </Link>
        </div>

        <Button type="submit" className="w-full">
          Login
        </Button>
      </Form>

      <p className="text-sm text-center text-gray-600 mt-4">
        Belum punya akun? <Link href="/register">Daftar</Link>
      </p>
    </Card>
  );
};

export default Login;