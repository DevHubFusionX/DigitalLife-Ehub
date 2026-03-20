"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";

const ServicesHero = () => {
    return (
        <section className="relative pt-36 md:pt-40 pb-12 md:pb-20 bg-white overflow-hidden">
            {/* Background Texture/Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            <div className="container-custom relative z-10">
                <div className="max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
                    >
                        <div className="flex items-center gap-3 mb-6 md:mb-8">
                            <div className="w-8 md:w-10 h-[1px] bg-primary" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] text-primary/60">
                                Solutions for scale
                            </span>
                        </div>

                        <h1 className="text-[2.5rem] leading-[1] sm:text-6xl md:text-8xl font-black text-primary md:leading-[0.95] mb-8 md:mb-12 tracking-tighter">
                            Our Core <br className="hidden sm:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-accent">Services.</span>
                        </h1>

                        <div className="flex flex-col sm:flex-row gap-6 md:gap-12 sm:items-end">
                            <p className="text-base md:text-xl text-text-secondary leading-relaxed font-medium max-w-lg">
                                We don&apos;t just provide services; we build the frameworks that transform informal hustle into structured, visible enterprises.
                            </p>
                            <div className="flex items-center gap-3 md:gap-4 text-primary/40">
                                <Zap size={28} strokeWidth={1} className="md:w-10 md:h-10 shrink-0" />
                                <span className="text-xs md:text-sm font-bold uppercase tracking-widest leading-tight">
                                    Strategic Growth <br />Support
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Bottom Border Decorative */}
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border-subtle to-transparent" />
        </section>
    );
};

export default ServicesHero;
