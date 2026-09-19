"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/learn", label: "Domains" },
    { href: "/learn/dsa", label: "DSA Path" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/learn/dsa/diagnostic", label: "Diagnostic" },
  ];

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/[0.07] bg-[#050505]/85 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 lg:px-8">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-90">
          <div className="grid size-8 place-items-center rounded-lg bg-[#ff6a00] font-black text-black text-sm shadow-[0_0_20px_rgba(255,106,0,0.35)]">
            T
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-semibold tracking-tight text-white text-base">
              techla<span className="text-[#ff6a00]">.</span>labs
            </span>
            <span className="text-xs text-white/40 font-mono">learn</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-7 text-sm md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href) && link.href !== "/learn");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition ${
                  isActive
                    ? "text-[#ff6a00] font-medium"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Action CTAs */}
        <div className="hidden items-center gap-3.5 md:flex">
          <Link
            href="/auth"
            className="px-3.5 py-2 text-sm text-white/60 transition hover:text-white"
          >
            Sign in
          </Link>
          <Link
            href="/learn"
            className="flex items-center gap-2 rounded-full bg-[#ff6a00] px-5 py-2.5 text-sm font-bold text-black transition hover:bg-[#ff7a1a] shadow-[0_0_25px_rgba(255,106,0,0.25)]"
          >
            Start Learning
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
          className="grid size-10 place-items-center rounded-xl border border-white/10 bg-[#0e0e0e] text-white/80 transition hover:text-white md:hidden"
        >
          {mobileOpen ? <X size={19} /> : <Menu size={19} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="border-t border-white/[0.08] bg-[#070707] px-5 py-6 md:hidden">
          <div className="flex flex-col gap-4 text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-1 text-white/70 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
            <div className="my-2 h-px bg-white/10" />
            <Link
              href="/auth"
              onClick={() => setMobileOpen(false)}
              className="py-1 text-white/70 hover:text-white"
            >
              Sign in
            </Link>
            <Link
              href="/learn"
              onClick={() => setMobileOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#ff6a00] px-4 py-3 text-center font-bold text-black"
            >
              Start Learning
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
