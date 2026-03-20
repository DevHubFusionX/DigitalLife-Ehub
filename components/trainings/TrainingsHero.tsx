"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { BookOpen, GraduationCap } from "lucide-react";

const TrainingsHero = () => {
    const tags = ["Practical", "Strategic", "Tailored"];

    return (
        <section className="relative min-h-dvh pt-20 md:pt-40 pb-16 md:pb-24 bg-white overflow-hidden flex items-center">
            {/* Background Image Texture */}
            <div className="absolute inset-0 z-0 opacity-[0.15] grayscale pointer-events-none">
                <Image 
                    src="/images/tranning.jfif" 
                    alt="Trainings Background" 
                    fill 
                    className="object-cover"
                />
            </div>
            {/* Background Aesthetic */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gray-50/50 -skew-x-12 translate-x-1/4 pointer-events-none hidden md:block z-1" />

            <div className="container-custom relative z-10">
                <div className="max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
                    >
                        <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
                            <span className="p-2 bg-primary/5 rounded-xl text-primary">
                                <GraduationCap size={18} className="md:w-5 md:h-5" />
                            </span>
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] text-primary/60">
                                Educational Frameworks
                            </span>
                        </div>

                        <h1 className="text-[2.5rem] leading-[1] sm:text-6xl md:text-8xl font-black text-primary md:leading-[1] mb-8 md:mb-12 tracking-tighter">
                            Build Your{" "}
                            <br className="hidden sm:block" />
                            <span className="italic font-serif text-accent">Next Level.</span>
                        </h1>

                        <p className="text-base md:text-2xl text-text-secondary leading-relaxed font-medium max-w-2xl mb-8 md:mb-12">
                            Empowering people to build stronger businesses. We don&apos;t just teach theory; we equip you with practical frameworks for immediate growth.
                        </p>

                        <div className="flex flex-wrap gap-4 md:gap-8">
                            {tags.map((tag) => (
                                <div key={tag} className="flex items-center gap-2 md:gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                                    <span className="text-xs md:text-sm font-bold text-primary/70 uppercase tracking-widest">{tag}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Floating Decorative Element — desktop only */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                className="absolute -right-20 top-40 opacity-[0.03] select-none pointer-events-none hidden lg:block"
            >
                <BookOpen size={300} strokeWidth={0.5} />
            </motion.div>
        </section>
    );
};

export default TrainingsHero;
