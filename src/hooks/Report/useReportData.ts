import { useQuery } from "@tanstack/react-query";
import { useApi } from "../useApi";
import {
  DataMonthProps,
  DataReport,
  ComparativeDataReport,
} from "@/types/index";
export const useStatistcData = () => {
  const { get } = useApi();
  return useQuery({
    queryKey: ["report", "statics"],
    queryFn: () => get<DataMonthProps>("report/static"),
    staleTime: 1000 * 60 * 3,
  });
};

export const useDataDate = ({
  year,
  month,
}: {
  year: number;
  month?: number;
}) => {
  const { get } = useApi();
  return useQuery({
    queryKey: ["report", year, month],
    queryFn: () =>
      get<DataReport>(
        `report/data?year=${year}${month ? `&month=${month}` : ""}`,
      ),
    staleTime: 1000 * 60 * 3,
    enabled: !!year,
  });
};

export const useComparativeData = (type: string) => {
  const { get } = useApi();
  return useQuery({
    queryKey: ["comparative", type],
    queryFn: () =>
      get<ComparativeDataReport>(`report/comparative?type=${type}`),
    staleTime: 1000 * 60 * 3,
    enabled: !!type,
  });
};
