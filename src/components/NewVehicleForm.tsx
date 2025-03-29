import { FaPlus } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { NewVehicleProps } from "../types";
import { useUpdateConfigure } from "@/hooks/Configure/useConfigureMutation";
function NewVehicleForm({ service, setService }: NewVehicleProps) {
  const addService = () => {
    setService((prevService) => ({
      ...prevService,
      service: [...prevService.service, { nameService: "", price: 0 }],
    }));
  };
  const changeValue = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const { id, value } = e.target;
    const newService = [...service.service];
    if (id === "nameService" || id === "price") {
      newService[index] = {
        ...newService[index],
        [id]: id === "price" ? Number(value) : value,
      };
    }
    setService({ ...service, service: newService });
  };

  const deleteService = (index: number) => {
    setService((prevService) => ({
      ...prevService,
      service: prevService.service.filter((_, i) => i !== index),
    }));
  };
  const { mutate } = useUpdateConfigure(service.vehicleType);
  const updateService = () => {
    mutate(service.service);
  };

  return (
    <section className="flex flex-col justify-center items-center gap-3">
      <div className="p-3 sm:p-4 sm:px-20 w-full rounded-md flex justify-around items-center gap-4 sm:gap-14 ">
        <div></div>
        <div className=" text-center px-3 py-1 rounded-lg w-full max-w-[300px]">
          <p>Nombre</p>
        </div>
        <div className=" text-center px-3 py-1 rounded-lg w-full max-w-[300px]">
          <p>Precio (S/.)</p>
        </div>
      </div>

      {service.service.map((ser, index) => {
        return (
          <div className=" bg-slate-200 py-4 px-5 sm:p-6 sm:px-20 w-full rounded-md flex justify-around items-center gap-6 sm:gap-14 ">
            <FaTrash
              className=" text-red-800 h-5 text-4xl hover:cursor-pointer"
              onClick={() => deleteService(index)}
            />
            <input
              type="text"
              placeholder="Nombre de Servicio"
              className=" text-center py-1 rounded-lg w-full max-w-[300px]"
              id="nameService"
              value={ser.nameService}
              onChange={(e) => changeValue(e, index)}
            />
            <input
              type="number"
              placeholder="Precio"
              className="text-center py-1 rounded-lg w-full max-w-[300px]"
              id="price"
              value={ser.price}
              onChange={(e) => changeValue(e, index)}
            />
          </div>
        );
      })}

      <button
        className=" bg-slate-200 mt-3 p-2 w-full flex justify-center items-center rounded-lg cursor-pointer"
        onClick={addService}
      >
        <FaPlus className=" text-primary h-8 hover:cursor-pointer font-bold" />
      </button>
      <button
        className="mt-3 cursor-pointer  bg-accent p-2.5 w-full flex justify-center items-center rounded-lg"
        onClick={updateService}
      >
        <p className="font-semibold">Actualizar</p>
      </button>
    </section>
  );
}

export default NewVehicleForm;
