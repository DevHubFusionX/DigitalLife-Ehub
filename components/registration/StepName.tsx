"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface StepNameProps {
    onNext: (name: string) => void;
    initialValue: string;
}

const StepName = ({ onNext, initialValue }: StepNameProps) => {
    const [name, setName] = React.useState(initialValue);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) onNext(name);
    };

    const firstName = name.trim().split(" ")[0];

    return (
        <div className="w-full">
            <AnimatePresence mode="wait">
                {name.trim() ? (
                    <motion.h2
                        key="greeting"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="text-2xl font-black text-white mb-1"
                    >
                        Hey, <span className="text-accent">{firstName}</span>
                    </motion.h2>
                ) : (
                    <motion.h2
                        key="default"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="text-2xl font-black text-white mb-1"
                    >
                        Tell us about yourself
                    </motion.h2>
                )}
            </AnimatePresence>
            <p className="text-white/30 text-sm mb-8">We&apos;d love to know who we&apos;re speaking with.</p>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] mb-2">Full Name</label>
                    <input
                        type="text"
                        ref={(input) => {
                            if (input) {
                                setTimeout(() => input.focus(), 300);
                            }
                        }}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. John Smith"
                        className="w-full bg-white/[0.04] border border-white/[0.06] rounded-xl px-4 py-3.5 text-white font-medium text-sm outline-none focus:border-accent/50 focus:bg-white/[0.06] transition-all placeholder:text-white/10"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={!name.trim()}
                    className="w-full py-3.5 bg-white text-[#111] rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-white/90 active:scale-[0.98] transition-all disabled:opacity-10 disabled:pointer-events-none"
                >
                    Continue
                    <ArrowRight size={16} />
                </button>
            </form>
        </div>
    );
};

export default StepName;
