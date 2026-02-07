"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CelebrationEffects from "@/components/CelebrationEffects";
import MusicButton from "@/components/MusicButton";
import { motion } from "framer-motion";

export default function Celebration() {
    const router = useRouter();
    const [data, setData] = useState(null);
    const [showSparkles, setShowSparkles] = useState(true);

    useEffect(() => {
        const storedData = sessionStorage.getItem("birthdayData");
        if (storedData) {
            setData(JSON.parse(storedData));
        } else {
            router.push("/");
        }
    }, [router]);

    if (!data) return <div className="min-h-screen flex items-center justify-center">Loading magic...</div>;

    return (
        <main
            className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center p-6 text-center transition-colors duration-1000"
            style={{ backgroundColor: `${data.color}15` }} // Light version of favorite color
        >
            <CelebrationEffects color={data.color} />

            {/* Background Sparkles */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(30)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="sparkle opacity-30"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.5, 0], scale: [0, 1, 0] }}
                        transition={{
                            duration: 2 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 5
                        }}
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            backgroundColor: data.color
                        }}
                    />
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="z-10 max-w-2xl"
            >
                {/* Photo Container */}
                {data.photo && (
                    <motion.div
                        className="relative mb-8"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.5 }}
                    >
                        <div
                            className="w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-4 md:border-8 shadow-2xl mx-auto relative group"
                            style={{ borderColor: data.color }}
                        >
                            <img src={data.photo} alt="Birthday person" className="w-full h-full object-cover" />
                            <div
                                className="absolute inset-0 animate-pulse opacity-50 pointer-events-none border-4"
                                style={{ borderColor: data.color, borderRadius: '100%' }}
                            />
                        </div>
                        {/* Floating Icons around photo */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            className="absolute -inset-4 pointer-events-none"
                        >
                            <span className="absolute top-0 left-1/2 -translate-x-1/2 text-2xl">✨</span>
                            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 text-2xl">🎈</span>
                        </motion.div>
                    </motion.div>
                )}

                <motion.h1
                    className="text-5xl md:text-7xl font-black mb-4 drop-shadow-lg"
                    animate={{ scale: [1, 1.05, 1], rotate: [-1, 1, -1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    style={{ color: data.color }}
                >
                    Happy Birthday {data.name}!
                </motion.h1>

                <motion.p
                    className="text-xl md:text-2xl font-medium text-gray-700 mb-8 bg-white/30 backdrop-blur-sm py-2 px-6 rounded-full inline-block"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    You are now <span className="font-bold text-2xl" style={{ color: data.color }}>{data.age}</span> years awesome!
                </motion.p>

                <motion.div
                    className="bg-white/70 backdrop-blur-md p-8 rounded-[2rem] shadow-2xl border border-white/50 mb-8 relative overflow-hidden"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1.5, type: "spring" }}
                >
                    <div
                        className="absolute top-0 left-0 w-full h-1"
                        style={{ backgroundColor: data.color }}
                    />
                    <p className="text-lg md:text-xl text-gray-800 leading-relaxed italic">
                        "{data.message || "Wishing you a day filled with love and laughter!"}"
                    </p>
                    <span className="text-4xl absolute -bottom-2 -right-2 opacity-20">🎁</span>
                </motion.div>

                <div className="flex flex-wrap gap-4 justify-center">
                    <button
                        onClick={() => window.location.reload()}
                        className="px-8 py-3 bg-white text-gray-800 font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all border-2 active:scale-95"
                        style={{ borderColor: data.color }}
                    >
                        Replay Celebration 🎉
                    </button>
                    <button
                        onClick={() => router.push("/")}
                        className="px-8 py-3 text-white font-bold rounded-2xl shadow-lg hover:opacity-90 transition-all active:scale-95"
                        style={{ backgroundColor: data.color }}
                    >
                        Start New ✍️
                    </button>
                </div>
            </motion.div>

            <MusicButton color={data.color} />
        </main>
    );
}
