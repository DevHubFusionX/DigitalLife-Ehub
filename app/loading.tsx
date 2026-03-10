"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Loading() {
    return (
        <div className="fixed inset-0 z-[100] bg-[#0A0A0B] flex flex-col items-center justify-center overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-accent/5"
            />

            {/* Core Animation */}
            <div className="relative flex flex-col items-center">
                {/* Logo / Icon Hexagon Wrapper */}
                <div className="relative w-24 h-24 mb-10">
                    {/* Pulsing rings */}
                    <motion.div
                        animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.1, 0, 0.1]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute inset-0 border-2 border-accent rounded-full"
                    />
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.2, 0, 0.2]
                        }}
                        transition={{
                            duration: 2,
                            delay: 0.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute inset-0 border border-primary rounded-full"
                    />

                    {/* Central Logo */}
                    <motion.div
                        animate={{
                            y: [0, -8, 0],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="relative z-10 w-full h-full bg-white px-5 py-4 rounded-2xl shadow-2xl border border-white/10 flex items-center justify-center transform-gpu"
                    >
                        <img
                            src="/logo.svg"
                            alt="Loading Logo"
                            className="w-full h-auto"
                        />
                    </motion.div>

                    {/* Scanning Line Effect */}
                    <motion.div
                        animate={{
                            top: ["0%", "100%", "0%"],
                            opacity: [0, 1, 1, 0]
                        }}
                        transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent z-20"
                    />
                </div>

                {/* Typography */}
                <div className="text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl font-black tracking-tight text-white mb-2"
                    >
                        <span className="text-accent italic">Digital</span>Life
                    </motion.h2>

                    <div className="flex items-center justify-center gap-1.5 overflow-hidden">
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-[10px] font-bold text-white/30 uppercase tracking-[0.4em]"
                        >
                            Synchronizing
                        </motion.div>
                        <div className="flex gap-1 pt-0.5">
                            {[0, 1, 2].map((i) => (
                                <motion.div
                                    key={i}
                                    animate={{
                                        opacity: [0.2, 1, 0.2],
                                        scale: [1, 1.2, 1]
                                    }}
                                    transition={{
                                        duration: 1.2,
                                        repeat: Infinity,
                                        delay: i * 0.2
                                    }}
                                    className="w-1 h-1 rounded-full bg-accent"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Tech Stats (Purely Visual) */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="absolute bottom-12 left-12 hidden lg:flex flex-col gap-4"
            >
                <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-black text-white/10 uppercase tracking-widest">System Status</span>
                    <div className="h-[1px] w-24 bg-white/5 relative">
                        <motion.div
                            animate={{ width: ["0%", "100%", "40%", "90%"] }}
                            transition={{ duration: 10, repeat: Infinity }}
                            className="absolute inset-y-0 left-0 bg-accent/40"
                        />
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[9px] font-mono text-white/20">AESTHETIC_ENGINE: ONLINE</span>
                </div>
            </motion.div>
        </div>
    );
}
