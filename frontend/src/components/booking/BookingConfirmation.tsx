import type { Booking } from "../../types/admin";
import { format } from "date-fns";

interface BookingConfirmationProps {
  booking: Booking;
  onReset: () => void;
}

function BookingConfirmation({ booking, onReset }: BookingConfirmationProps) {
  return (
    <section className="bg-white rounded-3xl shadow-lg p-8 text-center border border-[#007BFF]/20">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#007BFF]/10 text-[#007BFF] text-3xl">
        ✓
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Booking Request Sent!
      </h2>
      <p className="text-gray-600 mb-6">
        Thanks {booking.contactInfo.fullName}! We&apos;ll review your request
        and get back to you within 24 hours with a confirmation.
      </p>

      <div className="bg-[#F3F4F6] rounded-2xl p-6 text-left space-y-2 text-gray-700 mb-6">
        <p>
          <span className="font-semibold">Reference:</span> {booking.id}
        </p>
        <p>
          <span className="font-semibold">Date:</span>{" "}
          {booking.date ? format(booking.date, "EEEE, MMMM d, yyyy") : "-"}
        </p>
        <p>
          <span className="font-semibold">Time:</span> {booking.timeSlot}
        </p>
        <p>
          <span className="font-semibold">Service:</span>{" "}
          {booking.serviceType}
        </p>
      </div>

      <button
        type="button"
        className="inline-flex items-center justify-center rounded-full button-primary px-6 py-3 font-semibold text-white"
        onClick={onReset}
      >
        Book Another Appointment
      </button>
    </section>
  );
}

export default BookingConfirmation;

