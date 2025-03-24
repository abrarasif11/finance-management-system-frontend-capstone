import { Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { useUser } from "../contexts/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useUser();
  const token = Cookies.get("XTOKEN");
  const location = useLocation();
  if (loading) {
    return;
  }
  if (user?.user && token) {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
