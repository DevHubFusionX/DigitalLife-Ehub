"use client";

import React from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { motion } from "framer-motion";

const TermsPage = () => {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            
            <section className="pt-32 pb-24 md:pt-48 md:pb-40">
                <div className="container-custom px-4">
                    <div className="max-w-4xl mx-auto">
                        <motion.span 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-accent block mb-6"
                        >
                            Legal Documentation
                        </motion.span>
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-6xl font-black text-primary mb-12"
                        >
                            Terms of <span className="text-accent italic font-serif">Service.</span>
                        </motion.h1>

                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="prose prose-lg max-w-none text-text-secondary font-medium space-y-8"
                        >
                            <section>
                                <h2 className="text-2xl font-black text-primary mb-4">1. Acceptance of Terms</h2>
                                <p>
                                    By accessing or using DigitalLife Ehub, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using this site.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-black text-primary mb-4">2. Use License</h2>
                                <p>
                                    Permission is granted to temporarily download one copy of the materials on DigitalLife Ehub for personal, non-commercial transitory viewing only.
                                </p>
                                <p className="mt-4">This is the grant of a license, not a transfer of title, and under this license you may not:</p>
                                <ul className="list-disc pl-6 space-y-2 mt-2">
                                    <li>Modify or copy the materials</li>
                                    <li>Use the materials for any commercial purpose</li>
                                    <li>Attempt to decompile or reverse engineer any software</li>
                                    <li>Remove any copyright or other proprietary notations</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-black text-primary mb-4">3. Disclaimer</h2>
                                <p>
                                    The materials on DigitalLife Ehub are provided on an 'as is' basis. DigitalLife Ehub makes no warranties, expressed or implied, and hereby disclaims all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-black text-primary mb-4">4. Limitations</h2>
                                <p>
                                    In no event shall DigitalLife Ehub or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on DigitalLife Ehub.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-black text-primary mb-4">5. Governing Law</h2>
                                <p>
                                    These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
                                </p>
                            </section>
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
};

export default TermsPage;
