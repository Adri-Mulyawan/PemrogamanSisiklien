import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllMataKuliah,
  storeMataKuliah,
  updateMataKuliah,
  deleteMataKuliah,
} from "@/utils/Apis/MataKuliahApi";

export const useMataKuliah = () => {
  const queryClient = useQueryClient();

  const mataKuliahQuery = useQuery({
    queryKey: ["mata-kuliah"],
    queryFn: async () => {
      const res = await getAllMataKuliah();
      return res.data;
    },
  });

  const addMataKuliah = useMutation({
    mutationFn: storeMataKuliah,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["mata-kuliah"] }),
  });

  const editMataKuliah = useMutation({
    mutationFn: ({ id, data }) => updateMataKuliah(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["mata-kuliah"] }),
  });

  const removeMataKuliah = useMutation({
    mutationFn: deleteMataKuliah,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["mata-kuliah"] }),
  });

  return {
    ...mataKuliahQuery,
    addMataKuliah,
    editMataKuliah,
    removeMataKuliah,
  };
};
