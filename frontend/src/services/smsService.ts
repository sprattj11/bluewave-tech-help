/**
 * SMS Notification Service
 * 
 * TODO: Implement with Twilio or similar SMS service
 * 
 * Example integration with Twilio:
 * 
 * 1. Install Twilio SDK: npm install twilio
 * 2. Set up backend API endpoint to handle SMS sending
 * 3. Use Twilio API:
 * 
 * import twilio from 'twilio';
 * 
 * const client = twilio(
 *   process.env.TWILIO_ACCOUNT_SID,
 *   process.env.TWILIO_AUTH_TOKEN
 * );
 * 
 * export const sendSMSNotification = async (
 *   phoneNumber: string,
 *   message: string
 * ): Promise<void> => {
 *   await client.messages.create({
 *     body: message,
 *     to: phoneNumber,
 *     from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio number
 *   });
 * };
 * 
 * Alternative: Use a service like Resend (supports SMS) or AWS SNS
 */

import type { Booking } from "../types/admin";

const ADMIN_PHONE = "+17029940967"; // From PRD: 702-994-0967

/**
 * Send SMS notification to admin about new booking
 * Currently logs to console - implement with real SMS service
 */
export const sendNewBookingSMS = async (booking: Booking): Promise<void> => {
  const bookingDate = booking.date
    ? new Date(booking.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    : "TBD";

  const message = `📅 New Booking: ${booking.contactInfo.fullName} - ${booking.serviceType} on ${bookingDate} at ${booking.timeSlot}. Login to review.`;

  // TODO: Replace with real SMS service (Twilio, AWS SNS, etc.)
  // Example API call:
  // await fetch('/api/send-sms', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({
  //     to: ADMIN_PHONE,
  //     message: message
  //   })
  // });

  console.log("=".repeat(60));
  console.log("📱 SMS NOTIFICATION TO ADMIN");
  console.log("=".repeat(60));
  console.log(`To: ${ADMIN_PHONE}`);
  console.log(`Message: ${message}`);
  console.log("=".repeat(60));
  console.log("⚠️  SMS service not configured - implement with Twilio or similar");
  console.log("=".repeat(60));
};

