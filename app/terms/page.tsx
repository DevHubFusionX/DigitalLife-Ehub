"use client";

import React from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { motion } from "framer-motion";

const TermsPage = () => {
    const lastUpdated = "March 19, 2026";
    
    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            
            <section className="pt-40 pb-20 md:pt-48 md:pb-32">
                <div className="container-custom max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-black text-primary mb-6 tracking-tight">Terms of Service</h1>
                        <p className="text-text-secondary mb-12">Last Updated: {lastUpdated}</p>
                        
                        <div className="prose prose-lg max-w-none text-text-secondary space-y-8">
                            <section>
                                <h2 className="text-2xl font-bold text-primary mb-4">1. Acceptance of Terms</h2>
                                <p>
                                    By accessing or using the DigitalLife Ehub website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-primary mb-4">2. Services Offered</h2>
                                <p>
                                    DigitalLife Ehub provides business development, brand management, MSME formalization, and training services. All services are subject to availability and specific engagement agreements.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-primary mb-4">3. Use of Website</h2>
                                <p>
                                    You agree to use this website only for lawful purposes. You are prohibited from using the site to transmit any harmful, defamatory, or infringing content.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-primary mb-4">4. Strategic Engagements</h2>
                                <p>
                                    Consultations and training programs are governed by separate agreements provided at the time of booking. Adherence to these agreements is mandatory for successful outcomes.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-primary mb-4">5. Intellectual Property</h2>
                                <p>
                                    All content, templates, and frameworks provided by DigitalLife Ehub are the intellectual property of the firm. Unauthorized reproduction or distribution is strictly prohibited.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-primary mb-4">6. Limitation of Liability</h2>
                                <p>
                                    DigitalLife Ehub shall not be liable for any direct or indirect damages resulting from the use or inability to use our services or website.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-primary mb-4">7. Governing Law</h2>
                                <p>
                                    These terms shall be governed by and construed in accordance with the laws of the jurisdiction in which DigitalLife Ehub operates.
                                </p>
                            </section>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
};

export default TermsPage;
