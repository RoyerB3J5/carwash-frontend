import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import BarGrapihc from "./BarGrapihc";
function ComparativeGrapihc() {
  const [filter, setFilter] = useState("Semanal")
  const changeType = (value: string) => {
    setFilter(value)
  }
  const chartData = [
    { label: "Lunes", val1: 145, val2: 325},
    { label: "Martes", val1: 123, val2: 261},
    { label: "Miercoles", val1: 124, val2: 142},
    { label: "Jueves", val1: 151, val2: 421},
    { label: "Viernes", val1: 521, val2: 234},
    { label: "Sabado", val1: 234, val2: 532},
    { label: "Domingo", val1: 213, val2: 351},
  ]
  const chartConfig = {
    val1: {
      label: "Act",
      color: "hsl(var(--color-primary))"
    },
    val2: {
      label: "Ant",
      color: "hsl(var(--chart-2))"
    },
  }
  const chartData2 = [
    { label: "Lunes", val1: 23, val2: 63},
    { label: "Martes", val1: 32, val2: 47},
    { label: "Miercoles", val1:62, val2: 45},
    { label: "Jueves", val1: 74, val2: 89},
    { label: "Viernes", val1:73, val2: 74},
    { label: "Sabado", val1: 73, val2: 23},
    { label: "Domingo", val1: 24, val2: 73},
  ]
  return (
    <section className=" relative flex bg-slate-200 rounded-md w-full h-auto p-6 sm:py-9 sm:px-12 flex-col gap-6">
      <h2 className="text-center text-h4">Análisis Comparativo</h2>
      <div className="w-full flex flex-col sm:flex-row gap-5 sm:gap-0 justify-end items-center ">
        <Select value={filter} onValueChange={(value)=>changeType(value)}>
          <SelectTrigger className=" bg-white border-0 focus:outline-1">
            <SelectValue placeholder="Periodo" />
          </SelectTrigger>
          <SelectContent className="bg-white ">
            <SelectItem value="Semanal">Semanal</SelectItem>
            <SelectItem value="Mensual">Mensual</SelectItem>
            <SelectItem value="Anual">Anual</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-center justify-items-center">
        <BarGrapihc title="Ingresos" data={chartData} config={chartConfig} color1="--color-primary" color2="--color-primary-1"/>
        <BarGrapihc title="Gastos" data={chartData2} config={chartConfig} color1="--color-expense" color2="--color-expense-1"/>
        <BarGrapihc title="Balance" data={chartData} config={chartConfig} color1="--color-accent" color2="--color-accent-1"/>
      </div>
    </section>
  );
}

export default ComparativeGrapihc;
