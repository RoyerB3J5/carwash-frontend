import { FaArrowCircleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useNewService } from "@/hooks/Configure/useConfigureMutation";
import NewVehicleForm from "../components/NewVehicleForm";
import { Services } from "../types";
function NewVehicle() {
  const navigate = useNavigate();
  const [service, setService] = useState<Services>({
    vehicleType: "",
    service: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setService({ ...service, [id]: value });
  };
  const { mutate } = useNewService();
  const updateService = () => {
    mutate(service);
  };
  return (
    <>
      <FaArrowCircleLeft
        className=" absolute z-10 text-primary text-xl hover:cursor-pointer"
        onClick={() => navigate("/configure")}
      />
      <h2 className=" text-center text-xl font-semibold">Nuevo vehículo</h2>
      <div className=" bg-slate-200 p-4 w-full rounded-md flex justify-around items-center gap-4">
        <label htmlFor="vehicleType">Vehículo</label>
        <input
          type="text"
          id="vehicleType"
          className=" p-1 rounded w-full"
          onChange={(e) => handleChange(e)}
          value={service.vehicleType}
        />
      </div>
      <NewVehicleForm
        service={service}
        setService={setService}
        updateService={updateService}
      />
    </>
  );
}

export default NewVehicle;
