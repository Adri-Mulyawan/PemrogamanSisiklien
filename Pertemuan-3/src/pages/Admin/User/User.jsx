import { useEffect, useState } from "react";

import { useAuthStateContext } from "@/utils/Contexts/AuthContext";
import { getAllUsers, updateUser } from "@/utils/Apis/UserApi";

import Card from "@/pages/Admin/Components/Card";
import Heading from "@/pages/Admin/Components/Heading";
import Button from "@/pages/Admin/Components/Button";

import UserTable from "@/pages/Admin/User/UserTable";
import UserModal from "@/pages/Admin/User/UserModal";

import { toastSuccess, toastError } from "@/utils/helpers/ToastHelpers";

const User = () => {
  const { user } = useAuthStateContext();

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchUsers = async () => {
    try {
      const res = await getAllUsers();
      setUsers(res.data);
    } catch {
      toastError("Gagal mengambil data user");
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchUsers();
  }, []);

  const openEditModal = (userData) => {
    setSelectedUser(userData);
    setIsModalOpen(true);
  };

  const handleSubmit = async (form) => {
    try {
      await updateUser(form.id, form);
      await fetchUsers();
      toastSuccess("Role dan permission user berhasil diperbarui");
      setIsModalOpen(false);
    } catch {
      toastError("Gagal menyimpan perubahan user");
    }
  };

  return (
    <>
      <Card>
        <div className="flex justify-between items-center mb-4">
          <Heading as="h2" className="mb-0 text-left">
            Manajemen User
          </Heading>
        </div>

        {user?.permission?.includes("user.read") && (
          <UserTable
            users={users}
            openEditModal={openEditModal}
            canEdit={user?.permission?.includes("user.update")}
          />
        )}
      </Card>

      <UserModal
        key={isModalOpen ? selectedUser?.id ?? "user" : "closed"}
        isModalOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        selectedUser={selectedUser}
      />
    </>
  );
};

export default User;
