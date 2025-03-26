import { FaHome } from "react-icons/fa";
import { HiUsers, HiOutlineCog6Tooth } from "react-icons/hi2";
import { CiLogout } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { FaArrowLeft } from "react-icons/fa";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { TbReportSearch } from "react-icons/tb";
import { useCallback, useState } from "react";
import { IoMenu } from "react-icons/io5";

type NavItem = {
  path: string;
  icon: React.ReactNode;
  title: string;
};
function Navbar() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [seeMenu, setSeeMenu] = useState(false);

  const navItems: NavItem[] = [
    { path: "/dashboard", icon: <FaHome />, title: "Inicio" },
    { path: "/users", icon: <HiUsers />, title: "Usuarios" },
    {
      path: "/configure",
      icon: <HiOutlineCog6Tooth />,
      title: "Configuracion",
    },
    {
      path: "/expenses",
      icon: <RiMoneyDollarCircleFill />,
      title: "Gastos",
    },
    {
      path: "/reports",
      icon: <TbReportSearch />,
      title: "Reportes",
    },
  ];
  const handleNavigation = useCallback(
    (path: string) => () => {
      navigate(path);
      setSeeMenu(false);
    },
    [navigate]
  );
  const handleLogout = useCallback(async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  }, [navigate, logout]);
  return (
    <section className=" w-full sm:w-auto  sm:h-full bg-primary z-20 px-6 py-5 sm:px-6 sm:py-12 text-2xl text-white font-bold flex sm:flex-col items-center justify-between sm:items-start">
      <div className="flex justify-start items-center gap-5">
        {seeMenu ? (
          <>
            <h1 className="hidden sm:flex text-h5 transition-opacity duration-300">
              CARWASH
            </h1>
            <FaArrowLeft
              className="cursor-pointer size-5 bg-white text-primary rounded-full p-1 hover:bg-accent hover:text-primary transition-all"
              onClick={() => setSeeMenu(false)}
            />
          </>
        ) : (
          <IoMenu
            className="cursor-pointer transition-transform duration-300"
            onClick={() => setSeeMenu(true)}
          />
        )}
      </div>
      <div
        className={`w-full  items-start flex-col justify-center sm:justify-start flex-grow mt-14 gap-y-12 gap-x-6 absolute z-10 sm:z-0 bg-primary sm:bg-none top-2 sm:top-0 right-0 py-10 sm:py-0 sm:relative ${
          seeMenu ? "flex" : "hidden sm:flex"
        }`}
      >
        {navItems.map((item) => (
          <div
            key={item.path}
            className="w-full cursor-pointer flex justify-center sm:justify-start items-center gap-2 hover:text-accent transition-all duration-300"
            onClick={handleNavigation(item.path)}
          >
            {item.icon}
            {seeMenu && <p className={`text-p font-medium  `}>{item.title}</p>}
          </div>
        ))}
      </div>
      <div
        onClick={handleLogout}
        className={`flex justify-center items-center cursor-pointer w-auto sm:w-full transition-all duration-300 ${
          seeMenu ? "sm:bg-white sm:py-2 sm:rounded-xl sm:gap-4 h-auto" : ""
        }`}
      >
        <CiLogout
          className={`cursor-pointer transition-colors duration-300 ${
            seeMenu ? "text-white sm:text-primary" : "text-white"
          } stroke-1`}
        />
        {seeMenu && <p className="hidden sm:flex text-primary text-p">Salir</p>}
      </div>
    </section>
  );
}

export default Navbar;
