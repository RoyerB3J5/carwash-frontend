import { useEffect, useState } from "react";

import TableClients from "../components/TableClients";

import Spinner from "@/components/Spinner";
import { addDays } from "date-fns";
import { DateRangeCalendar } from "@/components/Users/DateRangeCalendar";
import { DateRange } from "react-day-picker";
import moment from "moment-timezone";
import { useUsersData } from "@/hooks/Users/useUsersData";
function Users() {
  const [dateCalendar, setDateCalendar] = useState<DateRange | undefined>({
    from: addDays(new Date(), -7),
    to: new Date(),
  });
  const [dateApi, setDateApi] = useState({
    start: moment
      .tz(dateCalendar?.from, "America/Lima")
      .startOf("day")
      .toISOString(),
    end: moment.tz(dateCalendar?.to, "America/Lima").endOf("day").toISOString(),
  });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(true);
  }, []);
  const callApi = () => {
    setDateApi({
      start: moment
        .tz(dateCalendar?.from, "America/Lima")
        .startOf("day")
        .toISOString(),
      end: moment
        .tz(dateCalendar?.to, "America/Lima")
        .endOf("day")
        .toISOString(),
    });
    setEnabled(true);
  };

  const {
    data: user,
    isLoading,
    isError,
  } = useUsersData({ dates: dateApi, enabled });

  return (
    <>
      <section className="flex bg-slate-200 rounded-md w-full h-auto py-9 px-6 sm:px-12 flex-col gap-3 sm:gap-9">
        <h3 className="text-h4 font-semibold">Clientes:</h3>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 w-full">
          <form
            action=""
            className="flex flex-col justify-center items-start gap-5"
          >
            <p>Escoger rango de fechas:</p>
            <DateRangeCalendar date={dateCalendar} setDate={setDateCalendar} />
          </form>

          <button
            className="bg-accent text-p px-5 py-1 rounded-lg font-semibold ml-4 md:mt-1 cursor-pointer"
            onClick={callApi}
            disabled={isLoading}
          >
            {isLoading ? "Cargando..." : "Buscar"}
          </button>
        </div>
        {isLoading && <Spinner />}
        {isError && <div>Error : No se ha podido obtener los datos</div>}
        {!isLoading && !isError && user?.count === 0 && (
          <p className="text-center text-red-700 font-medium">
            No hay clientes en este rango de fecha
          </p>
        )}
        {user && user.count > 0 && <TableClients user={user} />}
      </section>
    </>
  );
}

export default Users;
