"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search, TrendingUp, Layers, MousePointer2, BarChart3, ArrowRight } from "lucide-react";

const TrainingModules = () => {
    const modules = [
        {
            title: "Business Clarity",
            desc: "Define your direction, refine your vision, and build a practical roadmap.",
            icon: Search,
            color: "border-blue-500/20"
        },
        {
            title: "Growth Strategy",
            desc: "Identify high-impact paths and revenue expansion opportunities.",
            icon: TrendingUp,
            color: "border-purple-500/20"
        },
        {
            title: "Structure & Systems",
            desc: "Master the operational frameworks that eliminate chaos and improve efficiency.",
            icon: Layers,
            color: "border-pink-500/20"
        },
        {
            title: "Brand Positioning",
            desc: "Position your brand to communicate authority and attract the right audience.",
            icon: MousePointer2,
            color: "border-emerald-500/20"
        },
        {
            title: "Sustainable Scaling",
            desc: "Learn practices that allow your business to grow without breaking your operations.",
            icon: BarChart3,
            color: "border-amber-500/20"
        }
    ];

    const audiences = [
        "MSMEs and SMEs",
        "Entrepreneurial communities",
        "NGOs and development programs",
        "Business clusters and cooperatives"
    ];

    return (
        <section className="py-16 md:py-32 bg-white">
            <div className="container-custom">
                {/* Audiences Section */}
                <div className="mb-16 md:mb-32">
                    <div className="flex flex-col lg:flex-row gap-10 md:gap-16 lg:gap-32 items-start lg:items-center">
                        <div className="flex-1">
                            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-primary/40 block mb-4 md:mb-6">Our Focus</span>
                            <h2 className="text-[1.75rem] leading-tight sm:text-4xl md:text-5xl font-black text-primary md:leading-tight mb-5 md:mb-8">
                                Delivering impact for ambitious <span className="text-accent underline decoration-primary/10">communities.</span>
                            </h2>
                            <p className="text-[15px] md:text-lg text-text-secondary leading-relaxed max-w-xl">
                                We specialize in delivering structured training programs for organizations that empower entrepreneurs and build sustainable local economies.
                            </p>
                        </div>
                        <div className="flex-1 w-full grid grid-cols-2 gap-3 md:gap-4">
                            {audiences.map((audience, i) => (
                                <div key={i} className="p-4 md:p-6 rounded-2xl md:rounded-3xl bg-gray-50 border border-border-subtle flex flex-col justify-between min-h-[100px] md:min-h-[128px] group hover:bg-primary transition-all duration-500">
                                    <span className="text-[11px] md:text-xs font-bold text-primary group-hover:text-accent transition-colors leading-tight">{audience}</span>
                                    <ArrowRight className="text-primary/20 group-hover:text-white transition-colors mt-3" size={16} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Modules Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                    {modules.map((module, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08 }}
                            className={`p-6 md:p-10 rounded-2xl md:rounded-[3rem] border ${module.color} bg-white group hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500`}
                        >
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-primary/5 flex items-center justify-center text-primary mb-5 md:mb-10 group-hover:bg-primary group-hover:text-white transition-all">
                                <module.icon size={20} className="md:w-6 md:h-6" />
                            </div>
                            <h3 className="text-lg md:text-2xl font-bold text-primary mb-3 md:mb-6">{module.title}</h3>
                            <p className="text-[13px] md:text-base text-text-secondary leading-relaxed mb-5 md:mb-10">
                                {module.desc}
                            </p>
                            <div className="w-full h-px bg-border-subtle mb-4 md:mb-6" />
                            <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-primary/30">Immediate Implementation</span>
                        </motion.div>
                    ))}

                    {/* CTA Card */}
                    <div className="p-6 md:p-10 rounded-2xl md:rounded-[3rem] bg-primary text-white flex flex-col justify-center relative overflow-hidden group sm:col-span-2 lg:col-span-1">
                        <div className="absolute inset-0 bg-gradient-premium opacity-50" />
                        <div className="relative z-10">
                            <h3 className="text-xl md:text-3xl font-bold mb-5 md:mb-8 leading-tight">Ready to build your next level?</h3>
                            <button className="w-full sm:w-auto px-6 md:px-8 py-3.5 md:py-4 bg-white text-primary rounded-xl md:rounded-2xl font-bold uppercase tracking-widest text-[11px] md:text-xs hover:bg-accent transition-all active:scale-95">
                                Claim Free Consultation
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TrainingModules;
