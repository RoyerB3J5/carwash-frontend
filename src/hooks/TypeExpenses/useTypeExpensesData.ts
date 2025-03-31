import { useQuery } from "@tanstack/react-query";
import { useApi } from "@/hooks/useApi";
import { TypeExpenseProps } from "@/types/index";
export const useTypeExpensesData = () => {
  const { get } = useApi();
  return useQuery({
    queryKey: ["type-expenses"],
    queryFn: () => get<TypeExpenseProps[]>("type-expenses"),
    staleTime: 1000 * 60 * 2,
  });
};
