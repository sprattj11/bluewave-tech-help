import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBookings } from "../../services/storageService";
import type { Booking } from "../../types/admin";
import { updateLastCheckedTimestamp } from "../../services/notificationService";

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [stats, setStats] = useState({
    pending: 0,
    approved: 0,
    completed: 0,
    rejected: 0,
  });

  useEffect(() => {
    const loadBookings = () => {
      const allBookings = getBookings();
      setBookings(allBookings);

      setStats({
        pending: allBookings.filter((b) => b.status === "pending").length,
        approved: allBookings.filter((b) => b.status === "approved").length,
        completed: allBookings.filter((b) => b.status === "completed").length,
        rejected: allBookings.filter((b) => b.status === "rejected").length,
      });

      // Update last checked timestamp when dashboard loads
      updateLastCheckedTimestamp();
    };

    loadBookings();
    // Refresh every 10 seconds for faster notification updates
    const interval = setInterval(loadBookings, 10000);
    return () => clearInterval(interval);
  }, []);

  const recentBookings = bookings
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-gray-500">Pending</div>
          <div className="mt-2 text-3xl font-bold text-yellow-600">
            {stats.pending}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-gray-500">Approved</div>
          <div className="mt-2 text-3xl font-bold text-green-600">
            {stats.approved}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-gray-500">Completed</div>
          <div className="mt-2 text-3xl font-bold text-blue-600">
            {stats.completed}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm font-medium text-gray-500">Total</div>
          <div className="mt-2 text-3xl font-bold text-gray-900">
            {bookings.length}
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">
            Recent Bookings
          </h2>
          <Link
            to="/admin/bookings"
            className="text-[#007BFF] hover:underline font-medium"
          >
            View All →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentBookings.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                    No bookings yet
                  </td>
                </tr>
              ) : (
                recentBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {booking.contactInfo.fullName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {booking.contactInfo.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {booking.date
                          ? new Date(booking.date).toLocaleDateString()
                          : "N/A"}
                      </div>
                      <div className="text-sm text-gray-500">
                        {booking.timeSlot}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {booking.serviceType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          booking.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : booking.status === "approved"
                              ? "bg-green-100 text-green-800"
                              : booking.status === "completed"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-red-100 text-red-800"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

