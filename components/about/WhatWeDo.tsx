"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Target, Settings, Share2, Globe, Rocket } from "lucide-react";
import { useModal } from "@/context/ModalContext";

const WhatWeDo = () => {
    const { openModal } = useModal();
    const pillars = [
        {
            title: "Business Clarity & Strategic Planning",
            desc: "We help you define your direction, refine your vision, and build a practical roadmap for sustainable growth.",
            icon: Target,
            color: "text-blue-600"
        },
        {
            title: "Brand Positioning & Visibility",
            desc: "We position your brand to communicate authority, attract the right audience, and increase opportunities.",
            icon: Sparkles,
            color: "text-amber-600"
        },
        {
            title: "Structure Design & Implementation",
            desc: "We design operational frameworks, workflows, and systems that eliminate chaos and improve efficiency.",
            icon: Settings,
            color: "text-purple-600"
        },
        {
            title: "Social Media Management",
            desc: "Strategic brand presence that convert visibility into revenue.",
            icon: Share2,
            color: "text-pink-600"
        },
        {
            title: "Website Design & Development",
            desc: "Digital campaigns and websites that convert visibility into revenue.",
            icon: Globe,
            color: "text-emerald-600"
        }
    ];

    return (
        <section className="py-16 md:py-32 bg-features-bg border-t border-border-subtle overflow-hidden">
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-12 md:mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-[1.75rem] sm:text-4xl md:text-5xl font-black text-primary mb-4 md:mb-6">What We Do</h2>
                        <p className="text-[15px] md:text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto">
                            We work across critical growth pillars that determine long-term business success. Our mission is to move you from hustle into structured scaling.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mb-12 md:mb-20">
                    {pillars.map((pillar, i) => {
                        const Icon = pillar.icon;
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                                className="group p-6 md:p-10 bg-white border border-border-subtle rounded-2xl md:rounded-[2rem] hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500"
                            >
                                <div className={`w-11 h-11 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gray-50 flex items-center justify-center mb-5 md:mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-500`}>
                                    <Icon size={22} className={pillar.color + " group-hover:text-white transition-colors"} />
                                </div>
                                <h3 className="text-lg md:text-2xl font-bold text-primary mb-2 md:mb-4 leading-tight">
                                    {pillar.title}
                                </h3>
                                <p className="text-text-secondary leading-relaxed text-[13px] md:text-sm">
                                    {pillar.desc}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="p-8 md:p-12 lg:p-16 bg-primary rounded-2xl md:rounded-[3rem] text-center relative overflow-hidden shadow-2xl shadow-primary/20"
                >
                    <div className="absolute inset-0 bg-gradient-premium opacity-50" />
                    <div className="relative z-10">
                        <h3 className="text-xl md:text-4xl font-bold text-white mb-6 md:mb-10 max-w-2xl mx-auto leading-tight">Ready to start your growth journey?</h3>
                        <motion.button
                            onClick={openModal}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 md:px-10 py-4 md:py-5 bg-accent text-primary text-sm md:text-base font-black rounded-full shadow-2xl shadow-accent/20 transition-all group active:scale-95"
                        >
                            Start My Growth Journey Here
                            <Rocket size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default WhatWeDo;
