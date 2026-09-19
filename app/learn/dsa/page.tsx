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
import { loadStoredMasteries } from "@/lib/storage/progress-store";
import { computeOverallMasteryPercentage } from "@/lib/mastery/mastery-engine";
import { generatePersonalizedPath } from "@/lib/learning/personalized-path";
import { downloadRoadmapFile } from "@/lib/learning/export-roadmap";
import { KnowledgeGraph } from "@/components/learning/KnowledgeGraph";
import { TopicCard } from "@/components/learning/TopicCard";
import { UserTopicMastery, DSACategory } from "@/types/learning";

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
  const [masteries] = useState<Record<string, UserTopicMastery>>(() => loadStoredMasteries());
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const stats = computeOverallMasteryPercentage(masteries);
  const personalized = generatePersonalizedPath(masteries);
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
              DATA STRUCTURES & ALGORITHMS
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
              onClick={() => downloadRoadmapFile("dsa", "md")}
              className="flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:border-[#ff6a00] hover:text-[#ff8533] transition"
            >
              <Download size={15} />
              Download Roadmap (.md)
            </button>
            <Link
              href="/learn/dsa/diagnostic"
              className="flex items-center justify-center gap-2 rounded-full bg-[#ff6a00] px-6 py-3 text-sm font-bold text-black hover:bg-[#ff7a1a] transition shadow-[0_0_25px_rgba(255,106,0,0.25)]"
            >
              Take Diagnostic
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>

        {/* Progress & Next Recommendation Summary */}
        <div className="mt-10 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Overall Stats Card */}
          <div className="card rounded-2xl p-6 sm:p-7 flex flex-col justify-between">
            <div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/40 font-semibold">
                    Overall Curriculum Mastery
                  </p>
                  <p className="mt-2 text-4xl font-bold text-white font-mono">{stats.percentage}%</p>
                </div>
                <div className="flex gap-2 text-xs">
                  <span className="rounded-full bg-[#ff6a00]/10 border border-[#ff6a00]/20 px-3 py-1 text-[#ff8533] font-semibold">
                    {stats.masteredCount} Mastered
                  </span>
                  <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-white/60">
                    {stats.learningCount} In Progress
                  </span>
                </div>
              </div>

              <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/5">
                <div
                  className="h-full rounded-full bg-[#ff6a00] transition-all duration-700"
                  style={{ width: `${stats.percentage}%` }}
                />
              </div>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3 border-t border-white/[0.05] pt-5 text-center">
              <div>
                <p className="text-[10px] uppercase text-white/30">Total Topics</p>
                <p className="mt-1 text-lg font-bold text-white">{stats.totalTopics}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase text-white/30">Proficient</p>
                <p className="mt-1 text-lg font-bold text-[#ff8533]">{stats.proficientCount}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase text-white/30">Ready To Unlock</p>
                <p className="mt-1 text-lg font-bold text-white">{personalized.recommendedTopics.length}</p>
              </div>
            </div>
          </div>

          {/* Recommended Next Step */}
          <div className="rounded-2xl border border-[#ff6a00]/30 bg-[#0d0d0d] p-6 sm:p-7 flex flex-col justify-between shadow-[0_0_50px_rgba(255,106,0,0.06)]">
            <div>
              <div className="flex items-center gap-2 text-[#ff6a00]">
                <BrainCircuit size={20} />
                <span className="text-[10px] uppercase font-bold tracking-widest">
                  Recommended Next Step
                </span>
              </div>

              <h2 className="mt-3 text-2xl font-bold text-white">
                {nextTopic?.title || "Binary Search"}
              </h2>

              <p className="mt-2 text-xs leading-5 text-white/50">
                {nextTopic?.description}
              </p>

              <div className="mt-4 rounded-xl border border-[#ff6a00]/20 bg-[#ff6a00]/5 p-3 text-xs text-white/70">
                <span className="font-semibold text-[#ff8533]">Why: </span>
                {nextReason}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between">
              <span className="text-xs text-white/40">{nextTopic?.estimatedMinutes || 60} mins</span>
              <Link
                href={`/learn/dsa/${nextTopic?.slug || "binary-search"}`}
                className="inline-flex items-center gap-2 rounded-full bg-[#ff6a00] px-5 py-2 text-xs font-bold text-black hover:bg-[#ff7a1a] transition"
              >
                Continue Learning
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
    </main>
  );
}
