import express from "express";
import cors from "cors";
import { Resend } from "resend";
import dotenv from "dotenv";
import { sendMagicLinkEmail, verifyMagicLinkToken } from "./auth.js";

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Check if API key is provided
if (!process.env.RESEND_API_KEY) {
  console.error("❌ ERROR: RESEND_API_KEY not found in .env file");
  console.error("Please create a .env file in the backend directory with:");
  console.error("RESEND_API_KEY=re_your_api_key_here");
  process.exit(1);
}

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

app.use(cors());
app.use(express.json());

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Send email endpoint
app.post("/api/send-email", async (req, res) => {
  try {
    const { to, subject, html, text } = req.body;

    if (!to || !subject || (!html && !text)) {
      return res.status(400).json({
        error: "Missing required fields: to, subject, and html/text",
      });
    }

    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: "BlueWave Tech Help <onboarding@resend.dev>", // Change this to your verified domain
      to: [to],
      subject,
      html: html || `<pre>${text}</pre>`,
      text: text || html?.replace(/<[^>]*>/g, "") || "",
    });

    if (error) {
      console.error("Resend error:", error);
      return res.status(400).json({ error: error.message });
    }

    console.log("Email sent successfully:", data);
    return res.json({ success: true, data });
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ error: "Failed to send email" });
  }
});

// Magic link authentication endpoints
app.post("/api/auth/magic-link", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const result = await sendMagicLinkEmail(email);
    
    if (result.success) {
      return res.json({ success: true, message: result.message });
    } else {
      return res.status(400).json({ error: result.message });
    }
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ error: "Failed to send magic link" });
  }
});

app.post("/api/auth/verify-magic-link", async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ error: "Token is required", valid: false });
    }

    const result = verifyMagicLinkToken(token);
    
    if (result.valid) {
      return res.json({ valid: true, email: result.email });
    } else {
      return res.status(400).json({ valid: false, error: "Invalid or expired token" });
    }
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ error: "Failed to verify token", valid: false });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Email API server running on http://localhost:${PORT}`);
  console.log(`📧 Resend API key configured: ${process.env.RESEND_API_KEY ? "Yes" : "No"}`);
  console.log(`🔐 Magic link authentication enabled`);
});

