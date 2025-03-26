import { useState } from "react";
import { ExpenseProps } from "@/types";
import { useExpensesMutation } from "./useExpensesMutation";
import { toast } from "sonner";
export const useFormExpense = ({ date, day }: { date: Date; day: number }) => {
  const [newExpense, setNewExpense] = useState<ExpenseProps>({
    name: "",
    type: "",
    price: 0,
  });
  const { createExpenseMutation } = useExpensesMutation({ date, day });

  const handleChange = (id: string, value: string | number) => {
    if (id === "price") {
      value = parseFloat(value as string);
      if (isNaN(value)) value = "";
    }
    setNewExpense({
      ...newExpense,
      [id]: value,
    });
  };

  const formAction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      newExpense.name === "" ||
      newExpense.price === 0 ||
      newExpense.type === ""
    ) {
      alert("Por favor llene todos los campos");
      return;
    }

    createExpenseMutation.mutate(newExpense, {
      onSuccess: () => {
        setNewExpense({
          name: "",
          price: 0,
          type: "",
        });
        toast.success("Gasto agregado");
      },
      onError: () => {
        toast.error("Error al agregar gasto");
      },
    });
  };

  return {
    newExpense,
    handleChange,
    formAction,
    isPending: createExpenseMutation.isPending,
  };
};
