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
    <div className="flex min-h-screen items-center justify-center w-full p-4 bg-gradient-to-br from-gray-900 via-dracula-bg to-gray-600">
      <div className="w-full max-w-sm">
        <div className="bg-gray-800/95 rounded-2xl border border-primary-500/20 p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-gradient-to-br from-primary-500 to-dracula-pink">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold mb-2 text-gray-50">Welcome Back</h1>
            <p className="text-sm text-gray-500">
              Sign in to continue to your account
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {(error || errors.root) && (
              <div className="rounded-lg p-3 bg-danger-500/15 border border-danger-500/30">
                <p className="text-sm text-danger-500">
                  {error?.message || errors.root?.message}
                </p>
              </div>
            )}

            <div>
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
                className={`w-full px-4 py-3 rounded-lg text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                  errors.email 
                    ? "border-2 border-danger-500 bg-danger-500/10 text-white placeholder:text-danger-400/50 focus:border-danger-500 focus:ring-2 focus:ring-danger-500/30 focus:outline-none" 
                    : "border border-gray-600 bg-gray-800/80 text-white placeholder:text-gray-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30 focus:outline-none"
                } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              />
              {errors.email && (
                <p className="text-xs mt-1.5 text-danger-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
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
                  className={`w-full px-4 py-3 pr-12 rounded-lg text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                    errors.password 
                      ? "border-2 border-danger-500 bg-danger-500/10 text-white placeholder:text-danger-400/50 focus:border-danger-500 focus:ring-2 focus:ring-danger-500/30 focus:outline-none" 
                      : "border border-gray-600 bg-gray-800/80 text-white placeholder:text-gray-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30 focus:outline-none"
                  } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs mt-1.5 text-danger-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] bg-gradient-to-r from-primary-500 to-dracula-pink text-gray-900 hover:shadow-lg hover:shadow-primary-500/30"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <div className="text-center mt-6">
            <a
              href="#"
              className="text-sm text-dracula-cyan hover:text-dracula-cyan/80 transition-colors"
            >
              Forgot password?
            </a>
          </div>

          <div className="text-center mt-4 pt-4 border-t border-gray-600/30">
            <span className="text-sm text-gray-500">
              Don&apos;t have an account?{" "}
            </span>
            <a
              href="/auth/register"
              className="text-sm font-semibold text-dracula-pink hover:text-dracula-pink/80 transition-colors"
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
