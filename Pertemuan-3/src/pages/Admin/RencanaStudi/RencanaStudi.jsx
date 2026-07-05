import { useState } from "react";
import { useAuthStateContext } from "@/utils/Contexts/AuthContext";
import { useKelas } from "@/utils/Hooks/useKelas";
import { useDosen } from "@/utils/Hooks/useDosen";
import { useMataKuliah } from "@/utils/Hooks/useMataKuliah";
import { useMahasiswa } from "@/utils/Hooks/useMahasiswa";

import Card from "@/pages/Admin/Components/Card";
import Heading from "@/pages/Admin/Components/Heading";
import Button from "@/pages/Admin/Components/Button";
import RencanaStudiTable from "@/pages/Admin/RencanaStudi/RencanaStudiTable";
import RencanaStudiModal from "@/pages/Admin/RencanaStudi/RencanaStudiModal";

import { confirmDelete, confirmUpdate } from "@/utils/helpers/SwalHelpers";
import { toastSuccess, toastError } from "@/utils/helpers/ToastHelpers";

const RencanaStudi = () => {
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
      const existingMkClass = kelas.find(k => Number(k.mata_kuliah_id) === Number(form.mata_kuliah_id) && k.id !== form.id);
      if (existingMkClass && Number(existingMkClass.dosen_id) !== Number(form.dosen_id)) {
        toastError("Mata Kuliah ini sudah diajarkan oleh Dosen lain di kelas lain!");
        return;
      }

      // Hitung total SKS Dosen
      const mk = mataKuliah.find(m => Number(m.id) === Number(form.mata_kuliah_id));
      const sksMk = mk ? Number(mk.sks) : 0;
      
      const dosenClasses = kelas.filter(k => Number(k.dosen_id) === Number(form.dosen_id) && k.id !== form.id);
      const currentDosenSks = dosenClasses.reduce((total, k) => {
        const kMk = mataKuliah.find(m => Number(m.id) === Number(k.mata_kuliah_id));
        return total + (kMk ? Number(kMk.sks) : 0);
      }, 0);

      const selectedDosen = dosen.find(d => Number(d.id) === Number(form.dosen_id));
      const maxSksDosen = selectedDosen ? Number(selectedDosen.max_sks) : MAX_SKS_DOSEN;

      if (currentDosenSks + sksMk > maxSksDosen) {
        toastError(`Dosen melebihi batas maksimal ${maxSksDosen} SKS!`);
        return;
      }

      // Validasi SKS tiap Mahasiswa
      const invalidMahasiswa = [];
      const mhsIds = form.mahasiswa_ids || [];
      for (let mId of mhsIds) {
        const mIdNumber = Number(mId);
        const mhsClasses = kelas.filter(k => k.mahasiswa_ids?.map(Number).includes(mIdNumber) && k.id !== form.id);
        const currentMhsSks = mhsClasses.reduce((total, k) => {
          const kMk = mataKuliah.find(m => Number(m.id) === Number(k.mata_kuliah_id));
          return total + (kMk ? Number(kMk.sks) : 0);
        }, 0);

        const mhs = mahasiswa.find(m => Number(m.id) === mIdNumber);
        const maxSksMhs = mhs ? Number(mhs.max_sks) : MAX_SKS_MAHASISWA;

        if (currentMhsSks + sksMk > maxSksMhs) {
          invalidMahasiswa.push(mIdNumber);
        }
      }

      if (invalidMahasiswa.length > 0) {
        toastError(`Ada mahasiswa yang melebihi batas ${MAX_SKS_MAHASISWA} SKS!`);
        return;
      }

      const submissionData = {
        ...form,
        mata_kuliah_id: String(form.mata_kuliah_id),
        dosen_id: String(form.dosen_id),
        mahasiswa_ids: form.mahasiswa_ids.map(String)
      };

      if (selectedKelas) {
        confirmUpdate(async () => {
          await editKelas.mutateAsync({ id: form.id, data: submissionData });
          toastSuccess("Data kelas berhasil diperbarui");
          setIsModalOpen(false);
        });
      } else {
        const nextId = kelas.length > 0 
          ? String(Math.max(...kelas.map((m) => Number(m.id) || 0)) + 1)
          : "1";

        await addKelas.mutateAsync({ ...submissionData, id: nextId });
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

          {user?.permission?.includes("rencana-studi.create") && (
            <Button onClick={openAddModal}>+ Tambah Kelas</Button>
          )}
        </div>

        {user?.permission?.includes("rencana-studi.read") && (
          <RencanaStudiTable
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

      <RencanaStudiModal
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

export default RencanaStudi;
