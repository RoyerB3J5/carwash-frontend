import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaArrowCircleLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import NewVehicleForm from "../components/NewVehicleForm";
import { useUpdateConfigure } from "@/hooks/Configure/useConfigureMutation";
import { Services } from "../types";
import { useSingleService } from "@/hooks/Configure/useConfigureData";
import Spinner from "@/components/Spinner";
function SingleVehicle() {
  const { vehicleType } = useParams();

  const navigate = useNavigate();
  const { data, isLoading, isError } = useSingleService(
    vehicleType?.trim() || "",
  );
  const [service, setService] = useState<Services>(
    () => data || { service: [], vehicleType: vehicleType?.trim() || "" },
  );
  useEffect(() => {
    if (!vehicleType?.trim()) {
      navigate("/configure", { replace: true });
    }
  }, [vehicleType, navigate]);
  useEffect(() => {
    if (data) {
      setService(data);
    }
  }, [data]);

  const { mutate } = useUpdateConfigure(vehicleType?.trim() || "");
  const updateService = () => {
    mutate(service.service);
  };

  return (
    <>
      <FaArrowCircleLeft
        className=" absolute z-10 text-primary text-xl hover:cursor-pointer"
        onClick={() => navigate("/configure")}
      />

      {isLoading && <Spinner />}
      {isError && (
        <div>Error: Los servicios no pudieron ser obtenidos correctamente</div>
      )}

      {!isLoading && !isError && service && service.service.length === 0 && (
        <p>No hay servicios en este vehiculo</p>
      )}
      {service && service.service.length > 0 && (
        <>
          <h2 className=" text-center text-xl font-semibold">
            Servicios de {service.vehicleType}
          </h2>

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
