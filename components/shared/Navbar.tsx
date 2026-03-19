"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { useModal } from "@/context/ModalContext";

const NAV_LINKS = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Community", href: "/community" },
    { name: "Trainings", href: "/trainings" },
];

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const { openModal } = useModal();
    const pathname = usePathname();

    const isLightHero = pathname === "/services" || pathname === "/trainings";

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (isOpen) setIsOpen(false);
    }, [pathname, isOpen]);

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "unset";
    }, [isOpen]);

    const getTextColor = () => {
        if (isScrolled || isLightHero) return "text-primary/60 hover:text-primary";
        return "text-white/70 hover:text-white";
    };

    const menuVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
        exit: { opacity: 0, transition: { staggerChildren: 0.03, staggerDirection: -1 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -30 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
        exit: { opacity: 0, x: -20, transition: { duration: 0.2 } },
    };

    return (
        <>
            <header className={`fixed inset-x-0 top-0 z-[60] transition-all duration-500 ${
                isScrolled || isOpen
                    ? "bg-white/95 backdrop-blur-xl py-3 md:py-4 shadow-sm border-b border-border-subtle"
                    : "bg-transparent py-4 md:py-6"
            }`}>
                <div className="container-custom flex items-center justify-between">
                    <Link href="/" className="relative z-[70]">
                        <div className="bg-white px-2.5 py-1.5 rounded-xl shadow-sm hover:shadow-md transition-all border border-border-subtle/50 group flex items-center gap-1.5 md:gap-2">
                            <img src="/logo.svg" alt="Logo" className="h-7 w-auto md:h-10 transition-transform group-hover:scale-105" />
                            <span className="text-sm md:text-xl font-black tracking-tight">
                                <span className="text-primary italic">DIGITALIFE</span>
                                <span className="text-secondary ml-1 md:ml-2">EHUB</span>
                            </span>
                        </div>
                    </Link>

                    <nav className="hidden lg:flex items-center gap-6 xl:gap-10">
                        <ul className="flex items-center gap-6 xl:gap-8">
                            {NAV_LINKS.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className={`text-sm font-bold transition-all ${getTextColor()}`}>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        {/* <button onClick={() => {}} className={`text-sm font-bold transition-all ${getTextColor()}`}>
                            Sign In
                        </button> */}
                        <button 
                            onClick={openModal} 
                            className="px-4 xl:px-6 py-2.5 rounded-xl text-sm font-bold bg-accent text-primary hover:scale-105 hover:shadow-lg transition-all"
                        >
                            Book Session
                        </button>
                    </nav>

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={`lg:hidden relative z-[70] w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300 active:scale-90 ${
                            isOpen ? "bg-primary/5 text-primary" : isScrolled || isLightHero ? "text-primary hover:bg-primary/5" : "text-white hover:bg-white/10"
                        }`}
                        aria-label="Toggle menu"
                    >
                        <div className="w-5 flex flex-col items-end gap-[5px]">
                            <motion.span
                                animate={isOpen ? { rotate: 45, y: 7, width: 20 } : { rotate: 0, y: 0, width: 20 }}
                                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                className="block h-[2px] bg-current rounded-full"
                            />
                            <motion.span
                                animate={isOpen ? { opacity: 0, x: 10 } : { opacity: 1, x: 0 }}
                                transition={{ duration: 0.2 }}
                                className="block h-[2px] bg-current rounded-full w-[14px]"
                            />
                            <motion.span
                                animate={isOpen ? { rotate: -45, y: -7, width: 20 } : { rotate: 0, y: 0, width: 17 }}
                                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                className="block h-[2px] bg-current rounded-full"
                            />
                        </div>
                    </button>
                </div>
            </header>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 z-[49] bg-black/40 backdrop-blur-sm lg:hidden"
                            onClick={() => setIsOpen(false)}
                        />
                        <motion.div
                            initial={{ x: -320 }}
                            animate={{ x: 0 }}
                            exit={{ x: -320 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            className="fixed top-0 left-0 bottom-0 w-[280px] z-[50] lg:hidden bg-white shadow-2xl"
                        >
                            <div className="flex flex-col h-full">
                                <div className="p-6 border-b border-border-subtle">
                                    <div className="flex items-center gap-2">
                                        <img src="/logo.svg" alt="Logo" className="h-8 w-auto" />
                                        <span className="text-lg font-black">
                                            <span className="text-primary italic">DIGITALIFE</span>
                                            <span className="text-secondary ml-1">EHUB</span>
                                        </span>
                                    </div>
                                </div>
                                <motion.nav variants={menuVariants} initial="hidden" animate="visible" exit="exit" className="flex-1 p-4 overflow-y-auto">
                                    <ul className="space-y-1">
                                        {NAV_LINKS.map((link) => (
                                            <motion.li key={link.name} variants={itemVariants}>
                                                <Link
                                                    href={link.href}
                                                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-[15px] font-semibold transition-all ${
                                                        pathname === link.href
                                                            ? "bg-primary/5 text-primary"
                                                            : "text-primary/50 hover:bg-gray-50 hover:text-primary"
                                                    }`}
                                                >
                                                    {link.name}
                                                    {pathname === link.href && <span className="w-1.5 h-1.5 rounded-full bg-accent" />}
                                                </Link>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </motion.nav>
                                <div className="p-4 border-t border-border-subtle">
                                    {/* <button
                                        onClick={() => {
                                            setIsOpen(false);
                                        }}
                                        className="w-full py-3.5 border border-border-subtle text-primary text-sm font-bold rounded-xl hover:bg-gray-50 transition-all mb-2"
                                    >
                                        Sign In
                                    </button> */}
                                    <button
                                        onClick={() => {
                                            setIsOpen(false);
                                            openModal();
                                        }}
                                        className="w-full py-3.5 bg-primary text-white text-sm font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 transition-all"
                                    >
                                        Book Session
                                        <ArrowRight size={16} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
