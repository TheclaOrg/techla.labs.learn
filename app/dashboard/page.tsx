"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BrainCircuit,
  Code2,
  Download,
  Info,
  Layers3,
  RotateCcw,
  Shield,
  Sparkles,
  Target,
  Trophy,
  Upload,
} from "lucide-react";
import {
  loadStoredMasteries,
  loadProblemProgress,
  exportUserLearningData,
  importUserLearningData,
} from "@/lib/storage/progress-store";
import { computeOverallMasteryPercentage } from "@/lib/mastery/mastery-engine";
import { generatePersonalizedPath } from "@/lib/learning/personalized-path";
import { dsaTopics } from "@/data/dsa/topics";
import { cyberTopics } from "@/data/cybersecurity/topics";
import { DashboardStat } from "@/components/dashboard/DashboardStat";
import { KnowledgeMap } from "@/components/dashboard/KnowledgeMap";
import { ContinueCard } from "@/components/dashboard/ContinueCard";
import { RecommendationCard } from "@/components/dashboard/RecommendationCard";
import { UserTopicMastery, ProblemProgress } from "@/types/learning";
import { downloadRoadmapFile } from "@/lib/learning/export-roadmap";
import { RoadmapPDFModal } from "@/components/learning/RoadmapPDFModal";

export default function DashboardPage() {
  const [activeDomain, setActiveDomain] = useState<"dsa" | "cybersecurity">("dsa");
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [dsaMasteries, setDsaMasteries] = useState<Record<string, UserTopicMastery>>(() =>
    loadStoredMasteries("dsa")
  );
  const [cyberMasteries, setCyberMasteries] = useState<Record<string, UserTopicMastery>>(() =>
    loadStoredMasteries("cybersecurity")
  );
  const [problemProgress, setProblemProgress] = useState<Record<string, ProblemProgress>>(() =>
    loadProblemProgress()
  );
  const [showImportModal, setShowImportModal] = useState(false);
  const [importJsonText, setImportJsonText] = useState("");
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const isCyber = activeDomain === "cybersecurity";
  const currentMasteries = isCyber ? cyberMasteries : dsaMasteries;
  const currentTopics = isCyber ? cyberTopics : dsaTopics;

  const stats = computeOverallMasteryPercentage(currentMasteries, currentTopics);
  const personalized = generatePersonalizedPath(currentMasteries, activeDomain);
  const currentTopic = personalized.currentTopic;
  const recommendedNext =
    personalized.recommendedTopics[1] || personalized.recommendedTopics[0] || currentTopic;
  const nextReason = personalized.reasoning[0]?.reason;

  const solvedProblemsCount = Object.values(problemProgress).filter(
    (p) => p.status === "solved"
  ).length;

  const handleExport = () => {
    const dataStr = exportUserLearningData();
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `techla-labs-learn-backup-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImportSubmit = () => {
    if (!importJsonText.trim()) return;
    const ok = importUserLearningData(importJsonText);
    if (ok) {
      setDsaMasteries(loadStoredMasteries("dsa"));
      setCyberMasteries(loadStoredMasteries("cybersecurity"));
      setProblemProgress(loadProblemProgress());
      setImportStatus("Roadmap progress successfully restored!");
      setTimeout(() => {
        setShowImportModal(false);
        setImportStatus(null);
        setImportJsonText("");
      }, 1200);
    } else {
      setImportStatus("Failed to parse JSON backup. Please check format.");
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] px-5 pb-28 pt-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Local Storage Privacy & Persistence Notice Banner */}
        <div className="mb-8 rounded-2xl border border-white/[0.08] bg-[#0c0c0c] p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="grid size-8 shrink-0 place-items-center rounded-lg bg-[#ff6a00]/10 text-[#ff8533] mt-0.5">
              <Info size={16} />
            </div>
            <div>
              <p className="text-xs font-semibold text-white">
                Client-Side Storage Active (No Account Required)
              </p>
              <p className="mt-0.5 text-xs text-white/50 leading-relaxed">
                Your test results, topic masteries, and lab progress are saved directly in your browser&apos;s <code className="font-mono text-[#ff8533]">localStorage</code>.
                Your data stays on your machine. You can export or restore your roadmap anytime.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
            <button
              onClick={handleExport}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/80 hover:text-white hover:border-white/20 transition"
            >
              <Download size={13} />
              Export JSON
            </button>
            <button
              onClick={() => setShowImportModal(true)}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/80 hover:text-white hover:border-white/20 transition"
            >
              <Upload size={13} />
              Import
            </button>
          </div>
        </div>

        {/* Dashboard Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#ff6a00]/20 bg-[#ff6a00]/5 px-3 py-1 text-xs font-semibold text-[#ff8533] mb-3">
              <Sparkles size={12} />
              ADAPTIVE MASTERY HUB
            </div>

            <h1 className="text-4xl font-bold tracking-[-.04em] sm:text-6xl text-white">
              Learning Dashboard<span className="text-[#ff6a00]">.</span>
            </h1>

            <p className="mt-2 text-sm sm:text-base text-white/45">
              Personalized knowledge graphs tailored to your diagnostic baselines and lab performance.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setShowPdfModal(true)}
              className="inline-flex items-center gap-2 rounded-full bg-[#ff6a00] px-5 py-2.5 text-xs font-bold text-black hover:bg-[#ff7a1a] transition shadow-[0_0_20px_rgba(255,106,0,0.35)]"
            >
              <Download size={14} />
              Download Personalized PDF
            </button>

            <button
              onClick={() => downloadRoadmapFile(activeDomain, "md")}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-white/80 hover:text-white hover:border-[#ff6a00] transition"
            >
              <Download size={13} />
              Markdown (.md)
            </button>

            <Link
              href={isCyber ? "/learn/cybersecurity/diagnostic" : "/learn/dsa/diagnostic"}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-white/80 hover:text-white hover:border-[#ff6a00] transition"
            >
              <RotateCcw size={13} />
              Retake Diagnostic
            </Link>
          </div>
        </div>

        {/* Domain Switcher Tabs */}
        <div className="mt-8 flex items-center gap-2 border-b border-white/[0.08] pb-4">
          <button
            onClick={() => setActiveDomain("dsa")}
            className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold transition ${
              activeDomain === "dsa"
                ? "bg-[#ff6a00] text-black font-bold shadow-[0_0_20px_rgba(255,106,0,0.3)]"
                : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Code2 size={15} />
            <span>Data Structures & Algorithms (44 Nodes)</span>
          </button>

          <button
            onClick={() => setActiveDomain("cybersecurity")}
            className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold transition ${
              activeDomain === "cybersecurity"
                ? "bg-[#ff6a00] text-black font-bold shadow-[0_0_20px_rgba(255,106,0,0.3)]"
                : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Shield size={15} />
            <span>Cybersecurity Engineering (36 Nodes)</span>
          </button>
        </div>

        {/* 4 Stats Cards */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <DashboardStat
            icon={<Target size={20} />}
            title="Curriculum Mastery"
            value={`${stats.percentage}%`}
            subtitle={`Calculated across ${currentTopics.length} nodes`}
          />
          <DashboardStat
            icon={<Layers3 size={20} />}
            title="Nodes Mastered"
            value={stats.masteredCount}
            subtitle={`${stats.proficientCount} proficient`}
            badge="Evidence Based"
          />
          <DashboardStat
            icon={<Trophy size={20} />}
            title="Completed Practice"
            value={solvedProblemsCount}
            subtitle="Labs & Challenges"
          />
          <DashboardStat
            icon={<BrainCircuit size={20} />}
            title="Next Step Unlocks"
            value={personalized.recommendedTopics.length}
            subtitle="Ready to learn"
            badge="Available"
          />
        </div>

        {/* In-Progress & Recommended Actions */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <ContinueCard
            topic={currentTopic}
            mastery={currentMasteries[currentTopic.slug]}
          />
          <RecommendationCard
            topic={recommendedNext}
            reason={nextReason}
          />
        </div>

        {/* Your Recommended Path Queue */}
        <section className="mt-14">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6a00]">
                Sequential Roadmap
              </p>
              <h2 className="mt-1 text-2xl font-bold text-white">
                Upcoming Recommended Nodes in {isCyber ? "Cybersecurity" : "DSA"}
              </h2>
            </div>
            <Link
              href={isCyber ? "/learn/cybersecurity" : "/learn/dsa"}
              className="text-xs text-[#ff8533] hover:underline flex items-center gap-1"
            >
              Explore Full Curriculum →
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {personalized.recommendedTopics.slice(0, 4).map((t, idx) => (
              <Link
                key={t.id}
                href={`/learn/${t.domain || activeDomain}/${t.slug}`}
                className="card group rounded-2xl p-5 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#ff6a00]">
                    STEP 0{idx + 1}
                  </span>
                  <h3 className="mt-2 text-base font-semibold text-white group-hover:text-[#ff8533] transition">
                    {t.title}
                  </h3>
                  <p className="mt-1 text-xs text-white/40 line-clamp-2">
                    {t.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/[0.04] flex items-center justify-between text-xs text-white/40">
                  <span>{t.estimatedMinutes} mins</span>
                  <span className="text-[#ff6a00] font-semibold group-hover:translate-x-1 transition-transform">
                    Start →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Knowledge Map Overview */}
        <section className="mt-14">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6a00]">
                Curriculum Competency Radar
              </p>
              <h2 className="mt-1 text-2xl font-bold text-white">
                {isCyber ? "Cybersecurity 12 Modules" : "DSA Category Competencies"}
              </h2>
            </div>
          </div>

          <KnowledgeMap domain={activeDomain} masteries={currentMasteries} />
        </section>
      </div>

      {/* Import Backup Modal */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="card w-full max-w-lg rounded-3xl p-6 sm:p-8 border-[#ff6a00]/30 shadow-[0_0_80px_rgba(255,106,0,0.15)]">
            <h3 className="text-xl font-bold text-white">Import Roadmap Backup</h3>
            <p className="mt-2 text-xs text-white/50">
              Paste the exported JSON backup text to restore your DSA and Cybersecurity progress.
            </p>

            <textarea
              rows={6}
              value={importJsonText}
              onChange={(e) => setImportJsonText(e.target.value)}
              placeholder='{"version": "1.0", "dsaMasteries": {...}, ...}'
              className="mt-4 w-full rounded-xl border border-white/10 bg-black/60 p-3 font-mono text-xs text-white placeholder-white/20 focus:border-[#ff6a00] focus:outline-none"
            />

            {importStatus && (
              <p className="mt-2 text-xs font-semibold text-[#ff8533]">{importStatus}</p>
            )}

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowImportModal(false)}
                className="rounded-full px-5 py-2 text-xs font-semibold text-white/50 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleImportSubmit}
                className="rounded-full bg-[#ff6a00] px-6 py-2 text-xs font-bold text-black hover:bg-[#ff7a1a]"
              >
                Restore Progress
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Personalized High-Definition Printable PDF Modal */}
      <RoadmapPDFModal
        domain={activeDomain}
        isOpen={showPdfModal}
        onClose={() => setShowPdfModal(false)}
      />
    </main>
  );
}
