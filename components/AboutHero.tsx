"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

const AboutHero = () => {
    const pillars = [
        { title: "Clear direction", desc: "No more second-guessing your next move. Total strategic alignment." },
        { title: "Organized operations", desc: "Systems that work while you sleep. Efficiency by design." },
        { title: "Strong brand presence", desc: "Authority that commands attention and attracts partnerships." },
        { title: "Consistent growth", desc: "Scaling that feels sustainable, predictable, and within your control." }
    ];

    return (
        <section className="relative min-h-screen pt-28 md:pt-40 pb-16 md:pb-32 overflow-hidden bg-primary flex flex-col justify-center">
            {/* Ambient Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,rgba(254,219,84,0.05)_0%,transparent_70%)]" />
                <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>

            <div className="container-custom relative z-10">
                {/* Header Content */}
                <div className="max-w-4xl mb-10 md:mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as const }}
                    >
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-bold uppercase tracking-[0.3em] mb-6 md:mb-8">
                            <span className="w-1 h-1 rounded-full bg-accent animate-ping" />
                            Our Vision
                        </span>
                        <h1 className="text-[2.25rem] leading-[1.15] sm:text-5xl sm:leading-[1.1] lg:text-8xl lg:leading-[1.05] font-light text-white mb-5 md:mb-10 tracking-tight">
                            Imagine having{" "}
                            <br className="hidden sm:block" />
                            <span className="italic font-serif text-accent">this reality.</span>
                        </h1>
                        <p className="text-[15px] sm:text-lg md:text-2xl text-white/50 leading-relaxed font-light max-w-2xl">
                            Move from the chaos of daily hustle into the clarity of sustainable, structured growth. We help you build the systems that make success inevitable.
                        </p>
                    </motion.div>
                </div>

                {/* Desktop Pillar Grid */}
                <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5 rounded-[3rem] overflow-hidden">
                    {pillars.map((pillar, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.8,
                                delay: i * 0.1,
                                ease: [0.16, 1, 0.3, 1] as const
                            }}
                            className="bg-primary p-10 hover:bg-white/[0.02] transition-colors duration-500 group"
                        >
                            <span className="block text-[10px] font-bold text-accent/40 uppercase tracking-[0.3em] mb-12">
                                0{i + 1}
                            </span>
                            <h3 className="text-2xl font-bold text-white mb-6 leading-tight group-hover:text-accent transition-colors">
                                {pillar.title}
                            </h3>
                            <p className="text-white/40 text-sm leading-relaxed">
                                {pillar.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Mobile Pillar Cards — stacked, no marquee */}
                <div className="md:hidden grid grid-cols-2 gap-3 mt-4">
                    {pillars.map((pillar, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.08 }}
                            className="bg-white/5 border border-white/10 p-5 rounded-2xl"
                        >
                            <span className="text-[10px] font-bold text-accent/60 uppercase tracking-[0.2em] mb-3 block">
                                0{i + 1}
                            </span>
                            <h3 className="text-[15px] font-bold text-white mb-1.5 leading-snug">
                                {pillar.title}
                            </h3>
                            <p className="text-[11px] text-white/40 leading-relaxed">
                                {pillar.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="mt-10 md:mt-24 flex flex-col md:flex-row items-center gap-5 md:gap-8 text-center md:text-left"
                >
                    <Link
                        href="#get-started"
                        className="w-full md:w-auto px-10 py-4 bg-white text-primary font-black text-sm md:text-base rounded-full hover:bg-accent transition-all duration-300 active:scale-95 text-center"
                    >
                        Consult Our Growth Team
                    </Link>
                    <p className="text-white/30 text-xs md:text-sm font-medium tracking-wide italic">
                        &quot;Your vision, our structure.&quot;
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default AboutHero;
