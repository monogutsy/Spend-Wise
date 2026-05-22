import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  LayoutDashboard,
  Receipt,
  Wallet,
  BarChart3,
  Target,
  Tags,
  Settings
} from "lucide-react";
import { logoutCurrentUser } from "../../features/auth/authSlice";
import { selectCurrentUser } from "../../features/auth/authSelectors";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/transactions", label: "Transactions", icon: Receipt },
  { to: "/budgets", label: "Budgets", icon: Wallet },
  { to: "/reports", label: "Reports", icon: BarChart3 },
  { to: "/goals", label: "Goals", icon: Target },
  { to: "/categories", label: "Categories", icon: Tags },
  { to: "/settings", label: "Settings", icon: Settings },
];

function Sidebar() {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);

  return (
    <aside className="sidebar">
      <div className="logo">
        <h2>SpendWise</h2>
        <span>Expense Tracker</span>
      </div>

      <nav className="sidebar-nav">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            <Icon size={18} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <p className="sidebar-user-pill">
          {user?.displayName || user?.email || "User"}
        </p>
        <button
          type="button"
          className="btn btn-ghost sidebar-logout"
          onClick={() => dispatch(logoutCurrentUser())}
        >
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
