import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApi } from "../useApi.ts";
import { toast } from "sonner";
import { UserDate, FormUserData, User } from "@/types/index";

export const usePatchUserFinished = () => {
  const { patch } = useApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => patch(`users/${id}`, { finished: true }),
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({
        queryKey: ["users", "unfinished"],
      });
      const previousUsers = queryClient.getQueryData<UserDate>([
        "users",
        "unfinished",
      ]);
      queryClient.setQueryData<UserDate>(["users", "unfinished"], (old) => {
        if (!old) return undefined;
        return {
          ...old,
          data: old.data.filter((user) => user._id !== id),
          count: old.count - 1,
        };
      });
      return { previousUsers };
    },
    onSuccess: () => {
      toast.success("Lavado finalizado");
    },
    onError: () => {
      toast.error("Error al finalizar lavado");
    },
  });
};

export const usePostUser = () => {
  const { post } = useApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: FormUserData) =>
      post<FormUserData, User>("users/", data),
    onMutate: async (newData) => {
      await queryClient.cancelQueries({
        queryKey: ["users", "unfinished"],
      });

      const previousData = queryClient.getQueryData<UserDate>([
        "users",
        "unfinished",
      ]);

      queryClient.setQueryData<UserDate>(["users", "unfinished"], (old) => {
        if (!old) return undefined;
        return {
          ...old,
          data: [
            ...old.data,
            {
              ...newData,
              _id: "id-temporal",
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ],
          count: old.count + 1,
        };
      });

      return { previousData };
    },

    onError: (error, variables, context) => {
      queryClient.setQueryData(["users", "unfinished"], context?.previousData);
      toast.error("Error al ingresar vehiculo");
    },
  });
};
