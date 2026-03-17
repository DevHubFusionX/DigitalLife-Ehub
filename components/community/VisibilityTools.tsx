"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Calendar, BookOpen } from "lucide-react";

const VisibilityTools = () => {
    const tools = [
        {
            title: "Visibility Tools & Engines",
            desc: "Access storytelling templates, visibility challenges, weekly spotlight features, and social media content prompts to increase your online presence.",
            icon: Sparkles,
            color: "bg-amber-500"
        },
        {
            title: "Events & Hangouts",
            desc: "Participate in monthly physical visibility hangouts, networking sessions, workshops, and virtual accountability check-ins.",
            icon: Calendar,
            color: "bg-blue-500"
        },
        {
            title: "Learning Library",
            desc: "A comprehensive collection of business guides, AI tools training, marketing lessons, and expert sessions for self-paced learning.",
            icon: BookOpen,
            color: "bg-emerald-500"
        }
    ];

    return (
        <section className="py-24 md:py-32 bg-gray-50 overflow-hidden">
            <div className="container-custom">
                <div className="max-w-3xl mb-16 md:mb-24 px-4">
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-primary/40 block mb-4">Amplify Your Reach</span>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-primary leading-tight">
                        Visibility & <br /> Learning Tools.
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
                    {tools.map((tool, i) => {
                        const Icon = tool.icon;
                        return (
                            <motion.div
                                key={tool.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group p-8 bg-white border border-border-subtle rounded-3xl hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500"
                            >
                                <div className={`w-14 h-14 ${tool.color} text-white rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                                    <Icon size={28} />
                                </div>
                                <h3 className="text-xl font-bold text-primary mb-4">{tool.title}</h3>
                                <p className="text-text-secondary leading-relaxed text-sm md:text-base">
                                    {tool.desc}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default VisibilityTools;
