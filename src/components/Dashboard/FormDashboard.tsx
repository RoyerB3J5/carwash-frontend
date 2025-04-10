import React from "react";
import { FormUserData, Services, DataExtraProps } from "@/types/index";
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
  dataExtra: DataExtraProps[];

  handleSubmit: () => void;
}
export const FormDashboard = ({
  handleChangeData,
  dataForm,
  isPendingForm,
  services,
  dataServices,
  dataExtra,

  handleSubmit,
}: FormDashboardProps) => {
  return (
    <form
      action=""
      className=" w-full flex flex-col justify-center items-center gap-8"
    >
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <input
          type="text"
          placeholder="Nombre"
          className="p-2 px-4 rounded-md uppercase bg-white focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 easy-in-out "
          id="name"
          onChange={handleChangeData}
          value={dataForm.name}
          disabled={isPendingForm}
        />

        <input
          type="tel"
          placeholder="Celular"
          className="p-2 px-4 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 easy-in-out "
          id="phone"
          onChange={handleChangeData}
          value={dataForm.phone}
          disabled={isPendingForm}
        />
        <input
          type="text"
          placeholder="Placa del carro"
          className="p-2 px-4 rounded-md uppercase bg-white focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 easy-in-out "
          id="plate"
          onChange={handleChangeData}
          value={dataForm.plate}
          disabled={isPendingForm}
        />

        <select
          name="vehicle"
          id="vehicle"
          className="p-2 px-4 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 easy-in-out "
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
          className="p-2 px-4 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 easy-in-out "
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
        <select
          name="extra"
          id="extra"
          className="p-2 px-4 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 easy-in-out "
          onChange={handleChangeData}
          value={dataForm.extra}
          disabled={isPendingForm}
        >
          <option>Extra</option>
          {dataExtra &&
            dataExtra.map((extra) => {
              return (
                <option value={extra.name} key={extra.name}>
                  {extra.name}
                </option>
              );
            })}
        </select>
      </div>
      <div className="w-full flex flex-col sm:flex-row  justify-center sm:justify-between items-center  sm:items-end gap-5 sm:gap-0">
        <div className="flex w-full sm:w-auto flex-col justify-center items-start gap-2">
          <label>Precio (S/.)</label>
          <input
            type="text"
            placeholder="Precio total"
            className="w-full sm:w-auto p-2 px-4 rounded-md uppercase bg-white focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 easy-in-out "
            id="price"
            onChange={handleChangeData}
            value={dataForm.price}
            disabled={isPendingForm}
          />
        </div>
        <button
          className="w-full sm:w-auto py-2 px-4 bg-accent rounded-lg text-p font-semibold cursor-pointer hover:-translate-y-1 transition-all duration-300"
          onClick={handleSubmit}
        >
          {isPendingForm ? "Guardando..." : "Guardar"}
        </button>
      </div>
    </form>
  );
};
