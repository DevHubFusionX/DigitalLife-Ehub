"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Ensuring the preloader shows for at least a second for "premium" feel 
        // and then fades out once the component is mounted.
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2200);

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
                    className="fixed inset-0 z-[200] bg-[#0A0A0B] flex flex-col items-center justify-center overflow-hidden"
                >
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
                        <div className="relative w-20 h-20 mb-8">
                            {/* Pulsing rings */}
                            <motion.div
                                animate={{
                                    scale: [1, 1.6, 1],
                                    opacity: [0.1, 0, 0.1]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="absolute inset-0 border-2 border-accent rounded-full"
                            />

                            {/* Central Logo Wrapper */}
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                className="relative z-10 w-full h-full bg-white px-4 py-3 rounded-2xl shadow-2xl flex items-center justify-center"
                            >
                                <img
                                    src="/logo.svg"
                                    alt="DigitalLife"
                                    className="w-full h-auto"
                                />
                            </motion.div>
                        </div>

                        
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
