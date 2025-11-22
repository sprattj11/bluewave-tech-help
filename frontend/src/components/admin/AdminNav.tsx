import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { logout } from "../../services/authService";
import { getBookings } from "../../services/storageService";
import {
  getLastCheckedTimestamp,
  updateLastCheckedTimestamp,
  getNewBookingsCount,
} from "../../services/notificationService";

export default function AdminNav() {
  const location = useLocation();
  const [newBookingsCount, setNewBookingsCount] = useState(0);

  useEffect(() => {
    const checkNewBookings = () => {
      const bookings = getBookings();
      const lastChecked = getLastCheckedTimestamp();
      const newCount = getNewBookingsCount(bookings, lastChecked);
      setNewBookingsCount(newCount);
    };

    checkNewBookings();
    // Check every 10 seconds for new bookings
    const interval = setInterval(checkNewBookings, 10000);
    return () => clearInterval(interval);
  }, []);

  // Update last checked when viewing bookings page
  useEffect(() => {
    if (location.pathname === "/admin/bookings" || location.pathname === "/admin/dashboard") {
      updateLastCheckedTimestamp();
      setNewBookingsCount(0);
    }
  }, [location.pathname]);

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
              {navItems.map((item) => {
                const isBookingsPage = item.path === "/admin/bookings";
                const showBadge = isBookingsPage && newBookingsCount > 0;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`relative px-4 py-2 rounded-lg text-sm font-semibold transition ${
                      location.pathname === item.path
                        ? "bg-white text-[#007BFF] shadow-md"
                        : "bg-white/30 text-white hover:bg-white/40 hover:shadow-sm"
                    }`}
                  >
                    {item.label}
                    {showBadge && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {newBookingsCount > 9 ? "9+" : newBookingsCount}
                      </span>
                    )}
                  </Link>
                );
              })}
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

