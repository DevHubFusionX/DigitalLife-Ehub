"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Loader2, Eye, EyeOff } from "lucide-react";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [submittingAuth, setSubmittingAuth] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Password reset states
  const [isResetting, setIsResetting] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setSubmittingAuth(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      setAuthError(err.message || "Invalid credentials. Please try again.");
    } finally {
      setSubmittingAuth(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail) {
      setAuthError("Please enter your email to receive a password reset link.");
      return;
    }
    setAuthError("");
    setSubmittingAuth(true);
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      alert("Password reset email sent! Check your inbox.");
      setIsResetting(false);
    } catch (err: any) {
      setAuthError(err.message || "Failed to send reset email. Ensure the email is correct.");
    } finally {
      setSubmittingAuth(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex flex-col justify-between font-sans relative overflow-hidden">
      {/* Subtle grid pattern background */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[32px_32px] pointer-events-none" />

      <div className="flex-1 flex items-center justify-center px-4 relative z-10 pt-20 pb-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-[#1E293B] border border-white/10 p-8 sm:p-10 rounded-3xl shadow-2xl"
        >
          {isResetting ? (
            <>
              <div className="text-center mb-8">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#FEDB54]">DigitalLife Ehub</span>
                <h2 className="text-2xl font-bold text-white mt-2 font-display">Reset Password</h2>
                <p className="text-xs text-[#94A3B8] mt-2">Enter your admin email to receive a password reset link.</p>
              </div>

              {authError && (
                <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs rounded-xl flex gap-2 items-start mb-6">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
                  <span>{authError}</span>
                </div>
              )}

              <form onSubmit={handleResetPassword} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#94A3B8] mb-2">Email Address</label>
                  <input 
                    type="email" 
                    required
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="admin@digitallife.com"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white placeholder-white/20 rounded-xl text-sm focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/20 transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submittingAuth}
                  className="w-full py-3.5 bg-accent hover:bg-accent-dark text-primary font-bold rounded-xl text-xs uppercase tracking-widest transition-all active:scale-[0.98] shadow-lg shadow-accent/15 flex items-center justify-center gap-2"
                >
                  {submittingAuth ? <Loader2 className="w-4 h-4 animate-spin" /> : "Send Reset Link"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsResetting(false);
                    setAuthError("");
                  }}
                  className="w-full text-center text-xs text-[#94A3B8] hover:text-white transition-colors pt-2"
                >
                  Back to Login
                </button>
              </form>
            </>
          ) : (
            <>
              <div className="text-center mb-8">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#FEDB54]">DigitalLife Ehub</span>
                <h2 className="text-2xl font-bold text-white mt-2 font-display">Admin Panel Login</h2>
                <p className="text-xs text-[#94A3B8] mt-2">Sign in to manage and edit your Resource Library listings.</p>
              </div>

              {authError && (
                <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs rounded-xl flex gap-2 items-start mb-6">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
                  <span>{authError}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#94A3B8] mb-2">Email Address</label>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@digitallife.com"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white placeholder-white/20 rounded-xl text-sm focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/20 transition-all"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#94A3B8]">Password</label>
                    <button
                      type="button"
                      onClick={() => {
                        setResetEmail(email);
                        setIsResetting(true);
                        setAuthError("");
                      }}
                      className="text-xs text-accent hover:underline focus:outline-none"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <div className="relative">
                    <input 
                      type={showPassword ? "text" : "password"} 
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-4 pr-12 py-3 bg-white/5 border border-white/10 text-white placeholder-white/20 rounded-xl text-sm focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/20 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submittingAuth}
                  className="w-full py-3.5 bg-accent hover:bg-accent-dark text-primary font-bold rounded-xl text-xs uppercase tracking-widest transition-all active:scale-[0.98] shadow-lg shadow-accent/15 flex items-center justify-center gap-2"
                >
                  {submittingAuth ? <Loader2 className="w-4 h-4 animate-spin" /> : "Authenticate"}
                </button>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminLogin;
