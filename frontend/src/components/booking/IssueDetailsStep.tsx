import type { ServiceType } from "../../types/booking";

interface IssueDetailsStepProps {
  serviceType: ServiceType;
  onServiceChange: (service: ServiceType) => void;
  issueDescription: string;
  onDescriptionChange: (value: string) => void;
  hasSelectedService: boolean;
}

const SERVICES: ServiceType[] = [
  "Device Setup",
  "Wi-Fi & Network",
  "Software Assistance",
  "Data Backup & Cleanup",
];

function IssueDetailsStep({
  serviceType,
  onServiceChange,
  issueDescription,
  onDescriptionChange,
  hasSelectedService,
}: IssueDetailsStepProps) {
  return (
    <section className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-xl font-semibold text-[#007BFF] mb-4">
          What do you need help with?
        </h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {SERVICES.map((service) => {
            const isActive = service === serviceType && hasSelectedService;
            return (
              <button
                key={service}
                type="button"
                onClick={() => onServiceChange(service)}
                className={[
                  "rounded-xl border px-4 py-3 text-left transition",
                  isActive
                    ? "border-[#007BFF] bg-[#007BFF]/10 text-[#007BFF] font-semibold"
                    : "border-gray-300 bg-white hover:border-[#007BFF] hover:bg-[#007BFF]/5 text-gray-700",
                ].join(" ")}
              >
                {service}
              </button>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
        <label className="text-sm font-medium text-gray-700">
          Describe the issue *
          <textarea
            className="mt-2 w-full rounded-lg border border-gray-200 px-3 py-2 focus:border-[#007BFF] focus:outline-none"
            rows={4}
            value={issueDescription}
            onChange={(event) => onDescriptionChange(event.target.value)}
            placeholder="Tell us what you'd like help with..."
            maxLength={500}
            required
          />
          <span className="text-xs text-gray-500 block text-right mt-1">
            {issueDescription.length}/500
          </span>
        </label>
      </div>

    </section>
  );
}

export default IssueDetailsStep;

