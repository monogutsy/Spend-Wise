import { useSelector } from "react-redux";
import {
  Navigate,
  Outlet,
} from "react-router-dom";

import {
  selectAuthInitialized,
  selectIsAuthenticated,
} from "../features/auth/authSelectors";
import { AUTH_REQUIRED } from "../config/appConfig";

function PublicOnlyRoute() {
  const initialized = useSelector(
    selectAuthInitialized
  );
  const isAuthenticated = useSelector(
    selectIsAuthenticated
  );

  if (!AUTH_REQUIRED) {
    return <Outlet />;
  }

  if (!initialized) {
    return (
      <div className="page-loader">
        Loading authentication...
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default PublicOnlyRoute;
