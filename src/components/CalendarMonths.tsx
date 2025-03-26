import { format } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Dispatch, SetStateAction } from "react"

interface MonthPickerProps {
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
  currentYear: Date;
  setCurrentYear: Dispatch<SetStateAction<Date>>;
  currentDate?: Date
}
export function MonthPicker({date, setDate, currentYear, setCurrentYear, currentDate = new Date()}:MonthPickerProps) {
  
  const months = [
    "Enero", "Febrero", "Marzo", "Abril",
    "Mayo", "Junio", "Julio", "Agosto",
    "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ]

  const getAvailableMonths = () => {
    const isCurrentYear = currentYear.getFullYear() === currentDate.getFullYear()
    return isCurrentYear 
      ? months.slice(0, currentDate.getMonth() + 1)
      : months
  }

  const handleSelectMonth = (monthIndex: number) => {
    const newDate = new Date(currentYear.getFullYear(), monthIndex, 1)
    setDate(newDate)
  }

  const handlePreviousYear = () => {
    setCurrentYear(prev => new Date(prev.getFullYear() - 1, 0, 1))
  }

  const handleNextYear = () => {
    setCurrentYear(prev => new Date(prev.getFullYear() + 1, 0, 1))
  }

  return (
    <Popover>
      <PopoverTrigger asChild className="self-end bg-white">
        <Button
          variant={"outline"}
          className={cn("w-[140px] sm:w-[240px] justify-start text-left font-normal")}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {format(date, "MMMM yyyy", { locale: es })}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4 bg-white">
        <div className="space-y-4 ">
          <div className="flex items-center justify-between">
            <Button variant="outline" size="icon" onClick={handlePreviousYear}>
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Año anterior</span>
            </Button>
            <div className="font-medium">{currentYear.getFullYear()}</div>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handleNextYear}
              disabled={currentYear.getFullYear() === currentDate.getFullYear()}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Año siguiente</span>
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {getAvailableMonths().map((month, index) => {
              const isSelected = date.getMonth() === index && 
                              date.getFullYear() === currentYear.getFullYear()
              const isCurrent = currentDate.getMonth() === index && 
                              currentDate.getFullYear() === currentYear.getFullYear()

              return (
                <Button
                  key={`${month}-${currentYear.getFullYear()}`}
                  variant={isSelected ? "default" : "outline"}
                  className={cn(
                    "h-9 transition-colors",
                    isCurrent && !isSelected && "bg-accent/50 hover:bg-accent/70"
                  )}
                  onClick={() => handleSelectMonth(index)}
                  disabled={currentYear.getFullYear() > currentDate.getFullYear()}
                >
                  {month.substring(0, 3)}
                </Button>
              )
            })}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}