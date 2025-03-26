import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { Toaster } from "./ui/sonner";

const Layout = () => {
  return (
    <main className="w-full h-screen flex flex-col sm:flex-row overflow-y-auto">
      <Navbar />
      <div className="flex flex-grow flex-col h-auto p-8 sm:p-10 md:py-12 md:px-16  transition-all w-full gap-6 overflow-x-hidden">
        <Outlet />
      </div>
      <Toaster richColors position="top-right" />
    </main>
  );
};

export default Layout;
