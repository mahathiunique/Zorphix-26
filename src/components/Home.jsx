import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import zorphixLogo from '../assets/zorphix-logo.png';
import Hero from './Hero';
import EventsShowcase from './EventsShowcase';
import Sponsors from './Sponsors';

const Home = () => {
    // Session Storage Check
    const [showShutter, setShowShutter] = useState(() => {
        try {
            const hasSeen = sessionStorage.getItem('hasSeenShutter');
            return !hasSeen;
        } catch {
            return true;
        }
    });

    useEffect(() => {
        if (showShutter) {
            // Auto-dismiss logic is handled by the animation variants, 
            // but we need to ensure state is cleaned up and storage is set.
            const timer = setTimeout(() => {
                setShowShutter(false);
                try {
                    sessionStorage.setItem('hasSeenShutter', 'true');
                } catch { }
            }, 3000); // Shorter duration for fast finance intro (1.5s lock + 0.8s open)
            return () => clearTimeout(timer);
        }
    }, [showShutter]);

    return (
        <div className="relative min-h-screen">
            <AnimatePresence>
                {showShutter && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none font-sans">

                        {/* LEFT VAULT DOOR (RED/BEAR) */}
                        <motion.div
                            className="absolute left-0 top-0 bottom-0 w-1/2 bg-[#0f0f0f] border-r-8 border-[#e33e33] flex flex-col justify-center items-end overflow-hidden shadow-2xl"
                            initial={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1.5 }}
                        >
                            {/* Finance Grid Pattern */}
                            <div className="absolute inset-0 opacity-10"
                                style={{
                                    backgroundImage: `linear-gradient(#e33e33 1px, transparent 1px), linear-gradient(90deg, #e33e33 1px, transparent 1px)`,
                                    backgroundSize: "40px 40px"
                                }}
                            />
                            {/* Downward Trend Decorative Line */}
                            <div className="absolute inset-0 opacity-20 transform -skew-y-12 bg-gradient-to-r from-transparent via-[#e33e33] to-transparent translate-y-20" />

                            {/* Handle/Heavy Metal Edge */}
                            <div className="w-16 h-40 bg-[#1a1a1a] rounded-l-xl mr-0 border-l border-y border-[#333] shadow-lg flex items-center justify-center">
                                <div className="w-2 h-24 bg-[#e33e33] rounded-full opacity-50" />
                            </div>
                        </motion.div>

                        {/* RIGHT VAULT DOOR (GREEN/BULL) */}
                        <motion.div
                            className="absolute right-0 top-0 bottom-0 w-1/2 bg-[#0f0f0f] border-l-8 border-[#97b85d] flex flex-col justify-center items-start overflow-hidden shadow-2xl"
                            initial={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1.5 }}
                        >
                            {/* Finance Grid Pattern */}
                            <div className="absolute inset-0 opacity-10"
                                style={{
                                    backgroundImage: `linear-gradient(#97b85d 1px, transparent 1px), linear-gradient(90deg, #97b85d 1px, transparent 1px)`,
                                    backgroundSize: "40px 40px"
                                }}
                            />
                            {/* Upward Trend Decorative Line */}
                            <div className="absolute inset-0 opacity-20 transform -skew-y-12 bg-gradient-to-r from-transparent via-[#97b85d] to-transparent -translate-y-20" />

                            {/* Handle/Heavy Metal Edge */}
                            <div className="w-16 h-40 bg-[#1a1a1a] rounded-r-xl ml-0 border-r border-y border-[#333] shadow-lg flex items-center justify-center">
                                <div className="w-2 h-24 bg-[#97b85d] rounded-full opacity-50" />
                            </div>
                        </motion.div>

                        {/* CENTRAL AUTHENTICATION LOCK */}
                        <motion.div
                            className="absolute z-60 bg-black rounded-full p-2 border-4 border-gray-800 shadow-2xl"
                            initial={{ scale: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="w-32 h-32 rounded-full bg-[#111] flex items-center justify-center relative overflow-hidden">
                                {/* Rotating Ring */}
                                <motion.div
                                    className="absolute inset-0 border-4 border-dashed border-[#555] rounded-full"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                />

                                {/* Status Light Ring */}
                                <motion.div
                                    className="absolute inset-2 rounded-full border-4"
                                    animate={{
                                        borderColor: ["#e33e33", "#e33e33", "#97b85d"], // Red -> Red -> Green
                                        boxShadow: ["0 0 0px #e33e33", "0 0 20px #e33e33", "0 0 50px #97b85d"]
                                    }}
                                    transition={{ duration: 1.5, times: [0, 0.8, 1] }}
                                />

                                <img src={zorphixLogo} alt="Lock" className="w-16 h-16 object-contain relative z-10" />
                            </div>
                        </motion.div>

                    </div>
                )}
            </AnimatePresence>

            <Hero />
            <EventsShowcase />
            <Sponsors />
        </div>
    );
};

export default Home;
