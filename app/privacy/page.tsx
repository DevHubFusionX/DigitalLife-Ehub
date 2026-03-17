"use client";

import React from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { motion } from "framer-motion";

const PrivacyPage = () => {
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
                            Privacy <span className="text-accent italic font-serif">Policy.</span>
                        </motion.h1>

                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="prose prose-lg max-w-none text-text-secondary font-medium space-y-8"
                        >
                            <section>
                                <h2 className="text-2xl font-black text-primary mb-4">1. Introduction</h2>
                                <p>
                                    At DigitalLife Ehub, we value your privacy and are committed to protecting your personal data. This Privacy Policy outlines how we collect, use, and safeguard your information when you visit our website and use our services.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-black text-primary mb-4">2. Data We Collect</h2>
                                <p>
                                    We collect information that you provide directly to us, such as when you create an account, subscribe to our newsletter, or communicate with us. This may include:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 mt-4">
                                    <li>Name and contact information</li>
                                    <li>Account credentials</li>
                                    <li>Payment information</li>
                                    <li>Communications and interactions</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-black text-primary mb-4">3. How We Use Your Data</h2>
                                <p>
                                    We use the information we collect to provide, maintain, and improve our services, communicate with you, and protect our rights. Specific uses include:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 mt-4">
                                    <li>Processing transactions and providing services</li>
                                    <li>Sending technical notices and support messages</li>
                                    <li>Responding to your comments and questions</li>
                                    <li>Monitoring and analyzing trends and usage</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-black text-primary mb-4">4. Data Security</h2>
                                <p>
                                    We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, loss, or alteration. However, no method of transmission over the internet is 100% secure.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-black text-primary mb-4">5. Your Choices</h2>
                                <p>
                                    You have certain rights regarding your personal data, including the right to access, correct, or delete your information. You can also opt-out of receiving promotional communications from us.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-black text-primary mb-4">6. Contact Us</h2>
                                <p>
                                    If you have any questions about this Privacy Policy, please contact us at support@digitallife-ehub.com.
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

export default PrivacyPage;
