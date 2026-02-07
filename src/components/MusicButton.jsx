"use client";

import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function MusicButton({ color }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    const toggleMusic = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <audio
                ref={audioRef}
                loop
                src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" // Placeholder upbeat music
            />
            <motion.button
                onClick={toggleMusic}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-14 h-14 rounded-full shadow-2xl flex items-center justify-center text-white relative overflow-hidden group"
                style={{ backgroundColor: color }}
            >
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                <AnimatePresence mode="wait">
                    {isPlaying ? (
                        <motion.div
                            key="playing"
                            initial={{ opacity: 0, rotate: -90 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: 90 }}
                        >
                            <Volume2 size={24} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="paused"
                            initial={{ opacity: 0, rotate: -90 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: 90 }}
                        >
                            <VolumeX size={24} />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Animated rings when playing */}
                {isPlaying && (
                    <>
                        <motion.div
                            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="absolute inset-0 rounded-full border-2 border-white pointer-events-none"
                        />
                        <motion.div
                            animate={{ scale: [1, 1.8], opacity: [0.3, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                            className="absolute inset-0 rounded-full border-2 border-white pointer-events-none"
                        />
                    </>
                )}
            </motion.button>
        </div>
    );
}
