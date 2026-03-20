"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { usePathname } from "next/navigation";
import { ArrowRight, X } from "lucide-react";
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
        setIsOpen(false);
    }, [pathname]);

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "unset";
    }, [isOpen]);

    const getTextColor = () => {
        return "text-primary/60 hover:text-primary";
    };

    const menuVariants: Variants = {
        hidden: { opacity: 0, x: "100%" },
        visible: { 
            opacity: 1, 
            x: 0,
            transition: { 
                type: "spring",
                damping: 25,
                stiffness: 200,
                staggerChildren: 0.1, 
                delayChildren: 0.1
            } 
        },
        exit: { 
            opacity: 0, 
            x: "100%",
            transition: { 
                type: "spring",
                damping: 25,
                stiffness: 200,
                staggerChildren: 0.05, 
                staggerDirection: -1 
            } 
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, x: 20 },
        visible: { 
            opacity: 1, 
            x: 0, 
            transition: { 
                duration: 0.4, 
                ease: [0.22, 1, 0.36, 1] 
            } 
        },
        exit: { 
            opacity: 0, 
            x: 10, 
            transition: { 
                duration: 0.2 
            } 
        },
    };

    return (
        <>
            <header className={`fixed inset-x-0 top-0 z-60 transition-all duration-300 ease-in-out ${
                isScrolled || isOpen
                    ? "bg-white border-b border-black/5 py-4 shadow-sm" 
                    : "bg-white py-5"
            }`}>
                <div className="container-custom flex items-center justify-between">
                    <Link href="/" className="relative z-70">
                        <div className="flex items-center gap-2 group">
                            <img src="/logo.svg" alt="Logo" className="h-7 w-auto md:h-9 transition-transform duration-500 group-hover:scale-105" />
                            <span className={`text-sm md:text-lg font-bold tracking-tight transition-colors duration-500 text-primary`}>
                                <span className="italic opacity-80">DIGITALIFE</span>
                                <span className="ml-1 opacity-100 dark:text-accent">EHUB</span>
                            </span>
                        </div>
                    </Link>

                    <nav className="hidden lg:flex items-center gap-8 xl:gap-12">
                        <ul className="flex items-center gap-8 xl:gap-10">
                            {NAV_LINKS.map((link) => (
                                <li key={link.name}>
                                    <Link 
                                        href={link.href} 
                                        className={`text-[11px] font-bold uppercase tracking-[0.3em] transition-all hover:opacity-100 ${
                                            pathname === link.href ? "opacity-100" : "opacity-40"
                                        } ${getTextColor()}`}
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <button 
                            onClick={openModal} 
                            className={`px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] transition-all active:scale-95 ${
                                isScrolled || isLightHero
                                    ? "bg-primary text-white hover:bg-primary/90" 
                                    : "bg-accent text-primary hover:bg-accent/90 shadow-lg shadow-accent/20"
                            }`}
                        >
                            Book Session
                        </button>
                    </nav>

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={`lg:hidden relative z-70 w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300 active:scale-90 text-primary bg-primary/5`}
                        aria-label="Toggle menu"
                    >
                        <div className="w-5 flex flex-col items-center gap-[4px]">
                            <motion.span
                                animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                                className="block h-[1.5px] w-5 bg-current rounded-full"
                            />
                            <motion.span
                                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                                className="block h-[1.5px] w-5 bg-current rounded-full"
                            />
                            <motion.span
                                animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                                className="block h-[1.5px] w-5 bg-current rounded-full"
                            />
                        </div>
                    </button>
                </div>
            </header>

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop Blur Over Page */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 z-90 bg-primary/20 backdrop-blur-sm lg:hidden"
                        />
                        
                        {/* Mature Right Side Panel */}
                        <motion.div
                            variants={menuVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="fixed top-0 right-0 bottom-0 w-[85%] max-w-[360px] z-100 bg-white shadow-[-20px_0_80px_rgba(0,0,0,0.3)] lg:hidden flex flex-col"
                        >
                            <div className="p-6 flex items-center justify-between border-b border-black/5">
                                <div className="flex items-center gap-2">
                                    <img src="/logo.svg" alt="Logo" className="h-6 w-auto" />
                                    <span className="text-xs font-black tracking-tight text-primary">EHUB</span>
                                </div>
                                <button 
                                    onClick={() => setIsOpen(false)}
                                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-primary/5 text-primary active:scale-90 transition-transform"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                            <div className="px-8 py-12 flex flex-col h-full overflow-y-auto">
                                <div className="space-y-6 mb-auto">
                                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary/30 block mb-10">Navigation</span>
                                    {NAV_LINKS.map((link) => (
                                        <motion.div key={link.name} variants={itemVariants}>
                                            <Link
                                                href={link.href}
                                                className={`text-2xl font-bold tracking-tight transition-all flex items-center justify-between group/link ${
                                                    pathname === link.href ? "text-accent" : "text-primary/60 hover:text-primary"
                                                }`}
                                            >
                                                <span>{link.name}</span>
                                                {pathname === link.href && (
                                                    <motion.div 
                                                        layoutId="active-dot"
                                                        className="w-1.5 h-1.5 rounded-full bg-accent"
                                                    />
                                                )}
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>

                                <motion.div variants={itemVariants} className="mt-auto space-y-12">
                                    <div className="space-y-4">
                                        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary/30 block">Connect</span>
                                        <div className="grid grid-cols-1 gap-3">
                                            <a 
                                                href="https://wa.me/2349083731989" 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-all group"
                                            >
                                                <span className="text-sm font-bold text-primary/80">WhatsApp Team</span>
                                                <ArrowRight size={14} className="text-white/20 group-hover:text-accent group-hover:translate-x-1 transition-all" />
                                            </a>
                                            <a 
                                                href="https://selar.com/71g17u467o" 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-all group"
                                            >
                                                <span className="text-sm font-bold text-primary/80">Book Clarity Call</span>
                                                <ArrowRight size={14} className="text-white/20 group-hover:text-accent group-hover:translate-x-1 transition-all" />
                                            </a>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => {
                                            setIsOpen(false);
                                            openModal();
                                        }}
                                        className="w-full py-5 bg-accent text-primary text-sm font-bold uppercase tracking-widest rounded-2xl hover:bg-accent/90 transition-all active:scale-[0.98] shadow-xl shadow-accent/10"
                                    >
                                        Book Growth Session
                                    </button>
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
