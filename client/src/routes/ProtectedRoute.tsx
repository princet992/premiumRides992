import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { token } = useSelector((state: any) => state.Auth);
  if (!token) {
    return <Navigate to="/banner" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
