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
        visible: { 
            opacity: 1, 
            transition: { 
                staggerChildren: 0.08, 
                delayChildren: 0.2,
                when: "beforeChildren"
            } 
        },
        exit: { 
            opacity: 0, 
            transition: { 
                staggerChildren: 0.04, 
                staggerDirection: -1 
            } 
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { 
                duration: 0.5, 
                ease: [0.16, 1, 0.3, 1] as const 
            } 
        },
        exit: { 
            opacity: 0, 
            y: 10, 
            transition: { 
                duration: 0.3 
            } 
        },
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
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="fixed inset-0 z-[100] bg-white backdrop-blur-3xl lg:hidden flex flex-col"
                    >
                        {/* Header Area */}
                        <div className="p-6 flex items-center justify-between border-b border-gray-100">
                            <div className="flex items-center gap-2">
                                <img src="/logo.svg" alt="Logo" className="h-8 w-auto" />
                                <span className="text-lg font-black tracking-tight">
                                    <span className="text-primary italic">DIGITALIFE</span>
                                    <span className="text-secondary ml-1">EHUB</span>
                                </span>
                            </div>
                            <button 
                                onClick={() => setIsOpen(false)}
                                className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 text-primary active:scale-90 transition-all font-bold"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                        </div>

                        {/* Navigation Content */}
                        <motion.nav 
                            variants={menuVariants} 
                            initial="hidden" 
                            animate="visible" 
                            exit="exit" 
                            className="flex-1 px-8 py-10 overflow-y-auto flex flex-col"
                        >
                            <div className="space-y-8 mb-12">
                                {NAV_LINKS.map((link) => (
                                    <motion.div key={link.name} variants={itemVariants}>
                                        <Link
                                            href={link.href}
                                            className={`text-3xl font-black tracking-tight transition-all ${
                                                pathname === link.href ? "text-primary" : "text-primary/30 hover:text-primary"
                                            }`}
                                        >
                                            {link.name}
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Connect & CTA Area */}
                            <motion.div variants={itemVariants} className="mt-auto space-y-10">
                                <div>
                                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary/30 block mb-6">Connect With Us</span>
                                    <div className="flex flex-col gap-4">
                                        <a href="https://wa.me/2349083731989" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl group active:scale-[0.98] transition-all">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-[#25D366] text-white rounded-xl flex items-center justify-center shadow-lg shadow-[#25D366]/20">
                                                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                                                </div>
                                                <span className="text-[15px] font-bold text-primary">Chat with Team</span>
                                            </div>
                                            <ArrowRight size={16} className="text-primary/20 group-hover:translate-x-1 group-hover:text-primary transition-all" />
                                        </a>
                                        <a href="https://selar.com/71g17u467o" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl group active:scale-[0.98] transition-all">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-accent text-primary rounded-xl flex items-center justify-center shadow-lg shadow-accent/20">
                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                                </div>
                                                <span className="text-[15px] font-bold text-primary">Book Clarity Call</span>
                                            </div>
                                            <ArrowRight size={16} className="text-primary/20 group-hover:translate-x-1 group-hover:text-primary transition-all" />
                                        </a>
                                    </div>
                                </div>

                                <button
                                    onClick={() => {
                                        setIsOpen(false);
                                        openModal();
                                    }}
                                    className="w-full py-5 bg-primary text-white text-base font-bold rounded-2xl flex items-center justify-center gap-3 hover:bg-primary/90 transition-all shadow-xl shadow-primary/10 active:scale-[0.98]"
                                >
                                    Book Session
                                    <ArrowRight size={20} />
                                </button>
                            </motion.div>
                        </motion.nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
