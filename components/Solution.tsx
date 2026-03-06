"use client";

import React from "react";
import { motion } from "framer-motion";

const Solution = () => {
    const fadeUp = {
        initial: { opacity: 0, y: 40 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const }
    };

    return (
        <section className="relative bg-solution-bg py-32 lg:py-48">
            <div className="container-custom">

                {/* Asymmetric Header */}
                <div className="max-w-5xl mb-16 md:mb-32">
                    <motion.div {...fadeUp} className="flex items-start gap-6 md:gap-12 mb-8">
                        <div className="w-1 h-16 md:h-24 bg-primary mt-2" />
                        <div>
                            <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-text-secondary mb-4 md:mb-6 font-bold">The Approach</p>
                            <h2 className="text-4xl md:text-5xl lg:text-7xl font-light text-primary leading-[1.1] tracking-tight">
                                Built for clarity,<br />
                                designed for structure
                            </h2>
                        </div>
                    </motion.div>
                </div>

                {/* Staggered Content Blocks */}
                <div className="space-y-24 md:space-y-48">

                    {/* Block 1 - Focus: Clarity */}
                    <motion.div
                        {...fadeUp}
                        transition={{ delay: 0.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] as const }}
                        className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-center"
                    >
                        <div className="lg:col-span-5 lg:col-start-1">
                            <div className="space-y-6">
                                <div className="inline-block px-4 py-1.5 bg-primary/5 rounded-full">
                                    <span className="text-xs tracking-wider text-primary/60 font-bold">01</span>
                                </div>
                                <h3 className="text-3xl lg:text-4xl font-light text-primary leading-tight">
                                    Clarity
                                </h3>
                                <p className="text-base md:text-lg text-text-secondary leading-relaxed max-w-md">
                                    Know exactly what you offer, who you serve, and how you grow with our strategic development support.
                                </p>
                            </div>
                        </div>
                        <div className="lg:col-span-6 lg:col-start-7">
                            <div className="aspect-[16/10] lg:aspect-[4/3] bg-gradient-to-br from-primary/5 to-primary/10 rounded-3xl" />
                        </div>
                    </motion.div>

                    {/* Block 2 - Focus: Structure */}
                    <motion.div
                        {...fadeUp}
                        transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] as const }}
                        className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-center"
                    >
                        <div className="lg:col-span-6 lg:col-start-1 order-2 lg:order-1">
                            <div className="aspect-[16/10] lg:aspect-[4/3] bg-gradient-to-br from-accent/20 to-accent/5 rounded-3xl" />
                        </div>
                        <div className="lg:col-span-5 lg:col-start-8 order-1 lg:order-2">
                            <div className="space-y-6">
                                <div className="inline-block px-4 py-1.5 bg-primary/5 rounded-full">
                                    <span className="text-xs tracking-wider text-primary/60 font-bold">02</span>
                                </div>
                                <h3 className="text-3xl lg:text-4xl font-light text-primary leading-tight">
                                    Structure
                                </h3>
                                <p className="text-base md:text-lg text-text-secondary leading-relaxed max-w-md">
                                    Move from informal operations to organized systems that scale. We eliminate operational chaos through SOPs and workflows.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Block 3 - Focus: Visibility & Stats */}
                    <motion.div
                        {...fadeUp}
                        transition={{ delay: 0.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] as const }}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <div className="space-y-8">
                            <div className="inline-block px-4 py-1.5 bg-primary/5 rounded-full">
                                <span className="text-xs tracking-wider text-primary/60 font-bold">03</span>
                            </div>
                            <h3 className="text-3xl lg:text-5xl font-light text-primary leading-tight">
                                Visibility
                            </h3>
                            <p className="text-base md:text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto px-4">
                                Position your brand to attract opportunities, customers, and partnerships.
                                Because when clarity meets structure, visibility follows.
                            </p>
                            <div className="pt-8 px-4">
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-0 items-center px-6 py-10 md:px-12 md:py-8 bg-white rounded-3xl shadow-sm border border-border-subtle">
                                    <div className="text-center">
                                        <div className="text-4xl font-light text-primary mb-1">10k+</div>
                                        <div className="text-[10px] tracking-[0.2em] text-primary/40 uppercase font-bold">Businesses</div>
                                    </div>
                                    <div className="hidden sm:block w-px h-12 bg-primary/10 mx-auto" />
                                    <div className="text-center">
                                        <div className="text-4xl font-light text-primary mb-1">120%</div>
                                        <div className="text-[10px] tracking-[0.2em] text-primary/40 uppercase font-bold">Efficiency</div>
                                    </div>
                                    <div className="hidden sm:block w-px h-12 bg-primary/10 mx-auto" />
                                    <div className="text-center">
                                        <div className="text-4xl font-light text-primary mb-1">4.9</div>
                                        <div className="text-[10px] tracking-[0.2em] text-primary/40 uppercase font-bold">Rating</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </div>

            </div>
        </section>
    );
};

export default Solution;
