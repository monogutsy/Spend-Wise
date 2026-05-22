import {
  Bell,
  Search,
  User,
} from "lucide-react";

function Navbar() {
  return (
    <header className="navbar">
      <label className="navbar-search">
        <Search size={16} />
        <input
          type="text"
          placeholder="Search transactions..."
        />
      </label>

      <div className="navbar-right">
        <button
          className="icon-btn"
          aria-label="Notifications"
        >
          <Bell size={18} />
        </button>
        <button
          className="icon-btn"
          aria-label="Profile"
        >
          <User size={18} />
        </button>
      </div>
    </header>
  );
}

export default Navbar;
