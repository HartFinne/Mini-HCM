import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { token, role } = useContext(AuthContext);

  if (!token) return <Navigate to="/" replace />;
  if (role !== "admin") return <Navigate to="/home" replace />;

  return children

};

export default AdminRoute;
