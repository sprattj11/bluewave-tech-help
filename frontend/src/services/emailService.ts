import type { Booking } from "../types/admin";

/**
 * Placeholder email service.
 * Replace with a real email provider (SendGrid, Resend, etc.) when backend is available.
 */
export const sendBookingConfirmationEmail = async (
  booking: Booking,
): Promise<void> => {
  // Simulate API call latency
  await new Promise((resolve) => setTimeout(resolve, 600));

  const message = `
Confirmation email sent to ${booking.contactInfo.email}

Hi ${booking.contactInfo.fullName},

Your appointment for ${booking.serviceType} has been approved!
Date: ${booking.date ? new Date(booking.date).toLocaleDateString() : "TBD"}
Time: ${booking.timeSlot}
Preferred contact: ${booking.preferredContact}

Description:
${booking.issueDescription}
  `.trim();

  console.info(message);
};

