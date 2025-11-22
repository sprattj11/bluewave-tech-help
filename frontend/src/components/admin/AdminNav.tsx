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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    // Close mobile menu when navigating
    setIsMobileMenuOpen(false);
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
    <nav className="bg-[#007BFF] text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link
              to="/admin/dashboard"
              className="text-lg sm:text-xl font-bold tracking-wide hover:opacity-90"
            >
              Admin Dashboard
            </Link>
            {/* Desktop Navigation */}
            <div className="hidden lg:flex ml-8 space-x-2">
              {navItems.map((item) => {
                const isBookingsPage = item.path === "/admin/bookings";
                const showBadge = isBookingsPage && newBookingsCount > 0;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`relative px-3 py-2 rounded-lg text-sm font-semibold transition min-h-[44px] flex items-center ${
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
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link
              to="/"
              className="hidden sm:block text-sm hover:underline px-2 py-2 min-h-[44px] flex items-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Site
            </Link>
            <button
              onClick={handleLogout}
              className="bg-white/20 hover:bg-white/65 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition min-h-[44px] flex items-center"
            >
              Logout
            </button>
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white min-h-[44px] min-w-[44px] flex items-center justify-center ml-2"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden pb-4 space-y-2 border-t border-white/20 mt-2 pt-4">
            {navItems.map((item) => {
              const isBookingsPage = item.path === "/admin/bookings";
              const showBadge = isBookingsPage && newBookingsCount > 0;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`relative block px-4 py-3 rounded-lg text-base font-semibold transition min-h-[44px] flex items-center ${
                    location.pathname === item.path
                      ? "bg-white text-[#007BFF]"
                      : "hover:bg-white/10 text-white"
                  }`}
                >
                  {item.label}
                  {showBadge && (
                    <span className="ml-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {newBookingsCount > 9 ? "9+" : newBookingsCount}
                    </span>
                  )}
                </Link>
              );
            })}
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-3 text-base font-medium hover:bg-white/10 rounded-lg min-h-[44px] flex items-center text-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Site
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

