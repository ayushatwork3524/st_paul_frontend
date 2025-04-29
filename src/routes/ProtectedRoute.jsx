import { Navigate, Outlet } from "react-router-dom";
import { getUserFromCookie } from "../security/cookies/UserCookie";

const ProtectedRoute = ({ allowedRoles }) => {
  const user = getUserFromCookie();

  if (!user) {
    return <Navigate to="/sign-in" replace />;
  }

  const userRole = user?.role;

  if (allowedRoles.includes(userRole) || userRole === "SUPERADMIN") {
    return <Outlet />;
  }

  return <Navigate to="*" replace />;
};

export default ProtectedRoute;
