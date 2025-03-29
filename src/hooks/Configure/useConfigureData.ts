import { useQuery } from "@tanstack/react-query";
import { useApi } from "../useApi";
import { Services } from "@/types/index";
export const useConfigureData = () => {
  const { get } = useApi();
  return useQuery({
    queryKey: ["configure", "services"],
    queryFn: () => get<Services[]>("services"),
    staleTime: 1000 * 60 * 2,
  });
};

export const useSingleService = (vehicleType: string | undefined) => {
  const { get } = useApi();
  return useQuery({
    queryKey: ["services", vehicleType],
    queryFn: () => get<Services>(`services/${vehicleType}`),
  });
};
