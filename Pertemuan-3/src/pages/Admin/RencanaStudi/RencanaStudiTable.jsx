import Button from "@/pages/Admin/Components/Button";
import Pagination from "@/pages/Admin/Components/Pagination";
import { usePagination } from "@/utils/Hooks/usePagination";
import { useTableFilter } from "@/utils/Hooks/useTableFilter";
import { useAuthStateContext } from "@/utils/Contexts/AuthContext";

const SEARCH_FIELDS = ["id"];

const SortIcon = ({ columnKey, sortConfig }) => {
  if (sortConfig.key !== columnKey) {
    return <span className="ml-1 text-blue-300 opacity-60">↕</span>;
  }
  return (
    <span className="ml-1 text-white">
      {sortConfig.order === "asc" ? "↑" : "↓"}
    </span>
  );
};

const RencanaStudiTable = ({
  kelas = [],
  dosen = [],
  mataKuliah = [],
  loading,
  error,
  openEditModal,
  onDelete,
}) => {
  const { user } = useAuthStateContext();
  const { searchQuery, setSearchQuery, sortConfig, handleSort, filteredAndSorted } =
    useTableFilter(kelas, SEARCH_FIELDS);

  const pagination = usePagination(filteredAndSorted, 5);

  if (loading) {
    return <p className="p-4 text-sm text-slate-500">Loading kelas...</p>;
  }

  if (error) {
    return <p className="p-4 text-sm text-red-600">Gagal memuat data kelas.</p>;
  }

  return (
    <>
      {kelas.length === 0 ? (
        <p className="p-4 text-sm text-slate-500">Tidak ada kelas.</p>
      ) : (
        <>
          {filteredAndSorted.length === 0 ? (
            <>
              <Pagination
                {...pagination}
                searchQuery={searchQuery}
                onSearch={setSearchQuery}
                searchPlaceholder="Cari ID Kelas..."
              />
              <p className="p-4 text-sm text-slate-500">
                Tidak ada data yang cocok dengan pencarian &quot;{searchQuery}&quot;.
              </p>
            </>
          ) : (
            <>
              <table className="w-full text-sm text-gray-700">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th
                      className="py-2 px-4 text-left cursor-pointer select-none hover:bg-blue-700 transition-colors"
                      onClick={() => handleSort("id")}
                    >
                      ID <SortIcon columnKey="id" sortConfig={sortConfig} />
                    </th>
                    <th className="py-2 px-4 text-left">Mata Kuliah</th>
                    <th className="py-2 px-4 text-left">Dosen</th>
                    <th className="py-2 px-4 text-left">Mahasiswa</th>
                    <th className="py-2 px-4 text-center">Aksi</th>
                  </tr>
                </thead>

                <tbody>
                  {pagination.paginatedData.map((item, index) => {
                    const dsn = dosen.find((d) => Number(d.id) === Number(item.dosen_id));
                    const mk = mataKuliah.find((m) => Number(m.id) === Number(item.mata_kuliah_id));
                    const countMhs = item.mahasiswa_ids ? item.mahasiswa_ids.length : 0;

                    return (
                      <tr
                        key={item.id}
                        className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                      >
                        <td className="py-2 px-4">{item.id}</td>
                        <td className="py-2 px-4">{mk ? mk.name : "-"}</td>
                        <td className="py-2 px-4">{dsn ? dsn.name : item.dosen || "-"}</td>
                        <td className="py-2 px-4">{countMhs}</td>
                        <td className="py-2 px-4 text-center space-x-2">
                          {user?.permission?.includes("rencana-studi.update") && (
                            <Button size="sm" variant="warning" onClick={() => openEditModal(item)}>
                              Edit
                            </Button>
                          )}
                          {user?.permission?.includes("rencana-studi.delete") && (
                            <Button size="sm" variant="danger" onClick={() => onDelete(item.id)}>
                              Hapus
                            </Button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <Pagination
                {...pagination}
                searchQuery={searchQuery}
                onSearch={setSearchQuery}
                searchPlaceholder="Cari ID Kelas..."
              />
            </>
          )}
        </>
      )}
    </>
  );
};

export default RencanaStudiTable;
