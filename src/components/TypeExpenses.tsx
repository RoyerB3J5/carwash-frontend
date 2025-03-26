import { useEffect, useState } from "react";
import { useApi } from "../hooks/useApi";
import { FaCirclePlus } from "react-icons/fa6";
import { IoIosCloseCircle } from "react-icons/io";
interface DataType {
  _id?: string;
  name: string;
}
function TypeExpenses() {
  const [dataType, setDataType] = useState<DataType[]>([]);
  const [save, setSave] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [originalData, setOriginalData] = useState<DataType[]>([...dataType]);
  const { post, get, delete: deleteRequest } = useApi();
  const handleChange = (index: number, newName: string) => {
    const newData = dataType.map((item, i) =>
      i === index ? { ...item, name: newName } : item
    );
    setDataType(newData);
  };
  const handleSave = async () => {
    const updatedItems = dataType.filter((item, index) => {
      const original = originalData[index];
      return original && original.name !== item.name;
    });
    const newItems = dataType.filter(
      (item) => !originalData.some((original) => original._id === item._id)
    );
    const allModifiedItems = [...updatedItems, ...newItems];
    setSave(true);
    await post("type-expenses", allModifiedItems);
    console.log(allModifiedItems);
    setOriginalData([...dataType]);
    setSave(false);
    setSaveMessage("Los cambios realizados se guardaron correctamente");
    setTimeout(() => setSaveMessage(""), 1000);
  };

  const getTypeExpenses = async () => {
    const newData = await get<DataType[]>("type-expenses");
    setDataType(newData);
    setOriginalData(newData);
  };
  const deleteTypeExpenses = async (id: string) => {
    await deleteRequest(`type-expenses/${id}`);
    setDataType(dataType.filter((item) => item._id !== id));
    setOriginalData(originalData.filter((item) => item._id !== id));
  };

  useEffect(() => {
    getTypeExpenses();
  }, []);
  const addNewType = () => {
    setDataType([...dataType, { name: "" }]);
  };
  return (
    <section className="flex flex-col justify-center items-center gap-5 mt-9">
      <h2 className=" text-center font-semibold text-2xl">Tipos de Gastos</h2>
      <section className=" relative flex bg-slate-200 rounded-md w-full h-auto py-9 px-6 sm:px-16 flex-col gap-6 mb-8">
        <div className="w-full flex justify-end items-center">
          <FaCirclePlus
            className="size-6 text-primary cursor-pointer"
            onClick={addNewType}
          />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 sm:gap-10 w-full">
          {dataType.map((data, index) => (
            <div
              key={index}
              className="relative group flex items-center justify-between w-full p-2  rounded-lg bg-white "
            >
              <input
                type="text"
                value={data.name}
                className="flex-1 focus:outline-none bg-transparent pr-2 truncate max-w-[140px]"
                onChange={(e) => handleChange(index, e.target.value)}
                style={{ background: "transparent" }}
              />
              {data._id && (
                <IoIosCloseCircle
                  className="size-5 text-red-700 cursor-pointer"
                  onClick={() => {
                    if (data._id) deleteTypeExpenses(data._id);
                  }}
                />
              )}
            </div>
          ))}
        </div>
        <button
          className="bg-accent rounded-xl py-2 font-semibold cursor-pointer"
          onClick={handleSave}
        >
          {save ? "Guardando..." : "Guardar"}
        </button>
        {saveMessage && (
          <p className="text-center text-h5 text-primary font-semibold">
            {saveMessage}
          </p>
        )}
      </section>
    </section>
  );
}

export default TypeExpenses;
