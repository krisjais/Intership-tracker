"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, User, ArrowRight, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { loginUser, signupUser } from "../../lib/api";
import { useAuth } from "../../lib/authContext";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const router = useRouter();
  const { login } = useAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let response;

      if (isLogin) {
        // Login
        response = await loginUser(formData.email, formData.password);
      } else {
        // Signup
        response = await signupUser(formData.name, formData.email, formData.password);
      }

      // Store token and user data
      login(response.user, response.token);

      toast.success(isLogin ? "Logged in successfully!" : "Account created successfully!");

      // Redirect to dashboard
      setTimeout(() => {
        router.push("/dashboard");
      }, 500);
    } catch (error) {
      let errorMessage = "An error occurred. Please try again.";
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message === "Network Error") {
        errorMessage = "Network error. Please check if the backend server is running.";
      } else if (error.code === "ECONNREFUSED") {
        errorMessage = "Cannot connect to the server. Is it running?";
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 relative overflow-hidden">
      {/* Background animation elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="w-full max-w-md mx-auto p-8 bg-white backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.1)] border border-blue-100 relative z-10">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-900 to-blue-600 mb-2">
            {isLogin ? "Welcome back" : "Create an account"}
          </h1>
          <p className="text-gray-600 text-sm">
            {isLogin
              ? "Enter your details to access your dashboard."
              : "Sign up to start tracking your dream internships."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div className="space-y-2 relative">
              <label className="text-sm font-medium text-gray-700 ml-1">
                Full Name
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User
                    strokeWidth={2}
                    className="h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors"
                  />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required={!isLogin}
                  className="w-full pl-11 pr-4 py-3 bg-blue-50 border border-blue-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200"
                  placeholder="John Doe"
                />
              </div>
            </div>
          )}

          <div className="space-y-2 relative">
            <label className="text-sm font-medium text-gray-700 ml-1">
              Email Address
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail
                  strokeWidth={2}
                  className="h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors"
                />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full pl-11 pr-4 py-3 bg-blue-50 border border-blue-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div className="space-y-2 relative">
            <div className="flex justify-between items-center ml-1">
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              {isLogin && (
                <a
                  href="#"
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Forgot password?
                </a>
              )}
            </div>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock
                  strokeWidth={2}
                  className="h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors"
                />
              </div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="w-full pl-11 pr-4 py-3 bg-blue-50 border border-blue-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-[0_4px_14px_0_rgb(37,99,235,0.3)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.4)] transform active:scale-[0.98] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed mt-6"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                {isLogin ? "Sign in" : "Create account"}
                <ArrowRight className="h-5 w-5" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setFormData({ name: "", email: "", password: "" });
              }}
              className="ml-2 font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
