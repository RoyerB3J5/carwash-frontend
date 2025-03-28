import { TableRow, TableCell } from "@/components/ui/table";
import { DataTableProps } from "@/types";
import { DeleteConfirmation } from "./DeleteConfirmation";
interface TableRowProps {
  data: DataTableProps;
  handleDelete: (_id: string) => void;
}
export const ExpenseTableRow = ({ data, handleDelete }: TableRowProps) => {
  return (
    <TableRow>
      <TableCell className="text-center">{data.name}</TableCell>
      <TableCell className="text-center">S/. {data.price}</TableCell>
      <TableCell className="hidden sm:table-cell text-center">
        {data.type}
      </TableCell>
      <TableCell className="text-center">{data.day}</TableCell>
      <TableCell className="text-center flex justify-center items-center">
        <DeleteConfirmation
          onConfirm={() => handleDelete(data._id)}
          name="este gasto"
        />
      </TableCell>
    </TableRow>
  );
};
