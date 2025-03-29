//Get expense types from zustand or call Api
import { MonthPicker } from "@/components/CalendarMonths";
import Spinner from "@/components/Spinner";
import { useState } from "react";
import { ExpenseTable } from "@/components/Expenses/ExpenseTable";
import { useExpensesData } from "@/hooks/Expenses/useExpensesData";
import { useFormExpense } from "@/hooks/Expenses/useExpenseForm";
import { useExpensesMutation } from "@/hooks/Expenses/useExpensesMutation";
import { FormExpense } from "@/components/Expenses/FormExpense";
import { TypeExpenseProps } from "@/types";

function Expenses() {
  const typeExpenses: TypeExpenseProps[] = [
    {
      _id: "124",
      name: "Servicios",
    },
    {
      _id: "125",
      name: "Productos",
    },
    {
      _id: "1342",
      name: "Alquiler",
    },
  ];
  const currentDate = new Date();
  const [date, setDate] = useState<Date>(currentDate);
  const [currentYear, setCurrentYear] = useState(currentDate);
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
        <p className="text-[18px]">Ingresar un gasto nuevo</p>
        {/*<form
          className="w-full flex flex-col justify-center items-center gap-6"
          onSubmit={formAction}
        >
          <div className="grid w-full grid-cols-2 sm:grid-cols-3 justify-center items-center gap-4">
            <Input
              placeholder="Nombre"
              type="text"
              className="w-full focus:outline-1"
              id="name"
              value={newExpense.name}
              onChange={(e) => handleChange("name", e.target.value)}
              disabled={isPending}
            />
            <div className="relative">
              <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500">
                S/.{" "}
              </span>
              <Input
                placeholder="Monto"
                type="number"
                className="w-full px-8"
                id="price"
                onChange={(e) => handleChange("price", e.target.value)}
                value={newExpense.price}
                disabled={isPending}
              />
            </div>

            <Select
              onValueChange={(value) => handleChange("type", value)}
              value={newExpense.type}
              disabled={isPending}
            >
              <SelectTrigger className="w-full bg-white border-0 focus:outline-1">
                <SelectValue placeholder="Tipo de gasto" />
              </SelectTrigger>
              <SelectContent className="bg-white ">
                {typeExpenses.map((type) => (
                  <SelectItem value={type.name} key={type._id}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <button
            className="bg-accent self-end px-6 py-1.5 rounded-md font-semibold cursor-pointer hover:-translate-y-0.5 transform transition-transform"
            type="submit"
          >
            {isPending ? "Guardando..." : "Guardar"}
          </button>
        </form>*/}
        <FormExpense
          formAction={formAction}
          isPending={isPending}
          handleChange={handleChange}
          newExpense={newExpense}
          typeExpenses={typeExpenses}
        />
      </section>
      <section className=" flex bg-slate-200 rounded-md w-full h-auto p-6 sm:py-9 sm:px-12 flex-col justify-center items-center gap-6">
        <MonthPicker
          date={date}
          setDate={setDate}
          currentYear={currentYear}
          setCurrentYear={setCurrentYear}
        />
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
