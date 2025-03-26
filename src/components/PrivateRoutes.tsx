import { useAuth } from '../context/authContext';
import {  Navigate, Outlet, useLocation } from 'react-router-dom';

function PrivateRoutes() {
  const { userCurrent } = useAuth();
  const location = useLocation();

  return userCurrent
    ? <Outlet/>
    : <Navigate to="/" state={{ from: location }} />;
}
export default PrivateRoutes;