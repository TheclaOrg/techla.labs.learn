import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";

export const metadata: Metadata = {
  title: "Techla.labs.learn | AI-Powered Personalized Engineering Mastery",
  description: "Figure out what you know, map what you need next, and master software engineering through deterministic prerequisite graphs and deliberate practice.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#050505] text-white min-h-screen flex flex-col selection:bg-[#ff6a00] selection:text-black">
        <Navbar />
        <div className="flex-1">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
