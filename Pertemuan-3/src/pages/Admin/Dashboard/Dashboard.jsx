import React, { useMemo } from 'react';
import { useAuthStateContext } from "@/utils/Contexts/AuthContext";
import { useMahasiswa } from "@/utils/Hooks/useMahasiswa";
import { useDosen } from "@/utils/Hooks/useDosen";
import { useKelas } from "@/utils/Hooks/useKelas";
import { useMataKuliah } from "@/utils/Hooks/useMataKuliah";

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell,
  LineChart, Line
} from 'recharts';

import Card from "@/pages/Admin/Components/Card";
import Heading from "@/pages/Admin/Components/Heading";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const Dashboard = () => {
  const { user } = useAuthStateContext();
  
  const { data: mahasiswa = [], isLoading: loadingMhs } = useMahasiswa();
  const { data: dosen = [], isLoading: loadingDsn } = useDosen();
  const { data: kelas = [], isLoading: loadingKls } = useKelas();
  const { data: mataKuliah = [], isLoading: loadingMk } = useMataKuliah();

  // 1. Data for Summary Cards
  const summaryData = [
    { title: "Total Mahasiswa", value: mahasiswa.length, color: "bg-blue-100 text-blue-700" },
    { title: "Total Dosen", value: dosen.length, color: "bg-green-100 text-green-700" },
    { title: "Total Kelas", value: kelas.length, color: "bg-yellow-100 text-yellow-700" },
    { title: "Mata Kuliah", value: mataKuliah.length, color: "bg-purple-100 text-purple-700" },
  ];

  // 2. Data for Chart 1: Distribusi Kapasitas Kelas (Bar Chart)
  const kelasCapacityData = useMemo(() => {
    return kelas.map(k => ({
      name: k.nama,
      kapasitas: k.kapasitas,
    }));
  }, [kelas]);

  // 3. Data for Chart 2: Perbandingan Entitas (Pie Chart)
  const entityComparisonData = useMemo(() => {
    return [
      { name: 'Mahasiswa', value: mahasiswa.length },
      { name: 'Dosen', value: dosen.length },
      { name: 'Mata Kuliah', value: mataKuliah.length },
      { name: 'Kelas', value: kelas.length },
    ].filter(item => item.value > 0);
  }, [mahasiswa, dosen, mataKuliah, kelas]);

  // 4. Data for Chart 3: Dummy Trend Pendaftaran Mahasiswa (Line Chart)
  // Karena data aslinya tidak punya tanggal, kita buat data trend simulasi
  const enrollmentTrendData = [
    { month: 'Jan', mahasiswa: Math.floor(mahasiswa.length * 0.1) || 1 },
    { month: 'Feb', mahasiswa: Math.floor(mahasiswa.length * 0.3) || 2 },
    { month: 'Mar', mahasiswa: Math.floor(mahasiswa.length * 0.5) || 3 },
    { month: 'Apr', mahasiswa: Math.floor(mahasiswa.length * 0.8) || 5 },
    { month: 'May', mahasiswa: mahasiswa.length || 7 },
  ];

  if (loadingMhs || loadingDsn || loadingKls || loadingMk) {
    return <div className="flex justify-center p-8"><p className="text-gray-500">Memuat data dashboard...</p></div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <Heading as="h1" className="text-2xl font-bold text-gray-800 mb-2">Dashboard Analytics</Heading>
        <p className="text-gray-600">Selamat datang kembali, {user?.name || "Admin"}!</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryData.map((item, index) => (
          <Card key={index} className="flex items-center p-4">
            <div className={`p-3 rounded-lg ${item.color} mr-4`}>
              <span className="text-2xl font-bold">{item.value}</span>
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">{item.title}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        
        {/* Chart 1: Bar Chart */}
        <Card className="p-4">
          <Heading as="h3" className="text-lg mb-4 text-center">Kapasitas per Kelas</Heading>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={kelasCapacityData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <RechartsTooltip cursor={{fill: 'transparent'}} />
                <Legend />
                <Bar dataKey="kapasitas" name="Kapasitas Mahasiswa" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Chart 2: Pie Chart */}
        <Card className="p-4">
          <Heading as="h3" className="text-lg mb-4 text-center">Proporsi Data Sistem</Heading>
          <div className="h-72 w-full flex justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={entityComparisonData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {entityComparisonData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Chart 3: Line Chart */}
        <Card className="p-4 lg:col-span-2">
          <Heading as="h3" className="text-lg mb-4 text-center">Tren Pendaftaran Mahasiswa (Simulasi 2024)</Heading>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={enrollmentTrendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis />
                <RechartsTooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="mahasiswa" 
                  name="Jumlah Mahasiswa" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  activeDot={{ r: 8 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

      </div>
    </div>
  );
};

export default Dashboard;