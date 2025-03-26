import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Dispatch, SetStateAction, useState } from "react";
interface YearMonthGroup {
  year: number;
  months: number[];
}

interface CalendarProps {
  data: YearMonthGroup[];
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
}
function Calendar2({
  data,
  date,
  setDate,
}: CalendarProps) {
  const dataLenght = data.length - 1;
  const [indexData, setIndexData] = useState(dataLenght);
  const handlePreviousYear = () => {
    setIndexData((prev) => (prev > 0 ? prev - 1 : prev));
  };
  const handleNextYear = () => {
    setIndexData((prev) => (prev < dataLenght ? prev + 1 : prev));
  };
  const handleSelectMonth = (monthIndex: number) => {
    const newDate = new Date(data[indexData].year, monthIndex, 1);
    setDate(newDate);
  };
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  return (
    <Popover>
      <PopoverTrigger asChild className="self-end bg-white">
        <Button
          variant={"outline"}
          className={cn(
            "w-[140px] sm:w-[240px] justify-start text-left font-normal"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {format(date, "MMMM yyyy", { locale: es })}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full sm:w-auto p-4 bg-white">
        <div className="space-y-4 ">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePreviousYear}
              disabled={indexData === 0}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Año anterior</span>
            </Button>
            <div className="font-medium">{data[indexData].year}</div>
            <Button
              variant="outline"
              size="icon"
              onClick={handleNextYear}
              disabled={indexData === dataLenght}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Año siguiente</span>
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {data[indexData].months.map((index) => {
              const isSelected =
                date.getMonth() === index - 1 &&
                date.getFullYear() === data[indexData].year;
              const isCurrent = false;
              return (
                <Button
                  key={`${months[index - 1]}-${data[indexData].year}`}
                  variant={isSelected ? "default" : "outline"}
                  className={cn(
                    "h-9 transition-colors",
                    isCurrent &&
                      !isSelected &&
                      "bg-accent/50 hover:bg-accent/70"
                  )}
                  onClick={()=>handleSelectMonth(index-1)}
                >
                  {months[index - 1].substring(0, 3)}
                </Button>
              );
            })}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default Calendar2;
