import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { isAuthenticated } from "../../services/authService";
import { requestMagicLink, verifyMagicLink } from "../../services/magicLinkService";

export default function AdminLogin() {
  const [email, setEmail] = useState("sprattsj@gmail.com");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Check if there's a token in URL (magic link clicked)
  useEffect(() => {
    const verifyToken = async (token: string) => {
      setIsLoading(true);
      setError("");
      
      const isValid = await verifyMagicLink(token);
      
      if (isValid) {
        navigate("/admin/dashboard");
      } else {
        setError("Invalid or expired login link. Please request a new one.");
        setIsLoading(false);
      }
    };

    const token = searchParams.get("token");
    if (token) {
      verifyToken(token);
    }
    
    // If already authenticated, redirect to dashboard
    if (isAuthenticated()) {
      navigate("/admin/dashboard");
    }
  }, [searchParams, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    const result = await requestMagicLink();
    
    setIsLoading(false);
    
    if (result.success) {
      setSuccess(result.message);
    } else {
      setError(result.message || "Failed to send magic link. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F3F4F6] px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 w-full max-w-md">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#007BFF] mb-2">
          Admin Login
        </h1>
        <p className="text-gray-600 mb-6 text-sm sm:text-base">
          Enter your email to receive a secure login link
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007BFF] focus:border-transparent text-base"
              placeholder="Enter your email"
              required
              autoFocus
              disabled={isLoading}
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-lg font-semibold button-primary text-base min-h-[48px] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Sending..." : "Send Login Link"}
          </button>
        </form>

        <p className="mt-6 text-xs text-gray-500 text-center">
          A secure login link will be sent to your email. Click the link in the email to access the dashboard.
        </p>
      </div>
    </div>
  );
}

