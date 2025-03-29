import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApi } from "../useApi";
import { Services, Service } from "@/types/index";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
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
    onError: (error, variable, context) => {
      queryClient.setQueryData(
        ["configure", "services"],
        context?.previousServices,
      );
      toast.error("Error al eliminar los servicios");
    },
  });
};

export const useUpdateConfigure = (vehicleType: string) => {
  const { put } = useApi();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (service: Service[]) =>
      put<Service[], Services>(`services/${vehicleType}`, service),
    onMutate: async (vehicleService) => {
      await queryClient.cancelQueries({
        queryKey: ["configure", "services"],
      });

      const previousServices = queryClient.getQueryData<Services[]>([
        "configure",
        "services",
      ]);

      queryClient.setQueryData<Services[]>(["configure", "services"], (old) => {
        if (!old) return undefined;
        return old.map((serviceSingle) => {
          if (serviceSingle.vehicleType === vehicleType) {
            return {
              ...serviceSingle,
              service: vehicleService,
            };
          }
          return serviceSingle;
        });
      });

      return { previousServices };
    },
    onSuccess: () => {
      toast.success("Servicios actualizados");
      navigate(-1);
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(
        ["configure", "services"],
        context?.previousServices,
      );
      toast.error("Error al actualizar los servicios");
    },
  });
};
export const useNewService = () => {
  const { post } = useApi();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newService: Services) =>
      post<Services, Services>("services", newService),
    onMutate: async (newServices) => {
      await queryClient.cancelQueries({
        queryKey: ["configure", "services"],
      });
      const previousServices = queryClient.getQueryData<Services[]>([
        "configure",
        "services",
      ]);
      queryClient.setQueryData<Services[]>(["configure", "services"], (old) => {
        if (!old) return undefined;
        return [...old, newServices];
      });
      return { previousServices };
    },
    onSuccess: () => {
      toast.success("Nuevos lavados creados");
      navigate(-1);
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(
        ["configure", "services"],
        context?.previousServices,
      );
      toast.error("Error al crear los lavados");
    },
  });
};
