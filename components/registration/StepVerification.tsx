"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, RefreshCw, CheckCircle2 } from "lucide-react";

interface StepVerificationProps {
    email: string;
    onComplete: (code: string) => void;
    onBack: () => void;
}

const StepVerification = ({ email, onComplete, onBack }: StepVerificationProps) => {
    const [code, setCode] = React.useState(["", "", "", ""]);
    const [timer, setTimer] = React.useState(30);
    const [isResending, setIsResending] = React.useState(false);
    const [isSuccess, setIsSuccess] = React.useState(false);

    const inputRefs = [
        React.useRef<HTMLInputElement>(null),
        React.useRef<HTMLInputElement>(null),
        React.useRef<HTMLInputElement>(null),
        React.useRef<HTMLInputElement>(null),
    ];

    React.useEffect(() => {
        let interval: NodeJS.Timeout;
        if (timer > 0) {
            interval = setInterval(() => setTimer(p => p - 1), 1000);
        }
        return () => clearInterval(interval);
    }, [timer]);

    const handleChange = (index: number, value: string) => {
        if (value && !/^\d+$/.test(value)) return;
        if (value.length > 1) value = value[value.length - 1];

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);
        if (value && index < 3) inputRefs[index + 1].current?.focus();
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputRefs[index - 1].current?.focus();
        }
    };

    const handleResend = () => {
        setIsResending(true);
        setTimeout(() => { setIsResending(false); setTimer(30); }, 1500);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const fullCode = code.join("");
        if (fullCode.length === 4) {
            setIsSuccess(true);
            setTimeout(() => onComplete(fullCode), 1800);
        }
    };

    const isComplete = code.every(d => d !== "");

    if (isSuccess) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full flex flex-col items-center justify-center py-8 text-center"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                    className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center mb-6"
                >
                    <CheckCircle2 size={32} className="text-white" />
                </motion.div>
                <h2 className="text-xl font-black text-white mb-2">You&apos;re in.</h2>
                <p className="text-white/30 text-xs font-medium">Setting up your workspace...</p>
            </motion.div>
        );
    }

    return (
        <div className="w-full">
            <h2 className="text-2xl font-black text-white mb-1">Verify email</h2>
            <p className="text-white/30 text-sm mb-8">
                Code sent to <span className="text-white/60 font-semibold">{email}</span>
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex gap-3 justify-center">
                    {code.map((digit, i) => (
                        <input
                            key={i}
                            ref={inputRefs[i]}
                            type="text"
                            inputMode="numeric"
                            value={digit}
                            onChange={(e) => handleChange(i, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(i, e)}
                            className={`w-14 h-16 text-center text-2xl font-black rounded-xl outline-none transition-all ${digit
                                    ? "bg-white/[0.08] border-accent/50 text-white border"
                                    : "bg-white/[0.04] border border-white/[0.06] text-white/40"
                                } focus:border-accent focus:bg-white/[0.08]`}
                            maxLength={1}
                            autoFocus={i === 0}
                        />
                    ))}
                </div>

                <button
                    type="submit"
                    disabled={!isComplete}
                    className="w-full py-3.5 bg-accent text-[#111] rounded-xl font-bold text-sm hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-10 disabled:pointer-events-none"
                >
                    Verify & Complete
                </button>

                <div className="flex items-center justify-center gap-3">
                    <button
                        type="button"
                        onClick={handleResend}
                        disabled={timer > 0 || isResending}
                        className="text-[11px] font-bold text-white/20 hover:text-white/50 disabled:hover:text-white/20 transition-colors flex items-center gap-1.5 disabled:cursor-not-allowed"
                    >
                        <RefreshCw size={12} className={isResending ? "animate-spin" : ""} />
                        Resend
                    </button>
                    {timer > 0 && (
                        <span className="text-[11px] font-bold text-white/10">({timer}s)</span>
                    )}
                </div>

                <button
                    type="button"
                    onClick={onBack}
                    className="w-full text-[11px] font-bold text-white/10 hover:text-white/30 transition-colors flex items-center justify-center gap-1.5 pt-2"
                >
                    <ArrowLeft size={12} />
                    Back
                </button>
            </form>
        </div>
    );
};

export default StepVerification;
