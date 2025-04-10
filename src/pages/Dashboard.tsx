import { useState } from "react";
import { FormDashboard } from "@/components/Dashboard/FormDashboard";
import { useDashboardForm } from "../hooks/Dashboard/useDashboardForm";
import {
  useDataServiceAll,
  useDataServiceOne,
  useDashboardDataUnfinished,
} from "@/hooks/Dashboard/useDashboardData";
import { usePatchUserFinished } from "@/hooks/Dashboard/useDashboardMutation";
import { FormUserData, DataExtraProps } from "@/types/index";
import Spinner from "@/components/Spinner";
import { TableDashboard } from "@/components/Dashboard/TableDashboard";
function Dashboard() {
  const [dataForm, setDataForm] = useState<FormUserData>({
    name: "",
    extra: "",
    phone: "",
    vehicle: "",
    wash: "",
    plate: "",
    price: 0,
    finished: false,
  });
  const [dataExtra, setDataExtra] = useState<DataExtraProps[]>([
    {
      name: "Pintura",
      price: 40,
    },
    {
      name: "Encerado",
      price: 23,
    },
    {
      name: "Lavado motor",
      price: 52,
    },
  ]);
  const { data: usersFalse, isLoading, isError } = useDashboardDataUnfinished();
  const { mutate, isPending: isPendingUser } = usePatchUserFinished();
  const { data: services } = useDataServiceAll();
  const { data: dataServices } = useDataServiceOne(dataForm.vehicle);
  const { handleChangeData, handleSubmit, isPendingForm } = useDashboardForm({
    dataServices,
    data: dataForm,
    setData: setDataForm,
    dataExtra: dataExtra,
  });

  const handleUsers = (_id: string) => {
    mutate(_id);
  };

  return (
    <>
      <section className=" relative flex bg-slate-200 rounded-md w-full h-auto p-6 sm:py-9 sm:px-12 flex-col gap-6">
        <h3 className="text-h4 font-normal">Ingresar Carro:</h3>

        <FormDashboard
          handleChangeData={handleChangeData}
          dataForm={dataForm}
          isPendingForm={isPendingForm}
          services={services}
          dataServices={dataServices}
          dataExtra={dataExtra}
          handleSubmit={handleSubmit}
        />
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
