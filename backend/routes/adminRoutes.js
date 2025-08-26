import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <p className="text-center mt-10">Validando sesión...</p>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role !== "admin") {
    return <p className="text-center mt-10 text-red-600">Acceso denegado</p>;
  }

  return children;
};

export default AdminRoute;
