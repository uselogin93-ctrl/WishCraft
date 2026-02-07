"use client";

import { useState } from "react";
import FormCard from "@/components/FormCard";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        age: "",
        color: "#ff0000",
        message: "",
        photo: null,
    });

    const handleStart = () => {
        // In a real app, we'd sync this to state management or URL params
        // For this simple demo, we'll pass via sessionStorage or simple state if it were single page.
        // Since multi-page is requested, let's use sessionStorage for the demo data.
        sessionStorage.setItem("birthdayData", JSON.stringify({
            ...formData,
            photo: formData.photo // Photo URL would be here
        }));
        router.push("/celebration");
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 flex items-center justify-center p-4">
            {/* Sparkles background effect could go here */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="sparkle"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 2}s`,
                        }}
                    />
                ))}
            </div>

            <FormCard formData={formData} setFormData={setFormData} onStart={handleStart} />
        </main>
    );
}
