import { useSelector } from "react-redux";
import {
  Navigate,
  Outlet,
} from "react-router-dom";

import {
  selectAuthInitialized,
  selectIsAuthenticated,
} from "../features/auth/authSelectors";

function PublicOnlyRoute() {
  const initialized = useSelector(
    selectAuthInitialized
  );
  const isAuthenticated = useSelector(
    selectIsAuthenticated
  );

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
