import { useLocation } from "react-router-dom";
import Button from "@/pages/Admin/Components/Button";
import { confirmLogout } from "@/utils/helpers/SwalHelpers";
import { useAuthStateContext } from "@/utils/Contexts/AuthContext";

const Header = () => {
  const { user, setUser } = useAuthStateContext();
  const routerLocation = useLocation();

  const toggleProfileMenu = () => {
    const menu = document.getElementById("profileMenu");
    if (menu) menu.classList.toggle("hidden");
  };

  const handleLogout = () => {
    confirmLogout(() => {
      setUser(null);
      window.location.href = "/";
    });
  };

  const getTitle = () => {
    const path = routerLocation.pathname;

    if (path.startsWith("/admin/mahasiswa")) return "Mahasiswa";
    if (path.startsWith("/admin/dosen")) return "Dosen";
    if (path.startsWith("/admin/mata-kuliah")) return "Mata Kuliah";
    if (path.startsWith("/admin/kelas")) return "Kelas";
    if (path.startsWith("/admin/dashboard")) return "Dashboard";

    return "Admin";
  };

  return (
    <header className="bg-white shadow-md">
      <div className="flex justify-between items-center px-6 py-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            {getTitle()}
          </h1>

          <p className="text-sm text-gray-500">
            Login sebagai: <strong>{user?.role}</strong>
          </p>
        </div>

        <div className="relative">
          <Button
            onClick={toggleProfileMenu}
            className="w-8 h-8 rounded-full bg-gray-300 focus:outline-none"
          />

          <div
            id="profileMenu"
            className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-2 hidden"
          >
            <a
              href="#"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              {user?.name}
            </a>

            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;