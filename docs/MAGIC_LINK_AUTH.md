# Magic Link Authentication Guide

## What is Magic Link Authentication?

Magic link authentication is a **passwordless login system**. Instead of remembering and typing a password, you:

1. Enter your email address
2. Receive an email with a secure login link
3. Click the link to automatically log in

**Benefits:**
- ✅ More secure (no passwords to steal or forget)
- ✅ Easier to use (no password to remember)
- ✅ Email-based (already have your email)
- ✅ Links expire after 15 minutes for security

## How to Use Magic Link Login

### Step 1: Go to Admin Login Page

Visit: `http://localhost:5173/admin/login`

Or on your deployed site: `https://yourdomain.com/admin/login`

### Step 2: Enter Your Email

- The email field is pre-filled with `sprattsj@gmail.com` (your admin email)
- If needed, you can change it, but **only your admin email will work**

### Step 3: Click "Send Login Link"

- Click the **"Send Login Link"** button
- You'll see a success message: "Magic link sent to your email. Check your inbox!"

### Step 4: Check Your Email

- Open your email inbox (check spam folder if needed)
- Look for an email from **"BlueWave Tech Help <onboarding@resend.dev>"**
- Subject: **"Your BlueWave Tech Help Admin Login Link"**

### Step 5: Click the Login Link

- Click the **"Log In to Admin Dashboard"** button in the email
- OR copy and paste the login link into your browser

### Step 6: You're Logged In!

- After clicking the link, you'll be automatically logged in
- You'll be redirected to the Admin Dashboard
- Your session lasts for 24 hours

## Important Notes

### ⏰ Link Expiration
- **Magic links expire after 15 minutes** for security
- If the link expires, request a new one

### 🔐 Security
- **Only your admin email** (`sprattsj@gmail.com`) can receive magic links
- Each link can only be used **once**
- Links are unique and time-limited

### 📧 Email Not Arriving?

1. **Check spam/junk folder** - Sometimes emails end up there
2. **Check Resend dashboard** - See if email was sent (logs in backend)
3. **Backend running?** - Make sure your backend server is running on port 3001
4. **Check console logs** - Backend will show if email was sent successfully

### 🔄 Request New Link

If you need a new link:
- Just go back to `/admin/login`
- Enter your email again
- Click "Send Login Link"
- A new link will be sent (old link won't work anymore)

## How It Works Behind the Scenes

1. **Request Magic Link:**
   - Frontend calls: `POST /api/auth/magic-link`
   - Backend generates a secure random token
   - Token is stored with 15-minute expiration
   - Email is sent with link: `https://yourdomain.com/admin/login?token=abc123...`

2. **Click Login Link:**
   - Browser opens: `/admin/login?token=abc123...`
   - Frontend calls: `POST /api/auth/verify-magic-link`
   - Backend verifies token (checks if valid, not expired, not used)
   - If valid: Creates session in localStorage
   - Redirects to admin dashboard

3. **Session Management:**
   - Session stored in browser localStorage
   - Valid for 24 hours
   - Automatically expires after 24 hours

## Troubleshooting

### "Failed to send magic link"
- **Check backend server** is running: `npm run dev` in `backend/` folder
- **Check Resend API key** in `backend/.env` file
- **Check console logs** for error messages

### "Invalid or expired token"
- Link expired (15 minutes old) - Request a new one
- Link already used - Each link can only be used once
- Wrong token - Make sure you clicked the link from the most recent email

### Can't access admin pages
- **Check if logged in** - Visit `/admin/login` to see if you need to log in
- **Session expired** - After 24 hours, you'll need to log in again
- **Clear browser data** - If stuck, clear localStorage and try again

## Configuration

### Change Admin Email

Edit `backend/auth.js`:
```javascript
const ADMIN_EMAIL = "your-email@gmail.com";
```

Also update in `frontend/src/services/magicLinkService.ts`:
```typescript
const ADMIN_EMAIL = "your-email@gmail.com";
```

### Change Link Expiration

Edit `backend/auth.js`:
```javascript
const TOKEN_EXPIRY = 15 * 60 * 1000; // Change 15 to desired minutes
```

### Change Session Duration

Edit `frontend/src/services/authService.ts`:
```typescript
const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000; // Change 24 to desired hours
```

## Comparison: Old vs New

### Old Password System:
- ❌ Had to remember password
- ❌ Password could be weak
- ❌ Typing password on mobile was annoying
- ✅ Simple to implement

### New Magic Link System:
- ✅ No password to remember
- ✅ More secure (email-based)
- ✅ Easier on mobile (just click link)
- ✅ Professional and modern
- ✅ Matches your PRD requirements

## Testing

To test magic link authentication:

1. **Start backend server:**
   ```bash
   cd backend
   npm run dev
   ```

2. **Start frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

3. **Visit login page:**
   - Go to `http://localhost:5173/admin/login`
   - Enter email
   - Click "Send Login Link"

4. **Check email:**
   - Check your inbox at `sprattsj@gmail.com`
   - Click the login link
   - Should automatically log in

## Production Setup

For production, make sure:

1. **Update frontend URL** in `backend/.env`:
   ```
   FRONTEND_URL=https://yourdomain.com
   ```

2. **Update email "from" address** in `backend/auth.js`:
   ```javascript
   from: "BlueWave Tech Help <notifications@yourdomain.com>"
   ```
   (Use your verified domain in Resend)

3. **Update SEO URLs** in `frontend/index.html`:
   - Replace `https://bluewave-tech-help.com` with your actual domain

## Security Best Practices

- ✅ Links expire after 15 minutes
- ✅ Each link can only be used once
- ✅ Only admin email can receive links
- ✅ Session expires after 24 hours
- ✅ Tokens are cryptographically random
- ⚠️ **In production:** Use HTTPS to encrypt links in transit
- ⚠️ **In production:** Rate limit magic link requests to prevent abuse

