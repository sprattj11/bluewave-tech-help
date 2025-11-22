# Backend Email & Authentication API

Express.js API server for handling email notifications and magic link authentication for BlueWave Tech Help.

## 🚀 Features

- **Email Service**: Send emails via Resend API
- **Magic Link Authentication**: Passwordless login system
- **Booking Notifications**: Automatic email alerts for new bookings
- **Confirmation Emails**: Send booking confirmations to customers
- **CORS Enabled**: Configured for frontend integration

## 🛠️ Tech Stack

- **Node.js** - Runtime environment
- **Express** - Web framework
- **Resend** - Email service provider
- **dotenv** - Environment variable management
- **crypto** - Secure token generation

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Resend API key ([Get one here](https://resend.com))

## 🏃 Getting Started

### 1. Installation

```bash
cd backend
npm install
```

### 2. Environment Configuration

Create a `.env` file in the `backend/` directory:

```env
RESEND_API_KEY=re_your_api_key_here
PORT=3001
FRONTEND_URL=http://localhost:5173
```

**Required:**
- `RESEND_API_KEY` - Your Resend API key from [resend.com](https://resend.com)

**Optional:**
- `PORT` - Server port (defaults to 3001)
- `FRONTEND_URL` - Frontend URL for magic links (defaults to http://localhost:5173)

### 3. Start the Server

```bash
npm run dev
```

You should see:
```
🚀 Email API server running on http://localhost:3001
📧 Resend API key configured: Yes
🔐 Magic link authentication enabled
```

## 📡 API Endpoints

### Health Check

**GET** `/health`

Check if the server is running.

**Response:**
```json
{
  "status": "ok"
}
```

### Send Email

**POST** `/api/send-email`

Send an email via Resend.

**Request Body:**
```json
{
  "to": "email@example.com",
  "subject": "Email Subject",
  "html": "<h1>HTML content</h1>",
  "text": "Plain text content"
}
```

**Response:**
```json
{
  "success": true,
  "data": { ... }
}
```

**Error Response:**
```json
{
  "error": "Error message"
}
```

### Magic Link Authentication

**POST** `/api/auth/magic-link`

Request a magic link to be sent to admin email.

**Request Body:**
```json
{
  "email": "sprattsj@gmail.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Magic link sent to your email. Check your inbox!"
}
```

**Security:**
- Only accepts admin email (`sprattsj@gmail.com`)
- Token expires after 15 minutes
- Each token can only be used once

**POST** `/api/auth/verify-magic-link`

Verify a magic link token.

**Request Body:**
```json
{
  "token": "abc123..."
}
```

**Response:**
```json
{
  "valid": true,
  "email": "sprattsj@gmail.com"
}
```

**Error Response:**
```json
{
  "valid": false,
  "error": "Invalid or expired token"
}
```

## 🔐 Magic Link Authentication Flow

1. **User requests login link:**
   - Frontend calls `POST /api/auth/magic-link` with email
   - Backend generates secure token
   - Email sent with login link

2. **User clicks link:**
   - Link contains token: `/admin/login?token=abc123...`
   - Frontend calls `POST /api/auth/verify-magic-link`
   - Backend validates token (checks expiry, usage)
   - If valid: Frontend stores session in localStorage
   - User is logged in

3. **Security Features:**
   - Tokens expire after 15 minutes
   - Each token can only be used once
   - Only admin email can receive magic links
   - Cryptographically random token generation

## 📧 Email Templates

### Booking Notification (Admin)
Sent when a customer creates a new booking.

**Recipient:** Admin email (`sprattsj@gmail.com`)
**Format:** HTML email with booking details
**Content:** Customer info, service type, date/time, issue description

### Booking Confirmation (Customer)
Sent when admin approves a booking.

**Recipient:** Customer email
**Format:** HTML email with confirmation
**Content:** Appointment details, service info, contact information

### Magic Link (Admin)
Sent for passwordless login.

**Recipient:** Admin email (`sprattsj@gmail.com`)
**Format:** HTML email with login button
**Content:** Secure login link (expires in 15 minutes)

## 🔧 Configuration

### Change Admin Email

Edit `backend/auth.js`:
```javascript
const ADMIN_EMAIL = "your-email@gmail.com";
```

Also update in `frontend/src/services/magicLinkService.ts`:
```typescript
const ADMIN_EMAIL = "your-email@gmail.com";
```

### Change Magic Link Expiration

Edit `backend/auth.js`:
```javascript
const TOKEN_EXPIRY = 15 * 60 * 1000; // Change 15 to desired minutes
```

### Change Email "From" Address

Edit `backend/auth.js` and `backend/server.js`:

For production with verified domain:
```javascript
from: "BlueWave Tech Help <notifications@yourdomain.com>"
```

For development/testing:
```javascript
from: "BlueWave Tech Help <onboarding@resend.dev>"
```

**Important:** You must verify your domain in Resend dashboard to use a custom "from" address.

## 🐛 Troubleshooting

### "RESEND_API_KEY not found"
- Check that `.env` file exists in `backend/` directory
- Verify API key is correctly formatted (starts with `re_`)
- Ensure no spaces around the `=` sign

### Port Already in Use
```bash
# Kill process on port 3001
lsof -ti:3001 | xargs kill -9

# Or use different port in .env
PORT=3002
```

### Emails Not Sending
- Check Resend API key is valid
- Verify Resend account has credits
- Check backend console for error messages
- Verify email addresses are correct
- Check spam folder if emails sent but not received

### Magic Link Not Working
- Verify token hasn't expired (15 minutes)
- Check token hasn't been used already (one-time use)
- Ensure email matches admin email exactly
- Check backend logs for error messages

## 📁 Project Structure

```
backend/
├── server.js          # Express server and email endpoints
├── auth.js            # Magic link authentication logic
├── .env               # Environment variables (not in git)
├── .env.example       # Example environment file
├── package.json       # Dependencies
└── README.md          # This file
```

## 🔒 Security Notes

**Development:**
- Tokens stored in memory (lost on server restart)
- No database required for basic functionality

**Production Recommendations:**
- Use database (PostgreSQL, MongoDB) for token storage
- Add rate limiting to prevent abuse
- Use Redis for token storage (better scalability)
- Enable HTTPS for production
- Add request validation and sanitization
- Implement logging and monitoring

## 📄 Documentation

- [Main README](../README.md) - Project overview
- [Magic Link Auth Guide](../docs/MAGIC_LINK_AUTH.md) - Detailed authentication guide
- [Email/SMS Setup Guide](../docs/EMAIL_SMS_SETUP.md) - Email and SMS configuration
- [Resend Documentation](https://resend.com/docs) - Official Resend API docs

## 📝 License

Private project - All rights reserved

---

**BlueWave Tech Help** - Backend API Server
