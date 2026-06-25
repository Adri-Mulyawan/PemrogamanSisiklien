import { useState } from "react";

import { useAuthStateContext } from "@/utils/Contexts/AuthContext";
import { useDosen } from "@/utils/Hooks/useDosen";

import Card from "@/pages/Admin/Components/Card";
import Heading from "@/pages/Admin/Components/Heading";
import Button from "@/pages/Admin/Components/Button";

import DosenTable from "@/pages/Admin/Dosen/DosenTable";
import DosenModal from "@/pages/Admin/Dosen/DosenModal";

import { confirmDelete, confirmUpdate } from "@/utils/helpers/SwalHelpers";
import { toastSuccess, toastError } from "@/utils/helpers/ToastHelpers";

const Dosen = () => {
  const { user } = useAuthStateContext();
  const {
    data: dosen = [],
    isLoading,
    error,
    addDosen,
    editDosen,
    removeDosen,
  } = useDosen();

  if (user) {
    console.log("DEBUG - User object:", user);
    console.log("DEBUG - User permission array:", user.permission);
    console.log("DEBUG - Permission includes dosen.read?", user.permission?.includes("dosen.read"));
  }

  const [selectedDosen, setSelectedDosen] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openAddModal = () => {
    setSelectedDosen(null);
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setSelectedDosen(item);
    setIsModalOpen(true);
  };

  const handleSubmit = async (form) => {
    try {
      if (selectedDosen) {
        confirmUpdate(async () => {
          await editDosen.mutateAsync({ id: form.id, data: form });
          toastSuccess("Data dosen berhasil diperbarui");
          setIsModalOpen(false);
        });
      } else {
        const exists = dosen.find((d) => d.nidn === form.nidn);

        if (exists) {
          toastError("NIDN sudah terdaftar!");
          return;
        }

        await addDosen.mutateAsync(form);
        toastSuccess("Data dosen berhasil ditambahkan");
        setIsModalOpen(false);
      }
    } catch {
      toastError("Terjadi kesalahan");
    }
  };

  const handleDelete = (id) => {
    confirmDelete(async () => {
      try {
        await removeDosen.mutateAsync(id);
        toastSuccess("Data dosen berhasil dihapus");
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
            Daftar Dosen
          </Heading>

          {user?.permission?.includes("dosen.create") && (
            <Button onClick={openAddModal}>+ Tambah Dosen</Button>
          )}
        </div>

        {user?.permission?.includes("dosen.read") && (
          <DosenTable
            dosen={dosen}
            loading={isLoading}
            error={error}
            openEditModal={openEditModal}
            onDelete={handleDelete}
          />
        )}
      </Card>

      <DosenModal
        key={isModalOpen ? selectedDosen?.id ?? "new" : "closed"}
        isModalOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        selectedDosen={selectedDosen}
      />
    </>
  );
};

export default Dosen;
