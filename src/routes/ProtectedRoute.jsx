import { Navigate, Outlet } from "react-router-dom";
import { getUserFromCookie } from "../security/cookies/UserCookie";
import { ROLE_HIERARCHY } from "./RoleHierachy";

const ProtectedRoute = ({ allowedRoles }) => {
  const user = getUserFromCookie();

  if (!user) {
    return <Navigate to="/sign-in" replace />;
  }

  const userRole = user?.role;

  if (userRole === "SUPERADMIN") {
    return <Outlet />;
  }

  const canAccess = ROLE_HIERARCHY[userRole]?.includes(allowedRoles[0]);

  if (!canAccess) {
    return <Navigate to="*" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
