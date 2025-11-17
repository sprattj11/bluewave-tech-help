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
  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 border border-gray-100">
      <h3 className="text-lg font-semibold mb-4 text-[#007BFF]">
        Pick a Time
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {slots.map((slot) => {
          const isSelected = slot === selectedSlot;
          return (
            <button
              key={slot}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(slot)}
              className={[
                "py-2 px-3 rounded-xl border text-sm font-medium transition",
                isSelected
                  ? "bg-[#007BFF] text-white border-[#007BFF]"
                  : "border-gray-200 text-gray-700 hover:border-[#007BFF]",
                disabled ? "opacity-50 cursor-not-allowed" : "",
              ].join(" ")}
            >
              {slot}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default TimeSlotPicker;

