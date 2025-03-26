import React from "react";
import { FormUserData, Services } from "@/types/index";
interface FormDashboardProps {
  handleChangeData: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => void;
  dataForm: FormUserData;
  isPendingForm: boolean;
  services: Services[] | undefined;
  dataServices: Services | undefined;
}
export const FormDashboard = ({
  handleChangeData,
  dataForm,
  isPendingForm,
  services,
  dataServices,
}: FormDashboardProps) => {
  return (
    <form
      action=""
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      <input
        type="text"
        placeholder="Nombre"
        className="p-2 rounded-md uppercase bg-white"
        id="name"
        onChange={handleChangeData}
        value={dataForm.name}
        disabled={isPendingForm}
      />
      <input
        type="text"
        placeholder="Apellido"
        className="p-2 rounded-md uppercase bg-white"
        id="lastname"
        onChange={handleChangeData}
        value={dataForm.lastname}
        disabled={isPendingForm}
      />
      <input
        type="tel"
        placeholder="Celular"
        className="p-2 rounded-md bg-white "
        id="phone"
        onChange={handleChangeData}
        value={dataForm.phone}
        disabled={isPendingForm}
      />
      <input
        type="text"
        placeholder="Placa del carro"
        className="p-2 rounded-md uppercase bg-white"
        id="plate"
        onChange={handleChangeData}
        value={dataForm.plate}
        disabled={isPendingForm}
      />
      <select
        name="vehicle"
        id="vehicle"
        className="p-2 rounded-md bg-white"
        onChange={handleChangeData}
        value={dataForm.vehicle}
        disabled={isPendingForm}
      >
        <option value=" ">Tipo de vehículo</option>
        {services &&
          services.map((service) => {
            return (
              <option value={service.vehicleType} key={service._id}>
                {service.vehicleType}
              </option>
            );
          })}
      </select>
      <select
        name="wash"
        id="wash"
        className="p-2 rounded-md bg-white"
        onChange={handleChangeData}
        value={dataForm.wash}
        disabled={isPendingForm}
      >
        <option value=" ">Tipo de lavado</option>
        {dataServices &&
          dataServices.service &&
          dataServices.service.map((service) => {
            return (
              <option value={service.nameService} key={service._id}>
                {service.nameService}
              </option>
            );
          })}
      </select>
    </form>
  );
};
