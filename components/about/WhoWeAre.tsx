"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, Layout, TrendingUp, Calendar } from "lucide-react";

const WhoWeAre = () => {
    const roles = [
        {
            title: "Strategic Thinkers",
            desc: "We analyze the variables that others miss to find your unique path to growth.",
            icon: Users,
            color: "bg-blue-500"
        },
        {
            title: "System Builders",
            desc: "We don't just advise; we engineer the workflows and SOPs that eliminate chaos.",
            icon: Layout,
            color: "bg-purple-500"
        },
        {
            title: "Growth Partners",
            desc: "Your success is our metric. We walk the path with you, from hustle to scale.",
            icon: TrendingUp,
            color: "bg-emerald-500"
        }
    ];

    return (
        <section className="py-16 md:py-32 bg-white overflow-hidden">
            <div className="container-custom">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Left: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
                        className="text-center lg:text-left"
                    >
                        <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-primary/40 mb-4 md:mb-6 block">Our Identity</span>
                        <h2 className="text-[1.75rem] leading-tight sm:text-4xl md:text-5xl font-black text-primary mb-5 md:mb-8">
                          Who We Are
                        </h2>
                        <p className="text-[15px] md:text-lg text-text-secondary leading-relaxed mb-8 md:mb-12 max-w-xl mx-auto lg:mx-0">
                            Digitalife Ehub is a business development and brand management firm focused on empowering MSMEs, SMEs, early-stage entrepreneurs, and informal businesses to build structured, scalable, and visible enterprises.
                        </p>

                        <div className="flex justify-center lg:justify-start">
                            <motion.a
                                href="https://selar.com/71g17u467o"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-primary text-white text-sm font-bold rounded-2xl shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all group active:scale-95"
                            >
                                Book a 30 min Clarity Call
                                <Calendar size={18} className="group-hover:rotate-12 transition-transform" />
                            </motion.a>
                        </div>
                    </motion.div>

                    {/* Right: Visual Cards */}
                    <div className="relative">
                        <div className="space-y-4 md:space-y-6">
                            {roles.map((role, i) => {
                                const Icon = role.icon;
                                return (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: 40 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: i * 0.15 }}
                                        className="relative group p-5 md:p-8 rounded-2xl border border-border-subtle hover:border-primary/20 bg-white hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500"
                                    >
                                        <div className="flex items-start gap-4 md:gap-6">
                                            <div className={`p-2.5 md:p-3 rounded-xl ${role.color} text-white shadow-lg shrink-0`}>
                                                <Icon size={20} />
                                            </div>
                                            <div>
                                                <h3 className="text-base md:text-xl font-bold text-primary mb-1">{role.title}</h3>
                                                <p className="text-xs md:text-sm text-text-secondary leading-relaxed">{role.desc}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Decorative Background Element */}
                        <div className="absolute -top-10 -right-10 w-48 md:w-64 h-48 md:h-64 bg-accent/5 rounded-full blur-3xl -z-10" />
                        <div className="absolute -bottom-10 -left-10 w-32 md:w-48 h-32 md:h-48 bg-primary/5 rounded-full blur-3xl -z-10" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhoWeAre;
