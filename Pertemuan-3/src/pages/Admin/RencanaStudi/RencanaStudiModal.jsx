import { useState, useMemo } from "react";

const emptyForm = {
  mata_kuliah_id: "",
  dosen_id: "",
  mahasiswa_ids: [],
};

const RencanaStudiModal = ({ isModalOpen, onClose, onSubmit, selectedKelas, mataKuliah = [], dosen = [], mahasiswa = [], kelas = [] }) => {
  const [form, setForm] = useState(() =>
    selectedKelas
      ? { 
          ...selectedKelas, 
          mata_kuliah_id: selectedKelas.mata_kuliah_id || "",
          dosen_id: selectedKelas.dosen_id || "",
          mahasiswa_ids: selectedKelas.mahasiswa_ids || []
        }
      : emptyForm
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (mhsId) => {
    setForm((prev) => {
      const isSelected = prev.mahasiswa_ids.includes(mhsId);
      if (isSelected) {
        return { ...prev, mahasiswa_ids: prev.mahasiswa_ids.filter(id => id !== mhsId) };
      } else {
        return { ...prev, mahasiswa_ids: [...prev.mahasiswa_ids, mhsId] };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.mata_kuliah_id || !form.dosen_id) return;
    onSubmit({ ...form });
  };

  // Helper untuk menghitung SKS mahasiswa
  const getMahasiswaSks = (mhsId) => {
    const mhsIdNumber = Number(mhsId);
    const mhsClasses = kelas.filter(k => k.mahasiswa_ids?.map(Number).includes(mhsIdNumber) && k.id !== selectedKelas?.id);
    return mhsClasses.reduce((total, k) => {
      const kMk = mataKuliah.find(m => Number(m.id) === Number(k.mata_kuliah_id));
      return total + (kMk ? Number(kMk.sks) : 0);
    }, 0);
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg overflow-hidden flex flex-col max-h-[90vh]">
        <div className="border-b px-6 py-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            {selectedKelas ? "Edit Rencana Studi" : "Tambah Rencana Studi"}
          </h3>
          <button className="text-slate-500 hover:text-slate-800" onClick={onClose}>
            &times;
          </button>
        </div>

        <form className="p-6 space-y-4 overflow-y-auto" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">Mata Kuliah</label>
              <select
                name="mata_kuliah_id"
                value={form.mata_kuliah_id}
                onChange={handleChange}
                className="mt-2 w-full rounded border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400 bg-white"
              >
                <option value="">-- Pilih Mata Kuliah --</option>
                {mataKuliah.map((mk) => (
                  <option key={mk.id} value={mk.id}>{mk.name} ({mk.sks} SKS)</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Dosen</label>
              <select
                name="dosen_id"
                value={form.dosen_id}
                onChange={handleChange}
                className="mt-2 w-full rounded border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400 bg-white"
              >
                <option value="">-- Pilih Dosen --</option>
                {dosen.map((dsn) => (
                  <option key={dsn.id} value={dsn.id}>{dsn.name} (Max: {dsn.max_sks} SKS)</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Pilih Mahasiswa (Max 24 SKS per anak)</label>
            <div className="border border-slate-300 rounded p-3 h-48 overflow-y-auto space-y-2">
              {mahasiswa.length === 0 ? <p className="text-sm text-slate-500">Tidak ada data mahasiswa</p> : null}
              {mahasiswa.map((mhs) => {
                const currentSks = getMahasiswaSks(mhs.id);
                const selectedMkSks = mataKuliah.find(m => Number(m.id) === Number(form.mata_kuliah_id))?.sks || 0;
                const isSelected = form.mahasiswa_ids.map(Number).includes(Number(mhs.id));
                const maxSksMhs = mhs.max_sks ? Number(mhs.max_sks) : 24;
                const isOverLimit = !isSelected && (currentSks + Number(selectedMkSks) > maxSksMhs);

                return (
                  <label key={mhs.id} className={`flex items-center space-x-3 text-sm ${isOverLimit ? 'opacity-50' : 'cursor-pointer'}`}>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      disabled={isOverLimit}
                      onChange={() => handleCheckboxChange(mhs.id)}
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="flex-1">{mhs.nim} - {mhs.nama}</span>
                    <span className={`px-2 py-0.5 rounded text-xs ${currentSks >= 20 ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-700'}`}>
                      {currentSks} SKS Diambil
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              className="px-4 py-2 rounded bg-slate-200 text-slate-700 hover:bg-slate-300"
              onClick={onClose}
            >
              Batal
            </button>
            <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RencanaStudiModal;
