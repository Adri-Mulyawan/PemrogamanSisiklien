import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllDosen,
  storeDosen,
  updateDosen,
  deleteDosen,
} from "@/utils/Apis/DosenApi";

export const useDosen = () => {
  const queryClient = useQueryClient();

  const dosenQuery = useQuery({
    queryKey: ["dosen"],
    queryFn: async () => {
      const res = await getAllDosen();
      return res.data;
    },
  });

  const addDosen = useMutation({
    mutationFn: storeDosen,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["dosen"] }),
  });

  const editDosen = useMutation({
    mutationFn: ({ id, data }) => updateDosen(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["dosen"] }),
  });

  const removeDosen = useMutation({
    mutationFn: deleteDosen,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["dosen"] }),
  });

  return {
    ...dosenQuery,
    addDosen,
    editDosen,
    removeDosen,
  };
};
