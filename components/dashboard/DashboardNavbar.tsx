"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Bell, ChevronDown, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

const tabs = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Upgrade", href: "/dashboard/upgrade" },
    { name: "Contact", href: "/dashboard/contact" },
    { name: "AuthMail", href: "/dashboard/authmail" },
    { name: "AuthoFlow", href: "/dashboard/authoflow" },
    { name: "AuthWeb", href: "/dashboard/authweb" },
    { name: "AuthSales", href: "/dashboard/authsales" },
    { name: "Help", href: "/dashboard/help" },
];

const DashboardNavbar = () => {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Close menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isMenuOpen]);

    return (
        <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-[#E5E7EB]">
            <div className="h-16 px-4 md:px-8 flex items-center justify-between">
                {/* Left Section: Logo & Mobile Menu Toggle */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setIsMenuOpen(true)}
                        className="lg:hidden p-2 -ml-2 text-[#4F46E5] hover:bg-slate-50 rounded-lg"
                    >
                        <Menu size={20} />
                    </button>
                    <Link href="/dashboard" className="flex items-center gap-2 shrink-0">
                        <img src="/logo.svg" alt="Logo" className="h-8 w-auto hidden sm:block" />
                        <span className="text-xl font-black tracking-tight">
                            <span className="text-[#F59E0B]">Digital</span>
                            <span className="text-[#4F46E5]">Life</span>
                        </span>
                    </Link>
                </div>

                {/* Tabs - Desktop */}
                <nav className="hidden lg:flex items-center gap-4 ml-8 h-full">
                    {tabs.map((tab) => {
                        const isActive = pathname === tab.href ||
                            (pathname === '/dashboard' && tab.href === '/dashboard');

                        return (
                            <Link
                                key={tab.name}
                                href={tab.href}
                                className={`relative h-full flex items-center px-1 text-[13px] font-bold transition-colors ${isActive
                                        ? "text-[#4F46E5]"
                                        : "text-[#6B7280] hover:text-[#4F46E5]"
                                    }`}
                            >
                                {tab.name}
                                {isActive && (
                                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#2327A9] rounded-t-full" />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Right Section: Actions */}
                <div className="flex items-center gap-2 md:gap-4 ml-auto">
                    <button className="p-2 rounded-full text-[#2327A9] hover:bg-[#EEF2FF] transition-all relative">
                        <Bell size={18} />
                        <span className="absolute top-[6px] right-[6px] w-2 h-2 bg-[#EF4444] rounded-full border border-white" />
                    </button>
                    <div className="hidden sm:block w-px h-6 bg-[#E5E7EB] mx-1" />
                    <button className="flex items-center gap-2 p-1 pr-2 rounded-full hover:bg-slate-50 transition-all border border-transparent hover:border-[#E5E7EB]">
                        <div className="w-8 h-8 rounded-full bg-[#EAEAF3] text-[#2A2B6A] flex items-center justify-center text-[12px] font-black border border-[#2A2B6A]/10">
                            <img src="https://i.pravatar.cc/150?img=11" alt="Avatar" className="w-full h-full rounded-full object-cover" />
                        </div>
                        <ChevronDown size={14} className="hidden sm:block text-[#6B7280]" />
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Overlay */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-50 lg:hidden flex">
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={() => setIsMenuOpen(false)}
                    />

                    {/* Sliding Menu Panel */}
                    <div className="relative w-full max-w-xs bg-white h-full flex flex-col shadow-2xl animate-in slide-in-from-left duration-200">
                        <div className="h-16 px-4 flex items-center justify-between border-b border-[#E5E7EB]">
                            <Link href="/dashboard" className="flex items-center gap-2 shrink-0">
                                <span className="text-xl font-black tracking-tight">
                                    <span className="text-[#F59E0B]">Digital</span>
                                    <span className="text-[#4F46E5]">Life</span>
                                </span>
                            </Link>
                            <button
                                onClick={() => setIsMenuOpen(false)}
                                className="p-2 -mr-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <nav className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-1">
                            {tabs.map((tab) => {
                                const isActive = pathname === tab.href ||
                                    (pathname === '/dashboard' && tab.href === '/dashboard');

                                return (
                                    <Link
                                        key={tab.name}
                                        href={tab.href}
                                        className={`px-4 py-3 rounded-xl text-[14px] font-bold transition-colors flex items-center ${isActive
                                                ? "bg-[#EEF2FF] text-[#4F46E5]"
                                                : "text-[#6B7280] hover:text-[#4F46E5] hover:bg-slate-50"
                                            }`}
                                    >
                                        {tab.name}
                                    </Link>
                                );
                            })}
                        </nav>

                        <div className="p-4 border-t border-[#E5E7EB]">
                            <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-all border border-[#E5E7EB]">
                                <div className="w-10 h-10 rounded-full bg-[#EAEAF3] text-[#2A2B6A] flex items-center justify-center text-[14px] font-black border border-[#2A2B6A]/10">
                                    <img src="https://i.pravatar.cc/150?img=11" alt="Avatar" className="w-full h-full rounded-full object-cover" />
                                </div>
                                <div className="flex flex-col items-start flex-1">
                                    <span className="text-[14px] font-bold text-[#1F2937]">Emili Jones</span>
                                    <span className="text-[12px] text-[#6B7280]">View Profile</span>
                                </div>
                                <ChevronDown size={16} className="text-[#6B7280]" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default DashboardNavbar;
