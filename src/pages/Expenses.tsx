//Get expense types from zustand or call Api

import Spinner from "@/components/Spinner";
import { useState } from "react";
import { ExpenseTable } from "@/components/Expenses/ExpenseTable";
import { useExpensesData } from "@/hooks/Expenses/useExpensesData";
import { useFormExpense } from "@/hooks/Expenses/useExpenseForm";
import { useExpensesMutation } from "@/hooks/Expenses/useExpensesMutation";
import { FormExpense } from "@/components/Expenses/FormExpense";

import Calendar2 from "@/components/Calendar2";
import { useMonthByYear } from "@/hooks/useMonthByYear";
import { useTypeExpensesData } from "@/hooks/TypeExpenses/useTypeExpensesData";
function Expenses() {
  const currentDate = new Date();
  const [date, setDate] = useState<Date>(currentDate);
  const { groupedMonth, isLoading: loadingCalendar } = useMonthByYear();
  const { data: typeExpenses, isLoading: loadingType } = useTypeExpensesData();
  const { newExpense, handleChange, formAction, isPending } = useFormExpense({
    date,
    day: currentDate.getDate(),
  });
  const { deleteExpenseMutation } = useExpensesMutation({
    date,
    day: currentDate.getDate(),
  });

  const { data: expenses, isLoading, isError } = useExpensesData(date);

  const handleDelete = (_id: string) => {
    deleteExpenseMutation.mutate(_id);
  };

  return (
    <>
      <h2 className="text-center text-h4 font-semibold uppercase ">Gastos</h2>
      <section className=" flex bg-slate-200 rounded-md w-full h-auto p-6 sm:py-9 sm:px-12 flex-col gap-6 ">
        {loadingType && <Spinner />}
        {!loadingType && typeExpenses && (
          <>
            <p className="text-[18px]">Ingresar un gasto nuevo</p>

            <FormExpense
              formAction={formAction}
              isPending={isPending}
              handleChange={handleChange}
              newExpense={newExpense}
              typeExpenses={typeExpenses}
            />
          </>
        )}
      </section>
      <section className="overflow-x-hidden flex bg-slate-200 rounded-md w-full h-auto p-6 sm:py-9 sm:px-12 flex-col justify-center items-center gap-6">
        {loadingCalendar ? (
          <p>Cargando Calendario...</p>
        ) : (
          <Calendar2 data={groupedMonth} date={date} setDate={setDate} />
        )}

        {isLoading && <Spinner />}
        {isError && (
          <div className="text-red-500">
            Error : No se ha podido obtener los datos
          </div>
        )}

        {!isLoading && !isError && expenses?.length === 0 && (
          <p>No hay datos en este mes</p>
        )}

        {expenses && expenses.length > 0 && (
          <ExpenseTable expenses={expenses} handleDelete={handleDelete} />
        )}
      </section>
    </>
  );
}

export default Expenses;
