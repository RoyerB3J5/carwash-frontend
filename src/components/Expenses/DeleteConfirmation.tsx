import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { TiDelete } from "react-icons/ti";
export const DeleteConfirmation = ({
  onConfirm,
}: {
  onConfirm: () => void;
}) => {
  return (
    <Popover>
      <PopoverTrigger>
        <TiDelete className=" size-6 text-red-700 cursor-pointer text-" />
      </PopoverTrigger>
      <PopoverContent className="bg-white flex flex-col justify-center items-center gap-6 shadow-xl border-primary">
        <p>Deseas eliminar este gasto?</p>
        <div className="w-full flex justify-around items-center">
          <button
            onClick={onConfirm}
            className="bg-accent px-5 py-1.5 rounded-lg cursor-pointer "
          >
            ELIMINAR
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
