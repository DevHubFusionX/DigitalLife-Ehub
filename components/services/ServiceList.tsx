"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Target, FileText, Share2, Globe, Settings } from "lucide-react";
import { useModal } from "@/context/ModalContext";
import Image from "next/image";

const ServiceList = () => {
    const { openModal } = useModal();
    const services = [
        {
            title: "Business Strategy & Clarity",
            focus: "Define. Align. Grow.",
            desc: "Move from a cluttered vision to a crystal-clear strategy. We help you identify your core offerings, target market, and high-impact growth paths.",
            stats: "6-10 Weeks Hands-on Support",
            icon: Target,
            image: "/images/services/strategy.png",
            color: "bg-blue-600"
        },
        {
            title: "MSME Formalization",
            focus: "Structure. Systems. Scale.",
            desc: "Transition from informal hustle to an organized business entity. We handle business registration, setup operational frameworks, and implement scalable systems.",
            stats: "Full Operational Setup",
            icon: FileText,
            image: "/images/services/formalization.png",
            color: "bg-purple-600"
        },
        {
            title: "Brand Management & Social Media",
            focus: "Visibility. Authority. Results.",
            desc: "Don't just be online; be authoritative. We manage your presence across platforms to attract partnerships, customers, and opportunities.",
            stats: "Consistent Market Presence",
            icon: Share2,
            image: "/images/services/brand.png",
            color: "bg-pink-600"
        },
        {
            title: "Website Development",
            focus: "Digital Clarity. High Conversion.",
            desc: "Professional digital homes that command respect and convert visitors into partners. We build scalable, high-performance websites tailored to your growth.",
            stats: "SEO & Performance Optimized",
            icon: Globe,
            image: "/images/services/website.png",
            color: "bg-emerald-600"
        },
        {
            title: "Operational Systems Setup",
            focus: "Efficiency. Workflow. Ease.",
            desc: "Set up the tools and workflows that allow your business to run without constant manual intervention. SOPs, CRMs, and unified communications.",
            stats: "Eliminate Operational Chaos",
            icon: Settings,
            image: "/images/services/operations.png",
            color: "bg-amber-600"
        }
    ];

    return (
        <section className="py-12 md:py-20 bg-white">
            <div className="container-custom">
                <div className="space-y-16 md:space-y-32">
                    {services.map((service, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
                            className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 md:gap-16 lg:gap-24 items-center`}
                        >
                            {/* Visual Side */}
                            <div className="flex-1 w-full">
                                <div className="relative group">
                                    <div className={`absolute inset-0 ${service.color} opacity-[0.03] rounded-2xl md:rounded-[3rem] blur-3xl group-hover:opacity-[0.08] transition-opacity duration-500`} />
                                    <div className="relative aspect-[3/2] md:aspect-[4/3] bg-gray-50 rounded-2xl md:rounded-[3rem] border border-border-subtle overflow-hidden flex items-center justify-center group-hover:border-primary/20 transition-all duration-500">
                                        {service.image ? (
                                            <Image 
                                                src={service.image} 
                                                alt={service.title} 
                                                fill 
                                                className="object-cover group-hover:scale-105 transition-transform duration-700" 
                                            />
                                        ) : (
                                            <service.icon size={80} strokeWidth={0.5} className="text-primary/10 group-hover:scale-110 group-hover:text-primary/20 transition-all duration-700 md:w-[120px] md:h-[120px]" />
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60 pointer-events-none" />

                                        {/* Floating Badge */}
                                        <div className="absolute top-4 left-4 md:top-12 md:left-12 p-2.5 md:p-3 bg-white/90 backdrop-blur-sm rounded-xl md:rounded-2xl shadow-xl shadow-primary/5 flex items-center gap-2 md:gap-3 z-10">
                                            <div className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full ${service.color}`} />
                                            <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-primary/60">Core Pillar</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Content Side */}
                            <div className="flex-1 w-full">
                                <div className="max-w-xl">
                                    <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                                        <span className="text-2xl md:text-4xl font-light text-primary/10 tracking-tighter">0{i + 1}</span>
                                        <div className="h-px flex-1 bg-border-subtle" />
                                    </div>

                                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-primary mb-4 md:mb-6 leading-tight">
                                        {service.title}
                                    </h2>

                                    <div className="flex items-center gap-2 mb-5 md:mb-8">
                                        <div className={`w-1.5 h-1.5 rounded-full ${service.color}`} />
                                        <span className="text-xs md:text-sm font-bold uppercase tracking-[0.15em] md:tracking-[0.2em] text-primary/60">
                                            {service.focus}
                                        </span>
                                    </div>

                                    <p className="text-[15px] md:text-lg text-text-secondary leading-relaxed mb-6 md:mb-10">
                                        {service.desc}
                                    </p>

                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 md:gap-8 border-t border-border-subtle pt-6 md:pt-10">
                                        <div>
                                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/30 block mb-1 md:mb-2">Outcome focus</span>
                                            <span className="text-xs md:text-sm font-bold text-primary">{service.stats}</span>
                                        </div>
                                        <button 
                                            onClick={openModal}
                                            className="group flex items-center gap-2 text-sm text-primary font-bold hover:text-accent transition-colors"
                                        >
                                            Partner With Us
                                            <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ServiceList;
