import type { BookingFormData } from "../../types/booking";
import { format } from "date-fns";

interface BookingSummaryProps {
  data: BookingFormData;
}

function BookingSummary({ data }: BookingSummaryProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 space-y-3">
      <h3 className="text-xl font-semibold text-[#007BFF]">
        Review Your Booking
      </h3>
      <div className="space-y-2 text-gray-700">
        <p>
          <span className="font-semibold">Date:</span>{" "}
          {data.date ? format(data.date, "EEEE, MMMM d, yyyy") : "Not selected"}
        </p>
        <p>
          <span className="font-semibold">Time:</span>{" "}
          {data.timeSlot || "Not selected"}
        </p>
        <p>
          <span className="font-semibold">Service:</span> {data.serviceType}
        </p>
        <p>
          <span className="font-semibold">Customer:</span>{" "}
          {data.contactInfo.fullName}
        </p>
        <p>
          <span className="font-semibold">Email:</span>{" "}
          {data.contactInfo.email}
        </p>
        <p>
          <span className="font-semibold">Phone:</span>{" "}
          {data.contactInfo.phone}
        </p>
        {data.contactInfo.address && (
          <p>
            <span className="font-semibold">Address:</span>{" "}
            {data.contactInfo.address}
          </p>
        )}
        <p>
          <span className="font-semibold">Preferred Contact:</span>{" "}
          {data.preferredContact}
        </p>
        <div>
          <span className="font-semibold">Issue Details:</span>
          <p className="text-gray-600 mt-1">{data.issueDescription}</p>
        </div>
      </div>
    </div>
  );
}

export default BookingSummary;

