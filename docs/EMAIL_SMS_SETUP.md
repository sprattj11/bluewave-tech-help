# Email & SMS Notification Setup Guide

## Current Implementation

The notification system currently logs email and SMS messages to the console. To enable real notifications, you'll need to integrate with email and/or SMS services.

## Email Setup (Recommended - Easiest)

### Option 1: Resend (Recommended)
1. Sign up at [resend.com](https://resend.com)
2. Get your API key
3. Create a backend API endpoint `/api/send-email`
4. Update `emailService.ts` to call your API

**Example Resend Integration:**
```typescript
// Backend API endpoint
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { to, subject, html } = await request.json();
  
  await resend.emails.send({
    from: 'BlueWave Tech Help <notifications@yourdomain.com>',
    to: [to],
    subject,
    html,
  });
  
  return Response.json({ success: true });
}
```

### Option 2: SendGrid
1. Sign up at [sendgrid.com](https://sendgrid.com)
2. Get your API key
3. Similar setup to Resend

### Option 3: AWS SES
1. Set up AWS SES
2. Verify your domain
3. Use AWS SDK to send emails

## SMS Setup (Phone Notifications)

### Option 1: Twilio (Recommended)
1. Sign up at [twilio.com](https://twilio.com)
2. Get your Account SID, Auth Token, and Phone Number
3. Create a backend API endpoint `/api/send-sms`
4. Update `smsService.ts` to call your API

**Twilio Setup Steps:**
```bash
npm install twilio
```

```typescript
// Backend API endpoint
import twilio from 'twilio';

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export async function POST(request: Request) {
  const { to, message } = await request.json();
  
  await client.messages.create({
    body: message,
    to: to,
    from: process.env.TWILIO_PHONE_NUMBER,
  });
  
  return Response.json({ success: true });
}
```

**Then update `smsService.ts`:**
```typescript
export const sendNewBookingSMS = async (booking: Booking): Promise<void> => {
  const message = `New booking: ${booking.contactInfo.fullName} - ${booking.serviceType}`;
  
  await fetch('/api/send-sms', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      to: ADMIN_PHONE,
      message: message
    })
  });
};
```

### Option 2: AWS SNS
- Use AWS Simple Notification Service for SMS

### Option 3: MessageBird
- Alternative SMS provider

## Quick Start (Email with Resend)

1. **Create backend API endpoint:**
```typescript
// api/send-email/route.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { to, subject, text, html } = await request.json();
    
    const { data, error } = await resend.emails.send({
      from: 'BlueWave Tech Help <onboarding@resend.dev>',
      to: [to],
      subject,
      html: html || `<pre>${text}</pre>`,
    });

    if (error) {
      return Response.json({ error }, { status: 400 });
    }

    return Response.json({ success: true, data });
  } catch (error) {
    return Response.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
```

2. **Update `emailService.ts`:**
```typescript
export const sendNewBookingNotificationEmail = async (
  booking: Booking,
): Promise<void> => {
  const subject = `New Booking: ${booking.contactInfo.fullName}`;
  const html = `
    <h2>New Booking Request</h2>
    <p><strong>Customer:</strong> ${booking.contactInfo.fullName}</p>
    <p><strong>Email:</strong> ${booking.contactInfo.email}</p>
    <p><strong>Phone:</strong> ${booking.contactInfo.phone}</p>
    <p><strong>Service:</strong> ${booking.serviceType}</p>
    <p><strong>Date:</strong> ${booking.date ? new Date(booking.date).toLocaleDateString() : 'TBD'}</p>
    <p><strong>Time:</strong> ${booking.timeSlot}</p>
  `;

  await fetch('/api/send-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      to: ADMIN_EMAIL,
      subject,
      html,
    }),
  });
};
```

3. **Add environment variables:**
```env
RESEND_API_KEY=re_xxxxx
```

## Testing

Currently, notifications are logged to the console. Check your browser's developer console to see:
- 📧 Email notifications (formatted)
- 📱 SMS notifications (formatted)

Once you integrate a real service, these will be sent to your actual email/phone.

