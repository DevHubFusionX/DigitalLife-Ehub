"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Eye, EyeOff, Check } from "lucide-react";

interface StepAccountProps {
    onNext: (data: { email: string; password: string }) => void;
    onBack: () => void;
    initialEmail: string;
}

const StepAccount = ({ onNext, onBack, initialEmail }: StepAccountProps) => {
    const [email, setEmail] = React.useState(initialEmail);
    const [password, setPassword] = React.useState("");
    const [showPassword, setShowPassword] = React.useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email && password.length >= 8) onNext({ email, password });
    };

    const checks = [
        { label: "8+ chars", met: password.length >= 8 },
        { label: "Uppercase", met: /[A-Z]/.test(password) },
        { label: "Number", met: /[0-9]/.test(password) },
        { label: "Symbol", met: /[^A-Za-z0-9]/.test(password) },
    ];
    const strength = checks.filter(c => c.met).length;
    const barColors = ["bg-red-500", "bg-orange-400", "bg-yellow-400", "bg-emerald-400"];

    return (
        <div className="w-full">
            <h2 className="text-2xl font-black text-white mb-1">Set up access</h2>
            <p className="text-white/30 text-sm mb-8">Your email & a strong password.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
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
                    <label className="block text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] mb-2">Password</label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Min. 8 characters"
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

                {/* Strength */}
                {password && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="space-y-3 pt-1"
                    >
                        <div className="flex gap-1">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className={`flex-1 h-1 rounded-full transition-all duration-500 ${strength >= i ? barColors[strength - 1] : "bg-white/[0.06]"
                                    }`} />
                            ))}
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                            {checks.map((c, i) => (
                                <span key={i} className={`text-[10px] font-bold flex items-center gap-1.5 transition-colors ${c.met ? "text-emerald-400" : "text-white/15"
                                    }`}>
                                    <Check size={10} strokeWidth={c.met ? 3 : 2} />
                                    {c.label}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                )}

                <div className="flex gap-3 pt-4">
                    <button
                        type="button"
                        onClick={onBack}
                        className="px-5 py-3.5 border border-white/[0.06] text-white/30 rounded-xl font-bold text-sm hover:bg-white/5 hover:text-white/60 transition-all active:scale-[0.98]"
                    >
                        <ArrowLeft size={16} />
                    </button>
                    <button
                        type="submit"
                        disabled={!email || password.length < 8}
                        className="flex-1 py-3.5 bg-white text-[#111] rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-white/90 active:scale-[0.98] transition-all disabled:opacity-10 disabled:pointer-events-none"
                    >
                        Continue
                        <ArrowRight size={16} />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default StepAccount;
