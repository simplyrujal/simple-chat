"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { LoginFormValues, loginSchema } from "../schemas";
import useLogin from "/imports/ui/shared/hooks/auth/use-login";

const Login: React.FC = () => {
  const { login, isLoading, error } = useLogin();

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
    <div className="flex min-h-screen items-center justify-center bg-gray-50 w-full">
      <div className="w-full max-w-sm">
        <div className="rounded-lg border border-gray-200 bg-white shadow-sm p-4">
          <div className="text-center mb-6">
            <h1 className="text-xl font-bold mb-2">Welcome Back</h1>
            <p className="text-gray-600 text-sm">
              Sign in to your account to continue
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {(error || errors.root) && (
              <div className="rounded-md bg-red-50 border border-red-200 p-3">
                <p className="text-red-800 text-sm">
                  {error?.message || errors.root?.message}
                </p>
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="name@company.com"
                {...register("email")}
                disabled={isLoading}
                className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                  errors.email
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300 bg-white"
                } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              />
              {errors.email && (
                <p className="text-red-600 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register("password")}
                disabled={isLoading}
                className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                  errors.password
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300 bg-white"
                } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              />
              {errors.password && (
                <p className="text-red-600 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <div className="text-center mt-4 mb-3">
            <a
              href="#"
              className="text-sm text-blue-600 hover:text-blue-700 transition"
            >
              Forgot password?
            </a>
          </div>

          <div className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <a
              href="/auth/register"
              className="font-semibold text-blue-600 hover:text-blue-700 transition"
            >
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
