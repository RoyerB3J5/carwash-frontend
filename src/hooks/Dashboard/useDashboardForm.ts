import { FormUserData, Services, DataExtraProps } from "@/types/index";
import { usePostUser } from "./useDashboardMutation";
import { toast } from "sonner";
import { useCallback, useRef } from "react";
export const useDashboardForm = ({
  dataServices,
  data,
  setData,
  dataExtra,
}: {
  dataServices: Services | undefined;
  data: FormUserData;
  setData: React.Dispatch<React.SetStateAction<FormUserData>>;
  dataExtra: DataExtraProps[];
}) => {
  const { mutate, isPending } = usePostUser();
  const selectedWashPrice = useRef(0);
  const selectedExtraPrice = useRef(0);
  const handleChangeData = useCallback(
    (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLSelectElement>,
    ) => {
      const { id, value } = e.target;

      setData({
        ...data,
        [id]: value,
      });
      if (id === "wash" && dataServices) {
        const selectedService = dataServices.service.find(
          (service) => service.nameService === value,
        );
        selectedWashPrice.current = selectedService ? selectedService.price : 0;
        setData((prevData) => ({
          ...prevData,
          price: selectedWashPrice.current + selectedExtraPrice.current,
        }));
      }
      if (id === "extra" && dataExtra) {
        const selectedExtra = dataExtra.find((extra) => extra.name === value);
        selectedExtraPrice.current = selectedExtra ? selectedExtra.price : 0;
        setData((prevData) => ({
          ...prevData,
          price: selectedExtraPrice.current + selectedWashPrice.current,
        }));
      }
    },
    [data, dataServices, setData, dataExtra],
  );
  const handleSubmit = useCallback(async () => {
    if (
      data.name === "" ||
      data.extra === "" ||
      data.phone === null ||
      data.vehicle === "" ||
      data.wash === "" ||
      data.plate === ""
    )
      return alert("Por favor llene todos los campos");
    mutate(data, {
      onSuccess: () => {
        selectedWashPrice.current = 0;
        selectedExtraPrice.current = 0;
        setData({
          name: "",
          extra: "",
          phone: "",
          vehicle: "",
          wash: "",
          plate: "",
          price: 0,
          finished: false,
        });
        toast.success("Lavado registrado");
      },
    });
  }, [data, setData, mutate]);

  return {
    handleChangeData,
    handleSubmit,
    isPendingForm: isPending,
  };
};
