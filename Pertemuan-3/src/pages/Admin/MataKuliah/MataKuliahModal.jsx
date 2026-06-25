import { useState } from "react";
import Input from "@/pages/Auth/Components/Input";
import Label from "@/pages/Auth/Components/Label";
import Button from "@/pages/Auth/Components/Button";

const MataKuliahModal = ({ isModalOpen, onClose, onSubmit, selectedMataKuliah }) => {
  const [form, setForm] = useState(() =>
    selectedMataKuliah ?? { kode: "", nama: "", sks: "" }
  );

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.kode || !form.nama || !form.sks) {
      alert("Semua field wajib diisi");
      return;
    }

    onSubmit({ ...form, sks: Number(form.sks) });
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.3)] z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">
            {selectedMataKuliah ? "Edit Mata Kuliah" : "Tambah Mata Kuliah"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-red-500 text-xl"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <Label htmlFor="kode">Kode</Label>
            <Input
              type="text"
              name="kode"
              value={form.kode}
              onChange={handleChange}
              placeholder="Masukkan Kode Mata Kuliah"
              readOnly={selectedMataKuliah}
              required
            />
          </div>
          <div>
            <Label htmlFor="nama">Nama</Label>
            <Input
              type="text"
              name="nama"
              value={form.nama}
              onChange={handleChange}
              placeholder="Masukkan Nama Mata Kuliah"
              required
            />
          </div>
          <div>
            <Label htmlFor="sks">SKS</Label>
            <Input
              type="number"
              name="sks"
              value={form.sks}
              onChange={handleChange}
              placeholder="Masukkan SKS"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" onClick={onClose} variant="secondary">
              Batal
            </Button>
            <Button type="submit">Simpan</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MataKuliahModal;
