/**
 * Magic Link Authentication Service
 * Sends magic link emails for passwordless login
 */

const ADMIN_EMAIL = "sprattsj@gmail.com";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

/**
 * Request a magic link to be sent to admin email
 */
export const requestMagicLink = async (): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await fetch(`${API_URL}/api/auth/magic-link`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: ADMIN_EMAIL,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to send magic link");
    }

    const result = await response.json();
    return { success: true, message: result.message || "Magic link sent to your email" };
  } catch (error) {
    console.error("Failed to request magic link:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to send magic link",
    };
  }
};

/**
 * Verify magic link token and authenticate
 */
export const verifyMagicLink = async (token: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/api/auth/verify-magic-link`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
      }),
    });

    if (!response.ok) {
      return false;
    }

    const result = await response.json();
    if (result.valid) {
      // Store authentication session
      const session = {
        authenticated: true,
        timestamp: Date.now(),
      };
      localStorage.setItem("bluewave_admin_session", JSON.stringify(session));
      return true;
    }

    return false;
  } catch (error) {
    console.error("Failed to verify magic link:", error);
    return false;
  }
};

