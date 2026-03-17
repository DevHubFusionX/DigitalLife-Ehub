"use client";

import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Users, ShoppingCart, Rocket, ArrowRight } from "lucide-react";

const OpportunityBoard = () => {
    const opps = [
        { label: "Job opportunities", icon: Briefcase },
        { label: "Collaboration offers", icon: Users },
        { label: "Vendor requests", icon: ShoppingCart },
        { label: "Partnership openings", icon: Rocket }
    ];

    return (
        <section className="py-24 md:py-32 bg-primary text-white overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-premium opacity-50" />
            
            <div className="container-custom relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center px-4">
                    <div>
                        <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-accent block mb-6">Seamless Integration</span>
                        <h2 className="text-4xl md:text-6xl text-white mb-8 leading-tight">
                            Opportunity <br /> Board.
                        </h2>
                        <p className="text-white/70 text-lg md:text-xl leading-relaxed mb-12 max-w-xl">
                            Monetize your skills, gain new clients, and discover fresh business opportunities within our thriving ecosystem.
                        </p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                            {opps.map((opp, i) => {
                                const Icon = opp.icon;
                                return (
                                    <motion.div 
                                        key={opp.label}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex items-center gap-4 bg-white/5 border border-white/10 p-5 rounded-2xl"
                                    >
                                        <div className="w-10 h-10 bg-accent text-primary rounded-xl flex items-center justify-center">
                                            <Icon size={20} />
                                        </div>
                                        <span className="font-bold text-sm tracking-tight">{opp.label}</span>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="bg-white text-primary p-8 md:p-12 rounded-2xl shadow-2xl">
                        <h3 className="text-2xl md:text-3xl font-black mb-6 italic">Onboarding & <br /> Starter Kit</h3>
                        <p className="text-text-secondary leading-relaxed mb-10 font-medium">
                            Ensures a smooth start, faster integration, and higher engagement from day one.
                        </p>
                        <ul className="space-y-5 mb-12">
                            {[
                                "Guides new members on active participation",
                                "Introduces community values and culture",
                                "Explains how to leverage groups and tools"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center shrink-0 mt-0.5">
                                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                                    </div>
                                    <span className="text-sm md:text-base font-bold text-primary/80">{item}</span>
                                </li>
                            ))}
                        </ul>
                        <button className="w-full flex items-center justify-center gap-2 py-4 bg-primary text-white font-bold rounded-2xl hover:scale-105 transition-all">
                            Get Your Starter Kit
                            <ArrowRight size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OpportunityBoard;
