import { Navigate, useLocation, useOutlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { AppBar } from "./AppBar";

export const ProtectedLayout = () => {
  const { user } = useAuth();
  const outlet = useOutlet();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{from: location?.pathname || "/"}} />;
  }

  return (
    <div>
      <AppBar
        pages={[
          { label: "Dashboard", path: "dashboard" }
        ]}
      />
      {outlet}
    </div>
  );
};
