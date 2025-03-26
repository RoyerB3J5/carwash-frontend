import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTableProps } from "@/types";
import { ExpenseTableRow } from "./ExpenseTableRow";
interface ExpenseTableProps {
  expenses: DataTableProps[];
  handleDelete: (_id: string) => void;
}
export const ExpenseTable = ({ expenses, handleDelete }: ExpenseTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-primary  text-white ">
          <TableHead className="font-semibold text-center">Nombre</TableHead>
          <TableHead className="text-center font-semibold"> Monto</TableHead>
          <TableHead className="hidden sm:table-cell text-center font-semibold">
            Tipo
          </TableHead>
          <TableHead className="text-center font-semibold">Dia</TableHead>
          <TableHead className="text-center font-semibold">Accion</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {expenses.map((data) => (
          <ExpenseTableRow
            key={data._id}
            data={data}
            handleDelete={handleDelete}
          />
        ))}
      </TableBody>
    </Table>
  );
};
