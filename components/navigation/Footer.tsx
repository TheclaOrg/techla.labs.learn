import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.07] bg-[#050505] py-14 px-5 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 sm:flex-row text-xs text-white/40">
        <div className="flex items-center gap-2">
          <div className="grid size-6 place-items-center rounded bg-[#ff6a00] font-black text-black text-[10px]">
            T
          </div>
          <span className="font-semibold text-white">techla.labs.learn</span>
          <span>© 2026</span>
        </div>

        <div className="flex items-center gap-6">
          <Link href="/learn" className="hover:text-white transition">
            Domains
          </Link>
          <Link href="/learn/dsa" className="hover:text-white transition">
            DSA Path
          </Link>
          <Link href="/learn/dsa/diagnostic" className="hover:text-white transition">
            Diagnostic
          </Link>
          <Link href="/dashboard" className="hover:text-white transition">
            Dashboard
          </Link>
        </div>

        <div className="text-white/25">
          Deterministic Prerequisite Graph Engine
        </div>
      </div>
    </footer>
  );
}
