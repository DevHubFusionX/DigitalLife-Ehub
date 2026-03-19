"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";

interface StepAccountProps {
    onNext: (data: { email: string; password: string }) => void;
    onBack: () => void;
    initialEmail: string;
}

const StepAccount = ({ onNext, onBack, initialEmail }: StepAccountProps) => {
    const [email, setEmail] = React.useState(initialEmail);
    const [message, setMessage] = React.useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email && message.length >= 10) onNext({ email, password: message });
    };

    return (
        <div className="w-full">
            <h2 className="text-2xl font-black text-white mb-1">Get in touch</h2>
            <p className="text-white/30 text-sm mb-8">Provide your details so our team can reach out.</p>

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
                    <label className="block text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] mb-2">How can we help?</label>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tell us about your business goals or challenges..."
                        className="w-full bg-white/[0.04] border border-white/[0.06] rounded-xl px-4 py-3.5 text-white font-medium text-sm outline-none focus:border-accent/50 focus:bg-white/[0.06] transition-all placeholder:text-white/10 min-h-[120px] resize-none"
                        required
                    />
                </div>

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
                        disabled={!email || message.length < 10}
                        className="flex-1 py-3.5 bg-white text-[#111] rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-white/90 active:scale-[0.98] transition-all disabled:opacity-10 disabled:pointer-events-none"
                    >
                        Submit Request
                        <ArrowRight size={16} />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default StepAccount;
