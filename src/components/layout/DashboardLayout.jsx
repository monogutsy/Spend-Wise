import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import QuickAddExpense from "../transactions/QuickAddExpense";

function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="content-area">
        <Navbar />

        <main className="page-content">
          <Outlet />
        </main>
      </div>

      <QuickAddExpense />
    </div>
  );
}

export default DashboardLayout;
