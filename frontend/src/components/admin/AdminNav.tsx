import { Link, useLocation } from "react-router-dom";
import { logout } from "../../services/authService";

export default function AdminNav() {
  const location = useLocation();

  const handleLogout = () => {
    logout();
    window.location.href = "/admin/login";
  };

  const navItems = [
    { path: "/admin/dashboard", label: "Dashboard" },
    { path: "/admin/bookings", label: "Bookings" },
    { path: "/admin/availability", label: "Availability" },
    { path: "/admin/customers", label: "Customers" },
    { path: "/admin/calendar", label: "Calendar" },
  ];

  return (
    <nav className="bg-[#007BFF] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link
              to="/admin/dashboard"
              className="text-xl font-bold tracking-wide"
            >
              Admin Dashboard
            </Link>
            <div className="hidden md:flex space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                    location.pathname === item.path
                      ? "bg-white text-[#007BFF] shadow-md"
                      : "bg-white/30 text-white hover:bg-white/40 hover:shadow-sm"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="text-sm hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Site
            </Link>
            <button
              onClick={handleLogout}
              className="bg-white/20 hover:bg-white/65 px-4 py-2 rounded-lg text-sm font-medium transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

