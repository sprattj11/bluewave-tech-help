const ADMIN_SESSION_KEY = "bluewave_admin_session";

// Simple password-based auth (can be upgraded to magic link later)
const ADMIN_PASSWORD = "admin123"; // Change this in production!

export const login = (password: string): boolean => {
  if (password === ADMIN_PASSWORD) {
    const session = {
      authenticated: true,
      timestamp: Date.now(),
    };
    localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));
    return true;
  }
  return false;
};

export const logout = (): void => {
  localStorage.removeItem(ADMIN_SESSION_KEY);
};

export const isAuthenticated = (): boolean => {
  try {
    const sessionStr = localStorage.getItem(ADMIN_SESSION_KEY);
    if (!sessionStr) return false;

    const session = JSON.parse(sessionStr);
    // Session expires after 24 hours
    const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;
    if (Date.now() - session.timestamp > TWENTY_FOUR_HOURS) {
      logout();
      return false;
    }
    return session.authenticated === true;
  } catch {
    return false;
  }
};

export const requireAuth = (): boolean => {
  if (!isAuthenticated()) {
    return false;
  }
  return true;
};

