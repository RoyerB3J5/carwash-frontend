import { FormUserData, Services } from "@/types/index";
import { usePostUser } from "./useDashboardMutation";
import { toast } from "sonner";
import { useCallback } from "react";
export const useDashboardForm = ({
  dataServices,
  data,
  setData,
}: {
  dataServices: Services | undefined;
  data: FormUserData;
  setData: React.Dispatch<React.SetStateAction<FormUserData>>;
}) => {
  const { mutate, isPending } = usePostUser();
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
        if (selectedService) {
          setData((prevData) => ({
            ...prevData,
            price: selectedService.price,
          }));
        }
      }
    },
    [data, dataServices, setData],
  );
  const handleSubmit = useCallback(async () => {
    if (
      data.name === "" ||
      data.lastname === "" ||
      data.phone === null ||
      data.vehicle === "" ||
      data.wash === "" ||
      data.plate === ""
    )
      return alert("Por favor llene todos los campos");
    mutate(data, {
      onSuccess: () => {
        setData({
          name: "",
          lastname: "",
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
