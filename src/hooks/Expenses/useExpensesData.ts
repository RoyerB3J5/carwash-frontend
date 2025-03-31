import { useQuery } from "@tanstack/react-query";
import { DataTableProps } from "@/types";
import { useApi } from "@/hooks/useApi";

export const useExpensesData = (date: Date) => {
  const { get } = useApi();

  return useQuery({
    queryKey: ["expenses", date.getMonth() + 1, date.getFullYear()],
    queryFn: () =>
      get<DataTableProps[]>(
        `expenses/${date.getMonth() + 1}/${date.getFullYear()}`,
      ),
    enabled: !!date,
    staleTime: 1000 * 60 * 2,
  });
};
