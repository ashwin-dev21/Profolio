import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", isError: false });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setMessage({ text: "Passwords do not match", isError: true });
    }

    setLoading(true);
    setMessage({ text: "", isError: false });

    try {
      const { data } = await axios.post(`/api/users/reset-password/${token}`, {
        password,
      });

      setMessage({ text: data.message, isError: false });
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setMessage({
        text: err.response?.data?.message || "Failed to reset password",
        isError: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md text-center border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-900 mb-1">Set New Password</h2>
        <p className="text-slate-500 text-sm mb-6">Enter your new password below</p>

        {message.text && (
          <div
            className={`mb-4 text-xs font-semibold p-3 rounded-lg ${
              message.isError
                ? "bg-red-50 text-red-600"
                : "bg-green-50 text-green-600"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            required
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2.5 border border-slate-300 rounded-full text-sm outline-none focus:border-indigo-600"
          />

          <input
            type="password"
            required
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2.5 border border-slate-300 rounded-full text-sm outline-none focus:border-indigo-600"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white font-medium py-2.5 rounded-full hover:bg-indigo-700 active:scale-95 transition-all text-sm disabled:opacity-50"
          >
            {loading ? "Updating..." : "Reset Password"}
          </button>
        </form>

        <div className="mt-4">
          <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-indigo-600">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;