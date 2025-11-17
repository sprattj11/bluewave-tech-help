import type { ContactInfo } from "../../types/booking";

interface ContactInfoStepProps {
  value: ContactInfo;
  onChange: (field: keyof ContactInfo, value: string) => void;
}

function ContactInfoStep({ value, onChange }: ContactInfoStepProps) {
  return (
    <section className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 space-y-4">
      <h3 className="text-xl font-semibold text-[#007BFF]">
        Your Contact Information
      </h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium text-gray-700">
          Full Name *
          <input
            type="text"
            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#007BFF] focus:outline-none"
            value={value.fullName}
            onChange={(event) => onChange("fullName", event.target.value)}
            required
          />
        </label>
        <label className="text-sm font-medium text-gray-700">
          Email *
          <input
            type="email"
            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#007BFF] focus:outline-none"
            value={value.email}
            onChange={(event) => onChange("email", event.target.value)}
            required
          />
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium text-gray-700">
          Phone *
          <input
            type="tel"
            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#007BFF] focus:outline-none"
            value={value.phone}
            onChange={(event) => onChange("phone", event.target.value)}
            required
          />
        </label>
        <label className="text-sm font-medium text-gray-700">
          Address *
          <input
            type="text"
            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#007BFF] focus:outline-none"
            value={value.address ?? ""}
            onChange={(event) => onChange("address", event.target.value)}
            required
            placeholder="Street address"
          />
        </label>
      </div>
    </section>
  );
}

export default ContactInfoStep;

