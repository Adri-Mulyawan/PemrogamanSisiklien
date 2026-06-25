import React from "react";
import ReactDOM from "react-dom/client";
import { Navigate, createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

import './App.css';
import { AuthProvider } from "@/utils/Contexts/AuthContext";

import AuthLayout from "@/pages/Auth/AuthLayout";
import AdminLayout from "@/pages/Admin/AdminLayout";
import ProtectedRoute from "@/pages/Admin/Components/ProtectedRoute";

import Login from "@/pages/Auth/Login/Login";
import Register from "@/pages/Auth/Register/Register";
import Dashboard from "@/pages/Admin/Dashboard/Dashboard";
import Mahasiswa from "@/pages/Admin/Mahasiswa/Mahasiswa";
import MahasiswaDetail from "@/pages/Admin/MahasiswaDetail/MahasiswaDetail";
import Dosen from "@/pages/Admin/Dosen/Dosen";
import MataKuliah from "@/pages/Admin/MataKuliah/MataKuliah";
import User from "@/pages/Admin/User/User";
import Kelas from "@/pages/Admin/Kelas/Kelas";
import PageNotFound from "@/pages/Error/PageNotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "mahasiswa",
        children: [
          {
            index: true,
            element: <Mahasiswa />,
          },
          {
            path: ":nim",
            element: <MahasiswaDetail />,
          },
        ],
      },
      {
        path: "dosen",
        element: <Dosen />,
      },
      {
        path: "mata-kuliah",
        element: <MataKuliah />,
      },
      {
        path: "kelas",
        element: <Kelas />,
      },
      {
        path: "user",
        element: <User />,
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 20000,
          success: { duration: 20000 },
          error: { duration: 20000 },
          blank: { duration: 20000 },
        }}
      />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);