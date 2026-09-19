"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BrainCircuit,
  Download,
  Sparkles,
} from "lucide-react";
import { dsaTopics } from "@/data/dsa/topics";
import { loadStoredMasteries, loadProblemProgress } from "@/lib/storage/progress-store";
import { generatePersonalizedPath } from "@/lib/learning/personalized-path";
import { computeTrackAnalytics } from "@/lib/learning/track-analytics";
import { KnowledgeGraph } from "@/components/learning/KnowledgeGraph";
import { TopicCard } from "@/components/learning/TopicCard";
import { TrackStatsHub } from "@/components/learning/TrackStatsHub";
import { RoadmapPDFModal } from "@/components/learning/RoadmapPDFModal";
import { UserTopicMastery, ProblemProgress, DSACategory } from "@/types/learning";

const categoryOrder: DSACategory[] = [
  "Foundations",
  "Arrays & Strings",
  "Linked Lists",
  "Stacks & Queues",
  "Hashing",
  "Searching",
  "Sorting",
  "Trees",
  "Graphs",
  "Greedy",
  "Dynamic Programming",
  "Backtracking",
  "Advanced",
];

export default function DsaOverviewPage() {
  const [masteries] = useState<Record<string, UserTopicMastery>>(() => loadStoredMasteries("dsa"));
  const [problemProgress] = useState<Record<string, ProblemProgress>>(() => loadProblemProgress());
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [showPdfModal, setShowPdfModal] = useState(false);

  const analytics = computeTrackAnalytics("dsa", masteries, problemProgress);
  const personalized = generatePersonalizedPath(masteries, "dsa");
  const nextTopic = personalized.currentTopic;
  const nextReason = personalized.reasoning[0]?.reason || "Recommended next based on your prerequisite tree.";

  const filteredTopics = selectedCategory === "All"
    ? dsaTopics
    : dsaTopics.filter((t) => t.category === selectedCategory);

  return (
    <main className="min-h-screen bg-[#050505] px-5 pb-28 pt-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header Bar */}
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#ff6a00]/20 bg-[#ff6a00]/5 px-3 py-1 text-xs font-semibold text-[#ff8533] mb-4">
              <Sparkles size={12} />
              DATA STRUCTURES & ALGORITHMS (44 NODES)
            </div>

            <h1 className="text-4xl font-bold tracking-[-.05em] sm:text-6xl text-white">
              Data Structures <span className="text-[#ff6a00]">&</span> Algorithms
            </h1>

            <p className="mt-3 max-w-2xl text-sm sm:text-base text-white/50 leading-7">
              A dynamic graph curriculum that adjusts continuously to what you know. Master foundations first, bridge prerequisite gaps, and accelerate interview readiness.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowPdfModal(true)}
              className="flex items-center justify-center gap-2 rounded-full bg-[#ff6a00] px-6 py-3 text-sm font-bold text-black hover:bg-[#ff7a1a] transition shadow-[0_0_25px_rgba(255,106,0,0.35)]"
            >
              <Download size={15} />
              Download Personalized PDF
            </button>
            <Link
              href="/learn/dsa/diagnostic"
              className="flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:border-[#ff6a00] hover:text-[#ff8533] transition"
            >
              Take 20-Mark Diagnostic
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>

        {/* Live Track Analytics Hub */}
        <div className="mt-10">
          <TrackStatsHub
            analytics={analytics}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            diagnosticHref="/learn/dsa/diagnostic"
          />
        </div>

        {/* Recommended Next Step & Knowledge Graph */}
        <div className="mt-10">
          <div className="rounded-2xl border border-[#ff6a00]/30 bg-[#0d0d0d] p-6 sm:p-7 flex flex-col justify-between shadow-[0_0_50px_rgba(255,106,0,0.06)]">
            <div>
              <div className="flex items-center gap-2 text-[#ff6a00]">
                <BrainCircuit size={20} />
                <span className="text-[10px] uppercase font-bold tracking-widest">
                  Active Adaptive Focus Node
                </span>
              </div>

              <div className="mt-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <h2 className="text-2xl font-bold text-white">
                  {nextTopic?.title || "Binary Search"}
                </h2>
                <span className="text-xs font-mono text-[#ff8533]">
                  {nextTopic?.category} · {nextTopic?.estimatedMinutes || 60} mins
                </span>
              </div>

              <p className="mt-2 text-xs leading-5 text-white/50">
                {nextTopic?.description}
              </p>

              <div className="mt-4 rounded-xl border border-[#ff6a00]/20 bg-[#ff6a00]/5 p-3 text-xs text-white/70">
                <span className="font-semibold text-[#ff8533]">Graph Rationale: </span>
                {nextReason}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between">
              <span className="text-xs text-white/40">Difficulty Level: {nextTopic?.difficulty || 1}/5</span>
              <Link
                href={`/learn/dsa/${nextTopic?.slug || "binary-search"}`}
                className="inline-flex items-center gap-2 rounded-full bg-[#ff6a00] px-5 py-2 text-xs font-bold text-black hover:bg-[#ff7a1a] transition"
              >
                Launch Learning Node
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>

        {/* Knowledge Graph Preview */}
        <div className="mt-12">
          <KnowledgeGraph
            masteries={masteries}
            activeSlug={nextTopic?.slug}
          />
        </div>

        {/* Full Curriculum Section */}
        <section className="mt-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ff6a00]">
                Structured Curriculum
              </p>
              <h2 className="mt-2 text-2xl font-bold text-white">
                All 44 Knowledge Nodes
              </h2>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
              {["All", ...categoryOrder.slice(0, 6)].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition whitespace-nowrap ${
                    selectedCategory === cat
                      ? "bg-[#ff6a00] text-black font-bold"
                      : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Topics Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTopics.map((topic) => (
              <TopicCard
                key={topic.id}
                topic={topic}
                mastery={masteries[topic.slug]}
                isRecommended={nextTopic?.slug === topic.slug}
              />
            ))}
          </div>
        </section>
      </div>

      {/* Personalized High-Definition Printable PDF Modal */}
      <RoadmapPDFModal
        domain="dsa"
        isOpen={showPdfModal}
        onClose={() => setShowPdfModal(false)}
      />
    </main>
  );
}
