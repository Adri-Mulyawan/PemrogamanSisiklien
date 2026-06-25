import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";

import Input from "@/pages/Auth/Components/Input";
import Label from "@/pages/Auth/Components/Label";
import Button from "@/pages/Auth/Components/Button";
import Card from "@/pages/Auth/Components/Card";
import Heading from "@/pages/Auth/Components/Heading";
import Form from "@/pages/Auth/Components/Form";
import Link from "@/pages/Auth/Components/Link";

import { register } from "@/utils/Apis/AuthApi";
import { toastSuccess, toastError } from "@/utils/helpers/ToastHelpers";
import { useAuthStateContext } from "@/utils/Contexts/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { user } = useAuthStateContext();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  if (user) return <Navigate to="/admin" />;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await register(form);
      toastSuccess("Registrasi berhasil. Silakan login.");
      navigate("/");
    } catch (error) {
      toastError(error.message);
    }
  };

  return (
    <Card className="max-w-md w-full">
      <Heading as="h2">Daftar Akun</Heading>

      <Form onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="name">Nama</Label>
          <Input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Masukkan nama"
            required
          />
        </div>

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

        <Button type="submit" className="w-full">
          Daftar
        </Button>
      </Form>

      <p className="text-sm text-center text-gray-600 mt-4">
        Sudah punya akun? <Link href="/">Login</Link>
      </p>
    </Card>
  );
};

export default Register;
