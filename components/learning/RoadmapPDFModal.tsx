"use client";

import React, { useState } from "react";
import {
  X,
  Printer,
  Sparkles,
  Shield,
  Code2,
  CheckCircle2,
  Lock,
  Clock,
  ArrowRight,
  BrainCircuit,
  Trophy,
  Target,
} from "lucide-react";
import { loadStoredMasteries, loadDiagnosticResult } from "@/lib/storage/progress-store";
import { computeOverallMasteryPercentage } from "@/lib/mastery/mastery-engine";
import { generatePersonalizedPath } from "@/lib/learning/personalized-path";
import { getTopologicalOrder, topicsBySlug } from "@/lib/learning/graph";
import { dsaTopics } from "@/data/dsa/topics";
import { cyberTopics } from "@/data/cybersecurity/topics";

interface RoadmapPDFModalProps {
  domain: "dsa" | "cybersecurity";
  isOpen: boolean;
  onClose: () => void;
}

export function RoadmapPDFModal({ domain, isOpen, onClose }: RoadmapPDFModalProps) {
  const [learnerName, setLearnerName] = useState("Software Engineer");

  if (!isOpen) return null;

  const isCyber = domain === "cybersecurity";
  const topics = isCyber ? cyberTopics : dsaTopics;
  const masteries = loadStoredMasteries(domain);
  const diagnostic = loadDiagnosticResult(domain);
  const stats = computeOverallMasteryPercentage(masteries, topics);
  const personalized = generatePersonalizedPath(masteries, domain);
  const orderedTopics = getTopologicalOrder(domain);

  const dateStr = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-2 sm:p-6 backdrop-blur-xl overflow-y-auto">
      {/* Control Toolbar (Hidden during Print) */}
      <div className="fixed top-4 right-4 z-[110] flex items-center gap-3 print:hidden">
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 rounded-full bg-[#ff6a00] px-6 py-2.5 text-xs font-bold text-black shadow-[0_0_25px_rgba(255,106,0,0.4)] hover:bg-[#ff7a1a] transition"
        >
          <Printer size={15} />
          Save as PDF / Print
        </button>
        <button
          onClick={onClose}
          className="grid size-10 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 transition"
        >
          <X size={18} />
        </button>
      </div>

      {/* Main Printable Document Container */}
      <div className="relative my-auto w-full max-w-4xl rounded-3xl border border-white/10 bg-[#070707] p-6 sm:p-12 shadow-[0_0_100px_rgba(0,0,0,0.9)] print:m-0 print:w-full print:max-w-none print:border-none print:bg-black print:p-6 text-white font-sans">
        
        {/* Name input (screen only) */}
        <div className="mb-6 rounded-2xl border border-[#ff6a00]/30 bg-[#0e0e0e] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 print:hidden">
          <div className="flex items-center gap-2 text-xs text-white/60">
            <span className="font-semibold text-[#ff8533]">Personalize Name:</span>
            <input
              type="text"
              value={learnerName}
              onChange={(e) => setLearnerName(e.target.value)}
              placeholder="Your Name / Handle"
              className="rounded-lg border border-white/15 bg-black/60 px-3 py-1 text-xs text-white placeholder-white/30 focus:border-[#ff6a00] focus:outline-none"
            />
          </div>
          <p className="text-[11px] text-white/40">
            Click <strong>Save as PDF / Print</strong> and select &quot;Save as PDF&quot; in destination.
          </p>
        </div>

        {/* ==================== PDF HEADER BANNER ==================== */}
        <div className="relative rounded-3xl border border-[#ff6a00]/30 bg-gradient-to-br from-[#120a02] via-[#090909] to-[#050505] p-6 sm:p-10 overflow-hidden shadow-[0_0_60px_rgba(255,106,0,0.12)]">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#ff6a00]/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
            <div className="flex items-center gap-3">
              <div className="grid size-10 place-items-center rounded-xl bg-[#ff6a00] font-black text-black text-lg shadow-[0_0_20px_rgba(255,106,0,0.4)]">
                T
              </div>
              <div>
                <span className="font-bold tracking-tight text-white text-lg">
                  techla<span className="text-[#ff6a00]">.</span>labs
                </span>
                <span className="text-xs text-white/40 font-mono ml-1.5">learn</span>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-[#ff6a00]/40 bg-[#ff6a00]/10 px-3.5 py-1 text-[10px] font-extrabold uppercase tracking-widest text-[#ff8533]">
              <Sparkles size={11} />
              PERSONALIZED MASTERY ROADMAP
            </div>
          </div>

          <div className="mt-8">
            <p className="text-xs uppercase font-bold tracking-[0.2em] text-[#ff6a00]">
              {isCyber ? "CYBERSECURITY & DEFENSIVE ENGINEERING" : "DATA STRUCTURES & ALGORITHMS"}
            </p>
            <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Curriculum Roadmap for <span className="text-[#ff6a00]">{learnerName}</span>
            </h1>
            <p className="mt-2 text-xs text-white/50 font-mono">
              Generated on {dateStr} • Dynamic Prerequisite Graph v2026
            </p>
          </div>
        </div>

        {/* ==================== STATS OVERVIEW CARDS ==================== */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          <div className="rounded-2xl border border-white/[0.08] bg-[#0c0c0c] p-4 text-center">
            <div className="mx-auto grid size-8 place-items-center rounded-lg bg-[#ff6a00]/10 text-[#ff6a00] mb-2">
              <Target size={16} />
            </div>
            <p className="text-2xl font-black text-white font-mono">{stats.percentage}%</p>
            <p className="text-[10px] text-white/40 uppercase font-semibold mt-0.5">Overall Mastery</p>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-[#0c0c0c] p-4 text-center">
            <div className="mx-auto grid size-8 place-items-center rounded-lg bg-[#ff6a00]/10 text-[#ff6a00] mb-2">
              <Trophy size={16} />
            </div>
            <p className="text-2xl font-black text-[#ff8533] font-mono">
              {diagnostic ? `${diagnostic.score}/${diagnostic.totalQuestions}` : `${stats.masteredCount}/${stats.totalTopics}`}
            </p>
            <p className="text-[10px] text-white/40 uppercase font-semibold mt-0.5">
              {diagnostic ? "Diagnostic Marks" : "Nodes Mastered"}
            </p>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-[#0c0c0c] p-4 text-center">
            <div className="mx-auto grid size-8 place-items-center rounded-lg bg-[#ff6a00]/10 text-[#ff6a00] mb-2">
              <BrainCircuit size={16} />
            </div>
            <p className="text-2xl font-black text-white font-mono">{personalized.recommendedTopics.length}</p>
            <p className="text-[10px] text-white/40 uppercase font-semibold mt-0.5">Ready to Unlock</p>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-[#0c0c0c] p-4 text-center">
            <div className="mx-auto grid size-8 place-items-center rounded-lg bg-[#ff6a00]/10 text-[#ff6a00] mb-2">
              <Clock size={16} />
            </div>
            <p className="text-2xl font-black text-white font-mono">{stats.totalTopics}</p>
            <p className="text-[10px] text-white/40 uppercase font-semibold mt-0.5">Total Nodes</p>
          </div>
        </div>

        {/* ==================== ACTION PLAN / NEXT STEPS ==================== */}
        <div className="mt-8 rounded-2xl border border-[#ff6a00]/25 bg-[#0a0a0a] p-6">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#ff6a00] mb-4">
            <Sparkles size={14} />
            Personalized Priority Action Plan
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {personalized.recommendedTopics.slice(0, 4).map((t, idx) => {
              const reasonObj = personalized.reasoning.find((r) => r.topicSlug === t.slug);
              return (
                <div
                  key={t.slug}
                  className="rounded-xl border border-white/[0.06] bg-[#0e0e0e] p-4 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-mono mb-1.5">
                      <span className="text-[#ff6a00] font-bold">PRIORITY 0{idx + 1}</span>
                      <span className="text-white/40">{t.estimatedMinutes} mins</span>
                    </div>
                    <h4 className="text-sm font-bold text-white">{t.title}</h4>
                    <p className="mt-1 text-xs text-white/50 line-clamp-2">{t.description}</p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-white/[0.04] text-[11px] text-[#ff8533]">
                    <strong>Why next: </strong>
                    <span className="text-white/70">{reasonObj?.reason || "Next topological prerequisite step."}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ==================== FULL SEQUENCED SYLLABUS ==================== */}
        <div className="mt-10">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-6">
            <div>
              <p className="text-[10px] uppercase font-bold tracking-widest text-[#ff6a00]">
                Curriculum Graph Matrix
              </p>
              <h3 className="text-lg font-bold text-white mt-0.5">
                Full Sequenced Learning Path
              </h3>
            </div>
            <span className="text-xs text-white/40 font-mono">
              {orderedTopics.length} Knowledge Nodes
            </span>
          </div>

          <div className="space-y-3">
            {orderedTopics.map((topic, idx) => {
              const mastery = masteries[topic.slug]?.masteryLevel ?? 0;
              const isMastered = mastery >= 4;
              const isLearning = mastery >= 1 && mastery < 4;
              const isReady =
                !isMastered &&
                !isLearning &&
                (topic.prerequisites.length === 0 ||
                  topic.prerequisites.every((p) => (masteries[p]?.masteryLevel ?? 0) >= 3));

              return (
                <div
                  key={topic.slug}
                  className="rounded-xl border border-white/[0.06] bg-[#0c0c0c] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-start gap-3.5">
                    <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-white/5 font-mono text-[11px] text-white/40 font-bold">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#ff8533]">
                          {topic.category}
                        </span>
                        <span className="text-white/20">•</span>
                        <span className="text-white/40">{topic.estimatedMinutes} mins</span>
                      </div>
                      <h4 className="text-sm font-semibold text-white mt-0.5">{topic.title}</h4>
                      <p className="mt-1 text-[11px] text-white/50 line-clamp-1">{topic.summary}</p>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-2 self-end sm:self-center">
                    {isMastered ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#ff6a00] px-3 py-1 text-[10px] font-bold text-black shadow-[0_0_12px_rgba(255,106,0,0.3)]">
                        <CheckCircle2 size={12} /> Mastered
                      </span>
                    ) : isLearning ? (
                      <span className="inline-flex items-center gap-1 rounded-full border border-[#ff8533]/50 bg-[#ff8533]/10 px-3 py-1 text-[10px] font-bold text-[#ff8533]">
                        Level {mastery}/5
                      </span>
                    ) : isReady ? (
                      <span className="inline-flex items-center gap-1 rounded-full border border-[#ff6a00]/30 bg-[#ff6a00]/10 px-3 py-1 text-[10px] font-semibold text-[#ff8533]">
                        <Sparkles size={11} /> Next Up
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] text-white/30">
                        <Lock size={10} /> Locked
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ==================== FOOTER / VERIFICATION ==================== */}
        <div className="mt-12 pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs text-white/40">
          <div>
            <p className="font-semibold text-white">Techla.labs.learn Adaptive Learning Graph</p>
            <p className="text-[11px] text-white/30">Verified client-side mastery and knowledge prerequisite mapping.</p>
          </div>
          <div className="font-mono text-[10px] text-[#ff8533] uppercase">
            https://app.techla.labs
          </div>
        </div>
      </div>
    </div>
  );
}
