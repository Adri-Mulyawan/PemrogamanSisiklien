import { useState } from "react";
import Label from "@/pages/Auth/Components/Label";
import Input from "@/pages/Auth/Components/Input";
import Button from "@/pages/Auth/Components/Button";

const ROLE_OPTIONS = [
  { value: "admin", label: "Admin" },
  { value: "mahasiswa", label: "Mahasiswa" },
];

const PERMISSION_OPTIONS = [
  { value: "dashboard.page", label: "Dashboard" },
  { value: "mahasiswa.page", label: "Mahasiswa Page" },
  { value: "mahasiswa.read", label: "Mahasiswa Read" },
  { value: "mahasiswa.create", label: "Mahasiswa Create" },
  { value: "mahasiswa.update", label: "Mahasiswa Update" },
  { value: "mahasiswa.delete", label: "Mahasiswa Delete" },
  { value: "dosen.page", label: "Dosen Page" },
  { value: "dosen.read", label: "Dosen Read" },
  { value: "dosen.create", label: "Dosen Create" },
  { value: "dosen.update", label: "Dosen Update" },
  { value: "dosen.delete", label: "Dosen Delete" },
  { value: "mata-kuliah.page", label: "Mata Kuliah Page" },
  { value: "mata-kuliah.read", label: "Mata Kuliah Read" },
  { value: "mata-kuliah.create", label: "Mata Kuliah Create" },
  { value: "mata-kuliah.update", label: "Mata Kuliah Update" },
  { value: "mata-kuliah.delete", label: "Mata Kuliah Delete" },
  { value: "krs.page", label: "KRS Page" },
  { value: "krs.read", label: "KRS Read" },
  { value: "user.page", label: "User Page" },
  { value: "user.read", label: "User Read" },
  { value: "user.update", label: "User Update" },
];

const UserModal = ({ isModalOpen, onClose, onSubmit, selectedUser }) => {
  const [form, setForm] = useState(() =>
    selectedUser
      ? {
          id: selectedUser.id,
          name: selectedUser.name,
          email: selectedUser.email,
          role: selectedUser.role,
          permission: selectedUser.permission || [],
          password: selectedUser.password || "",
        }
      : { id: null, name: "", email: "", role: "mahasiswa", permission: [], password: "" }
  );

  const handleRoleChange = (e) => {
    setForm({ ...form, role: e.target.value });
  };

  const handlePermissionChange = (value) => {
    const nextPermissions = form.permission.includes(value)
      ? form.permission.filter((permission) => permission !== value)
      : [...form.permission, value];

    setForm({ ...form, permission: nextPermissions });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  if (!isModalOpen || !selectedUser) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.3)] z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Edit User</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-red-500 text-xl">
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Nama</Label>
              <Input type="text" name="name" value={form.name} readOnly className="bg-gray-100" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input type="email" name="email" value={form.email} readOnly className="bg-gray-100" />
            </div>
            <div className="lg:col-span-2">
              <Label htmlFor="role">Role</Label>
              <select
                name="role"
                value={form.role}
                onChange={handleRoleChange}
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              >
                {ROLE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <Label>Permissions</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2 max-h-72 overflow-y-auto border rounded-lg p-3 bg-gray-50">
              {PERMISSION_OPTIONS.map((option) => (
                <label key={option.value} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={form.permission.includes(option.value)}
                    onChange={() => handlePermissionChange(option.value)}
                    className="h-4 w-4"
                  />
                  <span className="text-sm text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="secondary" onClick={onClose}>
              Batal
            </Button>
            <Button type="submit">Simpan Perubahan</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
