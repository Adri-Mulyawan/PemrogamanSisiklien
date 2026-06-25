import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllKelas,
  storeKelas,
  updateKelas,
  deleteKelas,
} from "@/utils/Apis/KelasApi";

export const useKelas = () => {
  const queryClient = useQueryClient();

  const kelasQuery = useQuery({
    queryKey: ["kelas"],
    queryFn: async () => {
      const res = await getAllKelas();
      return res.data;
    },
  });

  const addKelas = useMutation({
    mutationFn: storeKelas,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["kelas"] }),
  });

  const editKelas = useMutation({
    mutationFn: ({ id, data }) => updateKelas(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["kelas"] }),
  });

  const removeKelas = useMutation({
    mutationFn: deleteKelas,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["kelas"] }),
  });

  return {
    ...kelasQuery,
    addKelas,
    editKelas,
    removeKelas,
  };
};
