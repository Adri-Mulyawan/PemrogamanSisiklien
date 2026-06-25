import { useState } from "react";
import { useAuthStateContext } from "@/utils/Contexts/AuthContext";
import { useKelas } from "@/utils/Hooks/useKelas";
import { useDosen } from "@/utils/Hooks/useDosen";
import { useMataKuliah } from "@/utils/Hooks/useMataKuliah";
import { useMahasiswa } from "@/utils/Hooks/useMahasiswa";

import Card from "@/pages/Admin/Components/Card";
import Heading from "@/pages/Admin/Components/Heading";
import Button from "@/pages/Admin/Components/Button";
import KelasTable from "@/pages/Admin/Kelas/KelasTable";
import KelasModal from "@/pages/Admin/Kelas/KelasModal";

import { confirmDelete, confirmUpdate } from "@/utils/helpers/SwalHelpers";
import { toastSuccess, toastError } from "@/utils/helpers/ToastHelpers";

const Kelas = () => {
  const { user } = useAuthStateContext();
  const { data: kelas = [], isLoading, error, addKelas, editKelas, removeKelas } = useKelas();
  const { data: dosen = [] } = useDosen();
  const { data: mataKuliah = [] } = useMataKuliah();
  const { data: mahasiswa = [] } = useMahasiswa();

  const MAX_SKS_MAHASISWA = 24;
  const MAX_SKS_DOSEN = 12;

  const [selectedKelas, setSelectedKelas] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openAddModal = () => {
    setSelectedKelas(null);
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setSelectedKelas(item);
    setIsModalOpen(true);
  };

  const handleSubmit = async (form) => {
    try {
      // Validasi 1 MK = 1 Dosen
      // Cek apakah mata kuliah ini sudah diajar oleh dosen lain di kelas lain
      const existingMkClass = kelas.find(k => Number(k.mataKuliahId) === Number(form.mataKuliahId) && k.id !== form.id);
      if (existingMkClass && Number(existingMkClass.dosenId) !== Number(form.dosenId)) {
        toastError("Mata Kuliah ini sudah diajarkan oleh Dosen lain di kelas lain!");
        return;
      }

      // Hitung total SKS Dosen
      const mk = mataKuliah.find(m => Number(m.id) === Number(form.mataKuliahId));
      const sksMk = mk ? Number(mk.sks) : 0;
      
      const dosenClasses = kelas.filter(k => Number(k.dosenId) === Number(form.dosenId) && k.id !== form.id);
      const currentDosenSks = dosenClasses.reduce((total, k) => {
        const kMk = mataKuliah.find(m => Number(m.id) === Number(k.mataKuliahId));
        return total + (kMk ? Number(kMk.sks) : 0);
      }, 0);

      if (currentDosenSks + sksMk > MAX_SKS_DOSEN) {
        toastError(`Dosen melebihi batas maksimal ${MAX_SKS_DOSEN} SKS!`);
        return;
      }

      // Validasi SKS tiap Mahasiswa
      const invalidMahasiswa = [];
      const mhsIds = form.mahasiswaIds || [];
      for (let mId of mhsIds) {
        const mIdNumber = Number(mId);
        const mhsClasses = kelas.filter(k => k.mahasiswaIds?.map(Number).includes(mIdNumber) && k.id !== form.id);
        const currentMhsSks = mhsClasses.reduce((total, k) => {
          const kMk = mataKuliah.find(m => Number(m.id) === Number(k.mataKuliahId));
          return total + (kMk ? Number(kMk.sks) : 0);
        }, 0);

        if (currentMhsSks + sksMk > MAX_SKS_MAHASISWA) {
          invalidMahasiswa.push(mIdNumber);
        }
      }

      if (invalidMahasiswa.length > 0) {
        toastError(`Ada mahasiswa yang melebihi batas ${MAX_SKS_MAHASISWA} SKS!`);
        return;
      }

      const submissionData = {
        ...form,
        mataKuliahId: Number(form.mataKuliahId),
        dosenId: Number(form.dosenId),
        mahasiswaIds: form.mahasiswaIds.map(Number)
      };

      if (selectedKelas) {
        confirmUpdate(async () => {
          await editKelas.mutateAsync({ id: form.id, data: submissionData });
          toastSuccess("Data kelas berhasil diperbarui");
          setIsModalOpen(false);
        });
      } else {
        const exists = kelas.find((item) => item.kode === form.kode);

        if (exists) {
          toastError("Kode kelas sudah terdaftar!");
          return;
        }

        await addKelas.mutateAsync(submissionData);
        toastSuccess("Data kelas berhasil ditambahkan");
        setIsModalOpen(false);
      }
    } catch {
      toastError("Terjadi kesalahan");
    }
  };

  const handleDelete = (id) => {
    confirmDelete(async () => {
      try {
        await removeKelas.mutateAsync(id);
        toastSuccess("Data kelas berhasil dihapus");
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
            Daftar Kelas
          </Heading>

          {user?.permission?.includes("kelas.create") && (
            <Button onClick={openAddModal}>+ Tambah Kelas</Button>
          )}
        </div>

        {user?.permission?.includes("kelas.read") && (
          <KelasTable
            kelas={kelas}
            dosen={dosen}
            mataKuliah={mataKuliah}
            loading={isLoading}
            error={error}
            openEditModal={openEditModal}
            onDelete={handleDelete}
          />
        )}
      </Card>

      <KelasModal
        key={isModalOpen ? selectedKelas?.id ?? "new" : "closed"}
        isModalOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        selectedKelas={selectedKelas}
        mataKuliah={mataKuliah}
        dosen={dosen}
        mahasiswa={mahasiswa}
        kelas={kelas}
      />
    </>
  );
};

export default Kelas;
