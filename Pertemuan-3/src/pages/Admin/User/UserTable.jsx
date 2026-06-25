import Button from "@/pages/Admin/Components/Button";
import { usePagination } from "@/utils/Hooks/usePagination";
import Pagination from "@/pages/Admin/Components/Pagination";

const UserTable = ({ users = [], openEditModal, canEdit }) => {
  const pagination = usePagination(users, 5);
  return (
    <>
    <table className="w-full text-sm text-gray-700">
      <thead className="bg-blue-600 text-white">
        <tr>
          <th className="py-2 px-4 text-left">Nama</th>
          <th className="py-2 px-4 text-left">Email</th>
          <th className="py-2 px-4 text-left">Role</th>
          <th className="py-2 px-4 text-left">Permissions</th>
          <th className="py-2 px-4 text-center">Aksi</th>
        </tr>
      </thead>

      <tbody>
        {pagination.paginatedData.map((item, index) => (
          <tr key={item.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
            <td className="py-2 px-4">{item.name}</td>
            <td className="py-2 px-4">{item.email}</td>
            <td className="py-2 px-4 capitalize">{item.role}</td>
            <td className="py-2 px-4">
              <div className="flex flex-wrap gap-1">
                {item.permission?.map((permission) => (
                  <span key={permission} className="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                    {permission}
                  </span>
                ))}
              </div>
            </td>
            <td className="py-2 px-4 text-center">
              {canEdit ? (
                <Button size="sm" variant="warning" onClick={() => openEditModal(item)}>
                  Edit
                </Button>
              ) : (
                <span className="text-sm text-gray-500">Tidak ada aksi</span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <Pagination {...pagination} />
    </>
  );
};

export default UserTable;
