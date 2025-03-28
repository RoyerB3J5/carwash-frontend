import { UserDate } from "@/types/index";
interface TableDashboardProps {
  usersFalse: UserDate;
  handleUsers: (_id: string) => void;
  isPendingUser: boolean;
}
export const TableDashboard = ({
  usersFalse,
  handleUsers,
  isPendingUser,
}: TableDashboardProps) => {
  return (
    <table className="w-[800px] md:w-full table-fixed">
      <thead className="bg-gray-400">
        <tr>
          <th className="border border-black py-3 w-1/4">Nombre</th>
          <th className="border border-black py-3 w-1/4">Placa</th>
          <th className="border border-black py-3 w-1/4">Vehículo</th>
          <th className="border border-black py-3 w-1/4">Tipo de lavado</th>
          <th className="border border-black py-3 w-1/4">Acciones</th>
        </tr>
      </thead>
      <tbody className="text-center">
        {usersFalse && usersFalse.count > 0 ? (
          usersFalse.data.map((user) => {
            return (
              <tr key={user._id}>
                <td className="border border-black px-4 py-3 whitespace-nowrap overflow-hidden text-ellipsis uppercase">
                  {user.name}
                </td>
                <td className="border border-black px-4 py-3 whitespace-nowrap overflow-hidden text-ellipsis uppercase">
                  {user.plate}
                </td>
                <td className="border border-black px-4 py-3 whitespace-nowrap overflow-hidden text-ellipsis">
                  {user.vehicle}
                </td>
                <td className="border border-black py-3 whitespace-nowrap overflow-hidden text-ellipsis">
                  {user.wash}
                </td>
                <td className="border border-black py-3">
                  <button
                    className="bg-accent text-p px-3 py-1 rounded-lg font-semibold cursor-pointer"
                    onClick={() => handleUsers(user._id)}
                    disabled={isPendingUser}
                  >
                    {isPendingUser ? "Terminando..." : "Terminar"}
                  </button>
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan={5} className="border border-black py-3">
              No hay carros en lavado
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
