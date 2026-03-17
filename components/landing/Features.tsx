"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, Zap, BarChart3, ArrowRight } from "lucide-react";

const Features = () => {
    const products = [
        {
            name: "Community Hub",
            focus: "Your Central Command",
            desc: "The central home for all members, providing daily updates, announcements, resources, and lively discussions to keep you informed.",
            icon: BarChart3,
            stat: "Central",
            color: "var(--color-auth-sales)"
        },
        {
            name: "Sub-Groups",
            focus: "Find Your Tribe",
            desc: "Dive into high-priority business circles tailored to your niche. Connect with like-minded professionals for specialized collaboration.",
            icon: Zap,
            stat: "Networking",
            color: "var(--color-auth-mail)"
        },
        {
            name: "Mentorship Pairing",
            focus: "Expert Guidance",
            desc: "Access our exclusive system connecting you with vetted, high-profile mentors for professional growth and business clarity.",
            icon: Mail,
            stat: "Guidance",
            color: "var(--color-auth-web)"
        }
    ];

    return (
        <section id="services" className="py-32 bg-features-bg">
            <div className="container-custom px-4 md:px-0">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-2xl mb-12 md:mb-20"
                >
                    <h2 className="text-3xl md:text-5xl font-black text-primary mb-4 leading-tight">
                        Key Features.<br />What You Gain Instantly.
                    </h2>
                    <p className="text-base md:text-lg text-text-secondary font-medium">
                        Discover the immediate benefits of joining our community, designed to propel your business forward from day one.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {products.map((product, i) => {
                        const Icon = product.icon;
                        return (
                            <motion.div
                                key={product.name}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group p-6 md:p-8 bg-white border border-border-subtle hover:bg-white rounded-2xl md:rounded-3xl hover:shadow-xl transition-all duration-300"
                            >
                                <div className="flex items-start justify-between mb-4 md:mb-6">
                                    <div className="p-2 md:p-2.5 rounded-lg bg-primary/5 shadow-sm group-hover:scale-110 transition-transform">
                                        <Icon size={20} className="md:size-[22px]" style={{ color: product.color }} />
                                    </div>
                                    <span className="text-[10px] md:text-xs font-bold px-3 py-1.5 rounded-full bg-primary/5 text-primary/60 uppercase tracking-widest">
                                        {product.stat}
                                    </span>
                                </div>

                                <h3 className="text-xl md:text-2xl font-black text-primary mb-1">
                                    {product.name}
                                </h3>
                                <p className="text-[10px] md:text-xs font-bold text-primary/40 uppercase tracking-widest mb-4">
                                    {product.focus}
                                </p>

                                <p className="text-sm md:text-base text-text-secondary leading-relaxed mb-6 font-medium">
                                    {product.desc}
                                </p>

                                <button className="group/btn flex items-center gap-2 text-sm font-bold text-primary/40 hover:text-primary hover:gap-3 transition-all">
                                    Details
                                    <ArrowRight size={14} />
                                </button>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Features;
