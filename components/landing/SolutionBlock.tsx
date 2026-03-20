"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface SolutionBlockProps {
    number: string;
    title: string;
    description: string;
    image?: string;
    isReversed?: boolean;
    index: number;
}

const SolutionBlock = ({ number, title, description, image, isReversed, index }: SolutionBlockProps) => {
    const fadeUp = {
        initial: { opacity: 0, y: 40 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { 
            duration: 0.9, 
            delay: index * 0.1,
            ease: [0.16, 1, 0.3, 1] as const 
        }
    };

    return (
        <motion.div
            {...fadeUp}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-center"
        >
            <div className={`lg:col-span-5 ${isReversed ? "lg:col-start-8 order-1 lg:order-2" : "lg:col-start-1"}`}>
                <div className="space-y-6">
                    <div className="inline-block px-4 py-1.5 bg-primary/5 rounded-full">
                        <span className="text-xs tracking-wider text-primary/60 font-bold">{number}</span>
                    </div>
                    <h3 className="text-3xl lg:text-4xl font-light text-primary leading-tight">
                        {title}
                    </h3>
                    <p className="text-base md:text-lg text-text-secondary leading-relaxed max-w-md">
                        {description}
                    </p>
                </div>
            </div>
            <div className={`lg:col-span-6 ${isReversed ? "lg:col-start-1 order-2 lg:order-1" : "lg:col-start-7"}`}>
                <div className="relative aspect-16/10 lg:aspect-4/3 bg-linear-to-br from-primary/5 to-primary/10 rounded-3xl overflow-hidden shadow-2xl">
                    {image ? (
                        <Image 
                            src={image} 
                            alt={title} 
                            fill 
                            className="object-cover transition-transform duration-700 hover:scale-105"
                        />
                    ) : (
                        <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-primary/10" />
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default SolutionBlock;
