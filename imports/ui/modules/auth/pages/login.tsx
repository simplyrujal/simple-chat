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
    <div className="flex min-h-screen items-center justify-center bg-gray-50 w-full p-4">
      <div className="w-full max-w-sm">
        <div className="card p-6">
          <div className="text-center mb-6">
            <h1 className="text-xl font-bold mb-2 text-gray-900">Welcome Back</h1>
            <p className="text-gray-600 text-sm">
              Sign in to your account to continue
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {(error || errors.root) && (
              <div className="rounded-md bg-danger-50 border border-danger-500/20 p-3">
                <p className="text-danger-600 text-sm">
                  {error?.message || errors.root?.message}
                </p>
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-1.5"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="name@company.com"
                {...register("email")}
                disabled={isLoading}
                className={`input-field ${
                  errors.email ? "input-field-error" : ""
                } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              />
              {errors.email && (
                <p className="text-danger-500 text-xs mt-1.5">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 mb-1.5"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register("password")}
                disabled={isLoading}
                className={`input-field ${
                  errors.password ? "input-field-error" : ""
                } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              />
              {errors.password && (
                <p className="text-danger-500 text-xs mt-1.5">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary mt-2"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <div className="text-center mt-5 mb-2">
            <a
              href="#"
              className="text-sm text-primary-600 hover:text-primary-700 transition-colors"
            >
              Forgot password?
            </a>
          </div>

          <div className="text-center text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <a
              href="/auth/register"
              className="font-semibold text-primary-600 hover:text-primary-700 transition-colors"
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
