import BookingForm from "../components/booking/BookingForm";

function Booking() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-6">
      <header className="text-center space-y-3">
        <p className="text-sm uppercase tracking-wide text-[#007BFF] font-semibold">
          Book an Appointment
        </p>
        <h1 className="text-3xl font-bold text-gray-900">
          Friendly Tech Support on Your Schedule
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Pick a time that works for you and tell us what you need. We&apos;ll confirm
          your booking and arrive ready to help.
        </p>
      </header>

      <BookingForm />
    </div>
  );
}

export default Booking;

