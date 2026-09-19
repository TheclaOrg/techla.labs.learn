"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  BrainCircuit,
  CheckCircle2,
  Clock,
  Code2,
  HelpCircle,
  Lock,
  Sparkles,
  Video,
} from "lucide-react";
import { dsaTopics } from "@/data/dsa/topics";
import { dsaResources } from "@/data/dsa/resources";
import { dsaProblems } from "@/data/dsa/problems";
import { dsaDiagnosticQuestions } from "@/data/dsa/questions";
import { topicsBySlug } from "@/lib/learning/graph";
import {
  loadStoredMasteries,
  loadProblemProgress,
  updateTopicMastery,
  saveProblemStatus,
} from "@/lib/storage/progress-store";
import { MasteryBadge } from "@/components/ui/MasteryBadge";
import { ResourceCard } from "@/components/learning/ResourceCard";
import { ProblemCard } from "@/components/learning/ProblemCard";
import { TopicAssessmentModal } from "@/components/learning/TopicAssessmentModal";
import { UserTopicMastery, ProblemProgress } from "@/types/learning";
import { aiProvider } from "@/lib/ai/provider";

interface TopicPageProps {
  params: Promise<{
    topic: string;
  }>;
}

export default function TopicDetailPage({ params }: TopicPageProps) {
  const resolvedParams = use(params);
  const topicSlug = resolvedParams.topic;
  const topic = topicsBySlug[topicSlug];

  const [masteries, setMasteries] = useState<Record<string, UserTopicMastery>>(() => loadStoredMasteries());
  const [problemProgress, setProblemProgress] = useState<Record<string, ProblemProgress>>(() => loadProblemProgress());
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  if (!topic) {
    return (
      <main className="min-h-screen bg-[#050505] grid place-items-center px-5 pt-20">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">Topic Not Found</h1>
          <p className="mt-2 text-sm text-white/40">The topic &quot;{topicSlug}&quot; is not in the curriculum.</p>
          <Link
            href="/learn/dsa"
            className="mt-6 inline-flex rounded-full bg-[#ff6a00] px-6 py-2.5 text-xs font-bold text-black"
          >
            Back to DSA Overview
          </Link>
        </div>
      </main>
    );
  }

  const currentMastery = masteries[topic.slug];
  const level = currentMastery?.masteryLevel ?? 0;

  const topicResources = dsaResources.filter((r) => r.topicSlug === topic.slug);
  const topicProblems = dsaProblems.filter((p) => p.topicSlug === topic.slug);
  const topicQuestions = dsaDiagnosticQuestions.filter((q) => q.topicSlug === topic.slug);

  const handleFetchAiTutor = async () => {
    setLoadingAi(true);
    try {
      const explanation = await aiProvider.generateExplanation(topic.title, "intermediate");
      setAiExplanation(explanation);
    } catch {
      setAiExplanation("AI Tutor analysis is currently available via deterministic mode.");
    } finally {
      setLoadingAi(false);
    }
  };

  const handleAssessmentDone = () => {
    setMasteries(loadStoredMasteries());
  };

  const handleProblemChange = (slug: string, status: "not_started" | "attempted" | "solved") => {
    saveProblemStatus(slug, status);
    setProblemProgress(loadProblemProgress());
    if (status === "solved") {
      updateTopicMastery(topic.slug, { problemSolved: true });
      setMasteries(loadStoredMasteries());
    }
  };

  // Determine next topic in graph
  const allTopics = dsaTopics;
  const currentIdx = allTopics.findIndex((t) => t.slug === topic.slug);
  const nextTopicCandidate = allTopics[currentIdx + 1];

  return (
    <main className="min-h-screen bg-[#050505] px-5 pb-28 pt-28 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/learn/dsa"
            className="flex items-center gap-2 text-xs font-medium text-white/40 hover:text-white transition"
          >
            <ArrowLeft size={14} />
            Back to DSA Curriculum
          </Link>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-white/30 uppercase tracking-widest font-mono">
              {topic.category}
            </span>
          </div>
        </div>

        {/* Hero Topic Header */}
        <div className="mt-8 rounded-3xl border border-white/[0.08] bg-[#0b0b0b] p-6 sm:p-10 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <span className="text-xs uppercase font-bold tracking-widest text-[#ff6a00]">
                  {topic.category}
                </span>
                <span className="text-white/20">•</span>
                <span className="text-xs text-white/40 flex items-center gap-1">
                  <Clock size={12} />
                  {topic.estimatedMinutes} mins
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
                {topic.title}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <MasteryBadge level={level} status={currentMastery?.status} size="md" />
            </div>
          </div>

          <p className="mt-4 text-sm sm:text-base text-white/60 leading-7 max-w-3xl">
            {topic.description}
          </p>

          {/* Prerequisites Check */}
          <div className="mt-6 pt-5 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-white/40 font-medium">Prerequisites:</span>
              {topic.prerequisites.length === 0 ? (
                <span className="rounded-full bg-white/5 px-2.5 py-0.5 text-white/50 text-[11px]">
                  None (Foundational)
                </span>
              ) : (
                topic.prerequisites.map((prereq) => {
                  const prereqTopic = topicsBySlug[prereq];
                  const prereqMastery = masteries[prereq]?.masteryLevel ?? 0;
                  const isPrereqReady = prereqMastery >= 4;

                  return (
                    <Link
                      key={prereq}
                      href={`/learn/dsa/${prereq}`}
                      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-medium transition ${
                        isPrereqReady
                          ? "border-[#ff6a00]/30 bg-[#ff6a00]/10 text-[#ff8533]"
                          : "border-white/10 bg-white/5 text-white/50 hover:text-white"
                      }`}
                    >
                      {isPrereqReady ? <CheckCircle2 size={11} /> : <Lock size={11} />}
                      {prereqTopic?.title || prereq}
                    </Link>
                  );
                })
              )}
            </div>

            <button
              onClick={() => setIsAssessmentOpen(true)}
              className="flex items-center gap-2 rounded-full bg-[#ff6a00] px-5 py-2 text-xs font-bold text-black hover:bg-[#ff7a1a] transition shadow-[0_0_20px_rgba(255,106,0,0.25)]"
            >
              <BrainCircuit size={14} />
              Check Understanding
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_320px]">
          {/* Left Column: Learn Content */}
          <div className="space-y-10">
            {/* Conceptual Mental Model */}
            <section className="card rounded-2xl p-6 sm:p-8">
              <div className="flex items-center gap-2 text-[#ff6a00] mb-4">
                <BookOpen size={18} />
                <h2 className="text-xs uppercase font-bold tracking-widest">
                  Concept Breakdown
                </h2>
              </div>

              <h3 className="text-xl font-bold text-white mb-3">
                Core Intuition & Mental Model
              </h3>
              <p className="text-sm leading-7 text-white/70">
                {topic.summary}
              </p>

              {/* Key Invariants */}
              <div className="mt-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#ff8533] mb-3">
                  Key Invariants & Techniques
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-white/70">
                  {topic.keyConcepts.map((concept) => (
                    <li key={concept} className="flex items-start gap-2">
                      <div className="size-1.5 rounded-full bg-[#ff6a00] mt-2 shrink-0" />
                      <span>{concept}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Common Pitfalls */}
              {topic.commonMistakes && topic.commonMistakes.length > 0 && (
                <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.02] p-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white/80 mb-2 flex items-center gap-1.5">
                    <HelpCircle size={14} className="text-[#ff6a00]" />
                    Common Pitfalls To Avoid
                  </h4>
                  <ul className="space-y-1.5 text-xs text-white/60">
                    {topic.commonMistakes.map((mistake) => (
                      <li key={mistake}>• {mistake}</li>
                    ))}
                  </ul>
                </div>
              )}
            </section>

            {/* Code Implementation Example */}
            {topic.codeExample && (
              <section className="card rounded-2xl p-6 sm:p-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-[#ff6a00]">
                    <Code2 size={18} />
                    <h2 className="text-xs uppercase font-bold tracking-widest">
                      Implementation Reference
                    </h2>
                  </div>
                  <span className="rounded bg-white/5 px-2 py-0.5 font-mono text-[10px] text-white/40">
                    {topic.codeExample.language}
                  </span>
                </div>

                <pre className="overflow-x-auto rounded-xl border border-white/10 bg-[#060606] p-4 font-mono text-xs leading-relaxed text-white/90">
                  <code>{topic.codeExample.code}</code>
                </pre>

                <p className="mt-3 text-xs leading-5 text-white/50">
                  {topic.codeExample.explanation}
                </p>
              </section>
            )}

            {/* AI Tutor Assistant Drawer */}
            <section className="rounded-2xl border border-[#ff6a00]/25 bg-[#0d0d0d] p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#ff6a00]">
                  <Sparkles size={18} />
                  <h2 className="text-xs uppercase font-bold tracking-widest">
                    AI Concept Tutor
                  </h2>
                </div>
                {!aiExplanation && (
                  <button
                    onClick={handleFetchAiTutor}
                    disabled={loadingAi}
                    className="rounded-full bg-[#ff6a00] px-4 py-1.5 text-xs font-bold text-black hover:bg-[#ff7a1a] transition"
                  >
                    {loadingAi ? "Analyzing..." : "Generate Deep Breakdown"}
                  </button>
                )}
              </div>

              {aiExplanation ? (
                <div className="mt-4 rounded-xl border border-white/5 bg-black/40 p-4 text-xs leading-6 text-white/80 whitespace-pre-line font-sans">
                  {aiExplanation}
                </div>
              ) : (
                <p className="mt-3 text-xs text-white/40">
                  Ask our AI system to deconstruct {topic.title} based on your current knowledge profile and highlight interview trade-offs.
                </p>
              )}
            </section>

            {/* Practice Problems Section */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-white">Practice Problems</h2>
                  <p className="text-xs text-white/40">Curated LeetCode problems linked to {topic.title}</p>
                </div>
                <span className="rounded-full bg-white/5 px-2.5 py-1 text-[11px] text-white/60 font-mono">
                  {topicProblems.length} Problems
                </span>
              </div>

              {topicProblems.length === 0 ? (
                <div className="rounded-xl border border-white/5 bg-[#0a0a0a] p-6 text-center text-xs text-white/40">
                  Problems for this topic are currently being mapped.
                </div>
              ) : (
                <div className="grid gap-3">
                  {topicProblems.map((prob) => (
                    <ProblemCard
                      key={prob.id}
                      problem={prob}
                      progress={problemProgress[prob.slug]}
                      onStatusChange={(status) => handleProblemChange(prob.slug, status)}
                    />
                  ))}
                </div>
              )}
            </section>
          </div>

          {/* Right Column: Free Resources & Next Action */}
          <div className="space-y-8">
            {/* Free Resources */}
            <section>
              <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-3 flex items-center gap-1.5">
                <Video size={15} className="text-[#ff6a00]" />
                Free Curated Resources
              </h3>

              {topicResources.length === 0 ? (
                <div className="rounded-xl border border-white/5 bg-[#0a0a0a] p-4 text-xs text-white/40">
                  Additional resources are being indexed.
                </div>
              ) : (
                <div className="space-y-3">
                  {topicResources.map((res) => (
                    <ResourceCard key={res.id} resource={res} />
                  ))}
                </div>
              )}
            </section>

            {/* Next Topic in Sequence */}
            {nextTopicCandidate && (
              <div className="card rounded-2xl p-5 border-[#ff6a00]/30 bg-[#0d0d0d]">
                <p className="text-[10px] uppercase font-bold tracking-widest text-[#ff6a00]">
                  Next In Sequence
                </p>
                <h4 className="text-base font-bold text-white mt-1">
                  {nextTopicCandidate.title}
                </h4>
                <p className="text-xs text-white/45 mt-1 line-clamp-2">
                  {nextTopicCandidate.description}
                </p>
                <Link
                  href={`/learn/dsa/${nextTopicCandidate.slug}`}
                  className="mt-4 flex items-center justify-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white hover:bg-[#ff6a00] hover:text-black transition"
                >
                  Go to Next Topic
                  <ArrowRight size={13} />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Interactive Check-in Assessment Modal */}
      <TopicAssessmentModal
        topic={topic}
        questions={topicQuestions}
        isOpen={isAssessmentOpen}
        onClose={() => setIsAssessmentOpen(false)}
        onAssessmentCompleted={handleAssessmentDone}
      />
    </main>
  );
}
