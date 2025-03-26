import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import PrivateRoutes from "./components/PrivateRoutes";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Layout from "./components/Layout";
import Configure from "./pages/Configure";
import NewVehicle from "./pages/NewVehicle";
import SingleVehicle from "./pages/SingleVehicle";
import Expenses from "./pages/Expenses";
import Reports from "./pages/Reports";
import ReactQueryProvider from "./providers/ReactQueryProvider";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ReactQueryProvider>
          <AppContent />
        </ReactQueryProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}

function AppContent() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<Layout />}>
          <Route element={<PrivateRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/configure" element={<Configure />} />
            <Route path="/configure/:vehicleType" element={<SingleVehicle />} />
            <Route path="/configure/new" element={<NewVehicle />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/reports" element={<Reports />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
