"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Eye, EyeOff, ArrowRight, ArrowLeft, RefreshCw, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSwitchToRegister: () => void;
}

type View = "login" | "forgot" | "reset-sent";

const LoginModal = ({ isOpen, onClose, onSwitchToRegister }: LoginModalProps) => {
    const router = useRouter();
    const [view, setView] = useState<View>("login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [forgotEmail, setForgotEmail] = useState("");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Login:", { email, password });
        onClose();
        resetState();
        router.push("/dashboard");
    };

    const handleForgot = (e: React.FormEvent) => {
        e.preventDefault();
        setView("reset-sent");
    };

    const resetState = () => {
        setTimeout(() => {
            setView("login");
            setEmail("");
            setPassword("");
            setForgotEmail("");
            setShowPassword(false);
        }, 400);
    };

    const handleClose = () => {
        onClose();
        resetState();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="absolute inset-0 bg-black/70 backdrop-blur-2xl"
                    />

                    <motion.div
                        initial={{ opacity: 0, y: 40, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 40, scale: 0.96 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="relative w-full max-w-[420px] bg-[#111111] rounded-3xl shadow-2xl overflow-hidden border border-white/[0.06]"
                    >
                        {/* Noise */}
                        <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

                        {/* Header */}
                        <div className="relative px-8 pt-8">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-accent" />
                                    <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">
                                        {view === "login" ? "Authentication" : view === "forgot" ? "Recovery" : "Sent"}
                                    </span>
                                </div>
                                <button
                                    onClick={handleClose}
                                    className="p-2 -mr-2 rounded-xl text-white/15 hover:text-white/60 hover:bg-white/5 transition-all active:scale-90"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="relative px-8 pb-8">
                            <AnimatePresence mode="wait">
                                {view === "login" && (
                                    <motion.div
                                        key="login"
                                        initial={{ opacity: 0, x: 30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -30 }}
                                        transition={{ type: "spring", stiffness: 350, damping: 35 }}
                                    >
                                        <h2 className="text-2xl font-black text-white mb-1">Welcome back</h2>
                                        <p className="text-white/30 text-sm mb-8">Sign in to your account.</p>

                                        <form onSubmit={handleLogin} className="space-y-4">
                                            <div>
                                                <label className="block text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] mb-2">Email</label>
                                                <input
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    placeholder="name@company.com"
                                                    className="w-full bg-white/[0.04] border border-white/[0.06] rounded-xl px-4 py-3.5 text-white font-medium text-sm outline-none focus:border-accent/50 focus:bg-white/[0.06] transition-all placeholder:text-white/10"
                                                    required
                                                    autoFocus
                                                />
                                            </div>

                                            <div>
                                                <div className="flex items-center justify-between mb-2">
                                                    <label className="block text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">Password</label>
                                                    <button
                                                        type="button"
                                                        onClick={() => setView("forgot")}
                                                        className="text-[10px] font-bold text-accent/60 hover:text-accent transition-colors uppercase tracking-wider"
                                                    >
                                                        Forgot?
                                                    </button>
                                                </div>
                                                <div className="relative">
                                                    <input
                                                        type={showPassword ? "text" : "password"}
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        placeholder="••••••••"
                                                        className="w-full bg-white/[0.04] border border-white/[0.06] rounded-xl px-4 py-3.5 pr-12 text-white font-medium text-sm outline-none focus:border-accent/50 focus:bg-white/[0.06] transition-all placeholder:text-white/10"
                                                        required
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/15 hover:text-white/50 transition-colors"
                                                    >
                                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="pt-3">
                                                <button
                                                    type="submit"
                                                    disabled={!email || !password}
                                                    className="w-full py-3.5 bg-white text-[#111] rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-white/90 active:scale-[0.98] transition-all disabled:opacity-10 disabled:pointer-events-none"
                                                >
                                                    Sign In
                                                    <ArrowRight size={16} />
                                                </button>
                                            </div>
                                        </form>

                                        <div className="mt-8 pt-6 border-t border-white/[0.04] text-center">
                                            <p className="text-white/20 text-xs">
                                                Don&apos;t have an account?{" "}
                                                <button
                                                    onClick={() => {
                                                        handleClose();
                                                        setTimeout(onSwitchToRegister, 400);
                                                    }}
                                                    className="text-accent font-bold hover:text-accent/80 transition-colors"
                                                >
                                                    Create one
                                                </button>
                                            </p>
                                        </div>
                                    </motion.div>
                                )}

                                {view === "forgot" && (
                                    <motion.div
                                        key="forgot"
                                        initial={{ opacity: 0, x: 30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -30 }}
                                        transition={{ type: "spring", stiffness: 350, damping: 35 }}
                                    >
                                        <h2 className="text-2xl font-black text-white mb-1">Reset password</h2>
                                        <p className="text-white/30 text-sm mb-8">We&apos;ll email you a reset link.</p>

                                        <form onSubmit={handleForgot} className="space-y-4">
                                            <div>
                                                <label className="block text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] mb-2">Email Address</label>
                                                <input
                                                    type="email"
                                                    value={forgotEmail}
                                                    onChange={(e) => setForgotEmail(e.target.value)}
                                                    placeholder="name@company.com"
                                                    className="w-full bg-white/[0.04] border border-white/[0.06] rounded-xl px-4 py-3.5 text-white font-medium text-sm outline-none focus:border-accent/50 focus:bg-white/[0.06] transition-all placeholder:text-white/10"
                                                    required
                                                    autoFocus
                                                />
                                            </div>

                                            <div className="pt-2">
                                                <button
                                                    type="submit"
                                                    disabled={!forgotEmail}
                                                    className="w-full py-3.5 bg-white text-[#111] rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-white/90 active:scale-[0.98] transition-all disabled:opacity-10 disabled:pointer-events-none"
                                                >
                                                    Send Reset Link
                                                    <ArrowRight size={16} />
                                                </button>
                                            </div>
                                        </form>

                                        <button
                                            onClick={() => setView("login")}
                                            className="w-full mt-6 text-[11px] font-bold text-white/15 hover:text-white/40 transition-colors flex items-center justify-center gap-1.5"
                                        >
                                            <ArrowLeft size={12} />
                                            Back to Sign In
                                        </button>
                                    </motion.div>
                                )}

                                {view === "reset-sent" && (
                                    <motion.div
                                        key="reset-sent"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center py-6"
                                    >
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                                            className="w-14 h-14 rounded-full bg-emerald-500 flex items-center justify-center mx-auto mb-6"
                                        >
                                            <CheckCircle2 size={28} className="text-white" />
                                        </motion.div>
                                        <h2 className="text-xl font-black text-white mb-2">Check your inbox</h2>
                                        <p className="text-white/30 text-xs mb-8">
                                            Reset link sent to <span className="text-white/50 font-semibold">{forgotEmail}</span>
                                        </p>
                                        <button
                                            onClick={() => { setView("login"); setForgotEmail(""); }}
                                            className="text-[11px] font-bold text-white/20 hover:text-white/50 transition-colors flex items-center justify-center gap-1.5 mx-auto"
                                        >
                                            <ArrowLeft size={12} />
                                            Back to Sign In
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default LoginModal;
