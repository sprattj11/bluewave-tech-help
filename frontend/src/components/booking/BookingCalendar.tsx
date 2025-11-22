import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { isPastDate } from "../../utils/dateUtils";
import { getBlockedDates } from "../../services/storageService";
import { format } from "date-fns";

interface BookingCalendarProps {
  value: Date | null;
  onChange: (date: Date) => void;
}

function BookingCalendar({ value, onChange }: BookingCalendarProps) {
  const blockedDates = getBlockedDates();
  const blockedDateStrings = blockedDates.map((bd) => bd.date);

  const isDateDisabled = (date: Date): boolean => {
    if (isPastDate(date)) return true;
    const dateStr = format(date, "yyyy-MM-dd");
    return blockedDateStrings.includes(dateStr);
  };

  const handleDateChange = (date: Date | Date[]) => {
    // Normalize date to avoid timezone issues on mobile
    // Create a new date with local date components, setting time to noon to avoid timezone edge cases
    const selectedDate = Array.isArray(date) ? date[0] : date;
    const normalizedDate = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      12, // Set to noon to avoid timezone issues
      0,
      0,
      0
    );
    onChange(normalizedDate);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 border border-gray-100">
      <h3 className="text-lg font-semibold mb-4 text-[#007BFF]">
        Choose a Date
      </h3>
      <Calendar
        value={value}
        onChange={handleDateChange}
        minDetail="month"
        minDate={new Date()}
        tileDisabled={({ date }) => isDateDisabled(date)}
        className="booking-calendar"
      />
    </div>
  );
}

export default BookingCalendar;

