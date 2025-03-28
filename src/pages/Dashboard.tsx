import { useState } from "react";
import { FormDashboard } from "@/components/Dashboard/FormDashboard";
import { useDashboardForm } from "../hooks/Dashboard/useDashboardForm";
import {
  useDataServiceAll,
  useDataServiceOne,
  useDashboardDataUnfinished,
} from "@/hooks/Dashboard/useDashboardData";
import { usePatchUserFinished } from "@/hooks/Dashboard/useDashboardMutation";
import { FormUserData } from "@/types/index";
import Spinner from "@/components/Spinner";
import { TableDashboard } from "@/components/Dashboard/TableDashboard";
function Dashboard() {
  const [dataForm, setDataForm] = useState<FormUserData>({
    name: "",
    lastname: "",
    phone: "",
    vehicle: "",
    wash: "",
    plate: "",
    price: 0,
    finished: false,
  });
  const { data: usersFalse, isLoading, isError } = useDashboardDataUnfinished();
  const { mutate, isPending: isPendingUser } = usePatchUserFinished();
  const { data: services } = useDataServiceAll();
  const { data: dataServices } = useDataServiceOne(dataForm.vehicle);
  const { handleChangeData, handleSubmit, isPendingForm } = useDashboardForm({
    dataServices,
    data: dataForm,
    setData: setDataForm,
  });

  const handleUsers = (_id: string) => {
    mutate(_id);
  };

  return (
    <>
      <section className=" relative flex bg-slate-200 rounded-md w-full h-auto p-6 sm:py-9 sm:px-12 flex-col gap-6">
        <h3 className="text-h4 font-normal">Ingresar Carro:</h3>
        {/*<form
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
        </form>*/}
        <FormDashboard
          handleChangeData={handleChangeData}
          dataForm={dataForm}
          isPendingForm={isPendingForm}
          services={services}
          dataServices={dataServices}
        />
        <div className="flex justify-between items-center">
          <div className="flex gap-3">
            <p>Precio:</p>
            <p>S/ {dataForm.price}</p>
          </div>
          <button
            className="py-2 px-4 bg-accent rounded-lg text-p font-semibold cursor-pointer hover:-translate-y-1 transition-all duration-300"
            onClick={handleSubmit}
          >
            {isPendingForm ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </section>
      <section className="flex bg-slate-200 rounded-md w-full h-auto p-6 sm:py-9 sm:px-12 flex-col gap-6">
        <h3 className="text-h4 font-normal">Carros en lavado...</h3>
        <div className=" overflow-x-auto w-full h-auto ">
          {isLoading && <Spinner />}
          {isError && <div> Error: No se ha podido obtener los datos</div>}
          {!isLoading && !isError && usersFalse?.count === 0 && (
            <p className="text-center text-h5 font-medium ">
              {" "}
              No hay carros lavando
            </p>
          )}
          {usersFalse && usersFalse.count > 0 && (
            <TableDashboard
              usersFalse={usersFalse}
              handleUsers={handleUsers}
              isPendingUser={isPendingUser}
            />
          )}
        </div>
      </section>
    </>
  );
}

export default Dashboard;
