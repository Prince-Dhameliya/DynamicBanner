import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { FourZeroFourPage } from "../pages/404/FourZeroFourPage";
import { AppBar } from "./AppBar";

export const ProtectedRoute = () => {
  const { user, isAdmin } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if(!isAdmin) {
    return <FourZeroFourPage />;
  }

  return (
    <div>
      <AppBar />
      <Outlet /> {/* Below Outlet is Same useOutlet hook */}
    </div>
  );;
};

export default ProtectedRoute;