"use client";

import React from "react";
import Link from "next/link";
import { Twitter, Linkedin, Github, ArrowUpRight } from "lucide-react";

const Footer = () => {
    const links = {
        Services: ["Business Strategy", "Formalization", "Social Media", "Operational Systems", "Web Design"],
        Company: ["About Us", "Our Approach", "Impact", "Community"],
        Legal: ["Privacy Policy", "Terms of Service"]
    };

    return (
        <footer className="bg-primary border-t border-white/10">
            <div className="container-custom py-16 md:py-20">
                {/* Main content */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12 md:mb-16">
                    {/* Brand */}
                    <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="bg-white/10 backdrop-blur-sm px-2.5 py-1.5 rounded-xl border border-white/10 flex items-center gap-2">
                                <img src="/logo.svg" alt="Logo" className="h-7 w-auto md:h-8 brightness-0 invert" />
                                <span className="text-base md:text-lg font-black tracking-tight flex items-center">
                                    <span className="text-white italic">DIGITALIFE</span>
                                    <span className="text-accent ml-1.5 font-bold">EHUB</span>
                                </span>
                            </div>
                        </div>
                        <p className="text-sm text-white/40 leading-relaxed mb-6 max-w-sm">
                            Building People. Brands. Purpose.<br />Structured growth support for MSMEs &amp; SMEs.
                        </p>
                        <div className="flex gap-3">
                            {[Twitter, Linkedin, Github].map((Icon, i) => (
                                <Link
                                    key={i}
                                    href="#"
                                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/30 hover:text-accent hover:border-accent/30 hover:bg-white/10 transition-all"
                                >
                                    <Icon size={18} />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-y-10 gap-x-8">
                        {Object.entries(links).map(([title, items]) => (
                            <div key={title} className="flex flex-col items-start">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-white/25 mb-5 md:mb-6">
                                    {title}
                                </h4>
                                <ul className="space-y-3 md:space-y-4">
                                    {items.map((item) => (
                                        <li key={item}>
                                            <Link
                                                href="#"
                                                className="group text-sm font-medium text-white/50 hover:text-accent transition-colors flex items-center gap-1"
                                            >
                                                {item}
                                                <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6 text-center md:text-left text-xs text-white/25">
                    <p>&copy; 2026 DIGITALIFE EHUB. All rights reserved.</p>
                    <p className="max-w-[220px] md:max-w-none">Built for teams who want results, not complexity.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
