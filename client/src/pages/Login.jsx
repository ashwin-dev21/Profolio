import { useState } from "react";
import { Lock, Mail, User2Icon } from "lucide-react";
import api from "../configs/api";
import { useDispatch } from "react-redux";
import { login } from "../app/features/authSlice";
import toast from "react-hot-toast";

const Login = () => {
  const dispatch = useDispatch();

  const query = new URLSearchParams(window.location.search);
  const urlState = query.get("state");
  const [state, setState] = useState(urlState || "login"); // 'login' | 'register' | 'forgot-password'

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Map state to corresponding API endpoint
      const endpointMap = {
        login: "/api/users/login",
        register: "/api/users/register",
        "forgot-password": "/api/users/forgot-password",
      };

      // Uses configured relative endpoint via Axios instance
      const { data } = await api.post(endpointMap[state], formData);

      toast.success(data.message);

      // Save token and state only during login or registration
      if (state !== "forgot-password") {
        dispatch(login(data));
        localStorage.setItem("token", data.token);
      } else {
        // Return to login screen after requesting reset
        setState("login");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="sm:w-87.5 w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white"
      >
        <h1 className="text-gray-900 text-3xl mt-10 font-medium">
          {state === "login"
            ? "Login"
            : state === "register"
            ? "Sign up"
            : "Forgot Password"}
        </h1>
        <p className="text-gray-500 text-sm mt-2">
          {state === "forgot-password"
            ? "Enter your email to receive a reset link"
            : `Please ${state} in to continue`}
        </p>

        {/* Name input - Register state only */}
        {state === "register" && (
          <div className="flex items-center mt-6 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <User2Icon size={16} color="#6B7280" />
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="border-none outline-none ring-0 w-full"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
        )}

        {/* Email input - All states */}
        <div className="flex items-center w-full mt-4 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <Mail size={13} color="#6B7280" />
          <input
            type="email"
            name="email"
            placeholder="Email id"
            className="border-none outline-none ring-0 w-full"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password input - Hide during forgot-password state */}
        {state !== "forgot-password" && (
          <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <Lock size={13} color="#6B7280" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="border-none outline-none ring-0 w-full"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
        )}

        {/* Forget Password Toggle Button - Login state only */}
        {state === "login" && (
          <div className="mt-4 text-left">
            <button
              type="button"
              onClick={() => setState("forgot-password")}
              className="text-sm text-blue-500 hover:underline"
            >
              Forget password?
            </button>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-4 w-full h-11 rounded-full text-white bg-blue-500 hover:opacity-90 transition-opacity"
        >
          {state === "login"
            ? "Login"
            : state === "register"
            ? "Sign up"
            : "Send Reset Link"}
        </button>

        {/* Bottom Navigation Links */}
        <p className="text-gray-500 text-sm mt-3 mb-11">
          {state === "forgot-password" ? (
            <button
              type="button"
              onClick={() => setState("login")}
              className="text-blue-500 hover:underline"
            >
              Back to Login
            </button>
          ) : (
            <>
              {state === "login"
                ? "Don't have an account?"
                : "Already have an account?"}{" "}
              <button
                type="button"
                onClick={() =>
                  setState((prev) => (prev === "login" ? "register" : "login"))
                }
                className="text-blue-500 hover:underline font-medium"
              >
                click here
              </button>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default Login;