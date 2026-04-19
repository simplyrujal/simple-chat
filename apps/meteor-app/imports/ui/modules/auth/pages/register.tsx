import { zodResolver } from "@hookform/resolvers/zod";
import { Meteor } from "meteor/meteor";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { RegisterFormValues, registerSchema } from "../schemas";
import useLogin from "/imports/ui/shared/hooks/auth/use-login";
import { EyeIcon, EyeOffIcon } from "/imports/ui/shared/icons";

const COUNTRIES = [
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "Italy",
  "Spain",
  "Netherlands",
  "Sweden",
  "Norway",
  "Denmark",
  "Finland",
  "Switzerland",
  "Austria",
  "Belgium",
  "Ireland",
  "Portugal",
  "Poland",
  "Czech Republic",
  "Greece",
  "Japan",
  "South Korea",
  "Singapore",
  "New Zealand",
  "India",
  "Brazil",
  "Mexico",
  "Argentina",
  "Chile",
  "Nepal",
  "China",
  "Russia",
  "Other",
];

const Register: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { login } = useLogin();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setSubmitting(true);

    try {
      await Meteor.callAsync("user.register", {
        username: data.username,
        fname: data.fname,
        lname: data.lname,
        email: data.email,
        password: data.password,
        country: data.country,
      });

      login({ email: data.email, password: data.password });
    } catch (err: any) {
      setError("root", {
        type: "manual",
        message:
          err.reason || err.message || "Registration failed. Please try again.",
      });
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full p-4 bg-gradient-to-br from-gray-900 via-dracula-bg to-gray-800 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary-500/15 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDuration: "4s" }}></div>
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-dracula-pink/15 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: "2s", animationDuration: "5s" }}></div>

      <div className="w-full max-w-md relative z-10 animate-fade-in-up">
        <div className="glass-strong rounded-3xl border border-primary-500/30 p-8 shadow-premium-lg backdrop-blur-xl hover:border-primary-500/50 transition-all duration-500">
          <div className="text-center mb-8">
            <div className="relative w-20 h-20 mx-auto mb-6">
              {/* Animated circles */}
              <div className="absolute inset-0 rounded-full border-2 border-primary-500/30 animate-spin" style={{ animationDuration: "3s" }}></div>
              <div className="absolute inset-3 rounded-full border border-dracula-pink/20" style={{ animation: "spin 4s linear infinite reverse" }}></div>
              
              {/* Icon */}
              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-dracula-pink hover-scale">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2 gradient-text animate-fade-in-down">
              Create Account
            </h1>
            <p className="text-sm text-gray-400 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Join us and start chatting with others
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 animate-stagger">
            {errors.root && (
              <div className="rounded-lg p-4 bg-danger-500/15 border border-danger-500/30 backdrop-blur-sm animate-bounce-in" style={{ animationDelay: "0.1s" }}>
                <p className="text-sm text-danger-500 font-medium">
                  {errors.root.message}
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="fname"
                  className="block text-sm font-semibold mb-2 text-gray-50"
                >
                  First Name
                </label>
                <input
                  id="fname"
                  type="text"
                  placeholder="John"
                  {...register("fname")}
                  disabled={submitting}
                  className={`w-full px-4 py-3 rounded-lg text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                    errors.fname 
                      ? "border-2 border-danger-500 bg-danger-500/10 text-white placeholder:text-danger-400/50 focus:border-danger-500 focus:ring-2 focus:ring-danger-500/30 focus:outline-none" 
                      : "border border-gray-600 bg-gray-800/80 text-white placeholder:text-gray-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30 focus:outline-none"
                  }`}
                />
                {errors.fname && (
                  <p className="text-xs mt-1.5 text-danger-500">
                    {errors.fname.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="lname"
                  className="block text-sm font-semibold mb-2 text-gray-50"
                >
                  Last Name
                </label>
                <input
                  id="lname"
                  type="text"
                  placeholder="Doe"
                  {...register("lname")}
                  disabled={submitting}
                  className={`w-full px-4 py-3 rounded-lg text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                    errors.lname 
                      ? "border-2 border-danger-500 bg-danger-500/10 text-white placeholder:text-danger-400/50 focus:border-danger-500 focus:ring-2 focus:ring-danger-500/30 focus:outline-none" 
                      : "border border-gray-600 bg-gray-800/80 text-white placeholder:text-gray-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30 focus:outline-none"
                  }`}
                />
                {errors.lname && (
                  <p className="text-xs mt-1.5 text-danger-500">
                    {errors.lname.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="username"
                className="block text-sm font-semibold mb-2 text-gray-50"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="johndoe"
                {...register("username")}
                disabled={submitting}
                className={`w-full px-4 py-3 rounded-lg text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                  errors.username 
                    ? "border-2 border-danger-500 bg-danger-500/10 text-white placeholder:text-danger-400/50 focus:border-danger-500 focus:ring-2 focus:ring-danger-500/30 focus:outline-none" 
                    : "border border-gray-600 bg-gray-800/80 text-white placeholder:text-gray-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30 focus:outline-none"
                }`}
              />
              {errors.username && (
                <p className="text-xs mt-1.5 text-danger-500">
                  {errors.username.message}
                </p>
              )}
            </div>

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
                disabled={submitting}
                className={`w-full px-4 py-3 rounded-lg text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                  errors.email 
                    ? "border-2 border-danger-500 bg-danger-500/10 text-white placeholder:text-danger-400/50 focus:border-danger-500 focus:ring-2 focus:ring-danger-500/30 focus:outline-none" 
                    : "border border-gray-600 bg-gray-800/80 text-white placeholder:text-gray-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30 focus:outline-none"
                }`}
              />
              {errors.email && (
                <p className="text-xs mt-1.5 text-danger-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    placeholder="Enter password"
                    {...register("password")}
                    disabled={submitting}
                    className={`w-full px-4 py-3 pr-12 rounded-lg text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                      errors.password 
                        ? "border-2 border-danger-500 bg-danger-500/10 text-white placeholder:text-danger-400/50 focus:border-danger-500 focus:ring-2 focus:ring-danger-500/30 focus:outline-none" 
                        : "border border-gray-600 bg-gray-800/80 text-white placeholder:text-gray-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30 focus:outline-none"
                    }`}
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

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-semibold mb-2 text-gray-50"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    {...register("confirmPassword")}
                    disabled={submitting}
                    className={`w-full px-4 py-3 pr-12 rounded-lg text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                      errors.confirmPassword 
                        ? "border-2 border-danger-500 bg-danger-500/10 text-white placeholder:text-danger-400/50 focus:border-danger-500 focus:ring-2 focus:ring-danger-500/30 focus:outline-none" 
                        : "border border-gray-600 bg-gray-800/80 text-white placeholder:text-gray-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30 focus:outline-none"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOffIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-xs mt-1.5 text-danger-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="country"
                className="block text-sm font-semibold mb-2 text-gray-50"
              >
                Country
              </label>
              <select
                id="country"
                {...register("country")}
                disabled={submitting}
                className={`w-full px-4 py-3 rounded-lg text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                  errors.country 
                    ? "border-2 border-danger-500 bg-danger-500/10 text-white focus:border-danger-500 focus:ring-2 focus:ring-danger-500/30 focus:outline-none" 
                    : "border border-gray-600 bg-gray-800/80 text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30 focus:outline-none"
                }`}
              >
                <option value="" className="text-gray-900">Select your country</option>
                {COUNTRIES.map((c) => (
                  <option key={c} value={c} className="text-gray-900">
                    {c}
                  </option>
                ))}
              </select>
              {errors.country && (
                <p className="text-xs mt-1.5 text-danger-500">
                  {errors.country.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 px-4 font-bold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-primary-500 to-dracula-pink text-gray-900 hover:shadow-glow active:scale-95 relative overflow-hidden group mt-6"
            >
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <span className="relative">
                {submitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="loading-spinner w-4 h-4"></span>
                    Creating Account...
                  </span>
                ) : (
                  "Sign Up"
                )}
              </span>
            </button>
          </form>

          <div className="text-center mt-6 pt-6 border-t border-gray-600/30">
            <span className="text-sm text-gray-500">
              Already have an account?{" "}
            </span>
            <Link
              to="/auth/login"
              className="text-sm font-semibold text-dracula-pink hover:text-primary-500 transition-colors duration-300 relative link-premium"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
