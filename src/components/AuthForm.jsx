"use client";

import { useState } from "react";
import { Mail, Lock, User, ArrowRight, Loader2, Eye, EyeOff } from "lucide-react";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Let's assume redirection happens here
      window.location.href = "/dashboard";
    }, 1500);
  };

  return (
    <div className="w-full max-w-md mx-auto p-8 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] border border-neutral-200 dark:border-neutral-800 relative z-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-500 dark:from-white dark:to-neutral-400 mb-2">
          {isLogin ? "Welcome back" : "Create an account"}
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400 text-sm">
          {isLogin 
            ? "Enter your details to access your dashboard." 
            : "Sign up to start tracking your dream internships."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {!isLogin && (
          <div className="space-y-2 relative">
            <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300 ml-1">Full Name</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User strokeWidth={2} className="h-5 w-5 text-neutral-400 group-focus-within:text-violet-500 transition-colors" />
              </div>
              <input 
                type="text" 
                required 
                className="w-full pl-11 pr-4 py-3 bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all duration-200" 
                placeholder="John Doe"
              />
            </div>
          </div>
        )}

        <div className="space-y-2 relative">
          <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300 ml-1">Email Address</label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail strokeWidth={2} className="h-5 w-5 text-neutral-400 group-focus-within:text-violet-500 transition-colors" />
            </div>
            <input 
              type="email" 
              required 
              className="w-full pl-11 pr-4 py-3 bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all duration-200" 
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div className="space-y-2 relative">
          <div className="flex justify-between items-center ml-1">
            <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Password</label>
            {isLogin && (
              <a href="#" className="text-xs font-semibold text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 transition-colors">
                Forgot password?
              </a>
            )}
          </div>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock strokeWidth={2} className="h-5 w-5 text-neutral-400 group-focus-within:text-violet-500 transition-colors" />
            </div>
            <input 
              type={showPassword ? "text" : "password"}
              required 
              className="w-full pl-11 pr-11 py-3 bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-700 rounded-xl text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all duration-200" 
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-neutral-400 hover:text-violet-500 transition-colors"
            >
              {showPassword ? <EyeOff strokeWidth={2} className="h-5 w-5" /> : <Eye strokeWidth={2} className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-900 font-semibold rounded-xl shadow-[0_4px_14px_0_rgb(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_6px_20px_rgba(255,255,255,0.15)] transform active:scale-[0.98] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed mt-6"
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

      <div className="mt-8 text-center bg-neutral-50 dark:bg-neutral-900/30 rounded-2xl py-4 border border-neutral-200/60 dark:border-neutral-800/60">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button 
            type="button" 
            onClick={() => setIsLogin(!isLogin)}
            className="font-semibold text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 transition-colors ml-1"
          >
            {isLogin ? "Sign up now" : "Sign in instead"}
          </button>
        </p>
      </div>
    </div>
  );
}
