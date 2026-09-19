"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BrainCircuit,
  ChevronRight,
  Code2,
  GitBranch,
  Shield,
  Sparkles,
  Target,
  Trophy,
  CheckCircle2,
  Layers,
  Zap,
  Clock,
} from "lucide-react";

export default function HomePage() {
  const [heroTrack, setHeroTrack] = useState<"dsa" | "cybersecurity">("dsa");

  return (
    <main className="min-h-screen overflow-hidden bg-[#050505]">
      {/* Background ambient lighting */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-[#ff6a00]/8 blur-[140px]" />
        <div className="grid-bg absolute inset-0 opacity-50" />
      </div>

      {/* HERO SECTION */}
      <section className="relative mx-auto flex min-h-[92vh] max-w-7xl items-center px-5 pb-20 pt-32 lg:px-8">
        <div className="grid w-full items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Hero copy */}
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#ff6a00]/25 bg-[#ff6a00]/10 px-3.5 py-1.5 text-xs font-semibold text-[#ff8533]">
              <Sparkles size={13} />
              ADAPTIVE GRAPH MASTERY
            </div>

            <h1 className="max-w-4xl text-5xl font-bold leading-[0.98] tracking-[-0.055em] sm:text-7xl lg:text-[80px]">
              Stop following
              <br />
              <span className="text-white">courses.</span>
              <br />
              <span className="text-[#ff6a00]">
                Learn what you need.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-7 text-white/50 sm:text-lg">
              Techla.labs.learn figures out what you already know,
              identifies your gaps through directed prerequisite graphs,
              and builds a personalized learning path around where you want to go.
            </p>

            <div className="mt-9 flex flex-wrap gap-3.5">
              <Link
                href="/learn"
                className="flex items-center gap-2 rounded-full bg-[#ff6a00] px-7 py-3.5 text-sm font-bold text-black transition hover:bg-[#ff7a1a] shadow-[0_0_30px_rgba(255,106,0,0.3)]"
              >
                Start Learning
                <ArrowRight size={16} />
              </Link>

              <a
                href="#paths"
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3.5 text-sm font-medium text-white transition hover:bg-white/[0.07]"
              >
                Explore Tracks
              </a>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-6 text-xs text-white/35 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-[#ff6a00]" />
                Personalized paths
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-[#ff6a00]" />
                Prerequisite graph
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-[#ff6a00]" />
                Evidence-based mastery
              </span>
            </div>
          </div>

          {/* Product Preview Card with Live Interactive Switcher */}
          <div className="relative">
            <div className="absolute -inset-10 rounded-full bg-[#ff6a00]/10 blur-[90px]" />

            <div className="orange-glow relative rounded-[28px] border border-white/10 bg-[#090909] p-3">
              <div className="rounded-[22px] border border-white/8 bg-[#0d0d0d] p-5">
                {/* Browser top with Track Switcher */}
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex gap-1.5">
                    <div className="size-2.5 rounded-full bg-white/15" />
                    <div className="size-2.5 rounded-full bg-white/15" />
                    <div className="size-2.5 rounded-full bg-white/15" />
                  </div>
                  <div className="flex items-center gap-1.5 bg-black/60 border border-white/10 rounded-full p-1 text-[10px]">
                    <button
                      onClick={() => setHeroTrack("dsa")}
                      className={`px-2.5 py-0.5 rounded-full font-semibold transition ${
                        heroTrack === "dsa" ? "bg-[#ff6a00] text-black" : "text-white/40 hover:text-white"
                      }`}
                    >
                      DSA (44 Nodes)
                    </button>
                    <button
                      onClick={() => setHeroTrack("cybersecurity")}
                      className={`px-2.5 py-0.5 rounded-full font-semibold transition ${
                        heroTrack === "cybersecurity" ? "bg-[#ff6a00] text-black" : "text-white/40 hover:text-white"
                      }`}
                    >
                      Cyber (36 Nodes)
                    </button>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-[130px_1fr]">
                  {/* Mini Sidebar */}
                  <div className="hidden border-r border-white/5 pr-3 sm:block">
                    <div className="mb-4 text-xs font-bold text-white">
                      techla<span className="text-[#ff6a00]">.</span>labs
                    </div>

                    {[
                      "Dashboard",
                      "Knowledge Graph",
                      "Practice Labs",
                      "Diagnostic",
                    ].map((item, i) => (
                      <div
                        key={item}
                        className={`mb-1 rounded-lg px-2.5 py-1.5 text-[10px] font-medium ${
                          i === 1
                            ? "bg-[#ff6a00]/15 text-[#ff8533]"
                            : "text-white/30"
                        }`}
                      >
                        {item}
                      </div>
                    ))}
                  </div>

                  {/* Path Preview Body */}
                  <div>
                    {heroTrack === "dsa" ? (
                      <div>
                        <div className="mb-4">
                          <p className="text-[9px] uppercase tracking-[0.18em] text-[#ff6a00] font-semibold">
                            Adaptive DSA Graph
                          </p>
                          <div className="mt-1 flex items-center justify-between">
                            <h3 className="text-sm font-semibold text-white">
                              Data Structures & Algorithms
                            </h3>
                            <span className="text-[11px] font-mono font-bold text-[#ff8533]">
                              44 Nodes · 13 Cats
                            </span>
                          </div>
                        </div>

                        <div className="mb-4 h-1 overflow-hidden rounded-full bg-white/5">
                          <div className="h-full w-[45%] rounded-full bg-[#ff6a00]" />
                        </div>

                        <div className="space-y-1.5">
                          <PathItem number="01" title="Programming Fundamentals" status="Mastered" complete />
                          <PathItem number="02" title="Big-O & Hash Tables" status="Mastered" complete />
                          <PathItem number="03" title="Binary Search" status="Next In Graph" active />
                          <PathItem number="04" title="Binary Trees & BST" status="Ready to Unlock" />
                          <PathItem number="05" title="Graph BFS/DFS & DP" status="Locked" />
                        </div>

                        <div className="mt-3.5 rounded-xl border border-[#ff6a00]/20 bg-[#ff6a00]/5 p-3">
                          <div className="flex gap-2">
                            <BrainCircuit size={14} className="mt-0.5 shrink-0 text-[#ff6a00]" />
                            <div>
                              <p className="text-[10px] font-semibold text-white">
                                Why Binary Search next?
                              </p>
                              <p className="mt-0.5 text-[9px] leading-3.5 text-white/45">
                                Mastered Arrays and Hashing. Binary Search is the required prerequisite before advanced range searches and tree traversals.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="mb-4">
                          <p className="text-[9px] uppercase tracking-[0.18em] text-[#ff6a00] font-semibold">
                            Adaptive Cyber Graph
                          </p>
                          <div className="mt-1 flex items-center justify-between">
                            <h3 className="text-sm font-semibold text-white">
                              Cybersecurity Engineering
                            </h3>
                            <span className="text-[11px] font-mono font-bold text-[#ff8533]">
                              36 Nodes · 12 Modules
                            </span>
                          </div>
                        </div>

                        <div className="mb-4 h-1 overflow-hidden rounded-full bg-white/5">
                          <div className="h-full w-[38%] rounded-full bg-[#ff6a00]" />
                        </div>

                        <div className="space-y-1.5">
                          <PathItem number="01" title="IT & Networking Foundations" status="Mastered" complete />
                          <PathItem number="02" title="Linux CLI & User Permissions" status="Mastered" complete />
                          <PathItem number="03" title="Nmap & Packet Recon" status="Next In Graph" active />
                          <PathItem number="04" title="Web Exploitation (SQLi/XSS)" status="Ready to Unlock" />
                          <PathItem number="05" title="SOC Log Analysis & Incident Response" status="Locked" />
                        </div>

                        <div className="mt-3.5 rounded-xl border border-[#ff6a00]/20 bg-[#ff6a00]/5 p-3">
                          <div className="flex gap-2">
                            <Shield size={14} className="mt-0.5 shrink-0 text-[#ff6a00]" />
                            <div>
                              <p className="text-[10px] font-semibold text-white">
                                Why Nmap & Recon next?
                              </p>
                              <p className="mt-0.5 text-[9px] leading-3.5 text-white/45">
                                Mastered Linux fundamentals and TCP/IP stack. Port scanning & packet inspection form the bedrock for SOC defense and vulnerability testing.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LIVE PLATFORM & TRACK INTELLIGENCE SECTION */}
      <section className="border-y border-white/[0.07] bg-[#080808] py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#ff6a00]/20 bg-[#ff6a00]/5 px-3 py-1 text-xs font-semibold text-[#ff8533] mb-3">
              <Zap size={13} />
              PRODUCTION-GRADE CURRICULA
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-5xl text-white">
              Built for serious engineers & security practitioners.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-white/45">
              Live statistics and curated graph depth across both active learning tracks.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="card rounded-2xl p-6 border-white/[0.08] bg-[#0d0d0d]">
              <div className="grid size-10 place-items-center rounded-xl bg-[#ff6a00]/10 text-[#ff6a00]">
                <Code2 size={20} />
              </div>
              <p className="mt-5 text-3xl font-bold font-mono text-white">44 Nodes</p>
              <h3 className="mt-1 text-sm font-semibold text-white">Data Structures & Algorithms</h3>
              <p className="mt-2 text-xs text-white/40 leading-relaxed">
                13 computational categories from two-pointers and heaps to dynamic programming and advanced graph cuts.
              </p>
            </div>

            <div className="card rounded-2xl p-6 border-white/[0.08] bg-[#0d0d0d]">
              <div className="grid size-10 place-items-center rounded-xl bg-amber-500/10 text-amber-400">
                <Shield size={20} />
              </div>
              <p className="mt-5 text-3xl font-bold font-mono text-white">36 Nodes</p>
              <h3 className="mt-1 text-sm font-semibold text-white">Cybersecurity Engineering</h3>
              <p className="mt-2 text-xs text-white/40 leading-relaxed">
                12 defensive & offensive modules mapped to MITRE ATT&CK, OWASP Top 10, and Tier-1 SOC operations.
              </p>
            </div>

            <div className="card rounded-2xl p-6 border-white/[0.08] bg-[#0d0d0d]">
              <div className="grid size-10 place-items-center rounded-xl bg-emerald-500/10 text-emerald-400">
                <Trophy size={20} />
              </div>
              <p className="mt-5 text-3xl font-bold font-mono text-white">275+ Labs</p>
              <h3 className="mt-1 text-sm font-semibold text-white">Curated Practice & VMs</h3>
              <p className="mt-2 text-xs text-white/40 leading-relaxed">
                Direct integration with LeetCode problem patterns, TryHackMe virtual machines, PortSwigger, and OverTheWire.
              </p>
            </div>

            <div className="card rounded-2xl p-6 border-white/[0.08] bg-[#0d0d0d]">
              <div className="grid size-10 place-items-center rounded-xl bg-blue-500/10 text-blue-400">
                <Target size={20} />
              </div>
              <p className="mt-5 text-3xl font-bold font-mono text-white">20 Marks</p>
              <h3 className="mt-1 text-sm font-semibold text-white">Adaptive Concept Diagnostic</h3>
              <p className="mt-2 text-xs text-white/40 leading-relaxed">
                Instant gap evaluation to bypass known concepts and calibrate your personalized prerequisite roadmap.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="how" className="mx-auto max-w-7xl px-5 py-28 lg:px-8">
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6a00]">
            The Architecture
          </p>
          <h2 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight sm:text-5xl">
            A learning system that continuously adapts to you.
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <FeatureCard
            icon={<Target size={22} />}
            number="01"
            title="Assess"
            text="Take our 20-mark concept diagnostic to evaluate what you actually understand per topic instead of a generic single score."
          />
          <FeatureCard
            icon={<GitBranch size={22} />}
            number="02"
            title="Map"
            text="Every topic connects to prerequisites. Concepts unlock systematically when your foundational understanding reaches proficiency."
          />
          <FeatureCard
            icon={<Trophy size={22} />}
            number="03"
            title="Master"
            text="Pair conceptual theory with free curated resources, solve real LeetCode and TryHackMe labs, and prove mastery with check-ins."
          />
        </div>
      </section>

      {/* PATHS SECTION */}
      <section id="paths" className="border-y border-white/[0.07] bg-[#070707] py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6a00]">
                Curriculum Tracks
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">
                Choose what you want to master.
              </h2>
            </div>
            <Link
              href="/learn"
              className="flex items-center gap-2 text-sm font-semibold text-[#ff6a00] hover:text-[#ff7a1a] transition"
            >
              View all tracks
              <ChevronRight size={16} />
            </Link>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            <TrackCard
              icon={<Code2 size={22} />}
              title="Data Structures & Algorithms"
              description="Build deep computational problem-solving intuition from Big-O foundations to dynamic programming and graph theory."
              href="/learn/dsa"
              totalNodes={44}
              available
            />
            <TrackCard
              icon={<Shield size={22} />}
              title="Cybersecurity Engineering"
              description="Master defensive security across networking, Linux/Windows internals, web security (OWASP), and hands-on SOC operations."
              href="/learn/cybersecurity"
              totalNodes={36}
              available
            />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-5 py-28 text-center relative">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6a00]">
            Your Adaptive Learning Journey Starts Here
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-[-.04em] sm:text-6xl">
            Don&apos;t learn everything.
            <br />
            <span className="text-[#ff6a00]">Learn what matters next.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-white/45 text-sm sm:text-base leading-7">
            Start with our 20-mark diagnostic assessment and let Techla.labs.learn map your exact path through prerequisite knowledge graphs.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/learn/dsa/diagnostic"
              className="inline-flex items-center gap-2 rounded-full bg-[#ff6a00] px-7 py-3.5 text-sm font-bold text-black transition hover:bg-[#ff7a1a] shadow-[0_0_30px_rgba(255,106,0,0.3)]"
            >
              DSA Diagnostic (20 Marks)
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/learn/cybersecurity/diagnostic"
              className="inline-flex items-center gap-2 rounded-full border border-[#ff6a00]/40 bg-[#ff6a00]/10 px-7 py-3.5 text-sm font-bold text-[#ff8533] transition hover:bg-[#ff6a00] hover:text-black shadow-[0_0_30px_rgba(255,106,0,0.15)]"
            >
              Cyber Diagnostic (20 Marks)
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/learn"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Explore Roadmaps
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function PathItem({
  number,
  title,
  status,
  complete,
  active,
}: {
  number: string;
  title: string;
  status: string;
  complete?: boolean;
  active?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-2.5 rounded-xl border p-2.5 ${
        active
          ? "border-[#ff6a00]/30 bg-[#ff6a00]/[0.08]"
          : "border-white/5 bg-white/[0.015]"
      }`}
    >
      <div
        className={`grid size-6 place-items-center rounded-full border text-[9px] ${
          complete
            ? "border-[#ff6a00] bg-[#ff6a00] font-bold text-black"
            : active
              ? "border-[#ff6a00] text-[#ff6a00] font-bold"
              : "border-white/10 text-white/25"
        }`}
      >
        {complete ? "✓" : number}
      </div>

      <div className="flex-1">
        <p className="text-[10px] font-medium text-white">{title}</p>
      </div>

      <span
        className={`text-[9px] ${
          active
            ? "text-[#ff8533] font-semibold"
            : complete
              ? "text-white/40"
              : "text-white/20"
        }`}
      >
        {status}
      </span>
    </div>
  );
}

function FeatureCard({
  icon,
  number,
  title,
  text,
}: {
  icon: React.ReactNode;
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="card rounded-2xl p-7">
      <div className="flex items-start justify-between">
        <div className="grid size-11 place-items-center rounded-xl bg-[#ff6a00]/10 text-[#ff6a00]">
          {icon}
        </div>
        <span className="text-xs text-white/20 font-mono">{number}</span>
      </div>
      <h3 className="mt-8 text-xl font-bold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-white/45">{text}</p>
    </div>
  );
}

function TrackCard({
  icon,
  title,
  description,
  href = "/learn/dsa",
  totalNodes,
  available,
}: {
  icon?: React.ReactNode;
  title: string;
  description: string;
  href?: string;
  totalNodes?: number;
  available?: boolean;
}) {
  return (
    <div
      className={`card rounded-2xl p-6 relative flex flex-col justify-between ${
        available ? "border-[#ff6a00]/35 bg-[#0d0d0d] shadow-[0_0_40px_rgba(255,106,0,0.06)]" : ""
      }`}
    >
      <div>
        <div className="flex items-center justify-between">
          <div
            className={`grid size-11 place-items-center rounded-xl ${
              available ? "bg-[#ff6a00] text-black font-bold shadow-[0_0_20px_rgba(255,106,0,0.3)]" : "bg-white/5 text-white/30"
            }`}
          >
            {icon || <Code2 size={20} />}
          </div>
          {totalNodes && (
            <span className="rounded-full bg-[#ff6a00]/10 border border-[#ff6a00]/20 px-2.5 py-0.5 text-[10px] text-[#ff8533] font-mono font-semibold">
              {totalNodes} Nodes
            </span>
          )}
        </div>

        <h3 className="mt-6 text-xl font-bold text-white">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-white/45">{description}</p>
      </div>

      <div className="mt-8 pt-4 border-t border-white/[0.04] flex items-center justify-between">
        {available ? (
          <Link
            href={href}
            className="flex items-center gap-2 text-xs font-bold text-[#ff6a00] hover:text-[#ff7a1a] transition"
          >
            Explore Track Roadmap
            <ArrowRight size={13} />
          </Link>
        ) : (
          <span className="text-xs text-white/30">Coming soon</span>
        )}
      </div>
    </div>
  );
}
