"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    // Pages with white background hero sections
    const isLightHero = pathname === "/services" || pathname === "/trainings";

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close menu when route changes
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    // Prevent scrolling when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isOpen]);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Services", href: "/services" },
        { name: "Community", href: "/community" },
        { name: "Trainings", href: "/trainings" },
    ];

    // Stagger animation for mobile menu items
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.06,
                delayChildren: 0.15,
            },
        },
        exit: {
            opacity: 0,
            transition: { staggerChildren: 0.03, staggerDirection: -1 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, x: 30 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
        exit: { opacity: 0, x: -20, transition: { duration: 0.2 } },
    };

    return (
        <>
            <header
                className={`
                    fixed top-0 left-0 right-0 z-[60] transition-all duration-500
                    ${isScrolled || isOpen
                        ? "bg-white/95 backdrop-blur-xl py-3 md:py-4 shadow-sm border-b border-border-subtle"
                        : "bg-transparent py-4 md:py-6"}
                `}
            >
                <div className="container-custom flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="relative z-[70] flex items-center">
                        <div className="bg-white px-2.5 py-1.5 rounded-xl shadow-sm hover:shadow-md transition-all border border-border-subtle/50 group flex items-center gap-1.5 md:gap-2">
                            <img
                                src="/logo.svg"
                                alt="Logo"
                                className="h-7 w-auto md:h-10 transition-transform group-hover:scale-105"
                            />
                            <span className="text-sm md:text-xl font-black tracking-tight flex items-center">
                                <span className="text-primary italic">DIGITALIFE</span>
                                <span className="text-secondary ml-1 md:ml-2">EHUB</span>
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-10">
                        <ul className="flex items-center gap-8">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className={`
                                            text-sm font-bold transition-all
                                            ${isScrolled
                                                ? "text-primary/60 hover:text-primary"
                                                : isLightHero
                                                    ? "text-primary/60 hover:text-primary"
                                                    : "text-white/70 hover:text-white"}
                                        `}
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <Link
                            href="#start"
                            className="px-6 py-2.5 rounded-xl text-sm font-bold bg-accent text-primary hover:scale-105 hover:shadow-lg transition-all"
                        >
                            Get Started
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle — animated hamburger */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={`
                            md:hidden relative z-[70] w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300 active:scale-90
                            ${isOpen
                                ? "bg-primary/5 text-primary"
                                : isScrolled || isLightHero
                                    ? "text-primary hover:bg-primary/5"
                                    : "text-white hover:bg-white/10"}
                        `}
                        aria-label="Toggle menu"
                    >
                        <div className="w-5 flex flex-col items-end gap-[5px]">
                            <motion.span
                                animate={isOpen ? { rotate: 45, y: 7, width: 20 } : { rotate: 0, y: 0, width: 20 }}
                                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                className="block h-[2px] bg-current rounded-full origin-center"
                                style={{ width: 20 }}
                            />
                            <motion.span
                                animate={isOpen ? { opacity: 0, x: 10 } : { opacity: 1, x: 0 }}
                                transition={{ duration: 0.2 }}
                                className="block h-[2px] bg-current rounded-full"
                                style={{ width: 14 }}
                            />
                            <motion.span
                                animate={isOpen ? { rotate: -45, y: -7, width: 20 } : { rotate: 0, y: 0, width: 20 }}
                                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                className="block h-[2px] bg-current rounded-full origin-center"
                                style={{ width: 17 }}
                            />
                        </div>
                    </button>
                </div>
            </header>

            {/* Mobile Menu — Bottom Sheet Style */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 z-[49] bg-primary/20 backdrop-blur-sm md:hidden"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Menu Panel */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="fixed top-[60px] left-0 right-0 z-[50] md:hidden"
                        >
                            <div className="mx-3 bg-white rounded-2xl shadow-2xl shadow-primary/10 border border-border-subtle overflow-hidden">
                                {/* Nav Links */}
                                <motion.nav
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    className="p-4"
                                >
                                    <ul className="space-y-1">
                                        {navLinks.map((link) => (
                                            <motion.li key={link.name} variants={itemVariants}>
                                                <Link
                                                    href={link.href}
                                                    className={`
                                                        flex items-center justify-between px-4 py-3 rounded-xl text-[15px] font-semibold transition-all duration-200
                                                        ${pathname === link.href
                                                            ? "bg-primary/5 text-primary"
                                                            : "text-primary/50 hover:bg-gray-50 hover:text-primary active:bg-primary/5"}
                                                    `}
                                                >
                                                    <span>{link.name}</span>
                                                    {pathname === link.href && (
                                                        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                                                    )}
                                                </Link>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </motion.nav>

                                {/* CTA */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.35 }}
                                    className="px-4 pb-4 pt-1"
                                >
                                    <Link
                                        href="#start"
                                        className="w-full py-3.5 bg-primary text-white text-sm font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 transition-all active:scale-[0.98]"
                                    >
                                        Get Started
                                        <ArrowRight size={16} />
                                    </Link>
                                </motion.div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
