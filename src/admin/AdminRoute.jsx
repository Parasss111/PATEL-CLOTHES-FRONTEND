import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

    console.log("ADMIN USER:", user);

  if (loading) return <p className="p-10">Checking access...</p>;

  if (!user || user.role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;
