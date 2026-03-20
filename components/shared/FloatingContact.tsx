"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, PhoneCall, X } from "lucide-react";

const FloatingContact = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    const contacts = [
        {
            name: "WhatsApp",
            icon: MessageCircle,
            href: "https://wa.me/2349083731989",
            color: "bg-[#25D366]",
            label: "Chat on WhatsApp"
        },
        {
            name: "Business Clarity Call",
            icon: PhoneCall,
            href: "https://selar.com/71g17u467o",
            color: "bg-accent",
            label: "Book Clarity Call"
        }
    ];

    return (
        <div className="fixed bottom-10 right-6 z-[100] flex flex-col items-end gap-4">
            <AnimatePresence>
                {isOpen && (
                    <div className="flex flex-col items-end gap-3 mb-2">
                        {contacts.map((contact, index) => (
                            <motion.a
                                key={contact.name}
                                href={contact.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.5, y: 20 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-center gap-3 group"
                            >
                                <span className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg text-[10px] font-bold text-primary shadow-xl border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                                    {contact.label}
                                </span>
                                <div className={`w-12 h-12 ${contact.color} rounded-2xl flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-transform active:scale-95`}>
                                    <contact.icon size={22} />
                                </div>
                            </motion.a>
                        ))}
                    </div>
                )}
            </AnimatePresence>

            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-14 h-14 rounded-2xl shadow-2xl flex items-center justify-center transition-all duration-500 active:scale-90 ${
                    isOpen ? "bg-[#111] text-white rotate-180" : "bg-white text-primary hover:bg-white/90"
                }`}
            >
                {isOpen ? <X size={24} /> : (
                    <div className="relative">
                        <MessageCircle size={28} />
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full border-2 border-white animate-pulse" />
                    </div>
                )}
            </button>
        </div>
    );
};

export default FloatingContact;
