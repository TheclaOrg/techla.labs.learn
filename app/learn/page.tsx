import Link from "next/link";
import {
  ArrowUpRight,
  Code2,
  Database,
  Globe,
  Layers,
  Lock,
  Server,
  Shield,
  Sparkles,
} from "lucide-react";
import { learningDomains } from "@/data/dsa/domains";

export default function LearnDomainsPage() {
  const getDomainIcon = (slug: string) => {
    switch (slug) {
      case "dsa":
        return Code2;
      case "frontend":
        return Globe;
      case "backend":
        return Server;
      case "databases":
        return Database;
      case "fullstack":
        return Layers;
      case "security":
        return Shield;
      default:
        return Code2;
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] px-5 pb-24 pt-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#ff6a00]/20 bg-[#ff6a00]/5 px-3 py-1 text-xs font-semibold text-[#ff8533]">
            <Sparkles size={13} />
            LEARNING TRACKS
          </div>

          <h1 className="text-4xl font-bold tracking-[-.045em] sm:text-6xl text-white">
            What do you want to{" "}
            <span className="text-[#ff6a00]">master?</span>
          </h1>

          <p className="mt-4 text-base text-white/50 leading-7">
            Select a software engineering domain. Your curriculum will adapt dynamically to identify your exact gaps and unlock prerequisites in the optimal order.
          </p>
        </div>

        {/* Domain Grid */}
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {learningDomains.map((domain) => {
            const Icon = getDomainIcon(domain.slug);
            const isAvailable = domain.status === "available";

            const cardContent = (
              <div
                className={`card group h-full rounded-2xl p-7 flex flex-col justify-between transition-all ${
                  isAvailable
                    ? "border-[#ff6a00]/30 bg-[#0d0d0d] hover:border-[#ff6a00]/60 shadow-[0_0_30px_rgba(255,106,0,0.05)]"
                    : "border-white/[0.06] bg-[#090909] opacity-75 hover:opacity-100"
                }`}
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div
                      className={`grid size-12 place-items-center rounded-xl transition ${
                        isAvailable
                          ? "bg-[#ff6a00] text-black font-bold shadow-[0_0_20px_rgba(255,106,0,0.3)]"
                          : "bg-white/5 text-white/30"
                      }`}
                    >
                      <Icon size={22} />
                    </div>

                    {isAvailable ? (
                      <span className="flex items-center gap-1 text-xs font-bold text-[#ff6a00]">
                        Available
                        <ArrowUpRight size={16} />
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs text-white/30 font-medium">
                        <Lock size={13} />
                        Coming Soon
                      </span>
                    )}
                  </div>

                  <h2 className="mt-8 text-xl font-bold text-white group-hover:text-[#ff8533] transition">
                    {domain.name}
                  </h2>

                  <p className="mt-2.5 text-xs leading-6 text-white/45">
                    {domain.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/[0.05] flex items-center justify-between">
                  <span
                    className={`text-xs font-semibold ${
                      isAvailable ? "text-[#ff6a00]" : "text-white/25"
                    }`}
                  >
                    {isAvailable ? "Start Learning →" : "In Development"}
                  </span>
                  {isAvailable && (
                    <span className="rounded-full bg-[#ff6a00]/10 px-2.5 py-0.5 text-[10px] text-[#ff8533] font-mono">
                      {domain.totalTopics} Topics
                    </span>
                  )}
                </div>
              </div>
            );

            return isAvailable ? (
              <Link key={domain.id} href={`/learn/${domain.slug}`} className="block">
                {cardContent}
              </Link>
            ) : (
              <div key={domain.id}>{cardContent}</div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
