import { useEffect, useState } from "react";
import {
  getBookings,
  updateBookingStatus,
  deleteBooking,
} from "../../services/storageService";
import type { Booking } from "../../types/admin";
import { format } from "date-fns";
import { sendBookingConfirmationEmail } from "../../services/emailService";

export default function AdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filter, setFilter] = useState<"all" | Booking["status"]>("all");
  const [toast, setToast] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<string | null>(null);

  useEffect(() => {
    loadBookings();
    const interval = setInterval(loadBookings, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(timer);
  }, [toast]);

  const loadBookings = () => {
    const allBookings = getBookings();
    setBookings(allBookings);
  };

  const filteredBookings =
    filter === "all"
      ? bookings
      : bookings.filter((b) => b.status === filter);

  const handleStatusChange = async (
    bookingId: string,
    newStatus: Booking["status"],
    rejectionReason?: string,
  ) => {
    setIsProcessing(bookingId);
    const updated = updateBookingStatus(bookingId, newStatus, rejectionReason);
    if (updated && newStatus === "approved") {
      try {
        await sendBookingConfirmationEmail(updated);
        setToast(
          `✅ Confirmation email sent to ${updated.contactInfo.email} for ${updated.contactInfo.fullName}`,
        );
      } catch (error) {
        console.error("Failed to send confirmation email:", error);
        setToast(
          `⚠️ Booking approved but failed to send email to ${updated.contactInfo.email}. Check console for details.`,
        );
      }
    } else if (updated) {
      setToast(`Booking status updated to ${newStatus}`);
    }
    setIsProcessing(null);
    loadBookings();
  };

  const handleDelete = (bookingId: string) => {
    const confirmDelete = window.confirm(
      "Delete this booking? This cannot be undone.",
    );
    if (!confirmDelete) return;
    deleteBooking(bookingId);
    loadBookings();
    setToast("Booking deleted.");
  };

  const getStatusColor = (status: Booking["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "approved":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "rejected":
        return "bg-red-100 text-red-800";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Bookings</h1>
        <select
          value={filter}
          onChange={(e) =>
            setFilter(e.target.value as "all" | Booking["status"])
          }
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007BFF]"
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="completed">Completed</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {toast && (
        <div className="mb-6 rounded-lg bg-[#E5F0FF] border border-[#007BFF]/30 px-4 py-3 text-sm text-[#0056B3]">
          {toast}
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    No bookings found
                  </td>
                </tr>
              ) : (
                filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {booking.contactInfo.fullName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {booking.contactInfo.email}
                      </div>
                      <div className="text-sm text-gray-500">
                        {booking.contactInfo.phone}
                      </div>
                      {booking.contactInfo.address && (
                        <div className="text-sm text-gray-500">
                          {booking.contactInfo.address}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {booking.date
                          ? format(new Date(booking.date), "MMM d, yyyy")
                          : "N/A"}
                      </div>
                      <div className="text-sm text-gray-500">
                        {booking.timeSlot}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {booking.serviceType}
                      </div>
                      <div className="text-sm text-gray-500 mt-1 max-w-xs truncate">
                        {booking.issueDescription}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          booking.status,
                        )}`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex flex-col space-y-2">
                        {booking.status === "pending" && (
                          <>
                            <button
                              onClick={() =>
                                handleStatusChange(booking.id, "approved")
                              }
                              className="text-green-600 hover:text-green-900 disabled:opacity-50"
                              disabled={isProcessing === booking.id}
                            >
                              {isProcessing === booking.id
                                ? "Approving..."
                                : "Approve"}
                            </button>
                            <button
                              onClick={() => {
                                const reason = prompt(
                                  "Reason for rejection (optional):",
                                );
                                handleStatusChange(
                                  booking.id,
                                  "rejected",
                                  reason || undefined,
                                );
                              }}
                              className="text-red-600 hover:text-red-900"
                            >
                              Reject
                            </button>
                          </>
                        )}
                        {booking.status === "approved" && (
                          <button
                            onClick={() =>
                              handleStatusChange(booking.id, "completed")
                            }
                            className="text-blue-600 hover:text-blue-900 disabled:opacity-50"
                            disabled={isProcessing === booking.id}
                          >
                            {isProcessing === booking.id
                              ? "Completing..."
                              : "Mark Complete"}
                          </button>
                        )}
                        {booking.status === "rejected" && booking.rejectionReason && (
                          <div className="text-xs text-gray-500">
                            Reason: {booking.rejectionReason}
                          </div>
                        )}
                        <button
                          onClick={() => handleDelete(booking.id)}
                          className="text-xs text-gray-500 hover:text-red-600"
                        >
                          Delete booking
                        </button>
                      </div>
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

