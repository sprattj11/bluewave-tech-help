import { format, isBefore, startOfDay } from "date-fns";
import type { WeeklyAvailability, TimeSlot as AvailabilityTimeSlot } from "../types/admin";
import { getWeeklyAvailability, getBlockedDates } from "../services/storageService";

export const formatBookingDate = (date: Date | null) => {
  if (!date) return "Select a date";
  return format(date, "EEEE, MMMM d");
};

export const formatBookingTime = (timeSlot: string) =>
  timeSlot ? timeSlot : "Select a time";

export const isPastDate = (date: Date) => {
  const today = startOfDay(new Date());
  return isBefore(startOfDay(date), today);
};

// Convert 24-hour time (HH:mm) to 12-hour display format (H:MM AM/PM)
const formatTimeSlot = (time24: string): string => {
  const [hours, minutes] = time24.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const displayHour = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
  return `${displayHour}:${minutes.toString().padStart(2, "0")} ${period}`;
};

// Generate time slots from availability time ranges (e.g., 09:00-17:00 becomes 30-minute slots)
const generateSlotsFromRange = (start: string, end: string): string[] => {
  const slots: string[] = [];
  const [startHour, startMin] = start.split(":").map(Number);
  const [endHour, endMin] = end.split(":").map(Number);
  
  // Convert to total minutes for easier comparison
  const startTotalMinutes = startHour * 60 + startMin;
  const endTotalMinutes = endHour * 60 + endMin;
  let currentTotalMinutes = startTotalMinutes;
  
  while (currentTotalMinutes < endTotalMinutes) {
    const hours = Math.floor(currentTotalMinutes / 60);
    const minutes = currentTotalMinutes % 60;
    const time24 = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
    slots.push(formatTimeSlot(time24));
    
    // Increment by 30 minutes
    currentTotalMinutes += 30;
    if (currentTotalMinutes >= 24 * 60) break;
  }
  
  return slots;
};

// Get day name from date (0 = Sunday, 1 = Monday, etc.)
// Normalize date to avoid timezone issues on mobile
const getDayName = (date: Date): keyof WeeklyAvailability => {
  // Create a new date using local date components to avoid timezone issues
  // This ensures we get the correct day of the week regardless of timezone
  const localDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const dayIndex = localDate.getDay();
  const dayNames: (keyof WeeklyAvailability)[] = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  return dayNames[dayIndex];
};

// Check if date is blocked
// Normalize date to avoid timezone issues
const isDateBlocked = (date: Date): boolean => {
  // Create normalized date using local date components
  const normalizedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const blockedDates = getBlockedDates();
  const dateStr = format(normalizedDate, "yyyy-MM-dd");
  return blockedDates.some((bd) => bd.date === dateStr);
};

// Generate time slots based on availability for a specific date
export const generateTimeSlotsForDate = (date: Date | null): string[] => {
  if (!date) {
    // Return default slots if no date selected
    return generateDefaultTimeSlots();
  }

  // Check if date is blocked
  if (isDateBlocked(date)) {
    return [];
  }

  const availability = getWeeklyAvailability();
  const dayName = getDayName(date);
  const dayAvailability = availability[dayName];

  if (!dayAvailability || dayAvailability.length === 0) {
    return [];
  }

  // Generate slots from all time ranges for this day
  const allSlots: string[] = [];
  dayAvailability.forEach((range: AvailabilityTimeSlot) => {
    const slots = generateSlotsFromRange(range.start, range.end);
    allSlots.push(...slots);
  });

  // Remove duplicates and sort
  return Array.from(new Set(allSlots)).sort((a, b) => {
    // Sort by converting back to 24-hour for comparison
    const timeA = convertTo24Hour(a);
    const timeB = convertTo24Hour(b);
    return timeA.localeCompare(timeB);
  });
};

// Convert 12-hour format back to 24-hour for sorting
const convertTo24Hour = (time12: string): string => {
  const [time, period] = time12.split(" ");
  const [hours, minutes] = time.split(":").map(Number);
  let hour24 = hours;
  if (period === "PM" && hours !== 12) hour24 = hours + 12;
  if (period === "AM" && hours === 12) hour24 = 0;
  return `${hour24.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
};

// Legacy function for backward compatibility
export const generateDefaultTimeSlots = () => {
  const slots: string[] = [];
  const startHour = 9;
  const endHour = 17;
  for (let hour = startHour; hour < endHour; hour++) {
    const displayHour = hour > 12 ? hour - 12 : hour;
    const period = hour >= 12 ? "PM" : "AM";
    const time = `${displayHour.toString().padStart(2, "0")}:00 ${period}`;
    slots.push(time);
  }
  return slots;
};

