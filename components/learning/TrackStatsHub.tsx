"use client";

import React from "react";
import Link from "next/link";
import {
  BrainCircuit,
  CheckCircle2,
  Clock,
  Code2,
  Compass,
  Flame,
  Layers,
  Lock,
  RotateCcw,
  Shield,
  Sparkles,
  Target,
  Trophy,
  Zap,
} from "lucide-react";
import { TrackAnalytics } from "@/lib/learning/track-analytics";

interface TrackStatsHubProps {
  analytics: TrackAnalytics;
  selectedCategory?: string;
  onSelectCategory?: (category: string) => void;
  diagnosticHref: string;
}

export function TrackStatsHub({
  analytics,
  selectedCategory = "All",
  onSelectCategory,
  diagnosticHref,
}: TrackStatsHubProps) {
  const isCyber = analytics.domain === "cybersecurity";
  const Icon = isCyber ? Shield : Code2;

  return (
    <div className="space-y-6">
      {/* Top 4 Real-Time Analytics Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Card 1: Curriculum Mastery */}
        <div className="card rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between border-white/[0.08] bg-[#0c0c0c] hover:border-[#ff6a00]/30 transition">
          <div>
            <div className="flex items-center justify-between">
              <div className="grid size-9 place-items-center rounded-xl bg-[#ff6a00]/10 text-[#ff6a00]">
                <Target size={18} />
              </div>
              <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${analytics.readinessTier.badgeBg}`}>
                {analytics.readinessTier.name}
              </span>
            </div>

            <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-white/40">
              Curriculum Mastery
            </p>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-bold font-mono text-white tracking-tight">
                {analytics.overallMasteryPercentage}%
              </span>
              <span className="text-xs text-white/40">
                / {analytics.totalNodes} Nodes
              </span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/[0.05]">
            <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
              <div
                className="h-full rounded-full bg-[#ff6a00] transition-all duration-700"
                style={{ width: `${analytics.overallMasteryPercentage}%` }}
              />
            </div>
            <div className="mt-2 flex items-center justify-between text-[11px] text-white/40">
              <span>{analytics.masteredCount + analytics.proficientCount} Cleared</span>
              <span>{analytics.availableCount} Unlocked</span>
            </div>
          </div>
        </div>

        {/* Card 2: Knowledge Nodes Breakdown */}
        <div className="card rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between border-white/[0.08] bg-[#0c0c0c] hover:border-[#ff6a00]/30 transition">
          <div>
            <div className="flex items-center justify-between">
              <div className="grid size-9 place-items-center rounded-xl bg-amber-500/10 text-amber-400">
                <Layers size={18} />
              </div>
              <span className="rounded-full bg-white/5 border border-white/10 px-2 py-0.5 text-[10px] text-white/60 font-mono">
                Graph Engine
              </span>
            </div>

            <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-white/40">
              Active Graph Status
            </p>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-bold font-mono text-[#ff8533] tracking-tight">
                {analytics.masteredCount}
              </span>
              <span className="text-xs text-white/40">Mastered (Lvl 5)</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/[0.05] grid grid-cols-3 gap-1 text-center">
            <div className="rounded-lg bg-white/[0.02] p-1.5">
              <p className="text-[10px] text-white/30 uppercase">Proficient</p>
              <p className="text-xs font-bold text-white font-mono">{analytics.proficientCount}</p>
            </div>
            <div className="rounded-lg bg-white/[0.02] p-1.5">
              <p className="text-[10px] text-white/30 uppercase">Learning</p>
              <p className="text-xs font-bold text-white font-mono">{analytics.learningCount}</p>
            </div>
            <div className="rounded-lg bg-white/[0.02] p-1.5">
              <p className="text-[10px] text-white/30 uppercase">Locked</p>
              <p className="text-xs font-bold text-white/50 font-mono">{analytics.lockedCount}</p>
            </div>
          </div>
        </div>

        {/* Card 3: Hands-on Labs & LeetCode Practice */}
        <div className="card rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between border-white/[0.08] bg-[#0c0c0c] hover:border-[#ff6a00]/30 transition">
          <div>
            <div className="flex items-center justify-between">
              <div className="grid size-9 place-items-center rounded-xl bg-emerald-500/10 text-emerald-400">
                <Trophy size={18} />
              </div>
              <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[10px] text-emerald-400 font-semibold">
                {analytics.problemsPercentage}% Solved
              </span>
            </div>

            <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-white/40">
              {isCyber ? "Hands-on Security Labs" : "Curated LeetCode Labs"}
            </p>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-bold font-mono text-white tracking-tight">
                {analytics.solvedProblemsCount}
              </span>
              <span className="text-xs text-white/40">
                / {analytics.totalProblemsCount} Curated
              </span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/[0.05]">
            <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
              <div
                className="h-full rounded-full bg-emerald-500 transition-all duration-700"
                style={{ width: `${analytics.problemsPercentage}%` }}
              />
            </div>
            <div className="mt-2 flex items-center justify-between text-[11px] text-white/40">
              <span>{isCyber ? "TryHackMe / PortSwigger" : "LeetCode Curated"}</span>
              <span className="text-white/60 font-semibold">
                {analytics.totalProblemsCount - analytics.solvedProblemsCount} Remaining
              </span>
            </div>
          </div>
        </div>

        {/* Card 4: Study Investment & Velocity */}
        <div className="card rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between border-white/[0.08] bg-[#0c0c0c] hover:border-[#ff6a00]/30 transition">
          <div>
            <div className="flex items-center justify-between">
              <div className="grid size-9 place-items-center rounded-xl bg-blue-500/10 text-blue-400">
                <Clock size={18} />
              </div>
              <span className="rounded-full bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 text-[10px] text-blue-400 font-semibold">
                Comprehensive
              </span>
            </div>

            <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-white/40">
              Curriculum Depth
            </p>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-bold font-mono text-white tracking-tight">
                ~{analytics.totalEstimatedHours}h
              </span>
              <span className="text-xs text-white/40">Total Syllabus</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/[0.05] flex items-center justify-between text-[11px] text-white/40">
            <span className="flex items-center gap-1">
              <Flame size={12} className="text-[#ff6a00]" />
              {analytics.categories.length} Core Domains
            </span>
            <span className="font-mono text-white/60">
              ~{Math.round(analytics.totalEstimatedMinutes / analytics.totalNodes)}m / node
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Category Mastery Matrix */}
      <div className="rounded-2xl border border-white/[0.08] bg-[#0c0c0c] p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Compass size={16} className="text-[#ff6a00]" />
              Category Mastery Breakdown & Instant Filter
            </h3>
            <p className="text-xs text-white/45 mt-0.5">
              Click any category pill to filter the knowledge graph and topics below.
            </p>
          </div>

          {onSelectCategory && (
            <button
              onClick={() => onSelectCategory("All")}
              className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                selectedCategory === "All"
                  ? "bg-[#ff6a00] text-black font-bold"
                  : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
              }`}
            >
              Show All ({analytics.totalNodes})
            </button>
          )}
        </div>

        <div className="grid gap-2.5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {analytics.categories.map((cat) => {
            const isSelected = selectedCategory === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => onSelectCategory && onSelectCategory(cat.name)}
                className={`text-left rounded-xl border p-3 transition-all relative overflow-hidden ${
                  isSelected
                    ? "border-[#ff6a00] bg-[#ff6a00]/10 shadow-[0_0_20px_rgba(255,106,0,0.15)]"
                    : "border-white/[0.05] bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className={`font-semibold truncate max-w-[140px] ${isSelected ? "text-[#ff8533]" : "text-white"}`}>
                    {cat.name}
                  </span>
                  <span className="font-mono text-[10px] text-white/40 font-semibold">
                    {cat.mastered + cat.proficient}/{cat.total}
                  </span>
                </div>

                <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/5">
                  <div
                    className={`h-full rounded-full transition-all ${
                      cat.percentage >= 80
                        ? "bg-[#ff6a00]"
                        : cat.percentage > 0
                        ? "bg-amber-400"
                        : "bg-transparent"
                    }`}
                    style={{ width: `${Math.max(4, cat.percentage)}%` }}
                  />
                </div>

                <div className="mt-2 flex items-center justify-between text-[10px] text-white/40">
                  <span className={cat.status === "Mastered" ? "text-[#ff8533] font-semibold" : ""}>
                    {cat.status}
                  </span>
                  <span className="font-mono">{cat.percentage}%</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Calibration / Readiness Callout */}
      <div className="rounded-2xl border border-[#ff6a00]/25 bg-gradient-to-r from-[#ff6a00]/10 via-[#0d0d0d] to-[#0d0d0d] p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-5 shadow-[0_0_40px_rgba(255,106,0,0.05)]">
        <div className="flex items-start gap-3.5">
          <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#ff6a00] text-black font-bold shadow-[0_0_20px_rgba(255,106,0,0.4)] mt-0.5">
            <Zap size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold tracking-wider text-[#ff8533]">
                Knowledge Engine Calibration
              </span>
              <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-white/70 font-mono">
                20-Mark Diagnostic
              </span>
            </div>
            <p className="mt-1 text-sm font-semibold text-white">
              {analytics.readinessTier.description}
            </p>
            <p className="mt-0.5 text-xs text-white/45">
              Calibrating your baseline instantly unlocks prerequisite chains and customizes your optimal next step.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
          <Link
            href={diagnosticHref}
            className="flex items-center gap-2 rounded-full bg-[#ff6a00] px-5 py-2.5 text-xs font-bold text-black hover:bg-[#ff7a1a] transition shadow-[0_0_20px_rgba(255,106,0,0.3)]"
          >
            <RotateCcw size={13} />
            Take 20-Mark Diagnostic
          </Link>
        </div>
      </div>
    </div>
  );
}
