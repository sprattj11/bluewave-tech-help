import { useMemo, useState } from "react";
import BookingCalendar from "./BookingCalendar";
import TimeSlotPicker from "./TimeSlotPicker";
import ContactInfoStep from "./ContactInfoStep";
import IssueDetailsStep from "./IssueDetailsStep";
import StepIndicator from "./StepIndicator";
import BookingSummary from "./BookingSummary";
import BookingConfirmation from "./BookingConfirmation";
import type { BookingFormData, ServiceType } from "../../types/booking";
import type { Booking } from "../../types/admin";
import { generateTimeSlotsForDate } from "../../utils/dateUtils";
import { submitBooking } from "../../services/bookingService";

const STEP_LABELS = [
  "Date & Time",
  "Contact Info",
  "Issue Details",
  "Review",
] as const;
const STEP_LABELS_LIST = Array.from(STEP_LABELS);

const initialFormData: BookingFormData = {
  date: null,
  timeSlot: "",
  contactInfo: {
    fullName: "",
    email: "",
    phone: "",
    address: "",
  },
  serviceType: "Device Setup" as ServiceType,
  issueDescription: "",
  preferredContact: "Email",
};

function BookingForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<BookingFormData>(initialFormData);
  const [hasSelectedService, setHasSelectedService] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedBooking, setSubmittedBooking] =
    useState<Booking | null>(null);

  const timeSlots = useMemo(
    () => generateTimeSlotsForDate(formData.date),
    [formData.date],
  );

  const isNextDisabled = () => {
    if (currentStep === 0) {
      return !formData.date || !formData.timeSlot;
    }
    if (currentStep === 1) {
      const { contactInfo } = formData;
      return (
        !contactInfo.fullName ||
        !contactInfo.email ||
        !contactInfo.phone ||
        !contactInfo.address
      );
    }
    if (currentStep === 2) {
      // Require service selection and description
      return !hasSelectedService || formData.issueDescription.length < 10;
    }
    return false;
  };

  const goToNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, STEP_LABELS.length - 1));
  };

  const goToPrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const booking = await submitBooking(formData);
      setSubmittedBooking(booking);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setCurrentStep(0);
    setSubmittedBooking(null);
    setHasSelectedService(false);
  };

  if (submittedBooking) {
    return <BookingConfirmation booking={submittedBooking} onReset={handleReset} />;
  }

  return (
    <section className="space-y-6">
      <StepIndicator steps={STEP_LABELS_LIST} currentStep={currentStep} />

      {currentStep === 0 && (
        <div className="grid gap-6 lg:grid-cols-2">
          <BookingCalendar
            value={formData.date}
            onChange={(date) => {
              // Ensure date is normalized to avoid timezone issues
              const normalizedDate = date
                ? new Date(
                    date.getFullYear(),
                    date.getMonth(),
                    date.getDate(),
                    12,
                    0,
                    0,
                    0
                  )
                : null;
              setFormData((prev) => ({ ...prev, date: normalizedDate, timeSlot: "" })); // Clear time slot when date changes
            }}
          />
          <div className="flex flex-col min-h-0">
            <TimeSlotPicker
              slots={timeSlots}
              selectedSlot={formData.timeSlot}
              onSelect={(timeSlot) =>
                setFormData((prev) => ({ ...prev, timeSlot }))
              }
              disabled={!formData.date}
            />
          </div>
        </div>
      )}

      {currentStep === 1 && (
        <ContactInfoStep
          value={formData.contactInfo}
          onChange={(field, value) =>
            setFormData((prev) => ({
              ...prev,
              contactInfo: { ...prev.contactInfo, [field]: value },
            }))
          }
        />
      )}

      {currentStep === 2 && (
        <IssueDetailsStep
          serviceType={formData.serviceType as ServiceType}
          onServiceChange={(service) => {
            setHasSelectedService(true);
            setFormData((prev) => ({ ...prev, serviceType: service }));
          }}
          hasSelectedService={hasSelectedService}
          issueDescription={formData.issueDescription}
          onDescriptionChange={(issueDescription) =>
            setFormData((prev) => ({ ...prev, issueDescription }))
          }
        />
      )}

      {currentStep === 3 && <BookingSummary data={formData} />}

      <div className="flex justify-between items-center pt-4">
        <button
          type="button"
          className="text-[#007BFF] font-semibold disabled:opacity-40"
          onClick={goToPrevious}
          disabled={currentStep === 0}
        >
          Back
        </button>

        {currentStep < STEP_LABELS.length - 1 ? (
          <button
            type="button"
            className="rounded-full button-primary px-6 py-2 font-semibold text-white disabled:opacity-50"
            onClick={goToNext}
            disabled={isNextDisabled()}
          >
            Next
          </button>
        ) : (
          <button
            type="button"
            className="rounded-full button-primary px-6 py-2 font-semibold text-white disabled:opacity-50"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Booking"}
          </button>
        )}
      </div>
    </section>
  );
}

export default BookingForm;

