"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Database, Cpu, Network, Workflow } from "lucide-react";

const Grow = () => {
    const nodes = [
        { id: 1, icon: Database, label: "Business Clarity", x: "10%", y: "20%", connections: [2, 3] },
        { id: 2, icon: Cpu, label: "Growth Strategy", x: "50%", y: "15%", connections: [4] },
        { id: 3, icon: Network, label: "Operational Structure", x: "30%", y: "50%", connections: [4] },
        { id: 4, icon: Workflow, label: "Sustainable Visibility", x: "70%", y: "45%", connections: [] }
    ];

    return (
        <section className="relative bg-problem-bg py-32 lg:py-48 overflow-hidden">

            {/* Background Image Texture */}
            <div className="absolute inset-0 z-0 opacity-[0.15] grayscale">
                <Image 
                    src="/images/grow.jpg" 
                    alt="Growth Background" 
                    fill 
                    className="object-cover"
                />
            </div>

            {/* Grid Background */}
            <div
                className="absolute inset-0 opacity-[0.03] z-1"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, var(--color-primary) 1px, transparent 1px),
                        linear-gradient(to bottom, var(--color-primary) 1px, transparent 1px)
                    `,
                    backgroundSize: '60px 60px'
                }}
            />

            {/* Diagonal Lines - Desktop Only */}
            <svg className="hidden md:block absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.1 }}>
                <line x1="0" y1="0" x2="100%" y2="100%" stroke="var(--color-accent)" strokeWidth="1" />
                <line x1="100%" y1="0" x2="0" y2="100%" stroke="var(--color-accent)" strokeWidth="1" />
                <line x1="50%" y1="0" x2="50%" y2="100%" stroke="var(--color-accent)" strokeWidth="1" />
                <line x1="0" y1="50%" x2="100%" y2="50%" stroke="var(--color-accent)" strokeWidth="1" />
            </svg>

            <div className="container-custom relative z-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-3xl mb-12 md:mb-32 px-4 md:px-0"
                >
                    <div className="flex items-center gap-4 mb-4 md:mb-6">
                        <div className="w-8 md:w-12 h-px bg-accent" />
                        <span className="text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.3em] uppercase text-text-on-dark-muted font-bold">Growth Framework</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold md:font-light text-text-on-dark leading-[1.1] mb-6 md:mb-8">
                        How we build
                    </h2>
                    <p className="text-sm md:text-lg text-text-on-dark-muted leading-relaxed max-w-2xl font-medium">
                        A systematic approach to moving businesses from informal hustle to structured, visible, and scalable enterprises.
                    </p>
                </motion.div>

                {/* Logic Flow Diagram - Desktop */}
                <div className="hidden md:block relative h-[600px] lg:h-[700px]">
                    {/* Connection Lines */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        {nodes.map(node =>
                            node.connections.map(targetId => {
                                const target = nodes.find(n => n.id === targetId);
                                if (!target) return null;
                                return (
                                    <motion.line
                                        key={`${node.id}-${targetId}`}
                                        x1={node.x}
                                        y1={node.y}
                                        x2={target.x}
                                        y2={target.y}
                                        stroke="var(--color-accent)"
                                        strokeWidth="3"
                                        strokeDasharray="10 10"
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        whileInView={{ pathLength: 1, opacity: 0.4 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1.5, delay: 0.5 }}
                                    />
                                );
                            })
                        )}
                    </svg>

                    {/* Nodes */}
                    {nodes.map((node, index) => {
                        const Icon = node.icon;
                        return (
                            <motion.div
                                key={node.id}
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                className="absolute"
                                style={{ left: node.x, top: node.y, transform: 'translate(-50%, -50%)' }}
                            >
                                <div className="relative group">
                                    <div className="absolute inset-0 w-32 h-32 rounded-full border border-primary/10 animate-pulse" />
                                    <div className="relative w-24 h-24 bg-white rounded-full border-2 border-primary flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                        <Icon className="w-10 h-10 text-primary" />
                                    </div>
                                    <div className="absolute top-full mt-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
                                        <div className="bg-white px-4 py-2 rounded-lg border border-border-subtle shadow-sm">
                                            <p className="text-sm font-medium text-primary">{node.label}</p>
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 w-24 h-24 rounded-full bg-primary/5 animate-ping" />
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Mobile Logic Flow Diagram - Vertical List */}
                <div className="md:hidden space-y-8 mb-20 relative px-4">
                    {/* Vertical Connection Line */}
                    <div className="absolute left-[32px] top-6 bottom-6 w-px bg-accent/20 border-l border-dashed border-accent/40" />

                    {nodes.map((node, index) => {
                        const Icon = node.icon;
                        return (
                            <motion.div
                                key={node.id}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="relative flex items-start gap-4"
                            >
                                <div className="relative z-10 flex-shrink-0 w-8 h-8 bg-white rounded-full border-2 border-primary flex items-center justify-center shadow-md">
                                    <Icon size={16} className="text-primary" />
                                </div>
                                <div className="flex-1 bg-white/10 border border-white/20 p-4 rounded-xl backdrop-blur-md shadow-lg">
                                    <p className="text-[10px] font-bold text-accent mb-0.5 uppercase tracking-widest">Step 0{index + 1}</p>
                                    <p className="text-base font-bold text-white tracking-tight">{node.label}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Process Steps */}


            </div>
        </section>
    );
};

export default Grow;
