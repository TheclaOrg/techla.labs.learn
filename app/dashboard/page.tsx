"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Flame,
  Layers3,
  RotateCcw,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react";
import { loadStoredMasteries, loadProblemProgress } from "@/lib/storage/progress-store";
import { computeOverallMasteryPercentage } from "@/lib/mastery/mastery-engine";
import { generatePersonalizedPath } from "@/lib/learning/personalized-path";
import { DashboardStat } from "@/components/dashboard/DashboardStat";
import { KnowledgeMap } from "@/components/dashboard/KnowledgeMap";
import { ContinueCard } from "@/components/dashboard/ContinueCard";
import { RecommendationCard } from "@/components/dashboard/RecommendationCard";
import { UserTopicMastery, ProblemProgress } from "@/types/learning";

export default function DashboardPage() {
  const [masteries] = useState<Record<string, UserTopicMastery>>(() => loadStoredMasteries());
  const [problemProgress] = useState<Record<string, ProblemProgress>>(() => loadProblemProgress());

  const stats = computeOverallMasteryPercentage(masteries);
  const personalized = generatePersonalizedPath(masteries);
  const currentTopic = personalized.currentTopic;
  const recommendedNext = personalized.recommendedTopics[1] || personalized.recommendedTopics[0];
  const nextReason = personalized.reasoning[0]?.reason;

  const solvedProblemsCount = Object.values(problemProgress).filter((p) => p.status === "solved").length;

  return (
    <main className="min-h-screen bg-[#050505] px-5 pb-28 pt-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#ff6a00]/20 bg-[#ff6a00]/5 px-3 py-1 text-xs font-semibold text-[#ff8533] mb-3">
              <Sparkles size={12} />
              PERSONALIZED LEARNING SPACE
            </div>

            <h1 className="text-4xl font-bold tracking-[-.04em] sm:text-6xl text-white">
              Good morning<span className="text-[#ff6a00]">.</span>
            </h1>

            <p className="mt-2 text-sm sm:text-base text-white/45">
              Your learning path is adapting to you in real-time.
            </p>
          </div>

          <Link
            href="/learn/dsa/diagnostic"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-semibold text-white/80 hover:text-white hover:border-[#ff6a00] transition"
          >
            <RotateCcw size={13} />
            Retake Diagnostic
          </Link>
        </div>

        {/* 4 Stats Cards */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <DashboardStat
            icon={<Target size={20} />}
            title="Overall Mastery"
            value={`${stats.percentage}%`}
            subtitle="Calculated across 44 topics"
          />
          <DashboardStat
            icon={<Layers3 size={20} />}
            title="Topics Mastered"
            value={stats.masteredCount}
            subtitle={`${stats.proficientCount} proficient`}
            badge="Evidence Based"
          />
          <DashboardStat
            icon={<Trophy size={20} />}
            title="Problems Solved"
            value={solvedProblemsCount}
            subtitle="LeetCode & Practice"
          />
          <DashboardStat
            icon={<Flame size={20} />}
            title="Learning Streak"
            value="6 days"
            subtitle="Consistency multiplier"
            badge="Active"
          />
        </div>

        {/* In-Progress & Recommended Actions */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <ContinueCard
            topic={currentTopic}
            mastery={masteries[currentTopic.slug]}
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
                Graph Sequence
              </p>
              <h2 className="mt-1 text-2xl font-bold text-white">
                Upcoming Nodes In Your Path
              </h2>
            </div>
            <span className="text-xs text-white/40">
              {personalized.recommendedTopics.length} available next
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {personalized.recommendedTopics.slice(0, 4).map((t, idx) => (
              <Link
                key={t.id}
                href={`/learn/dsa/${t.slug}`}
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
                Full Competency Radar
              </p>
              <h2 className="mt-1 text-2xl font-bold text-white">
                Knowledge Map by Category
              </h2>
            </div>
          </div>

          <KnowledgeMap masteries={masteries} />
        </section>
      </div>
    </main>
  );
}
