interface TimeSlotPickerProps {
  slots: string[];
  selectedSlot: string;
  onSelect: (slot: string) => void;
  disabled?: boolean;
}

function TimeSlotPicker({
  slots,
  selectedSlot,
  onSelect,
  disabled,
}: TimeSlotPickerProps) {
  if (!slots || slots.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-4 border border-gray-100">
        <h3 className="text-lg font-semibold mb-4 text-[#007BFF]">
          Pick a Time
        </h3>
        <p className="text-gray-600 text-sm">
          No available time slots for this date. Please select a different date.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 border border-gray-100 flex flex-col">
      <h3 className="text-lg font-semibold mb-4 text-[#007BFF]">
        Pick a Time
      </h3>
      {/* Scrollable container with better mobile support */}
      <div 
        className="grid grid-cols-2 sm:grid-cols-3 gap-3 overflow-y-auto overscroll-contain"
        style={{
          maxHeight: '400px',
          WebkitOverflowScrolling: 'touch', // Smooth scrolling on iOS
          scrollBehavior: 'smooth',
        }}
      >
        {slots.map((slot) => {
          const isSelected = slot === selectedSlot;
          return (
            <button
              key={slot}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(slot)}
              className={[
                "py-3 px-4 rounded-xl border text-sm font-medium transition min-h-[48px] touch-manipulation flex-shrink-0",
                isSelected
                  ? "bg-[#007BFF] text-white border-[#007BFF]"
                  : "border-gray-200 text-gray-700 hover:border-[#007BFF] active:bg-blue-50",
                disabled ? "opacity-50 cursor-not-allowed" : "",
              ].join(" ")}
            >
              {slot}
            </button>
          );
        })}
      </div>
      {slots.length > 6 && (
        <p className="text-xs text-gray-500 mt-3 text-center">
          {slots.length} time slots available - scroll to see all
        </p>
      )}
    </div>
  );
}

export default TimeSlotPicker;

