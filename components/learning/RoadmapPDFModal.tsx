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
  BookOpen,
  Video,
  ExternalLink,
  Globe,
} from "lucide-react";
import { loadStoredMasteries, loadDiagnosticResult } from "@/lib/storage/progress-store";
import { computeOverallMasteryPercentage } from "@/lib/mastery/mastery-engine";
import { generatePersonalizedPath } from "@/lib/learning/personalized-path";
import { getTopologicalOrder, topicsBySlug } from "@/lib/learning/graph";
import { dsaTopics } from "@/data/dsa/topics";
import { cyberTopics } from "@/data/cybersecurity/topics";
import { dsaResources } from "@/data/dsa/resources";
import { cyberResources } from "@/data/cybersecurity/resources";
import { dsaProblems } from "@/data/dsa/problems";
import { cyberLabs } from "@/data/cybersecurity/labs";

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
  const allResources = isCyber ? cyberResources : dsaResources;
  const allProblems = isCyber ? cyberLabs : dsaProblems;
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
    <div className="fixed inset-0 z-[100] flex items-start justify-center bg-black/95 pt-8 sm:pt-12 pb-12 px-2 sm:px-6 backdrop-blur-2xl overflow-y-auto print:static print:inset-auto print:bg-[#050505] print:p-0 print:pt-8 print:overflow-visible print:block">
      
      {/* Explicit Print Dark Mode & Page Configuration Stylesheet */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @media print {
            @page {
              margin: 12mm 10mm 15mm 10mm;
              size: portrait;
              background-color: #050505;
            }
            html, body {
              background-color: #050505 !important;
              color: #ffffff !important;
              margin: 0 !important;
              padding: 0 !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
              color-adjust: exact !important;
            }
            * {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
              color-adjust: exact !important;
            }
            .no-print {
              display: none !important;
            }
            .pdf-card, .pdf-topic-node {
              break-inside: avoid !important;
              page-break-inside: avoid !important;
            }
          }
        `
      }} />

      {/* Control Toolbar (Hidden during Print) */}
      <div className="fixed top-4 right-4 z-[110] flex items-center gap-3 print:hidden no-print">
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 rounded-full bg-[#ff6a00] px-6 py-2.5 text-xs font-bold text-black shadow-[0_0_25px_rgba(255,106,0,0.5)] hover:bg-[#ff7a1a] transition cursor-pointer"
        >
          <Printer size={15} />
          Save as PDF / Print
        </button>
        <button
          onClick={onClose}
          className="grid size-10 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 transition cursor-pointer"
        >
          <X size={18} />
        </button>
      </div>

      {/* Main Printable Document Container */}
      <div className="relative w-full max-w-4xl rounded-3xl border border-white/10 bg-[#050505] p-6 sm:p-12 pt-8 sm:pt-14 shadow-[0_0_120px_rgba(0,0,0,0.95)] print:m-0 print:w-full print:max-w-none print:border-none print:bg-[#050505] print:p-6 print:pt-10 text-white font-sans">
        
        {/* Name input (screen only) */}
        <div className="mb-6 rounded-2xl border border-[#ff6a00]/30 bg-[#0e0e0e] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 print:hidden no-print">
          <div className="flex items-center gap-2 text-xs text-white/60">
            <span className="font-semibold text-[#ff8533]">Personalize Name:</span>
            <input
              type="text"
              value={learnerName}
              onChange={(e) => setLearnerName(e.target.value)}
              placeholder="Your Name / Handle"
              className="rounded-lg border border-white/15 bg-black/80 px-3 py-1 text-xs text-white placeholder-white/30 focus:border-[#ff6a00] focus:outline-none"
            />
          </div>
          <p className="text-[11px] text-white/40">
            Click <strong>Save as PDF / Print</strong> and choose &quot;Save as PDF&quot; with background graphics enabled.
          </p>
        </div>

        {/* ==================== PDF HEADER BANNER ==================== */}
        <div className="pdf-card relative rounded-3xl border border-[#ff6a00]/30 bg-gradient-to-br from-[#150a02] via-[#090909] to-[#040404] p-6 sm:p-10 overflow-hidden shadow-[0_0_60px_rgba(255,106,0,0.12)]">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#ff6a00]/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
            <div className="flex items-center gap-3">
              <div className="grid size-10 place-items-center rounded-xl bg-[#ff6a00] font-black text-black text-lg shadow-[0_0_20px_rgba(255,106,0,0.4)]">
                T
              </div>
              <div>
                <h2 className="text-sm font-bold tracking-tight text-white">
                  techla<span className="text-[#ff6a00]">.</span>labs<span className="text-white/40 font-mono text-xs"> / learn</span>
                </h2>
                <p className="text-[10px] text-white/40 font-mono">Autonomous Adaptive Learning Graph</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-right">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#ff6a00]/30 bg-[#ff6a00]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#ff8533]">
                  {isCyber ? <Shield size={12} /> : <Code2 size={12} />}
                  {isCyber ? "Cybersecurity Engineering" : "Data Structures & Algorithms"}
                </span>
                <p className="text-[10px] text-white/40 font-mono mt-1">{dateStr}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#ff6a00]">
                Verified Personalized Curriculum
              </p>
              <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                {learnerName}&apos;s Learning Roadmap
              </h1>
              <p className="mt-2 text-xs sm:text-sm text-white/60 max-w-xl leading-relaxed">
                Customized prerequisite knowledge graph generated based on diagnostic evaluation, target milestones, and evidence-based topic mastery.
              </p>
            </div>

            {/* Score Ring / Pill */}
            <div className="flex items-center gap-4 bg-white/[0.03] border border-white/[0.08] rounded-2xl p-4 shrink-0">
              <div className="text-center">
                <span className="text-[9px] uppercase font-bold text-white/40 block">Mastery Score</span>
                <span className="text-3xl font-black text-[#ff8533] font-mono">{stats.percentage}%</span>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div className="text-center">
                <span className="text-[9px] uppercase font-bold text-white/40 block">Diagnostic</span>
                <span className="text-2xl font-bold text-white font-mono">
                  {diagnostic ? `${diagnostic.score}/${diagnostic.totalQuestions}` : "Calibrated"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ==================== SUMMARY STATS GRID ==================== */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="rounded-2xl border border-white/[0.08] bg-[#0c0c0c] p-4 text-center">
            <div className="mx-auto grid size-8 place-items-center rounded-lg bg-[#ff6a00]/10 text-[#ff6a00] mb-2">
              <Trophy size={16} />
            </div>
            <p className="text-2xl font-black text-white font-mono">{stats.masteredCount}</p>
            <p className="text-[10px] text-white/40 uppercase font-semibold mt-0.5">Mastered (Lvl 5)</p>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-[#0c0c0c] p-4 text-center">
            <div className="mx-auto grid size-8 place-items-center rounded-lg bg-[#ff6a00]/10 text-[#ff6a00] mb-2">
              <Target size={16} />
            </div>
            <p className="text-2xl font-black text-[#ff8533] font-mono">{stats.proficientCount}</p>
            <p className="text-[10px] text-white/40 uppercase font-semibold mt-0.5">Proficient (Lvl 4)</p>
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

        {/* ==================== FULL SEQUENCED SYLLABUS WITH RESOURCES ==================== */}
        <div className="mt-10">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-6">
            <div>
              <p className="text-[10px] uppercase font-bold tracking-widest text-[#ff6a00]">
                Curriculum Graph Matrix & Free Resources
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

              const topicResList = allResources.filter((r) => r.topicSlug === topic.slug);
              const topicProbList = allProblems.filter((p) => p.topicSlug === topic.slug);

              return (
                <div
                  key={topic.slug}
                  className="pdf-topic-node rounded-xl border border-white/[0.08] bg-[#0c0c0c] p-4 flex flex-col justify-between gap-3 text-xs"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
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

                  {/* Curated Free Resources & Labs Attached */}
                  {(topicResList.length > 0 || topicProbList.length > 0) && (
                    <div className="mt-1 pt-2.5 border-t border-white/[0.04] flex flex-wrap items-center gap-2 text-[10px]">
                      <span className="text-white/35 font-semibold uppercase">Free Materials:</span>
                      {topicResList.slice(0, 2).map((res) => (
                        <a
                          key={res.id}
                          href={res.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded bg-white/5 border border-white/10 px-2 py-0.5 text-white/70 hover:text-white"
                        >
                          <Video size={10} className="text-[#ff6a00]" />
                          <span>{res.provider}: {res.title}</span>
                        </a>
                      ))}
                      {topicProbList.slice(0, 2).map((prob) => (
                        <a
                          key={prob.id}
                          href={prob.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded bg-[#ff6a00]/10 border border-[#ff6a00]/20 px-2 py-0.5 text-[#ff8533]"
                        >
                          <span>{prob.platform}: {prob.title}</span>
                          <ExternalLink size={9} />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ==================== CURATED FREE LEARNING RESOURCES DIRECTORY ==================== */}
        <div className="pdf-card mt-10 rounded-2xl border border-[#ff6a00]/30 bg-[#0a0a0a] p-6 sm:p-8">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-4">
            <div className="flex items-center gap-2 text-[#ff8533]">
              <Globe size={16} />
              <h3 className="text-sm uppercase font-bold tracking-wider">
                Curated Free Learning Resources & Interactive Lab Directory
              </h3>
            </div>
            <span className="text-[10px] text-emerald-400 font-mono bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
              100% Free & Open Access
            </span>
          </div>

          <p className="text-xs text-white/60 mb-4">
            The following authoritative video courses, interactive wargames, and official documentation are fully curated for this track:
          </p>

          <div className="grid gap-3 sm:grid-cols-2">
            {isCyber ? (
              <>
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3.5">
                  <div className="flex items-center justify-between text-xs font-bold text-white mb-1">
                    <span>PortSwigger Web Security Academy</span>
                    <span className="text-[9px] text-[#ff8533] uppercase">Interactive Labs</span>
                  </div>
                  <p className="text-[11px] text-white/50 mb-2">Free hands-on vulnerability practice covering SQLi, XSS, CSRF, and authentication.</p>
                  <span className="text-[10px] font-mono text-[#ff8533]">https://portswigger.net/web-security</span>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3.5">
                  <div className="flex items-center justify-between text-xs font-bold text-white mb-1">
                    <span>OWASP Cheatsheet Series</span>
                    <span className="text-[9px] text-[#ff8533] uppercase">Documentation</span>
                  </div>
                  <p className="text-[11px] text-white/50 mb-2">High-value defensive architecture guides and mitigation patterns for web engineers.</p>
                  <span className="text-[10px] font-mono text-[#ff8533]">https://cheatsheetseries.owasp.org</span>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3.5">
                  <div className="flex items-center justify-between text-xs font-bold text-white mb-1">
                    <span>TryHackMe Security Pathways</span>
                    <span className="text-[9px] text-[#ff8533] uppercase">Virtual Machines</span>
                  </div>
                  <p className="text-[11px] text-white/50 mb-2">In-browser defensive & offensive security labs from Linux fundamentals to SOC analysis.</p>
                  <span className="text-[10px] font-mono text-[#ff8533]">https://tryhackme.com</span>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3.5">
                  <div className="flex items-center justify-between text-xs font-bold text-white mb-1">
                    <span>Linux Journey & Wireshark Docs</span>
                    <span className="text-[9px] text-[#ff8533] uppercase">Reference</span>
                  </div>
                  <p className="text-[11px] text-white/50 mb-2">Complete guides to command-line administration, user permissions, and packet capture forensics.</p>
                  <span className="text-[10px] font-mono text-[#ff8533]">https://linuxjourney.com</span>
                </div>
              </>
            ) : (
              <>
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3.5">
                  <div className="flex items-center justify-between text-xs font-bold text-white mb-1">
                    <span>NeetCode.io Algorithm Patterns</span>
                    <span className="text-[9px] text-[#ff8533] uppercase">Video & Code</span>
                  </div>
                  <p className="text-[11px] text-white/50 mb-2">Comprehensive video walkthroughs and time/space complexity animations for LeetCode patterns.</p>
                  <span className="text-[10px] font-mono text-[#ff8533]">https://neetcode.io</span>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3.5">
                  <div className="flex items-center justify-between text-xs font-bold text-white mb-1">
                    <span>Take U Forward (Striver SDE Sheet)</span>
                    <span className="text-[9px] text-[#ff8533] uppercase">Full Course</span>
                  </div>
                  <p className="text-[11px] text-white/50 mb-2">Deep structural walkthroughs of arrays, trees, dynamic programming, and graphs.</p>
                  <span className="text-[10px] font-mono text-[#ff8533]">https://takeuforward.org</span>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3.5">
                  <div className="flex items-center justify-between text-xs font-bold text-white mb-1">
                    <span>VisuAlgo Interactive Visualizer</span>
                    <span className="text-[9px] text-[#ff8533] uppercase">Interactive</span>
                  </div>
                  <p className="text-[11px] text-white/50 mb-2">Step-by-step visual transitions for hash tables, binary search trees, and Dijkstra graphs.</p>
                  <span className="text-[10px] font-mono text-[#ff8533]">https://visualgo.net</span>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3.5">
                  <div className="flex items-center justify-between text-xs font-bold text-white mb-1">
                    <span>MIT 6.006: Introduction to Algorithms</span>
                    <span className="text-[9px] text-[#ff8533] uppercase">Academic Lecture</span>
                  </div>
                  <p className="text-[11px] text-white/50 mb-2">MIT OpenCourseWare computer science lectures by Prof. Erik Demaine.</p>
                  <span className="text-[10px] font-mono text-[#ff8533]">https://ocw.mit.edu/courses/6-006</span>
                </div>
              </>
            )}
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
