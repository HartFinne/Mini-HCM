import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const UserRoute = ({ children }) => {
  const { token, role } = useContext(AuthContext);

  if (!token) return <Navigate to="/" replace />;
  if (role !== "employee") return <Navigate to="/admin-home" replace />;

  return children
};


export default UserRoute