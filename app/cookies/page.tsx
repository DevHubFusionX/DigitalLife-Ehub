"use client";

import React from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { motion } from "framer-motion";

const CookiesPage = () => {
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
                            Cookie <span className="text-accent italic font-serif">Policy.</span>
                        </motion.h1>

                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="prose prose-lg max-w-none text-text-secondary font-medium space-y-8"
                        >
                            <section>
                                <h2 className="text-2xl font-black text-primary mb-4">1. What are Cookies?</h2>
                                <p>
                                    Cookies are small text files that are stored on your device when you visit a website. They are widely used to make websites work more efficiently and to provide information to the owners of the site.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-black text-primary mb-4">2. How We Use Cookies</h2>
                                <p>
                                    We use cookies for several reasons, including:
                                </p>
                                <ul className="list-disc pl-6 space-y-2 mt-4">
                                    <li><strong>Essential Cookies:</strong> Necessary for the website to function properly.</li>
                                    <li><strong>Performance Cookies:</strong> Help us understand how visitors interact with our site.</li>
                                    <li><strong>Functional Cookies:</strong> Remember your preferences and settings.</li>
                                    <li><strong>Targeting Cookies:</strong> Used to deliver relevant advertisements.</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-black text-primary mb-4">3. Managing Cookies</h2>
                                <p>
                                    Most web browsers allow you to control cookies through their settings. You can set your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our services.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-black text-primary mb-4">4. Updates to this Policy</h2>
                                <p>
                                    We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new policy on this page.
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

export default CookiesPage;
