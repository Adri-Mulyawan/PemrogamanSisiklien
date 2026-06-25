import { useState } from "react";
import { useAuthStateContext } from "@/utils/Contexts/AuthContext";
import { useMataKuliah } from "@/utils/Hooks/useMataKuliah";

import Card from "@/pages/Admin/Components/Card";
import Heading from "@/pages/Admin/Components/Heading";
import Button from "@/pages/Admin/Components/Button";

import MataKuliahTable from "@/pages/Admin/MataKuliah/MataKuliahTable";
import MataKuliahModal from "@/pages/Admin/MataKuliah/MataKuliahModal";

import { confirmDelete, confirmUpdate } from "@/utils/helpers/SwalHelpers";
import { toastSuccess, toastError } from "@/utils/helpers/ToastHelpers";

const MataKuliah = () => {
  const { user } = useAuthStateContext();
  const {
    data: mataKuliah = [],
    isLoading,
    error,
    addMataKuliah,
    editMataKuliah,
    removeMataKuliah,
  } = useMataKuliah();

  const [selectedMataKuliah, setSelectedMataKuliah] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openAddModal = () => {
    setSelectedMataKuliah(null);
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setSelectedMataKuliah(item);
    setIsModalOpen(true);
  };

  const handleSubmit = async (form) => {
    try {
      if (selectedMataKuliah) {
        confirmUpdate(async () => {
          await editMataKuliah.mutateAsync({ id: form.id, data: form });
          toastSuccess("Data mata kuliah berhasil diperbarui");
          setIsModalOpen(false);
        });
      } else {
        const exists = mataKuliah.find((item) => item.kode === form.kode);

        if (exists) {
          toastError("Kode mata kuliah sudah terdaftar!");
          return;
        }

        await addMataKuliah.mutateAsync(form);
        toastSuccess("Data mata kuliah berhasil ditambahkan");
        setIsModalOpen(false);
      }
    } catch {
      toastError("Terjadi kesalahan");
    }
  };

  const handleDelete = (id) => {
    confirmDelete(async () => {
      try {
        await removeMataKuliah.mutateAsync(id);
        toastSuccess("Data mata kuliah berhasil dihapus");
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
            Daftar Mata Kuliah
          </Heading>

          {user?.permission?.includes("mata-kuliah.create") && (
            <Button onClick={openAddModal}>+ Tambah Mata Kuliah</Button>
          )}
        </div>

        {user?.permission?.includes("mata-kuliah.read") && (
          <MataKuliahTable
            mataKuliah={mataKuliah}
            loading={isLoading}
            error={error}
            openEditModal={openEditModal}
            onDelete={handleDelete}
          />
        )}
      </Card>

      <MataKuliahModal
        key={isModalOpen ? selectedMataKuliah?.id ?? "new" : "closed"}
        isModalOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        selectedMataKuliah={selectedMataKuliah}
      />
    </>
  );
};

export default MataKuliah;
