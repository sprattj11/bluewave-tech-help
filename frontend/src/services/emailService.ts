import type { Booking } from "../types/admin";

const ADMIN_EMAIL = "sprattsj@gmail.com";

/**
 * Email notification service for admin
 * Currently logs to console - replace with real email service (SendGrid, Resend, etc.)
 */

/**
 * Send email notification to admin about new booking request
 */
export const sendNewBookingNotificationEmail = async (
  booking: Booking,
): Promise<void> => {
  // Simulate API call latency
  await new Promise((resolve) => setTimeout(resolve, 600));

  const bookingDate = booking.date
    ? new Date(booking.date).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Date TBD";

  const subject = `New Booking Request: ${booking.contactInfo.fullName} - ${booking.serviceType}`;

  const message = `
📅 NEW BOOKING REQUEST - BlueWave Tech Help

Customer: ${booking.contactInfo.fullName}
Email: ${booking.contactInfo.email}
Phone: ${booking.contactInfo.phone}
${booking.contactInfo.address ? `Address: ${booking.contactInfo.address}` : ""}

Service: ${booking.serviceType}
Date: ${bookingDate}
Time: ${booking.timeSlot}

Issue Description:
${booking.issueDescription}

---
Booking ID: ${booking.id}
Status: ${booking.status.toUpperCase()}

Action Required: Please log in to approve or reject this booking.
Admin Dashboard: ${window.location.origin}/admin/bookings
  `.trim();

  // Convert text message to HTML
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #007BFF;">📅 New Booking Request - BlueWave Tech Help</h2>
      
      <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0;">Customer Information</h3>
        <p><strong>Name:</strong> ${booking.contactInfo.fullName}</p>
        <p><strong>Email:</strong> ${booking.contactInfo.email}</p>
        <p><strong>Phone:</strong> ${booking.contactInfo.phone}</p>
        ${booking.contactInfo.address ? `<p><strong>Address:</strong> ${booking.contactInfo.address}</p>` : ""}
      </div>

      <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0;">Appointment Details</h3>
        <p><strong>Service:</strong> ${booking.serviceType}</p>
        <p><strong>Date:</strong> ${bookingDate}</p>
        <p><strong>Time:</strong> ${booking.timeSlot}</p>
      </div>

      <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0;">Issue Description</h3>
        <p style="white-space: pre-wrap;">${booking.issueDescription}</p>
      </div>

      <div style="margin: 20px 0; padding: 15px; background: #e5f0ff; border-left: 4px solid #007BFF;">
        <p style="margin: 0;"><strong>Booking ID:</strong> ${booking.id}</p>
        <p style="margin: 5px 0 0 0;"><strong>Status:</strong> ${booking.status.toUpperCase()}</p>
      </div>

      <div style="margin: 30px 0; text-align: center;">
        <a href="${typeof window !== "undefined" ? window.location.origin : ""}/admin/bookings" 
           style="background: #007BFF; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
          View Booking in Admin Dashboard
        </a>
      </div>
    </div>
  `;

  // Send email via Resend API
  try {
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";
    
    const response = await fetch(`${API_URL}/api/send-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: ADMIN_EMAIL,
        subject,
        html,
        text: message,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to send email");
    }

    const result = await response.json();
    console.log("✅ Email sent successfully:", result);
  } catch (error) {
    console.error("❌ Failed to send email:", error);
    // Fallback: log to console if API fails
    console.log("=".repeat(60));
    console.log("📧 EMAIL NOTIFICATION TO ADMIN (Fallback)");
    console.log("=".repeat(60));
    console.log(`To: ${ADMIN_EMAIL}`);
    console.log(`Subject: ${subject}`);
    console.log("\n" + message);
    console.log("=".repeat(60));
  }

  // Trigger browser notification as backup
  if ("Notification" in window && Notification.permission === "granted") {
    new Notification("New Booking Request", {
      body: `${booking.contactInfo.fullName} - ${booking.serviceType}`,
      icon: "/vite.svg",
      tag: `booking-${booking.id}`,
    });
  }
};

/**
 * Send booking confirmation email to customer when booking is approved
 */
export const sendBookingConfirmationEmail = async (
  booking: Booking,
): Promise<void> => {
  const bookingDate = booking.date
    ? new Date(booking.date).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "TBD";

  const subject = `Booking Confirmed: ${booking.serviceType} on ${bookingDate}`;

  const textMessage = `
Hi ${booking.contactInfo.fullName},

Great news! Your appointment has been approved.

📅 Date: ${bookingDate}
⏰ Time: ${booking.timeSlot}
📍 Service: ${booking.serviceType}

Issue Description:
${booking.issueDescription}

We look forward to helping you!

Best regards,
BlueWave Tech Help
Phone: 702-994-0967
Email: sprattsj@gmail.com
  `.trim();

  // Create HTML email template
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #007BFF; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0;">✅ Booking Confirmed!</h1>
      </div>
      
      <div style="background: white; padding: 30px; border: 1px solid #e5e7eb; border-top: none;">
        <p style="font-size: 16px; color: #1f2937;">
          Hi ${booking.contactInfo.fullName},
        </p>
        
        <p style="font-size: 16px; color: #1f2937;">
          Great news! Your appointment has been approved.
        </p>

        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 25px 0;">
          <h2 style="margin-top: 0; color: #007BFF;">Appointment Details</h2>
          <p style="margin: 10px 0;"><strong>📅 Date:</strong> ${bookingDate}</p>
          <p style="margin: 10px 0;"><strong>⏰ Time:</strong> ${booking.timeSlot}</p>
          <p style="margin: 10px 0;"><strong>📍 Service:</strong> ${booking.serviceType}</p>
        </div>

        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 25px 0;">
          <h3 style="margin-top: 0; color: #007BFF;">Issue Description</h3>
          <p style="white-space: pre-wrap; color: #4b5563;">${booking.issueDescription}</p>
        </div>

        <p style="font-size: 16px; color: #1f2937;">
          We look forward to helping you!
        </p>

        <p style="font-size: 16px; color: #1f2937; margin-top: 30px;">
          Best regards,<br>
          <strong>BlueWave Tech Help</strong><br>
          📞 Phone: <a href="tel:702-994-0967">702-994-0967</a><br>
          📧 Email: <a href="mailto:sprattsj@gmail.com">sprattsj@gmail.com</a>
        </p>
      </div>
      
      <div style="background: #f9fafb; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb; border-top: none; color: #6b7280; font-size: 12px;">
        <p style="margin: 0;">If you need to reschedule or have questions, please contact us.</p>
      </div>
    </div>
  `;

  // Send email via Resend API
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";
  
  console.log(`📧 Attempting to send confirmation email to ${booking.contactInfo.email}...`);
  console.log(`📧 API URL: ${API_URL}/api/send-email`);
  
  try {
    const response = await fetch(`${API_URL}/api/send-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: booking.contactInfo.email,
        subject,
        html,
        text: textMessage,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: `HTTP ${response.status}: ${response.statusText}` }));
      console.error(`❌ API Error Response:`, errorData);
      throw new Error(errorData.error || `Failed to send email: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    console.log(`✅ Confirmation email sent successfully to ${booking.contactInfo.email}:`, result);
    return result;
  } catch (error) {
    console.error(`❌ Failed to send confirmation email to ${booking.contactInfo.email}:`, error);
    // Log detailed error for debugging
    if (error instanceof Error) {
      console.error(`Error message: ${error.message}`);
      console.error(`Error stack:`, error.stack);
    }
    // Fallback: log to console if API fails
    console.log("=".repeat(60));
    console.log(`📧 CONFIRMATION EMAIL TO CUSTOMER (Fallback - Email not sent)`);
    console.log("=".repeat(60));
    console.log(`To: ${booking.contactInfo.email}`);
    console.log(`Subject: ${subject}`);
    console.log("\n" + textMessage);
    console.log("=".repeat(60));
    // Re-throw error so the UI can handle it
    throw error;
  }
};

