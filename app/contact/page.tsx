"use client";

import React from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const ContactPage = () => {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            
            <section className="pt-32 pb-24 md:pt-48 md:pb-40">
                <div className="container-custom px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                        {/* Left Side: Info */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex flex-col"
                        >
                            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-accent block mb-6">Get In Touch</span>
                            <h1 className="text-4xl md:text-7xl font-black text-primary leading-[0.95] tracking-tight mb-8">
                                Let&apos;s Start a <br />
                                <span className="text-accent italic font-serif">Conversation.</span>
                            </h1>
                            <p className="text-text-secondary text-lg font-medium mb-12 max-w-md">
                                Have questions about our community, services, or mentorship programs? Our team is here to help you navigate your growth journey.
                            </p>

                            <div className="space-y-8">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center text-primary">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-primary mb-1">Email Us</h4>
                                        <p className="text-text-secondary">support@digitallife-ehub.com</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center text-primary">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-primary mb-1">Call Us</h4>
                                        <p className="text-text-secondary">+234 (0) 800 000 0000</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center text-primary">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-primary mb-1">Visit Us</h4>
                                        <p className="text-text-secondary">Lagos, Nigeria</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Side: Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-features-bg border border-border-subtle p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-primary/5"
                        >
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-primary/40 ml-1">Full Name</label>
                                        <input 
                                            type="text" 
                                            placeholder="John Doe"
                                            className="w-full bg-white border border-border-subtle rounded-xl px-4 py-4 text-sm font-medium focus:outline-none focus:border-accent transition-colors"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-wider text-primary/40 ml-1">Email Address</label>
                                        <input 
                                            type="email" 
                                            placeholder="john@example.com"
                                            className="w-full bg-white border border-border-subtle rounded-xl px-4 py-4 text-sm font-medium focus:outline-none focus:border-accent transition-colors"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-primary/40 ml-1">Subject</label>
                                    <input 
                                        type="text" 
                                        placeholder="How can we help?"
                                        className="w-full bg-white border border-border-subtle rounded-xl px-4 py-4 text-sm font-medium focus:outline-none focus:border-accent transition-colors"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-primary/40 ml-1">Message</label>
                                    <textarea 
                                        rows={5}
                                        placeholder="Tell us more about your inquiry..."
                                        className="w-full bg-white border border-border-subtle rounded-xl px-4 py-4 text-sm font-medium focus:outline-none focus:border-accent transition-colors resize-none"
                                    ></textarea>
                                </div>
                                <button className="w-full bg-primary text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-primary/95 transition-all group">
                                    Send Message
                                    <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
};

export default ContactPage;
