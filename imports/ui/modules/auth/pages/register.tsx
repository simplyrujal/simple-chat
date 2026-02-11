import { zodResolver } from "@hookform/resolvers/zod";
import { Meteor } from "meteor/meteor";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import useLogin from "../../../shared/hooks/auth/use-login";
import { RegisterFormValues, registerSchema } from "../schemas";

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-sm rounded-lg p-4 border border-gray-200">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              Create Account
            </h1>
            <p className="text-sm text-gray-500">
              Join us and start chatting with others
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {errors.root && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded text-sm">
                {errors.root.message}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="fname"
                  className="block text-xs font-semibold text-gray-700 mb-1"
                >
                  First Name
                </label>
                <input
                  id="fname"
                  type="text"
                  placeholder="John"
                  {...register("fname")}
                  disabled={submitting}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm text-sm placeholder-gray-400
                                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                                        disabled:bg-gray-100 disabled:text-gray-500
                                        ${errors.fname ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.fname && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.fname.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="lname"
                  className="block text-xs font-semibold text-gray-700 mb-1"
                >
                  Last Name
                </label>
                <input
                  id="lname"
                  type="text"
                  placeholder="Doe"
                  {...register("lname")}
                  disabled={submitting}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm text-sm placeholder-gray-400
                                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                                        disabled:bg-gray-100 disabled:text-gray-500
                                        ${errors.lname ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.lname && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.lname.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="username"
                className="block text-xs font-semibold text-gray-700 mb-1"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="johndoe"
                {...register("username")}
                disabled={submitting}
                className={`w-full px-3 py-2 border rounded-md shadow-sm text-sm placeholder-gray-400
                                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                                    disabled:bg-gray-100 disabled:text-gray-500
                                    ${errors.username ? "border-red-500" : "border-gray-300"}`}
              />
              {errors.username && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="name@company.com"
                {...register("email")}
                disabled={submitting}
                className={`w-full px-3 py-2 border rounded-md shadow-sm text-sm placeholder-gray-400
                                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                                    disabled:bg-gray-100 disabled:text-gray-500
                                    ${errors.email ? "border-red-500" : "border-gray-300"}`}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="password"
                  className="block text-xs font-semibold text-gray-700 mb-1"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  {...register("password")}
                  disabled={submitting}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm text-sm placeholder-gray-400
                                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                                        disabled:bg-gray-100 disabled:text-gray-500
                                        ${errors.password ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.password && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-xs font-semibold text-gray-700 mb-1"
                >
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  {...register("confirmPassword")}
                  disabled={submitting}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm text-sm placeholder-gray-400
                                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                                        disabled:bg-gray-100 disabled:text-gray-500
                                        ${errors.confirmPassword ? "border-red-500" : "border-gray-300"}`}
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="country"
                className="block text-xs font-semibold text-gray-700 mb-1"
              >
                Country
              </label>
              <select
                id="country"
                {...register("country")}
                disabled={submitting}
                className={`w-full px-3 py-2 border rounded-md shadow-sm text-sm bg-white
                                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                                    disabled:bg-gray-100 disabled:text-gray-500
                                    ${errors.country ? "border-red-500" : "border-gray-300"}`}
              >
                <option value="">Select your country</option>
                {COUNTRIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              {errors.country && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.country.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md text-sm transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          <div className="text-center mt-4 text-sm">
            Already have an account?{" "}
            <Link
              to="/auth/login"
              className="text-blue-600 hover:text-blue-800 font-semibold no-underline"
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
