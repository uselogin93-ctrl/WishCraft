"use client";

import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";

export default function CelebrationEffects({ color }) {
    const containerRef = useRef(null);

    useEffect(() => {
        // Initial blast
        const duration = 15 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0, colors: [color, '#ffffff', '#ff718a', '#fdff6a'] };

        const randomInRange = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(() => {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);

        return () => clearInterval(interval);
    }, [color]);

    return (
        <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Balloons */}
            {[...Array(12)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute bottom-[-100px] text-6xl"
                    initial={{ y: 0, x: `${Math.random() * 100}vw` }}
                    animate={{
                        y: "-120vh",
                        x: `${(Math.random() * 20 - 10) + (i * 8)}vw`,
                        rotate: [0, 10, -10, 0]
                    }}
                    transition={{
                        duration: 10 + Math.random() * 5,
                        repeat: Infinity,
                        delay: i * 0.8,
                        ease: "linear"
                    }}
                >
                    {['🎈', '🎂', '🎊', '🎀', '🍰'][i % 5]}
                </motion.div>
            ))}
        </div>
    );
}
