import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApi } from "../useApi";
import { Services } from "@/types/index";
import { toast } from "sonner";

export const useDeleteConfigure = () => {
  const { delete: deleteServices } = useApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (vehicleType: string) =>
      deleteServices(`services/${vehicleType}`),
    onMutate: async (vehicleType: string) => {
      await queryClient.cancelQueries({
        queryKey: ["configure", "services"],
      });
      const previousServices = queryClient.getQueryData<Services[]>([
        "configure",
        "services",
      ]);
      queryClient.setQueryData<Services[]>(["configure", "services"], (old) =>
        old?.filter((service) => service.vehicleType !== vehicleType),
      );
      return { previousServices };
    },
    onSuccess: () => {
      toast.success("Servicios eliminados");
    },
    onError: () => {
      toast.error("Error al eliminar los servicios");
    },
  });
};
