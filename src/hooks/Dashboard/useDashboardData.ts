import { useApi } from "../useApi.ts";
import { UserDate, Services } from "@/types/index";
import { useQuery } from "@tanstack/react-query";

export const useDashboardDataUnfinished = () => {
  const { get } = useApi();
  return useQuery({
    queryKey: ["users", "unfinished"],
    queryFn: () => get<UserDate>("users/unfinished"),
    staleTime: 1000 * 60 * 2,
  });
};

export const useDataServiceOne = (vehicle: string) => {
  const { get } = useApi();
  return useQuery({
    queryKey: ["service", vehicle],
    queryFn: () => get<Services>(`services/${vehicle}`),
    enabled: vehicle !== "",
    staleTime: 1000 * 60 * 2,
  });
};

export const useDataServiceAll = () => {
  const { get } = useApi();

  return useQuery({
    queryKey: ["services"],
    queryFn: () => get<Services[]>("services"),
    staleTime: 1000 * 60 * 2,
  });
};
