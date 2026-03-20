"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Download, Plus, UserPlus } from "lucide-react";

const Hero = () => {
    const [index, setIndex] = useState(0);
    const [headlinePaused, setHeadlinePaused] = useState(false);
    const headlines = [
        ["From Hustle to", "Structured Growth"],
        ["Building People.", "Brands. Purpose."],
        ["Move from Informal", "to Organized"],
        ["Sustainable Growth", "Support"]
    ];

    useEffect(() => {
        if (headlinePaused) return;
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % headlines.length);
        }, 3000);
        return () => clearInterval(timer);
    }, [headlinePaused, headlines.length]);

    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
        transition: { duration: 0.6 }
    };

    const bentoItem = {
        initial: { opacity: 0, y: 24 },
        animate: (i: number) => ({ opacity: 1, y: 0, transition: { delay: 0.1 * i, duration: 0.5 } })
    };

    const cardHover = { scale: 1.02, transition: { duration: 0.2 } };
    const cardTap = { scale: 0.99 };

    return (
        <section className="relative min-h-[100dvh] pt-32 md:pt-36 pb-12 md:pb-24 overflow-hidden bg-hero-bg flex flex-col items-center">
            <div className="absolute inset-0 bg-linear-to-b from-white/5 via-transparent to-transparent pointer-events-none" aria-hidden />
            {/* Top Content */}
            <div className="container-custom relative z-10 w-full text-center mb-8 md:mb-20 px-4">
                <div
                    className="relative min-h-[120px] md:min-h-32 overflow-visible mb-4 md:mb-6"
                    onMouseEnter={() => setHeadlinePaused(true)}
                    onMouseLeave={() => setHeadlinePaused(false)}
                >
                    <AnimatePresence mode="wait">
                        <motion.h1
                            key={index}
                            {...fadeIn}
                            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-display font-bold text-text-on-dark leading-[1.15] max-w-4xl mx-auto text-center px-2"
                        >
                            {headlines[index][0]} <br /> {headlines[index][1]}
                        </motion.h1>
                    </AnimatePresence>
                </div>

                <div className="flex justify-center gap-2 mb-4 md:mb-6">
                    {headlines.map((_, i) => (
                        <button
                            key={i}
                            type="button"
                            onClick={() => setIndex(i)}
                            className="h-2 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-hero"
                            style={{ width: index === i ? 1.5 * 8 : 8, backgroundColor: index === i ? "var(--color-accent)" : "rgba(255,255,255,0.3)" }}
                            aria-label={`Show headline ${i + 1} of ${headlines.length}`}
                        />
                    ))}
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-sm md:text-lg text-text-on-dark-muted max-w-2xl mx-auto mb-6 md:mb-10 px-4 leading-relaxed"
                >
                    Gain clarity, boost your visibility, and build a strong operational structure <br className="hidden md:block" /> in 6–10 weeks with our hands-on business development support.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="inline-flex items-center w-full md:w-auto px-4 md:px-0"
                >
                    <button
                        type="button"
                        className="flex items-center justify-between md:justify-center gap-2 md:gap-3 w-full md:w-auto px-5 md:px-8 py-3 md:py-3.5 bg-accent text-primary font-bold rounded-full hover:scale-[1.04] hover:shadow-[0_8px_24px_rgba(254,219,84,0.4)] transition-all duration-200 text-xs sm:text-sm md:text-lg group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-hero active:scale-[0.98]"
                    >
                        <span className="flex-1 md:flex-none">Book Your Free Growth Clarity Session</span>
                        <span className="bg-primary text-white p-1.5 md:p-2 rounded-full group-hover:rotate-12 transition-transform duration-200 inline-flex items-center justify-center flex-shrink-0">
                            <ArrowUpRight size={16} className="md:w-5 md:h-5" aria-hidden />
                        </span>
                    </button>
                </motion.div>
            </div>

            {/* Bento Grid */}
            {/* Desktop Bento Grid */}
            <motion.div
                className="container-custom hidden md:grid grid-cols-10 gap-6 w-full max-w-6xl"
                initial="initial"
                animate="animate"
                variants={{ animate: { transition: { staggerChildren: 0.08 } } }}
            >
                {/* Left Column (4 cols) */}
                <div className="md:col-span-4 flex flex-col gap-6">
                    <motion.div
                        variants={bentoItem}
                        custom={0}
                        whileHover={cardHover}
                        whileTap={cardTap}
                        className="bg-card-dark rounded-[2.5rem] p-8 relative overflow-hidden h-[300px] cursor-default shadow-lg hover:shadow-xl transition-shadow duration-200"
                    >
                        <div className="w-12 h-2 bg-white/20 rounded-full mb-8" />
                        <p className="text-text-on-dark-muted mb-6 text-sm">We don’t just advise — <br /> we build with you.</p>
                        <div className="flex items-center gap-4 mb-8">
                            <button
                                type="button"
                                className="px-6 py-2.5 bg-white/10 text-white rounded-full border border-white/20 font-medium hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 transition-colors"
                            >
                                Start My Journey
                            </button>
                            <div className="w-12 h-12 bg-white text-primary rounded-full flex items-center justify-center hover:bg-white/95 transition-colors cursor-pointer" role="button" tabIndex={0}>
                                <ArrowUpRight size={22} />
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex -space-x-3">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-card-dark overflow-hidden bg-white/10">
                                        <img src={`https://i.pravatar.cc/100?img=${10 + i}`} alt="" />
                                    </div>
                                ))}
                                <div className="w-10 h-10 rounded-full border-2 border-card-dark bg-primary flex items-center justify-center text-white">
                                    <Plus size={14} />
                                </div>
                            </div>
                            <div>
                                <p className="text-text-on-dark font-bold">MSMEs & SMEs</p>
                                <p className="text-text-on-dark-muted text-xs">Target Audience</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        variants={bentoItem}
                        custom={1}
                        whileHover={cardHover}
                        whileTap={cardTap}
                        className="bg-auth-web rounded-[2.5rem] relative overflow-hidden h-[400px] cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-200 group"
                    >
                        <img
                            src="/hero_person_portrait.png"
                            alt=""
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 opacity-80"
                        />
                        <div className="absolute top-6 right-6 w-12 h-12 bg-white text-auth-web rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-200">
                            <ArrowUpRight size={22} />
                        </div>
                    </motion.div>
                </div>

                {/* Middle Column (3 cols) */}
                <div className="md:col-span-3 flex flex-col gap-6">
                    <motion.div
                        variants={bentoItem}
                        custom={2}
                        whileHover={cardHover}
                        whileTap={cardTap}
                        className="bg-card-dark rounded-[2.5rem] p-8 flex-1 flex flex-col justify-end min-h-[280px] shadow-lg hover:shadow-xl transition-shadow duration-200 cursor-default"
                    >
                        <h3 className="text-text-on-dark text-xl font-bold mb-8">Our Core Growth Pillars</h3>
                        <div className="space-y-6">
                            {[
                                { text: "Business Strategy & Clarity Development", color: "var(--color-auth-sales)" },
                                { text: "MSME Formalization & Structure Setup", color: "var(--color-auth-mail)" },
                                { text: "Brand Positioning & Social Media", color: "var(--color-auth-flow)" }
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-center justify-between py-4 border-t border-white/10 hover:border-white/20 transition-colors group/item">
                                    <p className="text-text-on-dark-muted text-sm max-w-[200px] group-hover/item:text-text-on-dark transition-colors">{item.text}</p>
                                    <div
                                        className="w-10 h-10 text-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform cursor-pointer shrink-0"
                                        style={{ backgroundColor: item.color }}
                                    >
                                        <ArrowUpRight size={18} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Right Column (3 cols) */}
                <div className="md:col-span-3 flex flex-col gap-6">
                    <motion.div
                        variants={bentoItem}
                        custom={3}
                        whileHover={cardHover}
                        whileTap={cardTap}
                        className="bg-primary-light rounded-[2.5rem] p-8 h-[300px] flex flex-col justify-between shadow-lg hover:shadow-xl transition-shadow duration-200 cursor-default border border-white/5"
                    >
                        <h3 className="text-text-on-dark text-3xl font-bold leading-tight">Empowering <br /> People & <br /> Brands</h3>
                        <button
                            type="button"
                            className="flex items-center gap-2 text-text-on-dark-muted hover:text-text-on-dark transition-colors group w-fit focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-light rounded-lg"
                        >
                            Impact Driven Results
                            <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </button>
                    </motion.div>

                    <motion.div
                        variants={bentoItem}
                        custom={4}
                        whileHover={cardHover}
                        whileTap={cardTap}
                        className="bg-accent rounded-[2.5rem] p-8 h-[400px] flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-200 cursor-default"
                    >
                        <p className="text-primary font-bold text-sm mb-8">Accelerated <br /> Sustainable Business Growth</p>
                        <div className="mt-auto flex items-end justify-between h-48 px-2">
                            {[
                                { height: "70%", val: "30%", color: "bg-primary/20" },
                                { height: "85%", val: "40%", color: "bg-primary/40" },
                                { height: "100%", val: "120%", color: "bg-primary" },
                                { height: "75%", val: "35%", color: "bg-primary/60" }
                            ].map((bar, i) => (
                                <div key={i} className="flex flex-col items-center gap-2 w-1/5">
                                    <span className="text-[10px] font-bold text-primary">{bar.val}</span>
                                    <div
                                        className={"w-full " + bar.color + " rounded-lg"}
                                        style={{ height: bar.height }}
                                    ></div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Mobile Marquee */}
            <div className="md:hidden relative w-full overflow-hidden py-6">
                {/* Gradient Fades */}
                <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-hero-bg to-transparent z-20 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-hero-bg to-transparent z-20 pointer-events-none" />

                <motion.div
                    className="flex gap-3 px-2 w-max"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                >
                    {[...Array(2)].map((_, groupIndex) => (
                        <div key={groupIndex} className="flex gap-3">
                            {/* Card 1: MSMEs */}
                            <div className="w-[240px] bg-card-dark rounded-[1.5rem] p-5 shadow-lg">
                                <p className="text-text-on-dark-muted mb-3 text-[10px] font-bold uppercase tracking-widest">Target Audience</p>
                                <h3 className="text-text-on-dark text-lg font-bold mb-3 italic">MSMEs & SMEs</h3>
                                <div className="flex -space-x-2">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="w-7 h-7 rounded-full border-2 border-card-dark overflow-hidden">
                                            <img src={`https://i.pravatar.cc/100?img=${10 + i}`} alt="" />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Card 2: Growth Pillars */}
                            <div className="w-[260px] bg-card-dark rounded-[1.5rem] p-5 shadow-lg">
                                <h3 className="text-text-on-dark font-bold mb-3 text-sm">Core Growth Pillars</h3>
                                <ul className="space-y-2">
                                    <li className="flex items-center gap-2 text-text-on-dark-muted text-[11px]">
                                        <div className="w-1.5 h-1.5 rounded-full bg-auth-sales" /> Business Strategy
                                    </li>
                                    <li className="flex items-center gap-2 text-text-on-dark-muted text-[11px]">
                                        <div className="w-1.5 h-1.5 rounded-full bg-auth-mail" /> Formalization
                                    </li>
                                    <li className="flex items-center gap-2 text-text-on-dark-muted text-[11px]">
                                        <div className="w-1.5 h-1.5 rounded-full bg-auth-flow" /> Brand Visibility
                                    </li>
                                </ul>
                            </div>

                            {/* Card 3: Impact */}
                            <div className="w-[240px] bg-primary-light rounded-[1.5rem] p-5 shadow-lg border border-white/5">
                                <h3 className="text-text-on-dark text-lg font-bold mb-3">Empowering <br /> People & Brands</h3>
                                <div className="text-accent flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest">
                                    Impact Driven <ArrowUpRight size={12} />
                                </div>
                            </div>

                            {/* Card 4: Stats */}
                            <div className="w-[240px] bg-accent rounded-[1.5rem] p-5 shadow-lg">
                                <p className="text-primary font-bold text-[10px] mb-3">Accelerated Growth</p>
                                <div className="flex items-end gap-1.5 h-10">
                                    <div className="h-2/3 w-3 bg-primary/40 rounded-sm" />
                                    <div className="h-full w-3 bg-primary rounded-sm" />
                                    <div className="h-3/4 w-3 bg-primary/60 rounded-sm" />
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
