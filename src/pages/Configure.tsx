import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useApi } from "../hooks/useApi";
import { Services } from "../types";
import { FaCirclePlus } from "react-icons/fa6";
import TypeExpenses from "../components/TypeExpenses";

function Configure() {
  const [services, setServices] = useState<Services[]>();
  const [callApi, setCallApi] = useState(false);
  const [loading, setLoading] = useState(false);
  const { get, delete: deleteRequest } = useApi();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      const newData = await get<Services[]>("services");
      setServices(newData);
      setLoading(false);
    };
    fetchServices();
  }, [callApi]);
  const deleteVehicle = async (vehicleType: string) => {
    await deleteRequest(`services/${vehicleType}`);
    setTimeout(() => setCallApi(!callApi), 500);
  };

  return (
    <>
      <h2 className=" text-center font-semibold text-2xl">
        Servicio de vehiculos
      </h2>
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : null}
      {services &&
        services.map((service) => {
          return (
            <section
              className=" relative flex bg-slate-200 rounded-md w-full h-auto py-9 px-6 sm:px-16 flex-col gap-6 mb-8"
              key={service._id}
            >
              <div className=" flex flex-col sm:flex-row justify-between items-center gap-3">
                <h3 className="text-h4 font-normal"> {service.vehicleType}</h3>
                <div className=" flex gap-4 justify-center items-center">
                  <FaCirclePlus
                    className="size-6 text-accent bg-black rounded-full cursor-pointer "
                    onClick={() =>
                      navigate(`/configure/${service.vehicleType}`)
                    }
                  />
                  <FaTrash
                    className=" text-red-800 h-5 hover:cursor-pointer"
                    onClick={() => deleteVehicle(service.vehicleType)}
                  />
                </div>
              </div>
              <div className=" overflow-x-auto w-full ">
                <table className="w-[800px] md:w-full table-fixed">
                  <thead className="bg-gray-400 text-white">
                    <tr>
                      <th className="border border-black py-3 w-1/4">N</th>
                      <th className="border border-black py-3 w-1/4">Lavado</th>
                      <th className="border border-black py-3 w-1/4">
                        {" "}
                        Precio (S/.)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {service.service.map((stype, index) => {
                      return (
                        <tr key={stype._id}>
                          <th className="border border-black py-3 whitespace-normal break-words uppercase">
                            {index + 1}
                          </th>
                          <th className="border border-black py-3 whitespace-normal break-words uppercase">
                            {stype.nameService}
                          </th>
                          <th className="border border-black py-3 whitespace-normal break-words uppercase">
                            {stype.price}
                          </th>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>
          );
        })}
      <button
        className=" bg-primary p-2 rounded-md text-white font-medium cursor-pointer"
        onClick={() => navigate("/configure/new")}
      >
        + Nuevo Vehiculo
      </button>
      <TypeExpenses/>
    </>
  );
}

export default Configure;
