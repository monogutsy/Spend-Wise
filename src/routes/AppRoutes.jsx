import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import DashboardLayout from "../components/layout/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";
import PublicOnlyRoute from "./PublicOnlyRoute";

const Dashboard = lazy(() =>
  import("../pages/Dashboard")
);
const Transactions = lazy(() =>
  import("../pages/Transactions")
);
const Budgets = lazy(() =>
  import("../pages/Budgets")
);
const Reports = lazy(() =>
  import("../pages/Reports")
);
const Goals = lazy(() => import("../pages/Goals"));
const Categories = lazy(() =>
  import("../pages/Categories")
);
const Settings = lazy(() =>
  import("../pages/Settings")
);
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() =>
  import("../pages/Register")
);
const NotFound = lazy(() =>
  import("../pages/NotFound")
);

function AppRoutes() {
  return (
    <Suspense
      fallback={
        <div className="page-loader">
          Loading page...
        </div>
      }
    >
      <Routes>
        <Route element={<PublicOnlyRoute />}>
          <Route path="/login" element={<Login />} />
          <Route
            path="/register"
            element={<Register />}
          />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route
              path="transactions"
              element={<Transactions />}
            />
            <Route
              path="budgets"
              element={<Budgets />}
            />
            <Route
              path="reports"
              element={<Reports />}
            />
            <Route path="goals" element={<Goals />} />
            <Route
              path="categories"
              element={<Categories />}
            />
            <Route
              path="settings"
              element={<Settings />}
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
