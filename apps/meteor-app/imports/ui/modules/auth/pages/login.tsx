"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { EyeIcon, EyeOffIcon } from "/imports/ui/shared/icons";
import { LoginFormValues, loginSchema } from "../schemas";
import useLogin from "/imports/ui/shared/hooks/auth/use-login";

const Login: React.FC = () => {
  const { login, isLoading, error } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormValues) => {
    login(data);
  };

  return (
    <div className="flex min-h-screen items-center justify-center w-full p-4 bg-gradient-to-br from-gray-900 via-dracula-bg to-gray-800 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-primary-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
      <div className="absolute -bottom-32 right-10 w-72 h-72 bg-dracula-pink/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: "2s" }}></div>

      <div className="w-full max-w-sm relative z-10 animate-fade-in-up">
        <div className="glass-strong rounded-3xl border border-primary-500/30 p-8 shadow-premium-lg backdrop-blur-xl hover:border-primary-500/50 transition-all duration-500">
          {/* Header with animated icon */}
          <div className="text-center mb-8">
            <div className="relative w-20 h-20 mx-auto mb-6">
              {/* Animated circles */}
              <div className="absolute inset-0 rounded-full border-2 border-primary-500/30 animate-spin" style={{ animationDuration: "3s" }}></div>
              <div className="absolute inset-3 rounded-full border border-dracula-pink/20" style={{ animation: "spin 4s linear infinite reverse" }}></div>
              
              {/* Icon */}
              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-dracula-pink hover-scale">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2 gradient-text animate-fade-in-down">Welcome Back</h1>
            <p className="text-sm text-gray-400 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Sign in to continue to your account
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 animate-stagger">
            {(error || errors.root) && (
              <div className="rounded-lg p-4 bg-danger-500/15 border border-danger-500/30 backdrop-blur-sm animate-bounce-in" style={{ animationDelay: "0.1s" }}>
                <p className="text-sm text-danger-500 font-medium">
                  {error?.message || errors.root?.message}
                </p>
              </div>
            )}

            <div className="animate-fade-in-up">
              <label
                htmlFor="email"
                className="block text-sm font-semibold mb-2 text-gray-50"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                {...register("email")}
                disabled={isLoading}
                className={`w-full px-4 py-3 rounded-lg text-sm transition-all duration-300 input-focus-ring disabled:opacity-50 disabled:cursor-not-allowed ${
                  errors.email 
                    ? "border-2 border-danger-500 bg-danger-500/10 text-white placeholder:text-danger-400/50" 
                    : "border border-gray-600 bg-gray-800/50 text-white placeholder:text-gray-500 hover:border-primary-500/50"
                } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              />
              {errors.email && (
                <p className="text-xs mt-2 text-danger-500 animate-fade-in">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              <label
                htmlFor="password"
                className="block text-sm font-semibold mb-2 text-gray-50"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  {...register("password")}
                  disabled={isLoading}
                  className={`w-full px-4 py-3 pr-12 rounded-lg text-sm transition-all duration-300 input-focus-ring disabled:opacity-50 disabled:cursor-not-allowed ${
                    errors.password 
                      ? "border-2 border-danger-500 bg-danger-500/10 text-white placeholder:text-danger-400/50" 
                      : "border border-gray-600 bg-gray-800/50 text-white placeholder:text-gray-500 hover:border-primary-500/50"
                  } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-primary-500 transition-colors duration-300 hover-scale"
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs mt-2 text-danger-500 animate-fade-in">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 font-bold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-primary-500 to-dracula-pink text-gray-900 hover:shadow-glow active:scale-95 relative overflow-hidden group mt-6"
            >
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <span className="relative">
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="loading-spinner w-4 h-4"></span>
                    Signing In...
                  </span>
                ) : (
                  "Sign In"
                )}
              </span>
            </button>
          </form>

          <div className="text-center mt-6">
            <a
              href="#"
              className="text-sm text-dracula-cyan hover:text-primary-500 transition-colors duration-300 hover:underline"
            >
              Forgot password?
            </a>
          </div>

          <div className="text-center mt-6 pt-6 border-t border-gray-600/30">
            <span className="text-sm text-gray-500">
              Don&apos;t have an account?{" "}
            </span>
            <a
              href="/auth/register"
              className="text-sm font-semibold text-dracula-pink hover:text-primary-500 transition-colors duration-300 relative link-premium"
            >
              Create one
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
