import { ExpenseProps, TypeExpenseProps } from "@/types";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
interface FormExpenseProps {
  formAction: (e: React.FormEvent) => void;
  isPending: boolean;
  handleChange: (id: string, value: string | number) => void;
  newExpense: ExpenseProps;
  typeExpenses: TypeExpenseProps[];
}
export const FormExpense = ({
  formAction,
  isPending,
  handleChange,
  newExpense,
  typeExpenses,
}: FormExpenseProps) => {
  return (
    <form
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
    </form>
  );
};
