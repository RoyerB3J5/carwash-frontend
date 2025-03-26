import { FaPlus } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { NewVehicleProps } from "../types";

function NewVehicleForm({
  service,
  setService,
  updateService,
}: NewVehicleProps) {
  const addService = () => {
    setService(prevService=> ({
      ...prevService,
      service: [...prevService.service, { nameService: "", price: 0 }],
    }));
  };
  const changeValue = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
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

  return (
    <section className="flex flex-col justify-center items-center gap-5">
      {service.service.map((ser, index) => {
        return (
          <div className=" bg-slate-200 p-3 sm:p-4 sm:px-20 w-full rounded-md flex justify-around items-center gap-4 sm:gap-14 ">
            <FaTrash
              className=" text-red-800 h-5 text-4xl hover:cursor-pointer"
              onClick={() => deleteService(index)}
            />
            <input
              type="text"
              placeholder="Nombre de Servicio"
              className=" p-1 rounded w-full"
              id="nameService"
              value={ser.nameService}
              onChange={(e) => changeValue(e, index)}
            />
            <input
              type="number"
              placeholder="Precio"
              className=" p-1 rounded w-full "
              id="price"
              value={ser.price}
              onChange={(e) => changeValue(e, index)}
            />
          </div>
        );
      })}

      <button
        className=" bg-slate-200 p-1 w-full flex justify-center items-center rounded-lg"
        onClick={addService}
      >
        <FaPlus className=" text-primary h-8 hover:cursor-pointer" />
      </button>
      <button
        className="  bg-accent p-2 w-full flex justify-center items-center rounded-lg"
        onClick={updateService}
      >
        <p className="font-medium">Actualizar</p>
      </button>
    </section>
  );
}

export default NewVehicleForm;
