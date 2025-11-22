import { Resend } from "resend";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);
const ADMIN_EMAIL = "sprattsj@gmail.com";

// Store magic link tokens (in production, use a database or Redis)
const magicLinkTokens = new Map();

// Token expires after 15 minutes
const TOKEN_EXPIRY = 15 * 60 * 1000;

/**
 * Generate a secure random token
 */
const generateToken = (): string => {
  return crypto.randomBytes(32).toString("hex");
};

/**
 * Send magic link email
 */
export const sendMagicLinkEmail = async (email: string): Promise<{ success: boolean; message: string }> => {
  // Only allow admin email
  if (email !== ADMIN_EMAIL) {
    return { success: false, message: "Unauthorized email address" };
  }

  try {
    const token = generateToken();
    const expiryTime = Date.now() + TOKEN_EXPIRY;
    
    // Store token with expiry
    magicLinkTokens.set(token, {
      email,
      createdAt: Date.now(),
      expiresAt: expiryTime,
      used: false,
    });

    // Generate magic link URL
    const baseUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    const magicLink = `${baseUrl}/admin/login?token=${token}`;

    // Send email via Resend
    const subject = "Your BlueWave Tech Help Admin Login Link";
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #007BFF; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0;">🔐 Admin Login</h1>
        </div>
        
        <div style="background: white; padding: 30px; border: 1px solid #e5e7eb; border-top: none;">
          <p style="font-size: 16px; color: #1f2937;">
            Click the button below to log in to your BlueWave Tech Help admin dashboard.
          </p>
          
          <div style="margin: 30px 0; text-align: center;">
            <a href="${magicLink}" 
               style="background: #007BFF; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: 600;">
              Log In to Admin Dashboard
            </a>
          </div>
          
          <p style="font-size: 14px; color: #6b7280; margin-top: 30px;">
            This link will expire in 15 minutes for security reasons.
          </p>
          
          <p style="font-size: 14px; color: #6b7280;">
            If you didn't request this login link, please ignore this email.
          </p>
        </div>
      </div>
    `;

    const text = `
Admin Login - BlueWave Tech Help

Click the link below to log in to your admin dashboard:

${magicLink}

This link will expire in 15 minutes.

If you didn't request this login link, please ignore this email.
    `.trim();

    const { data, error } = await resend.emails.send({
      from: "BlueWave Tech Help <onboarding@resend.dev>",
      to: [email],
      subject,
      html,
      text,
    });

    if (error) {
      console.error("Resend error:", error);
      return { success: false, message: error.message || "Failed to send email" };
    }

    console.log("Magic link email sent successfully:", data);
    return { success: true, message: "Magic link sent to your email. Check your inbox!" };
  } catch (error) {
    console.error("Failed to send magic link email:", error);
    return { success: false, message: "Failed to send magic link email" };
  }
};

/**
 * Verify magic link token
 */
export const verifyMagicLinkToken = (token: string): { valid: boolean; email?: string } => {
  const tokenData = magicLinkTokens.get(token);

  if (!tokenData) {
    return { valid: false };
  }

  // Check if token has expired
  if (Date.now() > tokenData.expiresAt) {
    magicLinkTokens.delete(token);
    return { valid: false };
  }

  // Check if token has been used
  if (tokenData.used) {
    return { valid: false };
  }

  // Mark token as used
  tokenData.used = true;
  
  // Clean up old tokens periodically (simple cleanup)
  if (magicLinkTokens.size > 100) {
    const now = Date.now();
    for (const [key, value] of magicLinkTokens.entries()) {
      if (now > value.expiresAt) {
        magicLinkTokens.delete(key);
      }
    }
  }

  return { valid: true, email: tokenData.email };
};

