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
  Shield,
  Sparkles,
  Terminal,
} from "lucide-react";
import { cyberTopics } from "@/data/cybersecurity/topics";
import { cyberResources } from "@/data/cybersecurity/resources";
import { cyberLabs } from "@/data/cybersecurity/labs";
import { cyberDiagnosticQuestions } from "@/data/cybersecurity/questions";
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

export default function CybersecurityTopicDetailPage({ params }: TopicPageProps) {
  const resolvedParams = use(params);
  const topicSlug = resolvedParams.topic;
  const topic = topicsBySlug[topicSlug];

  const [masteries, setMasteries] = useState<Record<string, UserTopicMastery>>(() =>
    loadStoredMasteries("cybersecurity")
  );
  const [problemProgress, setProblemProgress] = useState<Record<string, ProblemProgress>>(() =>
    loadProblemProgress()
  );
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  if (!topic) {
    return (
      <main className="min-h-screen bg-[#050505] grid place-items-center px-5 pt-20">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">Topic Not Found</h1>
          <p className="mt-2 text-sm text-white/40">The cybersecurity topic &quot;{topicSlug}&quot; is not found.</p>
          <Link
            href="/learn/cybersecurity"
            className="mt-6 inline-flex rounded-full bg-[#ff6a00] px-6 py-2.5 text-xs font-bold text-black"
          >
            Back to Cybersecurity Roadmap
          </Link>
        </div>
      </main>
    );
  }

  const currentMastery = masteries[topic.slug];
  const level = currentMastery?.masteryLevel ?? 0;

  const topicResources = cyberResources.filter((r) => r.topicSlug === topic.slug);
  const topicLabs = cyberLabs.filter((p) => p.topicSlug === topic.slug);
  const topicQuestions = cyberDiagnosticQuestions.filter((q) => q.topicSlug === topic.slug);

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
    setMasteries(loadStoredMasteries("cybersecurity"));
  };

  const handleProblemChange = (slug: string, status: "not_started" | "attempted" | "solved") => {
    saveProblemStatus(slug, status);
    setProblemProgress(loadProblemProgress());
    if (status === "solved") {
      updateTopicMastery(topic.slug, { problemSolved: true }, "cybersecurity");
      setMasteries(loadStoredMasteries("cybersecurity"));
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] px-5 pb-28 pt-28 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Breadcrumb & Navigation */}
        <div className="flex items-center justify-between">
          <Link
            href="/learn/cybersecurity"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/40 hover:text-white transition"
          >
            <ArrowLeft size={14} />
            Back to Cybersecurity Roadmap
          </Link>
          <MasteryBadge level={level} status={currentMastery?.status} />
        </div>

        {/* Hero Card */}
        <div className="mt-6 rounded-3xl border border-white/[0.08] bg-[#090909] p-6 sm:p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff6a00]/5 rounded-full blur-[120px] pointer-events-none" />

          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#ff6a00]/30 bg-[#ff6a00]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#ff8533]">
              <Shield size={12} />
              {topic.category}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1 text-xs text-white/50">
              <Clock size={12} />
              {topic.estimatedMinutes} mins
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
            {topic.title}
          </h1>

          <p className="mt-4 text-base leading-relaxed text-white/60 max-w-3xl">
            {topic.description}
          </p>

          {/* Key Actions */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsAssessmentOpen(true)}
              className="inline-flex items-center gap-2 rounded-full bg-[#ff6a00] px-6 py-3 text-xs font-bold text-black hover:bg-[#ff7a1a] transition shadow-[0_0_25px_rgba(255,106,0,0.25)]"
            >
              <BrainCircuit size={15} />
              Take Topic Check-in Quiz
            </button>

            <button
              onClick={handleFetchAiTutor}
              disabled={loadingAi}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-xs font-semibold text-white hover:bg-white/10 transition"
            >
              <Sparkles size={14} className="text-[#ff6a00]" />
              {loadingAi ? "Generating AI Breakdown..." : "AI Conceptual Guide"}
            </button>
          </div>
        </div>

        {/* AI Tutor Response Area */}
        {aiExplanation && (
          <div className="mt-6 rounded-2xl border border-[#ff6a00]/30 bg-[#0d0d0d] p-6 sm:p-8">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#ff8533] mb-3">
              <Sparkles size={14} />
              AI Conceptual Guide
            </div>
            <div className="prose prose-invert max-w-none text-sm leading-7 text-white/80 whitespace-pre-line">
              {aiExplanation}
            </div>
          </div>
        )}

        {/* Two Column Layout: Core Concepts & Practice Labs */}
        <div className="mt-10 grid gap-8 lg:grid-cols-[1.3fr_1fr]">
          {/* Left Column: Theory, Concepts & Resources */}
          <div className="space-y-8">
            {/* Core Summary & Mastery Criteria */}
            <section className="card rounded-2xl p-6 sm:p-7">
              <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <BookOpen size={16} className="text-[#ff6a00]" />
                Mastery Criteria & Objective
              </h2>
              <p className="text-xs sm:text-sm leading-6 text-white/70">
                {topic.masteryCriteria}
              </p>
              <div className="mt-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-xs text-white/60">
                <span className="font-semibold text-[#ff8533]">Core Summary: </span>
                {topic.summary}
              </div>
            </section>

            {/* Key Concepts */}
            <section className="card rounded-2xl p-6 sm:p-7">
              <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <Sparkles size={16} className="text-[#ff6a00]" />
                Key Technical Concepts
              </h2>
              <div className="grid gap-2.5 sm:grid-cols-2">
                {topic.keyConcepts.map((concept) => (
                  <div
                    key={concept}
                    className="flex items-center gap-2.5 rounded-xl border border-white/5 bg-[#0a0a0a] p-3 text-xs text-white/80"
                  >
                    <div className="size-1.5 rounded-full bg-[#ff6a00]" />
                    <span>{concept}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Code / Command / Architecture Example */}
            {topic.codeExample && (
              <section className="rounded-2xl border border-white/10 bg-[#080808] overflow-hidden">
                <div className="flex items-center justify-between border-b border-white/5 px-6 py-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-white/50">
                    <Terminal size={14} className="text-[#ff6a00]" />
                    <span>{topic.codeExample.language} example</span>
                  </div>
                </div>
                <pre className="p-6 font-mono text-xs leading-relaxed text-white/85 overflow-x-auto">
                  <code>{topic.codeExample.code}</code>
                </pre>
                <div className="border-t border-white/5 p-4 text-xs text-white/50 bg-[#060606]">
                  <span className="font-semibold text-[#ff8533]">Explanation: </span>
                  {topic.codeExample.explanation}
                </div>
              </section>
            )}

            {/* Common Pitfalls / Security Traps */}
            {topic.commonMistakes && topic.commonMistakes.length > 0 && (
              <section className="card rounded-2xl p-6 sm:p-7 border-red-500/20 bg-red-500/[0.02]">
                <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                  <HelpCircle size={16} className="text-red-400" />
                  Common Security Pitfalls & Traps
                </h2>
                <ul className="space-y-2 text-xs leading-5 text-white/60 list-disc list-inside">
                  {topic.commonMistakes.map((mistake, idx) => (
                    <li key={idx}>{mistake}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* Free Learning Resources */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <BookOpen size={16} className="text-[#ff6a00]" />
                  Curated Free Learning Resources
                </h2>
                <span className="text-xs text-white/40">{topicResources.length} Available</span>
              </div>

              {topicResources.length === 0 ? (
                <div className="card rounded-xl p-5 text-center text-xs text-white/40">
                  Curated PortSwigger, TryHackMe, and CS50 resource links are being organized for this topic.
                </div>
              ) : (
                <div className="grid gap-3 sm:grid-cols-2">
                  {topicResources.map((res) => (
                    <ResourceCard key={res.id} resource={res} />
                  ))}
                </div>
              )}
            </section>
          </div>

          {/* Right Column: Practice Labs & Prerequisites */}
          <div className="space-y-8">
            {/* Hands-on Practice Labs */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Terminal size={16} className="text-[#ff6a00]" />
                  Hands-on Labs & CTF Challenges
                </h2>
                <span className="text-xs text-white/40">{topicLabs.length} Labs</span>
              </div>

              {topicLabs.length === 0 ? (
                <div className="card rounded-xl p-5 text-center text-xs text-white/40">
                  TryHackMe / PortSwigger room mappings are currently being linked to this topic.
                </div>
              ) : (
                <div className="space-y-3">
                  {topicLabs.map((lab) => (
                    <ProblemCard
                      key={lab.id}
                      problem={lab}
                      progress={problemProgress[lab.slug]}
                      onStatusChange={(newStatus) => handleProblemChange(lab.slug, newStatus)}
                    />
                  ))}
                </div>
              )}
            </section>

            {/* Prerequisites & Graph Position */}
            <section className="card rounded-2xl p-6">
              <h3 className="text-xs uppercase font-bold tracking-wider text-[#ff6a00] mb-4">
                Prerequisite Graph Dependencies
              </h3>

              {topic.prerequisites.length === 0 ? (
                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-xs text-white/70">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-400 mb-1">
                    <CheckCircle2 size={14} />
                    Entry-Level Foundational Topic
                  </div>
                  This topic has no prerequisite dependencies and can be studied directly.
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-xs text-white/50 mb-2">
                    Solidify these nodes to unlock optimal retention for this topic:
                  </p>
                  {topic.prerequisites.map((prereqSlug) => {
                    const prereq = topicsBySlug[prereqSlug];
                    const prereqLevel = masteries[prereqSlug]?.masteryLevel ?? 0;
                    return (
                      <Link
                        key={prereqSlug}
                        href={`/learn/cybersecurity/${prereqSlug}`}
                        className="flex items-center justify-between rounded-xl border border-white/5 bg-[#0b0b0b] p-3 text-xs transition hover:border-[#ff6a00]/40"
                      >
                        <span className="font-medium text-white">{prereq?.title || prereqSlug}</span>
                        <MasteryBadge level={prereqLevel} />
                      </Link>
                    );
                  })}
                </div>
              )}
            </section>
          </div>
        </div>

        {/* Check-in Quiz Modal */}
        <TopicAssessmentModal
          topic={topic}
          questions={topicQuestions}
          isOpen={isAssessmentOpen}
          onClose={() => setIsAssessmentOpen(false)}
          onAssessmentCompleted={handleAssessmentDone}
        />
      </div>
    </main>
  );
}
