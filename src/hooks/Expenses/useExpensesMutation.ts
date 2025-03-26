import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApi } from "@/hooks/useApi";
import { DataTableProps, ExpenseProps } from "@/types";
import { toast } from "sonner";

export const useExpensesMutation = ({
  date,
  day,
}: {
  date: Date;
  day: number;
}) => {
  const { post, delete: deleteExpense } = useApi();
  const queryClient = useQueryClient();

  const deleteExpenseMutation = useMutation({
    mutationFn: (_id: string) => deleteExpense(`expenses/${_id}`),
    onMutate: async (_id: string) => {
      await queryClient.cancelQueries({
        queryKey: ["expenses", date.getMonth() + 1, date.getFullYear()],
      });
      const previousExpenses = queryClient.getQueryData<DataTableProps[]>([
        "expenses",
        date.getMonth() + 1,
        date.getFullYear(),
      ]);

      queryClient.setQueryData<DataTableProps[]>(
        ["expenses", date.getMonth() + 1, date.getFullYear()],
        (old) => old?.filter((expense) => expense._id !== _id),
      );
      return { previousExpenses };
    },
    onSuccess: () => {
      toast.success("Gasto eliminado");
    },
    onError: (error) => {
      toast.error("Error eliminando el gasto");
      console.log("Error eliminando el gasto", error);
    },
  });

  const createExpenseMutation = useMutation({
    mutationFn: (newExpense: ExpenseProps) =>
      post<ExpenseProps, DataTableProps>("expenses/", newExpense),
    onMutate: async (newExpenseData) => {
      await queryClient.cancelQueries({
        queryKey: ["expenses", date.getMonth() + 1, date.getFullYear()],
      });

      const previousExpenses = queryClient.getQueryData<DataTableProps[]>([
        "expenses",
        date.getMonth() + 1,
        date.getFullYear(),
      ]);

      queryClient.setQueryData<DataTableProps[]>(
        ["expenses", date.getMonth() + 1, date.getFullYear()],
        (old) => [
          ...(old || []),
          {
            _id: "temp-id",
            ...newExpenseData,
            day: day,
          },
        ],
      );

      return { previousExpenses };
    },
    onError: (error, variabels, context) => {
      queryClient.setQueryData(
        ["expenses", date.getMonth() + 1, date.getFullYear()],
        context?.previousExpenses,
      );
      console.log("Error creando el gasto", error);
    },
  });

  return { createExpenseMutation, deleteExpenseMutation };
};
