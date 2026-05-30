import {
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";
import { useSelector } from "react-redux";

import {
  selectAuthInitialized,
  selectIsAuthenticated,
} from "../features/auth/authSelectors";
import { AUTH_REQUIRED } from "../config/appConfig";

function ProtectedRoute() {
  const isAuthenticated = useSelector(
    selectIsAuthenticated
  );
  const initialized = useSelector(
    selectAuthInitialized
  );
  const location = useLocation();

  if (!AUTH_REQUIRED) {
    return <Outlet />;
  }

  if (!initialized) {
    return (
      <div className="page-loader">
        Checking session...
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  return <Outlet />;
}

export default ProtectedRoute;
