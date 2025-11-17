import { useEffect, useState } from "react";
import {
  getWeeklyAvailability,
  saveWeeklyAvailability,
  getBlockedDates,
  addBlockedDate,
  removeBlockedDate,
} from "../../services/storageService";
import type { WeeklyAvailability, BlockedDate } from "../../types/admin";
import { format, parse } from "date-fns";

const DAYS = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;

const DAY_LABELS: Record<(typeof DAYS)[number], string> = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
};

export default function AdminAvailability() {
  const [availability, setAvailability] = useState<WeeklyAvailability>(
    getWeeklyAvailability(),
  );
  const [blockedDates, setBlockedDates] = useState<BlockedDate[]>([]);
  const [newBlockedDate, setNewBlockedDate] = useState("");
  const [newBlockedReason, setNewBlockedReason] = useState("");

  useEffect(() => {
    setBlockedDates(getBlockedDates());
  }, []);

  const handleTimeSlotChange = (
    day: keyof WeeklyAvailability,
    index: number,
    field: "start" | "end",
    value: string,
  ) => {
    const updated = { ...availability };
    updated[day] = [...updated[day]];
    updated[day][index] = { ...updated[day][index], [field]: value };
    setAvailability(updated);
  };

  const addTimeSlot = (day: keyof WeeklyAvailability) => {
    const updated = { ...availability };
    updated[day] = [...updated[day], { start: "09:00", end: "17:00" }];
    setAvailability(updated);
  };

  const removeTimeSlot = (day: keyof WeeklyAvailability, index: number) => {
    const updated = { ...availability };
    updated[day] = updated[day].filter((_, i) => i !== index);
    setAvailability(updated);
  };

  const handleSave = () => {
    saveWeeklyAvailability(availability);
    alert("Availability saved successfully!");
  };

  const handleAddBlockedDate = () => {
    if (!newBlockedDate) return;
    addBlockedDate(newBlockedDate, newBlockedReason || undefined);
    setBlockedDates(getBlockedDates());
    setNewBlockedDate("");
    setNewBlockedReason("");
  };

  const handleRemoveBlockedDate = (id: string) => {
    removeBlockedDate(id);
    setBlockedDates(getBlockedDates());
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Availability Management
      </h1>

      {/* Weekly Availability */}
      <div className="bg-white rounded-lg shadow mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Weekly Hours
          </h2>
        </div>
        <div className="p-6 space-y-6">
          {DAYS.map((day) => (
            <div key={day} className="border-b border-gray-200 pb-6 last:border-0">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {DAY_LABELS[day]}
                </h3>
                <button
                  onClick={() => addTimeSlot(day)}
                  className="text-[#007BFF] hover:underline text-sm font-medium"
                >
                  + Add Time Slot
                </button>
              </div>
              {availability[day].length === 0 ? (
                <p className="text-gray-500 text-sm">No availability set</p>
              ) : (
                <div className="space-y-3">
                  {availability[day].map((slot, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg"
                    >
                      <div className="flex items-center space-x-2">
                        <label className="text-sm text-gray-700">From:</label>
                        <input
                          type="time"
                          value={slot.start}
                          onChange={(e) =>
                            handleTimeSlotChange(day, index, "start", e.target.value)
                          }
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007BFF]"
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <label className="text-sm text-gray-700">To:</label>
                        <input
                          type="time"
                          value={slot.end}
                          onChange={(e) =>
                            handleTimeSlotChange(day, index, "end", e.target.value)
                          }
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007BFF]"
                        />
                      </div>
                      <button
                        onClick={() => removeTimeSlot(day, index)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="pt-4">
            <button
              onClick={handleSave}
              className="button-primary px-6 py-2 rounded-lg font-semibold text-white"
            >
              Save Weekly Availability
            </button>
          </div>
        </div>
      </div>

      {/* Blocked Dates */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Blocked Dates</h2>
          <p className="text-sm text-gray-500 mt-1">
            Add dates when you're unavailable (holidays, vacations, etc.)
          </p>
        </div>
        <div className="p-6">
          <div className="flex space-x-4 mb-6">
            <input
              type="date"
              value={newBlockedDate}
              onChange={(e) => setNewBlockedDate(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007BFF]"
            />
            <input
              type="text"
              value={newBlockedReason}
              onChange={(e) => setNewBlockedReason(e.target.value)}
              placeholder="Reason (optional)"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007BFF]"
            />
            <button
              onClick={handleAddBlockedDate}
              className="button-primary px-6 py-2 rounded-lg font-semibold text-white"
            >
              Add Blocked Date
            </button>
          </div>

          {blockedDates.length === 0 ? (
            <p className="text-gray-500 text-sm">No blocked dates</p>
          ) : (
            <div className="space-y-2">
              {blockedDates.map((blocked) => (
                <div
                  key={blocked.id}
                  className="flex items-center justify-between bg-gray-50 p-4 rounded-lg"
                >
                  <div>
                    <div className="font-medium text-gray-900">
                      {format(parse(blocked.date, "yyyy-MM-dd", new Date()), "MMMM d, yyyy")}
                    </div>
                    {blocked.reason && (
                      <div className="text-sm text-gray-500">{blocked.reason}</div>
                    )}
                  </div>
                  <button
                    onClick={() => handleRemoveBlockedDate(blocked.id)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

