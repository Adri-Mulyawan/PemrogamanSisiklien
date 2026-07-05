import Button from "@/pages/Admin/Components/Button";
import Pagination from "@/pages/Admin/Components/Pagination";
import { usePagination } from "@/utils/Hooks/usePagination";
import { useTableFilter } from "@/utils/Hooks/useTableFilter";

const SEARCH_FIELDS = ["id", "name", "max_sks"];

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

const DosenTable = ({ dosen = [], loading, error, openEditModal, onDelete }) => {
  const { searchQuery, setSearchQuery, sortConfig, handleSort, filteredAndSorted } =
    useTableFilter(dosen, SEARCH_FIELDS);

  const pagination = usePagination(filteredAndSorted, 5);

  if (loading) {
    return <p className="p-4 text-sm text-slate-500">Loading dosen...</p>;
  }

  if (error) {
    return <p className="p-4 text-sm text-red-600">Gagal memuat data dosen.</p>;
  }

  return (
    <>
      {dosen.length === 0 ? (
        <p className="p-4 text-sm text-slate-500">Tidak ada dosen.</p>
      ) : (
        <>
          {filteredAndSorted.length === 0 ? (
            <>
              <Pagination
                {...pagination}
                searchQuery={searchQuery}
                onSearch={setSearchQuery}
                searchPlaceholder="Cari ID, Nama, atau Max SKS..."
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
                    <th
                      className="py-2 px-4 text-left cursor-pointer select-none hover:bg-blue-700 transition-colors"
                      onClick={() => handleSort("name")}
                    >
                      Nama <SortIcon columnKey="name" sortConfig={sortConfig} />
                    </th>
                    <th
                      className="py-2 px-4 text-left cursor-pointer select-none hover:bg-blue-700 transition-colors"
                      onClick={() => handleSort("max_sks")}
                    >
                      Max SKS <SortIcon columnKey="max_sks" sortConfig={sortConfig} />
                    </th>
                    <th className="py-2 px-4 text-center">Aksi</th>
                  </tr>
                </thead>

                <tbody>
                  {pagination.paginatedData.map((item, index) => (
                    <tr
                      key={item.id}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                    >
                      <td className="py-2 px-4">{item.id}</td>
                      <td className="py-2 px-4">{item.name}</td>
                      <td className="py-2 px-4">{item.max_sks}</td>
                      <td className="py-2 px-4 text-center space-x-2">
                        <Button size="sm" variant="warning" onClick={() => openEditModal(item)}>
                          Edit
                        </Button>
                        <Button size="sm" variant="danger" onClick={() => onDelete(item.id)}>
                          Hapus
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <Pagination
                {...pagination}
                searchQuery={searchQuery}
                onSearch={setSearchQuery}
                searchPlaceholder="Cari ID, Nama, atau Max SKS..."
              />
            </>
          )}
        </>
      )}
    </>
  );
};

export default DosenTable;
