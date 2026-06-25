import { useParams, useNavigate } from "react-router-dom";
import Card from "@/pages/Admin/Components/Card";
import Heading from "@/pages/Admin/Components/Heading";
import Button from "@/pages/Admin/Components/Button";
import { mahasiswaList } from "@/Data/Dummy";

const MahasiswaDetail = () => {
  const { nim } = useParams();
  const navigate = useNavigate();

  // Baca dari localStorage agar sinkron dengan data terbaru
  const saved = localStorage.getItem("mahasiswaList");
  const list = saved ? JSON.parse(saved) : mahasiswaList;

  const mahasiswa = list.find((m) => m.nim === nim);

  if (!mahasiswa) {
    return (
      <Card>
        <p className="text-red-600">Data mahasiswa tidak ditemukan.</p>
        <Button
          className="mt-4"
          variant="secondary"
          onClick={() => navigate("/admin/mahasiswa")}
        >
          ← Kembali
        </Button>
      </Card>
    );
  }

  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <Heading as="h2" className="mb-0 text-left">
          Detail Mahasiswa
        </Heading>
        <Button
          variant="secondary"
          onClick={() => navigate("/admin/mahasiswa")}
        >
          ← Kembali
        </Button>
      </div>

      <table className="table-auto text-sm w-full">
        <tbody>
          <tr className="border-b">
            <td className="py-2 px-4 font-medium w-32">NIM</td>
            <td className="py-2 px-4">{mahasiswa.nim}</td>
          </tr>
          <tr>
            <td className="py-2 px-4 font-medium">Nama</td>
            <td className="py-2 px-4">{mahasiswa.nama}</td>
          </tr>
        </tbody>
      </table>
    </Card>
  );
};

export default MahasiswaDetail;