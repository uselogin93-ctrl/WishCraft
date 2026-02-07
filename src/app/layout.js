import "./globals.css";

export const metadata = {
    title: "WishCraft - personalized Birthday Celebration",
    description: "Create a magical birthday celebration for your loved ones.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="antialiased">{children}</body>
        </html>
    );
}
