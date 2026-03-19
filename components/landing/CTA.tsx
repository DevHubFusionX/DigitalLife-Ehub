"use client";

import React from "react";
import { ArrowRight, CheckCircle2, UserPlus } from "lucide-react";
import { motion } from "framer-motion";

const CTA = () => {
    return (
        <section className="py-32 bg-cta-bg relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-premium opacity-50" />

            <div className="container-custom relative z-10">
                <div className="relative">
                    <div className="absolute left-0 top-0 bottom-0 w-px bg-white/10 hidden md:block" />

                    <div className="pl-0 md:pl-20 px-4 md:px-0">
                        <div className="max-w-3xl">
                            {/* Label */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="inline-flex items-center gap-2 mb-6 md:mb-8"
                            >
                                <div className="w-2 h-2 rounded-full bg-accent" />
                                <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-text-on-dark-muted">
                                    Ready to Build
                                </span>
                            </motion.div>

                            {/* Headline */}
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="text-4xl md:text-7xl font-black text-white mb-6 leading-[1.1] tracking-tight"
                            >
                                Move From Hustle<br className="hidden md:block" />to Growth.
                            </motion.h2>

                            {/* Subtext */}
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="text-lg md:text-xl text-text-on-dark-muted mb-10 md:mb-12 leading-relaxed"
                            >
                                Book your free Growth Consultation today. Let’s move you toward sustainable operations and visibility.
                            </motion.p>

                            {/* CTA Buttons */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                                className="flex flex-col sm:flex-row gap-4 mb-12 md:mb-16"
                            >
                                <button className="group px-8 py-4 bg-accent text-primary font-bold rounded-xl hover:scale-105 transition-all flex items-center justify-center gap-2 active:scale-95">
                                    Book Free Consultation
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </button>

                                <a 
                                    href="https://wa.me/2349083731989"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-8 py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-all border border-white/10 active:scale-95 flex items-center justify-center"
                                >
                                    Contact Team
                                </a>
                            </motion.div>

                            {/* Quick benefits */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 }}
                                className="flex flex-wrap gap-4 md:gap-8"
                            >
                                {["Setup in minutes", "No hidden fees", "Global support"].map((item) => (
                                    <div key={item} className="flex items-center gap-2">
                                        <CheckCircle2 size={16} className="text-accent/60" />
                                        <span className="text-xs md:text-sm font-semibold text-text-on-dark-muted">
                                            {item}
                                        </span>
                                    </div>
                                ))}
                            </motion.div>
                        </div>

                        {/* Stats bar */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                            className="mt-16 md:mt-24 pt-10 md:pt-12 border-t border-white/10"
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-16 max-w-2xl">
                                <div className="text-center sm:text-left">
                                    <div className="text-3xl lg:text-4xl font-black text-white mb-1">10,000+</div>
                                    <div className="text-[10px] md:text-xs font-bold text-text-on-dark-muted uppercase tracking-widest text-white/40">Businesses</div>
                                </div>
                                <div className="text-center sm:text-left">
                                    <div className="text-3xl lg:text-4xl font-black text-white mb-1">500+</div>
                                    <div className="text-[10px] md:text-xs font-bold text-text-on-dark-muted uppercase tracking-widest text-white/40">Startups</div>
                                </div>
                                <div className="text-center sm:text-left">
                                    <div className="text-3xl lg:text-4xl font-black text-white mb-1">120%</div>
                                    <div className="text-[10px] md:text-xs font-bold text-text-on-dark-muted uppercase tracking-widest text-white/40">Efficiency</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTA;
