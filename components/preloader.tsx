"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/language-context";
import { useTheme } from "next-themes";
import Image from "next/image";

export function Preloader() {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const { language } = useLanguage();
    const { theme } = useTheme();

    useEffect(() => {
        setIsLoading(true);
        setProgress(0);

        document.body.style.overflow = "hidden";

        // Animate progress bar
        const progressTimer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(progressTimer);
                    return 100;
                }
                return prev + Math.random() * 18 + 8;
            });
        }, 80);

        const timer = setTimeout(() => {
            setIsLoading(false);
            document.body.style.overflow = "";
        }, 1800);

        return () => {
            clearTimeout(timer);
            clearInterval(progressTimer);
            document.body.style.overflow = "";
        };
    }, [language, theme]);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    key="preloader"
                    initial={{ opacity: 1 }}
                    exit={{
                        y: "-100%",
                        transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] }
                    }}
                    className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-background pointer-events-auto overflow-hidden"
                >
                    {/* Background glow */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 0.15, scale: 1.5 }}
                        transition={{ duration: 1.4, ease: "easeOut" }}
                        className="absolute w-[600px] h-[600px] rounded-full bg-primary blur-[120px] pointer-events-none"
                    />

                    {/* Animated grid lines */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(var(--primary-rgb),0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--primary-rgb),0.03)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

                    {/* Corner accents */}
                    {[
                        "top-8 left-8",
                        "top-8 right-8 rotate-90",
                        "bottom-8 left-8 -rotate-90",
                        "bottom-8 right-8 rotate-180"
                    ].map((pos, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 0.4, scale: 1 }}
                            transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                            className={`absolute ${pos} w-8 h-8`}
                        >
                            <div className="w-full h-[1px] bg-primary/60" />
                            <div className="h-full w-[1px] bg-primary/60" />
                        </motion.div>
                    ))}

                    {/* Main content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.7, filter: "blur(20px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className="relative z-10 flex flex-col items-center gap-10"
                    >
                        {/* Logo container */}
                        <div className="relative flex items-center justify-center">
                            {/* Outer rotating ring */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 8, ease: "linear", repeat: Infinity }}
                                className="absolute w-44 h-44"
                            >
                                <svg viewBox="0 0 100 100" className="w-full h-full opacity-30">
                                    <circle
                                        cx="50" cy="50" r="48"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="0.4"
                                        strokeDasharray="3 8"
                                        className="text-primary"
                                    />
                                </svg>
                            </motion.div>

                            {/* Counter-rotating inner ring */}
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 12, ease: "linear", repeat: Infinity }}
                                className="absolute w-36 h-36"
                            >
                                <svg viewBox="0 0 100 100" className="w-full h-full opacity-20">
                                    <circle
                                        cx="50" cy="50" r="48"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="0.3"
                                        strokeDasharray="1 4"
                                        className="text-foreground"
                                    />
                                </svg>
                            </motion.div>

                            {/* Progress arc */}
                            <svg
                                viewBox="0 0 100 100"
                                className="absolute w-44 h-44 -rotate-90"
                            >
                                <circle
                                    cx="50" cy="50" r="46"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="0.5"
                                    className="text-border/20"
                                />
                                <motion.circle
                                    cx="50" cy="50" r="46"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeDasharray="289"
                                    animate={{ strokeDashoffset: 289 - (289 * Math.min(progress, 100)) / 100 }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                    className="text-primary drop-shadow-[0_0_8px_rgba(var(--primary-rgb),0.8)]"
                                />
                            </svg>

                            {/* Logo backdrop glow */}
                            <div className="absolute w-24 h-24 rounded-full bg-primary/10 blur-xl" />

                            {/* Logo */}
                            <motion.div
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                className="relative w-20 h-20 z-10"
                            >
                                <Image
                                    src="/logo-new.png"
                                    alt="AZAMOV"
                                    fill
                                    className="object-contain drop-shadow-[0_0_20px_rgba(var(--primary-rgb),0.5)]"
                                    priority
                                />
                            </motion.div>
                        </div>

                        {/* Brand name */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                            className="flex flex-col items-center gap-2"
                        >
                            <span className="text-xs font-mono tracking-[0.5em] text-muted-foreground uppercase">
                                AZAMOV
                            </span>
                        </motion.div>
                    </motion.div>

                    {/* Progress bar at bottom */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 w-48"
                    >
                        <div className="w-full h-[1px] bg-border/30 relative overflow-hidden rounded-full">
                            <motion.div
                                animate={{ width: `${Math.min(progress, 100)}%` }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                className="absolute left-0 top-0 h-full bg-primary shadow-[0_0_8px_rgba(var(--primary-rgb),0.8)]"
                            />
                        </div>
                        <span className="text-[10px] font-mono text-muted-foreground/50 tracking-widest">
                            {Math.min(Math.round(progress), 100)}%
                        </span>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
