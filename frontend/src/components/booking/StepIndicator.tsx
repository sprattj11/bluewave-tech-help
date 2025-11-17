interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
}

function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <ol className="flex items-center gap-4 mb-8 flex-wrap">
      {steps.map((step, index) => {
        const isActive = index === currentStep;
        const isComplete = index < currentStep;
        return (
          <li key={step} className="flex items-center text-sm">
            <span
              className={[
                "w-8 h-8 rounded-full flex items-center justify-center mr-2 font-semibold",
                isActive
                  ? "bg-[#007BFF] text-white"
                  : isComplete
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-200 text-gray-600",
              ].join(" ")}
            >
              {index + 1}
            </span>
            <span
              className={isActive ? "text-[#007BFF]" : "text-gray-600"}
            >
              {step}
            </span>
            {index < steps.length - 1 && (
              <span className="mx-3 text-gray-300">—</span>
            )}
          </li>
        );
      })}
    </ol>
  );
}

export default StepIndicator;

