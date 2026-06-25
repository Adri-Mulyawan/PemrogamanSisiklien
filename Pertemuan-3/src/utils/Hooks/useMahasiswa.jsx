import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllMahasiswa,
  storeMahasiswa,
  updateMahasiswa,
  deleteMahasiswa,
} from "@/utils/Apis/MahasiswaApi";

export const useMahasiswa = () => {
  const queryClient = useQueryClient();

  const mahasiswaQuery = useQuery({
    queryKey: ["mahasiswa"],
    queryFn: async () => {
      const res = await getAllMahasiswa();
      return res.data;
    },
  });

  const addMahasiswa = useMutation({
    mutationFn: storeMahasiswa,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["mahasiswa"] }),
  });

  const editMahasiswa = useMutation({
    mutationFn: ({ id, data }) => updateMahasiswa(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["mahasiswa"] }),
  });

  const removeMahasiswa = useMutation({
    mutationFn: deleteMahasiswa,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["mahasiswa"] }),
  });

  return {
    ...mahasiswaQuery,
    addMahasiswa,
    editMahasiswa,
    removeMahasiswa,
  };
};
