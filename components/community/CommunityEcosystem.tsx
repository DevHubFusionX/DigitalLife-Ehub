"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, Briefcase, Palette, TrendingUp, ShieldCheck } from "lucide-react";

const CommunityEcosystem = () => {
    return (
        <section className="py-16 md:py-32 bg-white overflow-hidden">
            <div className="container-custom">
                {/* Header */}
                <div className="flex flex-col lg:flex-row gap-8 md:gap-16 lg:gap-20 items-start lg:items-end mb-12 md:mb-24">
                    <div className="max-w-2xl">
                        <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-primary/40 block mb-4 md:mb-6">Who belongs here</span>
                        <h2 className="text-[1.75rem] leading-tight sm:text-4xl md:text-6xl font-black text-primary md:leading-[1.1]">
                            A diverse network{" "}
                            <br className="hidden sm:block" />
                            built on <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/40">shared growth.</span>
                        </h2>
                    </div>
                    <div className="lg:mb-4">
                        <p className="text-[15px] md:text-lg text-text-secondary leading-relaxed max-w-md border-l-2 border-accent pl-6 md:pl-8">
                            We bring together the thinkers, the builders, and the founders who understand that structure is the bridge to visibility.
                        </p>
                    </div>
                </div>

                {/* Masonry-style Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 md:gap-8">
                    {/* Segment 1: Large */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="sm:col-span-1 lg:col-span-7 group relative p-6 md:p-12 rounded-2xl md:rounded-[3rem] bg-gray-50 border border-border-subtle hover:bg-white hover:shadow-2xl hover:shadow-primary/5 transition-all duration-700 overflow-hidden"
                    >
                        <div className="relative z-10 h-full flex flex-col">
                            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-blue-600 text-white flex items-center justify-center mb-6 md:mb-10 group-hover:scale-110 transition-transform duration-500">
                                <Briefcase size={22} className="md:w-8 md:h-8" />
                            </div>
                            <h3 className="text-xl md:text-3xl font-bold text-primary mb-3 md:mb-6">MSMEs &amp; SMEs</h3>
                            <p className="text-[13px] md:text-lg text-text-secondary leading-relaxed mb-6 md:mb-12 max-w-md">
                                The heartbeat of our community. Small businesses transitioning from informal hustle to structured scaling through our growth frameworks.
                            </p>
                            <div className="mt-auto flex items-center gap-3 md:gap-4">
                                <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-primary">Founders Circle</span>
                                <div className="h-px flex-1 bg-border-subtle" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Segment 2: Medium */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="sm:col-span-1 lg:col-span-5 group relative p-6 md:p-12 rounded-2xl md:rounded-[3rem] bg-features-bg border border-border-subtle hover:bg-white hover:shadow-2xl hover:shadow-primary/5 transition-all duration-700 overflow-hidden"
                    >
                        <div className="relative z-10 flex flex-col h-full">
                            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-purple-600 text-white flex items-center justify-center mb-6 md:mb-10 group-hover:scale-110 transition-transform duration-500">
                                <TrendingUp size={22} className="md:w-8 md:h-8" />
                            </div>
                            <h3 className="text-xl md:text-3xl font-bold text-primary mb-3 md:mb-6">Early-Stage Founders</h3>
                            <p className="text-[13px] md:text-base text-text-secondary leading-relaxed">
                                Visionaries building the foundations of tomorrow with purpose and strategic clarity.
                            </p>
                        </div>
                    </motion.div>

                    {/* Segment 3: Medium */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="sm:col-span-1 lg:col-span-5 group relative p-6 md:p-12 rounded-2xl md:rounded-[3rem] bg-features-bg border border-border-subtle hover:bg-white hover:shadow-2xl hover:shadow-primary/5 transition-all duration-700 overflow-hidden"
                    >
                        <div className="relative z-10 flex flex-col h-full">
                            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-pink-600 text-white flex items-center justify-center mb-6 md:mb-10 group-hover:scale-110 transition-transform duration-500">
                                <Palette size={22} className="md:w-8 md:h-8" />
                            </div>
                            <h3 className="text-xl md:text-3xl font-bold text-primary mb-3 md:mb-6">Creative Partners</h3>
                            <p className="text-[13px] md:text-base text-text-secondary leading-relaxed">
                                Designers and strategists who power the brand visibility pillar for our ecosystem.
                            </p>
                        </div>
                    </motion.div>

                    {/* Segment 4: Large dark */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="sm:col-span-2 lg:col-span-7 group relative p-6 md:p-12 rounded-2xl md:rounded-[3rem] bg-primary text-white overflow-hidden shadow-2xl shadow-primary/20"
                    >
                        <div className="absolute inset-0 bg-gradient-premium opacity-50" />
                        <div className="relative z-10 h-full flex flex-col">
                            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-accent text-primary flex items-center justify-center mb-6 md:mb-10 group-hover:scale-110 transition-transform duration-500">
                                <Users size={22} className="md:w-8 md:h-8" />
                            </div>
                            <h3 className="text-xl md:text-3xl font-bold mb-3 md:mb-6">Impact Leaders</h3>
                            <p className="text-[13px] md:text-lg text-white/70 leading-relaxed mb-6 md:mb-12 max-w-md">
                                Entrepreneurs committed to purpose-driven business development and building sustainable legacy.
                            </p>
                            <button className="mt-auto self-start px-6 md:px-8 py-3 md:py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl md:rounded-2xl text-xs md:text-sm font-bold uppercase tracking-widest transition-all active:scale-95">
                                Join the Network
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default CommunityEcosystem;
