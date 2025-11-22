import type { Booking } from "../types/admin";
import { sendNewBookingNotificationEmail } from "./emailService";
// import { sendNewBookingSMS } from "./smsService"; // Uncomment when SMS is configured

const LAST_CHECKED_KEY = "bluewave_last_checked_bookings";

/**
 * Notify admin about new booking
 * Sends both email and SMS notifications
 */
export const notifyNewBooking = async (booking: Booking): Promise<void> => {
  // Send email notification to admin (primary method)
  await sendNewBookingNotificationEmail(booking);
  
  // Send SMS notification to admin (if configured)
  // Uncomment when SMS service is set up:
  // await sendNewBookingSMS(booking);
};

/**
 * Store the timestamp of last checked bookings
 */
export const updateLastCheckedTimestamp = (): void => {
  localStorage.setItem(LAST_CHECKED_KEY, Date.now().toString());
};

/**
 * Get the timestamp of last checked bookings
 */
export const getLastCheckedTimestamp = (): number => {
  const timestamp = localStorage.getItem(LAST_CHECKED_KEY);
  return timestamp ? parseInt(timestamp, 10) : 0;
};

/**
 * Get count of new bookings since last check
 */
export const getNewBookingsCount = (
  bookings: Booking[],
  lastChecked: number,
): number => {
  if (lastChecked === 0) return 0; // First time, don't show as "new"
  return bookings.filter((booking) => {
    const bookingTime = new Date(booking.createdAt).getTime();
    return booking.status === "pending" && bookingTime > lastChecked;
  }).length;
};

