import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthStateContext } from "@/utils/Contexts/AuthContext";
import { useMahasiswa } from "@/utils/Hooks/useMahasiswa";
import { useKelas } from "@/utils/Hooks/useKelas";
import { useMataKuliah } from "@/utils/Hooks/useMataKuliah";

import Card from "@/pages/Admin/Components/Card";
import Heading from "@/pages/Admin/Components/Heading";
import Button from "@/pages/Admin/Components/Button";

import MahasiswaTable from "@/pages/Admin/Mahasiswa/MahasiswaTable";
import MahasiswaModal from "@/pages/Admin/Mahasiswa/MahasiswaModal";

import { confirmDelete, confirmUpdate } from "@/utils/helpers/SwalHelpers";
import { toastSuccess, toastError } from "@/utils/helpers/ToastHelpers";

const Mahasiswa = () => {
  const { user } = useAuthStateContext();
  const navigate = useNavigate();
  const {
    data: mahasiswa = [],
    isLoading,
    error,
    addMahasiswa,
    editMahasiswa,
    removeMahasiswa,
  } = useMahasiswa();
  
  const { data: kelas = [] } = useKelas();
  const { data: mataKuliah = [] } = useMataKuliah();

  const [selectedMahasiswa, setSelectedMahasiswa] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openAddModal = () => {
    setSelectedMahasiswa(null);
    setIsModalOpen(true);
  };

  const openEditModal = (mhs) => {
    setSelectedMahasiswa(mhs);
    setIsModalOpen(true);
  };

  const handleSubmit = async (form) => {
    try {
      if (selectedMahasiswa) {
        confirmUpdate(async () => {
          await editMahasiswa.mutateAsync({ id: form.id, data: form });
          toastSuccess("Data berhasil diperbarui");
          setIsModalOpen(false);
        });
      } else {
        const exists = mahasiswa.find((m) => m.nim === form.nim);

        if (exists) {
          toastError("NIM sudah terdaftar!");
          return;
        }

        await addMahasiswa.mutateAsync(form);
        toastSuccess("Data berhasil ditambahkan");
        setIsModalOpen(false);
      }
    } catch {
      toastError("Terjadi kesalahan");
    }
  };

  const handleDelete = (id) => {
    confirmDelete(async () => {
      try {
        await removeMahasiswa.mutateAsync(id);
        toastSuccess("Data berhasil dihapus");
      } catch {
        toastError("Gagal menghapus data");
      }
    });
  };

  return (
    <>
      <Card>
        <div className="flex justify-between items-center mb-4">
          <Heading as="h2" className="mb-0 text-left">
            Daftar Mahasiswa
          </Heading>

          {user?.permission?.includes("mahasiswa.create") && (
            <Button onClick={openAddModal}>
              + Tambah Mahasiswa
            </Button>
          )}
        </div>

        {user?.permission?.includes("mahasiswa.read") && (
          <MahasiswaTable
            mahasiswa={mahasiswa}
            kelas={kelas}
            mataKuliah={mataKuliah}
            loading={isLoading}
            error={error}
            openEditModal={openEditModal}
            onDelete={handleDelete}
            onDetail={(id) => navigate(`/admin/mahasiswa/${id}`)}
          />
        )}
      </Card>

      <MahasiswaModal
        key={isModalOpen ? selectedMahasiswa?.id ?? "new" : "closed"}
        isModalOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        selectedMahasiswa={selectedMahasiswa}
      />
    </>
  );
};

export default Mahasiswa;