import { useEffect, useState } from "react";
import { useApi } from "../hooks/useApi";
import TableClients from "../components/TableClients";
import { UserDate } from "../types";
import Spinner from "@/components/Spinner";

function Users() {
  const currentDate = new Date();
  const formattedCurrentDate = currentDate.toLocaleDateString("en-CA");
  currentDate.setDate(currentDate.getDate() - 7);
  const formattedStartDate = currentDate.toLocaleDateString("en-CA");

  const [date, setDate] = useState({
    start: formattedStartDate,
    end: formattedCurrentDate,
  });
  const [user, setUser] = useState<UserDate>();
  const [loading, setLoading] = useState(false);
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setDate((prevDate) => ({
      ...prevDate,
      [id]: value,
    }));
  };
  const [price, setPrice] = useState(0);
  const { post } = useApi();
  const callUsers = async () => {
    setLoading(true);
    const startDate = new Date(`${date.start}T00:00:00`);
    const endDate = new Date(`${date.end}T23:59:59`);

    const adjustedDate = {
      start: startDate.toISOString(),
      end: endDate.toISOString(),
    };
    const newData = await post<{ start: string; end: string }, UserDate>(
      "users/date",
      adjustedDate,
    );
    setUser(newData);
    setLoading(false);
  };
  useEffect(() => {
    callUsers();
  }, []);

  useEffect(() => {
    // Asegurarse de que user y user.data existen y tienen elementos
    if (user && user.data && user.data.length > 0) {
      // Calcular la suma total usando reduce
      const total = user.data.reduce((acc, curr) => acc + curr.price, 0);
      setPrice(total);
    } else {
      // Resetear price a 0 si no hay datos
      setPrice(0);
    }
  }, [user]);
  return (
    <>
      <section className="flex bg-slate-200 rounded-md w-full h-auto py-9 px-6 sm:px-12 flex-col gap-3 sm:gap-6">
        <div className="flex  flex-col sm:flex-row justify-between gap-3">
          <h3 className="text-h4 font-semibold">Clientes:</h3>
          <div className="flex items-center gap-2 justify-center">
            <p>Ingresos totales:</p>
            <p className="self-center">S/. {price}</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 w-full">
          <form
            action=""
            className="flex flex-col sm:flex-row justify-center items-center md:gap-12 sm:gap-8"
          >
            <div className="flex flex-col justify-center p-4 gap-3">
              <label htmlFor="start" className=" self-center">
                Desde:
              </label>
              <input
                type="date"
                id="start"
                className="self-center p-2 rounded "
                value={date.start}
                onChange={handleDateChange}
              />
            </div>
            <div className="flex flex-col justify-center p-4 gap-3">
              <label htmlFor="end" className=" self-center">
                Hasta:
              </label>
              <input
                type="date"
                id="end"
                className="self-center p-2 rounded"
                onChange={handleDateChange}
                value={date.end}
              />
            </div>
          </form>
          <div className="flex flex-row md:flex-col justify-around sm:justify-center items-center gap-2 sm:gap-5 md:gap-3 ">
            <p className="text-center">Total de clientes:</p>
            <p className="text-center font-semibold">
              {user ? user.length : 0}
            </p>
            <button
              className="bg-accent text-p px-5 py-1 rounded-lg font-semibold ml-4 md:mt-1"
              onClick={callUsers}
            >
              Aplicar
            </button>
          </div>
        </div>

        {loading ? <Spinner /> : <TableClients user={user} />}
      </section>
    </>
  );
}

export default Users;
