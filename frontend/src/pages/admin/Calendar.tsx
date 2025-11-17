import { useEffect, useState } from "react";
import { getBookings } from "../../services/storageService";
import type { Booking } from "../../types/admin";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from "date-fns";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function AdminCalendar() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [view, setView] = useState<"month" | "list">("month");

  useEffect(() => {
    loadBookings();
    const interval = setInterval(loadBookings, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadBookings = () => {
    setBookings(getBookings());
  };

  const getBookingsForDate = (date: Date): Booking[] => {
    return bookings.filter((booking) => {
      if (!booking.date) return false;
      return isSameDay(new Date(booking.date), date);
    });
  };

  const getBookingsForMonth = (): Booking[] => {
    const monthStart = startOfMonth(selectedDate);
    const monthEnd = endOfMonth(selectedDate);
    const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

    return bookings.filter((booking) => {
      if (!booking.date) return false;
      const bookingDate = new Date(booking.date);
      return daysInMonth.some((day) => isSameDay(day, bookingDate));
    });
  };

  const tileContent = ({ date }: { date: Date }) => {
    const dayBookings = getBookingsForDate(date);
    if (dayBookings.length === 0) return null;

    return (
      <div className="mt-1 flex flex-wrap gap-1 justify-center">
        {dayBookings.slice(0, 2).map((booking) => (
          <div
            key={booking.id}
            className={`h-1.5 w-1.5 rounded-full ${
              booking.status === "pending"
                ? "bg-yellow-500"
                : booking.status === "approved"
                  ? "bg-green-500"
                  : booking.status === "completed"
                    ? "bg-blue-500"
                    : "bg-red-500"
            }`}
            title={`${booking.contactInfo.fullName} - ${booking.timeSlot}`}
          />
        ))}
        {dayBookings.length > 2 && (
          <div className="h-1.5 w-1.5 rounded-full bg-gray-400" title={`+${dayBookings.length - 2} more`} />
        )}
      </div>
    );
  };

  const selectedDateBookings = getBookingsForDate(selectedDate);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Calendar View</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => setView("month")}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              view === "month"
                ? "bg-[#007BFF] text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Month
          </button>
          <button
            onClick={() => setView("list")}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              view === "list"
                ? "bg-[#007BFF] text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            List
          </button>
        </div>
      </div>

      {view === "month" ? (
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow p-6">
            <Calendar
              onChange={(value) => setSelectedDate(value as Date)}
              value={selectedDate}
              tileContent={tileContent}
              className="w-full border-0"
            />
            <div className="mt-6 flex flex-wrap gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                <span>Pending</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 rounded-full bg-green-500" />
                <span>Approved</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 rounded-full bg-blue-500" />
                <span>Completed</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <span>Rejected</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {format(selectedDate, "MMMM d, yyyy")}
            </h2>
            {selectedDateBookings.length === 0 ? (
              <p className="text-gray-500">No bookings on this date</p>
            ) : (
              <div className="space-y-4">
                {selectedDateBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="font-medium text-gray-900">
                          {booking.contactInfo.fullName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {booking.timeSlot} - {booking.serviceType}
                        </div>
                      </div>
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
                    </div>
                    <div className="text-sm text-gray-600">
                      {booking.issueDescription}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Upcoming Bookings
            </h2>
            {getBookingsForMonth().length === 0 ? (
              <p className="text-gray-500">No bookings this month</p>
            ) : (
              <div className="space-y-4">
                {getBookingsForMonth()
                  .sort((a, b) => {
                    if (!a.date || !b.date) return 0;
                    return new Date(a.date).getTime() - new Date(b.date).getTime();
                  })
                  .map((booking) => (
                    <div
                      key={booking.id}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium text-gray-900">
                            {booking.contactInfo.fullName}
                          </div>
                          <div className="text-sm text-gray-500 mt-1">
                            {booking.date
                              ? format(new Date(booking.date), "MMMM d, yyyy")
                              : "N/A"}{" "}
                            at {booking.timeSlot}
                          </div>
                          <div className="text-sm text-gray-600 mt-2">
                            {booking.serviceType} - {booking.issueDescription}
                          </div>
                        </div>
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
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

