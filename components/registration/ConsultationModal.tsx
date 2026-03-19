"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import StepName from "./StepName";
import StepAccount from "./StepAccount";
import { CheckCircle2 } from "lucide-react";

interface ConsultationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ConsultationModal = ({ isOpen, onClose }: ConsultationModalProps) => {
    const [step, setStep] = useState(1);
    const [direction, setDirection] = useState(1);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    useEffect(() => {
        if (!isOpen) {
            setTimeout(() => {
                setStep(1);
                setDirection(1);
                setFormData({ name: "", email: "", password: "" });
            }, 500);
        }
    }, [isOpen]);

    const handleNextStep = (data: Partial<typeof formData>) => {
        setFormData(prev => ({ ...prev, ...data }));
        setDirection(1);
        setStep(prev => prev + 1);
        
        // If finishing step 2, we are essentially done
        if (step === 2) {
            console.log("Consultation Request Sent:", { ...formData, ...data });
        }
    };

    const handleBackStep = () => {
        setDirection(-1);
        setStep(prev => prev - 1);
    };

    const stepLabels = ["Profile", "Contact"];

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/70 backdrop-blur-2xl"
                    />

                    <motion.div
                        initial={{ opacity: 0, y: 40, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 40, scale: 0.96 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="relative w-full max-w-[460px] bg-[#111111] rounded-3xl shadow-2xl overflow-hidden border border-white/6"
                    >
                        {/* Noise texture */}
                        <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

                        {/* Header */}
                        <div className="relative px-8 pt-8 pb-0">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-accent" />
                                    <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">
                                        Consultation Request
                                    </span>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 -mr-2 rounded-xl text-white/15 hover:text-white/60 hover:bg-white/5 transition-all active:scale-90"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            {/* Step indicator */}
                            {step <= 2 && (
                                <div className="flex gap-1.5 mb-8">
                                    {stepLabels.map((label, i) => (
                                        <div key={i} className="flex-1 flex flex-col gap-2">
                                            <div className={`h-[3px] rounded-full transition-all duration-700 ${step > i + 1 ? "bg-accent" : step === i + 1 ? "bg-white" : "bg-white/6"
                                                }`} />
                                            <span className={`text-[9px] font-bold uppercase tracking-widest transition-colors duration-500 ${step >= i + 1 ? "text-white/40" : "text-white/10"
                                                }`}>
                                                {label}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Content */}
                        <div className="relative px-8 pb-10 min-h-[380px] flex items-start">
                            <AnimatePresence mode="wait" custom={direction}>
                                <motion.div
                                    key={step}
                                    custom={direction}
                                    initial={{ opacity: 0, x: direction * 40 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: direction * -40 }}
                                    transition={{ type: "spring", stiffness: 350, damping: 35 }}
                                    className="w-full"
                                >
                                    {step === 1 && (
                                        <StepName
                                            initialValue={formData.name}
                                            onNext={(name) => handleNextStep({ name })}
                                        />
                                    )}
                                    {step === 2 && (
                                        <StepAccount
                                            initialEmail={formData.email}
                                            onBack={handleBackStep}
                                            onNext={(data) => handleNextStep(data)}
                                        />
                                    )}
                                    {step === 3 && (
                                        <div className="w-full flex flex-col items-center justify-center py-8 text-center">
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                                                className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center mb-6 mx-auto"
                                            >
                                                <CheckCircle2 size={32} className="text-white" />
                                            </motion.div>
                                            <h2 className="text-xl font-black text-white mb-2">Request Sent.</h2>
                                            <p className="text-white/30 text-xs font-medium">Our team will contact you shortly.</p>
                                            
                                            <button
                                                onClick={onClose}
                                                className="mt-8 px-8 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-bold text-sm hover:bg-white/10 transition-all"
                                            >
                                                Close
                                            </button>
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ConsultationModal;
