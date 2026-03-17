"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Zap, Clock, Tag, Target } from "lucide-react";

const benefits = [
    {
        title: "Founding Member Badge",
        desc: "A prestigious badge that signifies your early commitment.",
        icon: Award,
        color: "from-amber-400 to-orange-500",
    },
    {
        title: "Priority Subgroup Access",
        desc: "Get first-dibs on joining exclusive subgroups.",
        icon: Zap,
        color: "from-blue-400 to-indigo-600",
    },
    {
        title: "Early Mentorship Slots",
        desc: "Secure high-profile mentors before others.",
        icon: Clock,
        color: "from-emerald-400 to-teal-600",
    },
    {
        title: "Discounted Pricing",
        desc: "Access a special rate that will never be offered again.",
        icon: Tag,
        color: "from-rose-400 to-pink-600",
    },
    {
        title: "Launch Day Visibility",
        desc: "Receive features and visibility during official launch.",
        icon: Target,
        color: "from-violet-400 to-purple-600",
    },
];

const FoundingBenefits = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    // Auto-rotate on desktop
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % benefits.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-24 md:py-48 bg-white overflow-hidden relative">
            <div className="container-custom px-4 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16 md:mb-32">
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-accent block mb-6">Exclusive Rewards</span>
                    <h2 className="text-4xl md:text-7xl font-black text-primary leading-tight">
                        Founding <span className="text-accent italic font-serif">Member</span> Hub.
                    </h2>
                </div>

                {/* desktop Circular Layout */}
                <div className="hidden lg:flex justify-center items-center relative min-h-[600px]">
                    {/* Central Core */}
                    <div className="relative z-20 w-80 h-80 rounded-full bg-primary flex items-center justify-center text-center p-8 shadow-2xl border-8 border-white">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="flex flex-col items-center"
                            >
                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${benefits[activeIndex].color} flex items-center justify-center text-white mb-6 shadow-lg`}>
                                    {React.createElement(benefits[activeIndex].icon, { size: 32 })}
                                </div>
                                <h3 className="text-2xl font-black text-white mb-3">
                                    {benefits[activeIndex].title}
                                </h3>
                                <p className="text-white/60 text-sm font-medium leading-relaxed">
                                    {benefits[activeIndex].desc}
                                </p>
                            </motion.div>
                        </AnimatePresence>

                        {/* Orbit Circles Decor */}
                        <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                            className="absolute -inset-10 border border-primary/10 rounded-full"
                        />
                        <motion.div 
                            animate={{ rotate: -360 }}
                            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                            className="absolute -inset-20 border border-primary/5 rounded-full"
                        />
                    </div>

                    {/* Orbiting Items */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        {benefits.map((benefit, i) => {
                            const angle = (i * 360) / benefits.length;
                            const radius = 300;
                            const x = Math.cos((angle * Math.PI) / 180) * radius;
                            const y = Math.sin((angle * Math.PI) / 180) * radius;
                            const isActive = activeIndex === i;

                            return (
                                <motion.button
                                    key={i}
                                    onClick={() => setActiveIndex(i)}
                                    initial={{ opacity: 0, scale: 0 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    style={{ 
                                        left: `calc(50% + ${x}px)`, 
                                        top: `calc(50% + ${y}px)`,
                                        transform: "translate(-50%, -50%)"
                                    }}
                                    className={`absolute w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-500 z-30 group shadow-xl ${
                                        isActive 
                                        ? `bg-gradient-to-br ${benefit.color} text-white scale-125` 
                                        : "bg-white text-primary border border-border-subtle hover:border-accent hover:text-accent"
                                    }`}
                                >
                                    <div className="relative">
                                        {React.createElement(benefit.icon, { size: 28, strokeWidth: 1.5 })}
                                        {!isActive && (
                                            <div className="absolute top-1/2 left-24 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-lg pointer-events-none">
                                                {benefit.title}
                                            </div>
                                        )}
                                    </div>
                                    
                                    {/* Connection Line to Center */}
                                    <div className={`absolute h-px bg-gradient-to-r transition-all duration-500 origin-left -z-10 ${
                                        isActive ? "from-accent/0 to-accent w-48" : "from-transparent to-transparent w-0"
                                    }`} 
                                    style={{ 
                                        left: "50%",
                                        top: "50%",
                                        transform: `rotate(${angle + 180}deg) translateY(-50%)`
                                    }} />
                                </motion.button>
                            );
                        })}
                    </div>
                </div>

                {/* Mobile List Layout */}
                <div className="lg:hidden space-y-4">
                    {benefits.map((benefit, i) => {
                        const Icon = benefit.icon;
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="flex items-center gap-5 p-5 bg-features-bg border border-border-subtle rounded-2xl hover:bg-white hover:border-accent group transition-all"
                            >
                                <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${benefit.color} flex items-center justify-center text-white shadow-sm ring-4 ring-white`}>
                                    <Icon size={20} />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-base font-bold text-primary mb-1">{benefit.title}</h3>
                                    <p className="text-xs text-text-secondary leading-relaxed font-medium">{benefit.desc}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Background Decor */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] -z-10 hidden lg:block" />
        </section>
    );
};

export default FoundingBenefits;
