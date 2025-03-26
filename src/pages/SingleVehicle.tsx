import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaArrowCircleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import NewVehicleForm from "../components/NewVehicleForm";
import { useApi } from "../hooks/useApi";
import { Service, Services } from "../types";

function SingleVehicle() {
  const { vehicleType } = useParams();
  const [service, setService] = useState<Services>({
    _id: "",
    service:[],
    vehicleType:""
  });
  const navigate = useNavigate();
  const { get, put } = useApi();

  useEffect(() => {
    const fetchVehicleService = async () => {
      const data = await get<Services>(`services/${vehicleType}`);
      setService(data);
    };

    fetchVehicleService();
  }, [vehicleType]);


  const updateService = async () => {
    if(!service) return
    const serviceUpdate = service.service.map(({ _id, ...rest }) => rest);
    const updatedData = await put<{service: Service[]}, Services>(`services/${vehicleType}`, {
      service: serviceUpdate,
    });
    setService(updatedData);
  };
  return (
    <>
      <FaArrowCircleLeft
        className=" absolute z-10 text-primary text-xl hover:cursor-pointer"
        onClick={() => navigate("/configure")}
      />
      {service && (
        <>
          <h2 className=" text-center text-xl font-semibold">
            Servicios de {service.vehicleType}
          </h2>
          <div className=" flex justify-around items-center ">
            <p>Nombre</p>
            <p>Precio (S/.)</p>
          </div>
          <NewVehicleForm
            service={service}
            setService={setService}
            updateService={updateService}
          />
        </>
      )}
    </>
  );
}

export default SingleVehicle;
