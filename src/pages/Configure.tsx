import { useNavigate } from "react-router-dom";
import { DeleteConfirmation } from "@/components/Expenses/DeleteConfirmation";
import { FaCirclePlus } from "react-icons/fa6";
import TypeExpenses from "../components/TypeExpenses";
import Spinner from "@/components/Spinner";
import { useConfigureData } from "@/hooks/Configure/useConfigureData";
import { useDeleteConfigure } from "@/hooks/Configure/useConfigureMutation";

function Configure() {
  const navigate = useNavigate();

  const { data: services, isLoading, isError } = useConfigureData();
  const { mutate } = useDeleteConfigure();
  const deleteVehicle = (vehicleType: string) => {
    mutate(vehicleType);
  };
  const estilo = {
    icon: "size-9",
    content: "mr-9",
  };
  return (
    <>
      <h2 className=" text-center font-semibold text-2xl">
        Servicio de vehiculos
      </h2>
      {isLoading && <Spinner />}
      {isError && <div>Erorr: No se ha podido obtener los datos</div>}
      {!isLoading && !isError && services?.length === 0 && (
        <p>No hay existen tipos de lavados</p>
      )}

      {services &&
        services.length > 0 &&
        services.map((service) => {
          return (
            <section
              className=" relative flex bg-slate-200 rounded-md w-full h-auto py-9 px-6 sm:px-16 flex-col gap-6 mb-8"
              key={service._id}
            >
              <div className=" flex flex-row justify-between items-center gap-3">
                <h3 className="text-h4 font-normal"> {service.vehicleType}</h3>
                <div className=" flex gap-4 justify-center items-center">
                  <FaCirclePlus
                    className="size-6 text-accent bg-black rounded-full cursor-pointer "
                    onClick={() =>
                      navigate(`/configure/${service.vehicleType}`)
                    }
                  />
                  <DeleteConfirmation
                    onConfirm={() => deleteVehicle(service.vehicleType)}
                    name="estos servicios"
                    estilo={estilo}
                  />
                </div>
              </div>
              <div className=" overflow-x-auto w-full ">
                <table className="w-full table-fixed">
                  <thead className="bg-gray-400 text-white">
                    <tr>
                      <th className="hidden sm:table-cell border border-black py-3 w-1/4 ">
                        N
                      </th>
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
                          <th className="hidden sm:table-cell border border-black py-3 whitespace-normal break-words uppercase">
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
      <TypeExpenses />
    </>
  );
}

export default Configure;
