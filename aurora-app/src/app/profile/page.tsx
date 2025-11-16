"use client";
import React, { useState } from "react";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Please enter both your UCalgary email and password.");
      return;
    }

    if (!email.toLowerCase().endsWith("@ucalgary.ca")) {
      setError("Please sign in using your @ucalgary.ca email address.");
      return;
    }

    try {
      setIsSubmitting(true);
      // TODO: replace with real auth call
      console.log({ email, password, rememberMe });
      // e.g. await signIn("credentials", { redirect: true, email, password });
    } catch (err) {
      setError("Something went wrong while signing you in. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-red-900 via-red-800 to-red-700 text-slate-900">
      {/* Top grey bar with logo */}
      <header className="w-full bg-neutral-100 border-b border-neutral-200 px-4 sm:px-8 py-3 flex items-center justify-between" aria-label="University of Calgary">
        <div className="flex items-center gap-3">
          <div className="w-10 h-12 bg-yellow-500 rounded-sm shadow-sm border border-black/20" aria-hidden="true" />
          <span className="text-xs font-semibold leading-tight tracking-[0.18em] text-neutral-900 uppercase">
            University of
            <br />
            Calgary
          </span>
        </div>
        <span className="hidden sm:inline text-xs text-neutral-500">Student Career Search</span>
      </header>

      {/* Body */}
      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <section className="w-full max-w-md bg-white/95 shadow-2xl rounded-2xl border border-red-900/10 px-6 sm:px-8 py-8 space-y-6 backdrop-blur" aria-labelledby="login-title" aria-describedby="login-subtitle">
          {/* Card header */}
          <header className="space-y-2">
            <h1 id="login-title" className="text-xl sm:text-2xl font-bold text-neutral-900">
              Student Career Search Login
            </h1>
            <p id="login-subtitle" className="text-sm text-neutral-600">
              Sign in with your UCalgary email to access internships, co-ops, and entry-level opportunities.
            </p>
          </header>

          {/* Error message */}
          {error && (
            <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-neutral-800" htmlFor="email">
                UCalgary Email*
              </label>
              <div className="flex items-center gap-2 rounded-md border border-neutral-300 bg-white px-3 py-2 focus-within:ring-2 focus-within:ring-red-500 focus-within:ring-offset-1 focus-within:ring-offset-white">
                <div className="text-lg" aria-hidden="true">
                  👤
                </div>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="firstname.lastname@ucalgary.ca"
                  className="w-full border-none bg-transparent text-sm outline-none placeholder:text-neutral-400"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-neutral-800" htmlFor="password">
                Password*
              </label>
              <div className="flex items-center gap-2 rounded-md border border-neutral-300 bg-white px-3 py-2 focus-within:ring-2 focus-within:ring-red-500 focus-within:ring-offset-1 focus-within:ring-offset-white">
                <div className="text-lg" aria-hidden="true">
                  🔒
                </div>
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full border-none bg-transparent text-sm outline-none placeholder:text-neutral-400"
                  required
                />
              </div>
            </div>

            {/* Remember + forgot */}
            <div className="flex items-center justify-between gap-3 text-sm">
              <label className="inline-flex items-center gap-2 text-neutral-700">
                <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="h-4 w-4 rounded border-neutral-300 text-red-600 focus:ring-red-500" />
                <span>Remember me on this device</span>
              </label>

              <button type="button" className="text-sm font-medium text-red-700 hover:text-red-800 hover:underline" onClick={() => alert("Forgot password flow goes here")}>
                Forgot password?
              </button>
            </div>

            {/* Login button */}
            <button
              type="submit"
              className="mt-2 inline-flex w-full items-center justify-center rounded-md bg-red-700 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-red-900/20 hover:bg-red-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-600 disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={isSubmitting}>
              {isSubmitting ? "Signing you in..." : "Log In"}
            </button>

            {/* Footer helper text */}
            <p className="text-xs text-neutral-500 text-center">
              Having trouble signing in?{" "}
              <a href="#" className="font-medium text-red-700 hover:text-red-800 hover:underline">
                Contact IT support
              </a>
              .
            </p>
          </form>
        </section>
      </main>
    </div>
  );
};

export default LoginPage;
