"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Mail, Globe, Zap, BarChart3, ArrowRight } from "lucide-react";

const Features = () => {
    const products = [
        {
            name: "Business Strategy",
            focus: "Growth begins with direction and Stability",
            desc: "We refine your vision and turn it into an actionable growth roadmap, defining your target market and value proposition.",
            icon: BarChart3,
            stat: "Strategic",
            color: "var(--color-auth-sales)"
        },
        {
            name: "MSME Formalization",
            focus: "From informal hustle to structured enterprise",
            desc: "Guidance on formalization, operational system design, workflow structuring, and SOP development.",
            icon: Zap,
            stat: "Structure",
            color: "var(--color-auth-mail)"
        },
        {
            name: "Social Media Management",
            focus: "Visibility with structure — not noise",
            desc: "Strategic brand positioning, structured posting systems, and brand-aligned storytelling that converts.",
            icon: Mail,
            stat: "Visibility",
            color: "var(--color-auth-web)"
        },
        {
            name: "Website Development",
            focus: "Your digital storefront. Built to convert",
            desc: "Custom designs and development for Ecommerce, Blogs, and Portfolios that reflect brand authority.",
            icon: Globe,
            stat: "Digital",
            color: "var(--color-auth-flow)"
        }
    ];

    return (
        <section id="services" className="relative py-32 bg-features-bg overflow-hidden">
            {/* Background Image Texture */}
            <div className="absolute inset-0 z-0 opacity-[0.1] grayscale pointer-events-none">
                <Image 
                    src="/images/features.jpg" 
                    alt="Features Background" 
                    fill 
                    className="object-cover"
                />
            </div>
            <div className="container-custom relative z-10 px-4 md:px-0">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-2xl mb-12 md:mb-20"
                >
                    <h2 className="text-3xl md:text-5xl font-black text-primary mb-4 leading-tight">
                        Our Core Services.<br />Built for Scale.
                    </h2>
                    <p className="text-base md:text-lg text-text-secondary font-medium">
                        Tailored business development support designed to move you from hustle to structured growth.
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

                                <Link href="/services" className="group/btn flex items-center gap-2 text-sm font-bold text-primary/40 hover:text-primary hover:gap-3 transition-all outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm">
                                    Details
                                    <ArrowRight size={14} />
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Features;
