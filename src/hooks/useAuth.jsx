import { createContext, useContext } from "react";
import { replace, useLocation, useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const location = useLocation();
  const from = location.state?.from || "/";
  const navigate = useNavigate();

  const login = async (data) => {
    setUser(data);
    
    // Navigate to 2FA verification page
    navigate(from, replace);
  };

  const logout = () => {
    setUser(null);
    navigate("/", { replace: true });
  };

  const value = {
    user,
    isAdmin: true,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};