import BookingForm from "../components/booking/BookingForm";

function Booking() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-10 space-y-6">
      <header className="text-center space-y-3">
        <p className="text-xs sm:text-sm uppercase tracking-wide text-[#007BFF] font-semibold">
          Book an Appointment
        </p>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
          Friendly Tech Support on Your Schedule
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base px-4">
          Pick a time that works for you and tell us what you need. We&apos;ll confirm
          your booking and arrive ready to help.
        </p>
      </header>

      <BookingForm />
    </div>
  );
}

export default Booking;

