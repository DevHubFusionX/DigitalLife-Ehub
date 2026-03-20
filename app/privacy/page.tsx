"use client";

import React from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { motion } from "framer-motion";

const PrivacyPage = () => {
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
                        <h1 className="text-4xl md:text-6xl font-black text-primary mb-6 tracking-tight">Privacy Policy</h1>
                        <p className="text-text-secondary mb-12">Last Updated: {lastUpdated}</p>
                        
                        <div className="prose prose-lg max-w-none text-text-secondary space-y-8">
                            <section>
                                <h2 className="text-2xl font-bold text-primary mb-4">1. Introduction</h2>
                                <p>
                                    At DigitalLife Ehub, we value your privacy and are committed to protecting your personal data. This Privacy Policy outlines how we collect, use, and safeguard your information when you visit our website or use our services.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-primary mb-4">2. Information We Collect</h2>
                                <p>
                                    We may collect various types of information, including:
                                </p>
                                <ul className="list-disc pl-6 mt-4 space-y-2">
                                    <li><strong>Personal Information:</strong> Name, email address, phone number, and business details provided during consultation requests.</li>
                                    <li><strong>Usage Data:</strong> Information on how you interact with our website, such as IP address, browser type, and pages visited.</li>
                                    <li><strong>Cookies:</strong> Small data files stored on your device to improve your browsing experience.</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-primary mb-4">3. How We Use Your Information</h2>
                                <p>
                                    The information we collect is used to:
                                </p>
                                <ul className="list-disc pl-6 mt-4 space-y-2">
                                    <li>Provide and improve our business development and brand management services.</li>
                                    <li>Communicate with you regarding your consultation requests and updates.</li>
                                    <li>Analyze website performance and enhance user experience.</li>
                                    <li>Comply with legal obligations.</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-primary mb-4">4. Data Security</h2>
                                <p>
                                    We implement industry-standard security measures to protect your data from unauthorized access, alteration, or disclosure. However, no method of transmission over the internet is 100% secure.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-primary mb-4">5. Third-Party Services</h2>
                                <p>
                                    We may use third-party tools (such as Selar for bookings) that have their own privacy policies. We encourage you to review their terms as well.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold text-primary mb-4">6. Contact Us</h2>
                                <p>
                                    If you have any questions about this Privacy Policy, please contact us via WhatsApp or phone at 09083731989.
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

export default PrivacyPage;
