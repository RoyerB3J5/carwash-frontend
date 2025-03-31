import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MdOutlineLocalCarWash } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { useEffect, useState, useRef } from "react";
import Graphics from "@/components/Graphics";
import { ChartConfig } from "@/components/ui/chart";
//import { getAuth, onAuthStateChanged } from "firebase/auth";
import Calendar2 from "@/components/Calendar2";
import ComparativeGrapihc from "@/components/ComparativeGrapihc";
import { useMonthByYear } from "@/hooks/useMonthByYear";

interface DataApiProps {
  year: number;
  month?: number;
}
/*interface YearMonthGroup {
  year: number;
  months: number[];
}
const generateMonthsByYear = (startDate: Date) => {
  const start = new Date(startDate);
  start.setDate(1);
  const end = new Date();
  const groupedMonths: YearMonthGroup[] = [];

  while (start <= end) {
    const currentYear = start.getFullYear();
    const currentMonth = start.getMonth() + 1;

    const existingYear = groupedMonths.find(
      (item) => item.year === currentYear
    );

    if (existingYear) {
      if (!existingYear.months.includes(currentMonth)) {
        existingYear.months.push(currentMonth);
      }
    } else {
      groupedMonths.push({
        year: currentYear,
        months: [currentMonth],
      });
    }
    start.setMonth(start.getMonth() + 1);
  }
  return groupedMonths;
};*/
function Reports() {
  const [filterType, setFilterType] = useState("Mensual");

  const chartData1 = [
    { label: "1", value: 100 },
    { label: "2", value: 50 },
    { label: "3", value: 30 },
    { label: "4", value: 200 },
    { label: "5", value: 70 },
    { label: "6", value: 40 },
    { label: "7", value: 27 },
    { label: "8", value: 90 },
    { label: "9", value: 21 },
    { label: "10", value: 94 },
    { label: "11", value: 300 },
    { label: "12", value: 35 },
    { label: "13", value: 67 },
    { label: "14", value: 34 },
    { label: "15", value: 294 },
    { label: "16", value: 23 },
    { label: "17", value: 60 },
    { label: "18", value: 83 },
    { label: "19", value: 38 },
    { label: "20", value: 21 },
    { label: "21", value: 77 },
    { label: "22", value: 39 },
    { label: "23", value: 88 },
    { label: "24", value: 35 },
    { label: "25", value: 28 },
    { label: "26", value: 83 },
    { label: "27", value: 56 },
    { label: "28", value: 27 },
    { label: "29", value: 53 },
    { label: "30", value: 16 },
  ];

  const chartConfig1 = {
    value: {
      label: "Ingresos",
      color: "#0347f2",
    },
  } satisfies ChartConfig;

  const chartData2 = [
    { label: "1", value: 34 },
    { label: "2", value: 64 },
    { label: "3", value: 74 },
    { label: "4", value: 22 },
    { label: "5", value: 63 },
    { label: "6", value: 22 },
    { label: "7", value: 64 },
    { label: "8", value: 27 },
    { label: "9", value: 41 },
    { label: "10", value: 26 },
    { label: "11", value: 63 },
    { label: "12", value: 13 },
    { label: "13", value: 74 },
    { label: "14", value: 14 },
    { label: "15", value: 26 },
    { label: "16", value: 35 },
    { label: "17", value: 62 },
    { label: "18", value: 15 },
    { label: "19", value: 64 },
    { label: "20", value: 13 },
    { label: "21", value: 72 },
    { label: "22", value: 24 },
    { label: "23", value: 52 },
    { label: "24", value: 56 },
    { label: "25", value: 12 },
    { label: "26", value: 35 },
    { label: "27", value: 63 },
    { label: "28", value: 14 },
    { label: "29", value: 25 },
    { label: "30", value: 63 },
  ];

  const chartConfig2 = {
    value: {
      label: "Gastos",
      color: "oklch(0.505 0.213 27.518)",
    },
  } satisfies ChartConfig;

  const chartConfig3 = {
    value: {
      label: "Balance",
      color: "#FFD700",
    },
  } satisfies ChartConfig;
  const chartAnual1 = [
    {
      label: "Ene",
      value: 450,
    },
    {
      label: "Feb",
      value: 754,
    },
    {
      label: "Mar",
      value: 245,
    },
    {
      label: "Abr",
      value: 474,
    },
    {
      label: "May",
      value: 842,
    },
    {
      label: "Jun",
      value: 147,
    },
    {
      label: "Jul",
      value: 864,
    },
    {
      label: "Ago",
      value: 136,
    },
    {
      label: "Sep",
      value: 823,
    },
    {
      label: "Oct",
      value: 135,
    },
    {
      label: "Nov",
      value: 456,
    },
    {
      label: "Dic",
      value: 567,
    },
  ];
  const chartAnual2 = [
    {
      label: "Ene",
      value: 234,
    },
    {
      label: "Feb",
      value: 532,
    },
    {
      label: "Mar",
      value: 123,
    },
    {
      label: "Abr",
      value: 421,
    },
    {
      label: "May",
      value: 321,
    },
    {
      label: "Jun",
      value: 153,
    },
    {
      label: "Jul",
      value: 361,
    },
    {
      label: "Ago",
      value: 263,
    },
    {
      label: "Sep",
      value: 245,
    },
    {
      label: "Oct",
      value: 345,
    },
    {
      label: "Nov",
      value: 632,
    },
    {
      label: "Dic",
      value: 235,
    },
  ];

  const [dataToGrapihc, setDataToGraphic] = useState({
    incomes: chartData1,
    expenses: chartData2,
  });
  //const [groupedMonths, setGroupedMonths] = useState<YearMonthGroup[]>([]);
  const [filterYear, setFilterYear] = useState<number>();
  const currentDate = new Date();
  const [date, setDate] = useState<Date>(currentDate);
  const { groupedMonth } = useMonthByYear();
  /*useEffect(() => {
    const storedGroupedMonths = localStorage.getItem("groupedMonths");
    const lastUpdated = localStorage.getItem("lastUpdated");
    const now = new Date();

    if (storedGroupedMonths && lastUpdated) {
      const lastUpdatedDate = new Date(lastUpdated);
      if (
        lastUpdatedDate.getFullYear() === now.getFullYear() &&
        lastUpdatedDate.getMonth() === now.getMonth()
      ) {
        setGroupedMonths(JSON.parse(storedGroupedMonths));
        return;
      }
    }

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const creationDate = user.metadata.creationTime
          ? new Date(user.metadata.creationTime)
          : new Date();
        const monthsByYear = generateMonthsByYear(creationDate);
        setGroupedMonths(monthsByYear);
        localStorage.setItem("groupedMonths", JSON.stringify(monthsByYear));
        localStorage.setItem("lastUpdated", now.toISOString());
      }
    });
  }, []);*/

  useEffect(() => {
    if (groupedMonth.length > 0) {
      setFilterYear(groupedMonth[groupedMonth.length - 1].year);
    }
  }, [groupedMonth]);

  const handleChangeFilter = (value: string) => {
    setFilterType(value);
    if (value === "Mensual") {
      setDataToGraphic({
        incomes: chartData1,
        expenses: chartData2,
      });
    }
    if (value === "Anual") {
      setDataToGraphic({
        incomes: chartAnual1,
        expenses: chartAnual2,
      });
    }
  };
  const [dataApi, setDataApi] = useState<DataApiProps>({
    year: date.getFullYear(),
    month: date.getMonth() + 1,
  });
  const hasInitialized = useRef(false);
  const initializedApi = useRef(false);
  useEffect(() => {
    if (hasInitialized.current) return;
    if (filterType === "Mensual") {
      console.log(date.getFullYear());
      console.log(date.getMonth() + 1);
      setDataApi({
        year: date.getFullYear(),
        month: date.getMonth() + 1,
      });
    } else if (filterType === "Anual") {
      console.log(filterYear);
      setDataApi({
        year: filterYear ? filterYear : date.getFullYear(),
      });
    }
    hasInitialized.current = true;
    setTimeout(() => {
      hasInitialized.current = false;
    }, 500);
  }, [date, filterYear, filterType]);

  useEffect(() => {
    if (initializedApi.current) return;
    console.log("llamando a la api con los datos", dataApi);
    initializedApi.current = true;
    setTimeout(() => {
      initializedApi.current = false;
    }, 500);
  }, [dataApi]);
  const chartData3 =
    dataToGrapihc.incomes.length > 0 && dataToGrapihc.expenses.length > 0
      ? dataToGrapihc.incomes.map((item) => {
          const correspondingItem = dataToGrapihc.expenses.find(
            (item2) => item2.label === item2.label,
          );
          return {
            label: item.label,
            value:
              item.value - (correspondingItem ? correspondingItem.value : 0),
          };
        })
      : [];
  //const {data? staticData, isLoading : loadingStatict, isError: errorStatict } = useStatistcData()
  //

  return (
    <>
      <section className=" relative flex bg-slate-200 rounded-md w-full h-auto p-6  sm:px-12 justify-around items-center gap-6">
        <div className="flex  flex-col justify-center items-start bg-white px-4 sm:px-6 py-2 rounded-lg gap-2">
          <p className="text-[12px]">Lavados del mes</p>
          <div className="flex justify-between items-center w-full">
            <MdOutlineLocalCarWash className="bg-primary text-white size-7 p-1 rounded-md" />
            <p className=" font-semibold">150</p>
          </div>
        </div>
        <div className="flex  flex-col justify-center items-start bg-white px-4 sm:px-6 py-2 rounded-lg gap-2">
          <p className="text-[12px]">Clientes / dia</p>
          <div className="flex justify-between items-center w-full">
            <FaRegUser className="bg-accent text-black size-7 p-1 rounded-md" />
            <p className=" font-semibold">14</p>
          </div>
        </div>
      </section>
      <section className=" relative flex bg-slate-200 rounded-md w-full h-auto p-6 sm:py-9 sm:px-12 flex-col gap-6">
        <h2 className="text-center text-h4">Resumen</h2>
        <div className="flex flex-col sm:flex-row gap-5 sm:gap-0 justify-end items-center ">
          <div className="flex flex-col sm:flex-row  justify-center items-center gap-6">
            <Select
              value={filterType}
              onValueChange={(value) => handleChangeFilter(value)}
            >
              <SelectTrigger className=" bg-white border-0 focus:outline-1">
                <SelectValue placeholder="Tipo de filtro" />
              </SelectTrigger>
              <SelectContent className="bg-white ">
                <SelectItem value="Mensual">Mensual</SelectItem>
                <SelectItem value="Anual">Anual</SelectItem>
              </SelectContent>
            </Select>
            {groupedMonth.length > 0 ? (
              filterType === "Mensual" ? (
                <Calendar2 data={groupedMonth} date={date} setDate={setDate} />
              ) : (
                <Select
                  value={filterYear ? String(filterYear) : undefined}
                  onValueChange={(value) => setFilterYear(Number(value))}
                >
                  <SelectTrigger className=" bg-white border-0 focus:outline-1">
                    <SelectValue placeholder="Ano" />
                  </SelectTrigger>
                  <SelectContent className="bg-white ">
                    {groupedMonth.map((group) => (
                      <SelectItem value={String(group.year)} key={group.year}>
                        {group.year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )
            ) : (
              <p>Cargando ...</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-center justify-items-center">
          <Graphics
            title="Ingresos"
            data={dataToGrapihc.incomes}
            config={chartConfig1}
          />
          <Graphics
            title="Gastos"
            data={dataToGrapihc.expenses}
            config={chartConfig2}
          />
          {chartData3.length > 0 ? (
            <Graphics title="Balance" data={chartData3} config={chartConfig3} />
          ) : (
            <p>Cargando ...</p>
          )}
        </div>
      </section>
      <ComparativeGrapihc />
    </>
  );
}

export default Reports;
