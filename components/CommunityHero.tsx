"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, Globe, Heart } from "lucide-react";

const CommunityHero = () => {
    return (
        <section className="relative min-h-screen pt-28 md:pt-40 pb-16 md:pb-20 bg-primary overflow-hidden flex items-center">
            {/* Floating ambient blobs — fewer on mobile */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(4)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            x: [0, (i % 2 === 0 ? 40 : -40)],
                            y: [0, (i % 2 === 0 ? -30 : 30)],
                            opacity: [0.08, 0.15, 0.08]
                        }}
                        transition={{
                            duration: 12 + i * 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute w-40 md:w-64 h-40 md:h-64 rounded-full bg-accent/20 blur-[80px] md:blur-[100px]"
                        style={{
                            left: `${15 + i * 22}%`,
                            top: `${10 + i * 20}%`
                        }}
                    />
                ))}
            </div>

            <div className="container-custom relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-5xl"
                >
                    <span className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-accent text-[10px] font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] mb-8 md:mb-12">
                        The Ecosystem
                    </span>

                    {/* Hero Title — responsive asymmetric typography */}
                    <h1 className="text-[2.75rem] leading-[0.9] sm:text-6xl md:text-8xl lg:text-9xl font-black text-white md:leading-[0.85] tracking-tighter mb-10 md:mb-16 relative">
                        People.
                        <br />
                        <span className="text-accent italic font-serif ml-8 sm:ml-16 md:ml-40 block mt-1 md:mt-2">
                            Brands.
                        </span>
                        <span className="block mt-1 md:mt-2">Purpose.</span>

                        {/* Decorative floating icon */}
                        <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="absolute -top-6 md:-top-10 right-0 text-white/10 hidden lg:block"
                        >
                            <Users size={120} strokeWidth={0.5} />
                        </motion.div>
                    </h1>

                    <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-16 items-start">
                        <p className="text-base md:text-2xl text-white/50 leading-relaxed font-light">
                            Digitalife Ehub isn&apos;t just a firm; it&apos;s a thriving network of ambitious MSMEs and SMEs committed to building something that lasts.
                        </p>

                        <div className="space-y-5 md:space-y-8">
                            <div className="flex items-center gap-4 md:gap-6 group">
                                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-primary transition-all duration-500 shrink-0">
                                    <Globe size={20} className="md:w-6 md:h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xs md:text-sm font-bold text-white uppercase tracking-widest mb-0.5 md:mb-1">Impact Global</h3>
                                    <p className="text-[11px] md:text-xs text-white/30">From local roots to international visibility.</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 md:gap-6 group">
                                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-primary transition-all duration-500 shrink-0">
                                    <Heart size={20} className="md:w-6 md:h-6" />
                                </div>
                                <div>
                                    <h3 className="text-xs md:text-sm font-bold text-white uppercase tracking-widest mb-0.5 md:mb-1">Human Centric</h3>
                                    <p className="text-[11px] md:text-xs text-white/30">Building businesses that serve people first.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Side Branding — desktop only */}
            <div className="absolute right-12 top-1/2 -translate-y-1/2 vertical-text hidden 2xl:block overflow-hidden">
                <span className="text-[12rem] font-black text-white/[0.02] uppercase tracking-[0.2em] whitespace-nowrap">
                    COMMUNITY DRIVEN
                </span>
            </div>
        </section>
    );
};

export default CommunityHero;
