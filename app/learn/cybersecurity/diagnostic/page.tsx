"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  Code2,
  HelpCircle,
  RotateCcw,
  Shield,
  Trophy,
} from "lucide-react";
import { cyberDiagnosticQuestions } from "@/data/cybersecurity/questions";
import { scoreDiagnosticAssessment } from "@/lib/diagnostic/scoring";
import { saveDiagnosticResult } from "@/lib/storage/progress-store";
import { DiagnosticResult } from "@/types/learning";
import { topicsBySlug } from "@/lib/learning/graph";

export default function CybersecurityDiagnosticPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [result, setResult] = useState<DiagnosticResult | null>(null);

  const questions = cyberDiagnosticQuestions;
  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  const handleSelectOption = (index: number) => {
    if (showExplanation) return;
    setSelectedOption(index);
    setShowExplanation(true);
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: index,
    }));
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(userAnswers[questions[currentIndex + 1]?.id] ?? null);
      setShowExplanation(userAnswers[questions[currentIndex + 1]?.id] !== undefined);
    } else {
      // Complete diagnostic assessment (20 marks)
      const finalResult = scoreDiagnosticAssessment(userAnswers, "cybersecurity");
      saveDiagnosticResult(finalResult, "cybersecurity");
      setResult(finalResult);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      const prevIdx = currentIndex - 1;
      setCurrentIndex(prevIdx);
      const prevAnswer = userAnswers[questions[prevIdx]?.id];
      setSelectedOption(prevAnswer !== undefined ? prevAnswer : null);
      setShowExplanation(prevAnswer !== undefined);
    }
  };

  const handleRetake = () => {
    setUserAnswers({});
    setSelectedOption(null);
    setShowExplanation(false);
    setCurrentIndex(0);
    setResult(null);
  };

  // ==================== RESULT SCREEN ====================
  if (result) {
    return (
      <main className="min-h-screen bg-[#050505] px-5 pb-24 pt-32 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {/* Success Banner */}
          <div className="rounded-3xl border border-[#ff6a00]/30 bg-[#0b0b0b] p-8 sm:p-12 text-center relative overflow-hidden shadow-[0_0_80px_rgba(255,106,0,0.1)]">
            <div className="mx-auto grid size-20 place-items-center rounded-3xl bg-[#ff6a00] text-black shadow-[0_0_35px_rgba(255,106,0,0.4)]">
              <Trophy size={36} strokeWidth={2.5} />
            </div>

            <span className="mt-7 inline-block text-xs font-bold uppercase tracking-[0.2em] text-[#ff6a00]">
              Cybersecurity Diagnostic Complete (20 Marks)
            </span>

            <h1 className="mt-3 text-4xl sm:text-5xl font-bold text-white tracking-tight">
              Your personalized security path is generated.
            </h1>

            <p className="mt-4 text-sm sm:text-base text-white/50 max-w-2xl mx-auto leading-7">
              You scored <span className="text-white font-bold">{result.score}</span> /{" "}
              <span className="text-white font-bold">{result.totalQuestions}</span> marks ({result.percentage}%).
              Your results have been mapped across the 12 cybersecurity prerequisite modules.
            </p>

            {/* Counts Breakdown */}
            <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-4 max-w-lg mx-auto">
              <div className="rounded-2xl border border-[#ff6a00]/30 bg-[#ff6a00]/10 p-4">
                <p className="text-2xl sm:text-3xl font-bold text-[#ff8533]">{result.masteredCount}</p>
                <p className="text-[11px] text-white/60 uppercase font-semibold mt-1">Mastered</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-2xl sm:text-3xl font-bold text-white">{result.developingCount}</p>
                <p className="text-[11px] text-white/50 uppercase font-semibold mt-1">Developing</p>
              </div>
              <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4">
                <p className="text-2xl sm:text-3xl font-bold text-white/40">{result.needsAttentionCount}</p>
                <p className="text-[11px] text-white/30 uppercase font-semibold mt-1">To Learn</p>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-full bg-[#ff6a00] px-8 py-3.5 text-sm font-bold text-black hover:bg-[#ff7a1a] transition shadow-[0_0_30px_rgba(255,106,0,0.3)]"
              >
                Go to Dashboard
                <ArrowRight size={16} />
              </Link>
              <button
                onClick={handleRetake}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-medium text-white/70 hover:text-white transition"
              >
                <RotateCcw size={15} />
                Retake Diagnostic
              </button>
            </div>
          </div>

          {/* Recommended Path Progression */}
          <div className="mt-12">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <BrainCircuit size={18} className="text-[#ff6a00]" />
              Tailored Cybersecurity Starting Points
            </h2>

            <div className="space-y-3">
              {result.recommendedPath.slice(0, 5).map((slug, idx) => {
                const topic = topicsBySlug[slug];
                if (!topic) return null;
                return (
                  <div
                    key={slug}
                    className="card rounded-2xl p-5 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="grid size-9 place-items-center rounded-full bg-[#ff6a00]/15 text-[#ff8533] font-bold text-xs font-mono">
                        0{idx + 1}
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#ff6a00]">
                          {topic.category}
                        </span>
                        <h3 className="text-base font-semibold text-white mt-0.5">
                          {topic.title}
                        </h3>
                        <p className="text-xs text-white/45 line-clamp-1">{topic.description}</p>
                      </div>
                    </div>

                    <Link
                      href={`/learn/cybersecurity/${topic.slug}`}
                      className="shrink-0 flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-4 py-2 text-xs font-semibold text-white hover:bg-[#ff6a00] hover:text-black hover:border-[#ff6a00] transition"
                    >
                      Study Topic
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    );
  }

  // ==================== QUESTION STEP SCREEN ====================
  const isCorrect = selectedOption !== null && selectedOption === currentQuestion.correctAnswer;

  return (
    <main className="min-h-screen bg-[#050505] px-5 pb-24 pt-28">
      <div className="mx-auto max-w-3xl">
        {/* Navigation & Progress bar */}
        <div className="flex items-center justify-between">
          <Link
            href="/learn/cybersecurity"
            className="flex items-center gap-1.5 text-xs font-medium text-white/40 hover:text-white transition"
          >
            <ArrowLeft size={14} />
            Exit Diagnostic
          </Link>
          <div className="flex items-center gap-2 font-mono text-xs text-white/40">
            <span className="text-[#ff8533] font-bold">{currentIndex + 1}</span>
            <span>/</span>
            <span>{totalQuestions} (20 Marks)</span>
          </div>
        </div>

        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/5">
          <div
            className="h-full rounded-full bg-[#ff6a00] transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Question Header Badge */}
        <div className="mt-12">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#ff6a00]/30 bg-[#ff6a00]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#ff8533]">
              <Shield size={12} />
              {currentQuestion.category}
            </span>
            <span className="rounded-full bg-white/5 px-2.5 py-1 text-[10px] text-white/40 uppercase font-mono">
              {currentQuestion.difficulty}
            </span>
          </div>

          <h1 className="mt-5 text-2xl sm:text-4xl font-bold text-white leading-tight tracking-tight">
            {currentQuestion.question}
          </h1>

          {/* Optional Code Snippet */}
          {currentQuestion.codeSnippet && (
            <div className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-[#080808]">
              <div className="flex items-center gap-1.5 border-b border-white/5 px-4 py-2 text-[10px] text-white/30 font-mono">
                <Code2 size={12} />
                <span>code / log preview</span>
              </div>
              <pre className="p-4 font-mono text-xs leading-relaxed text-white/85 overflow-x-auto">
                <code>{currentQuestion.codeSnippet}</code>
              </pre>
            </div>
          )}

          {/* Options Grid */}
          <div className="mt-8 space-y-3">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isOptionCorrect = idx === currentQuestion.correctAnswer;

              let style = "border-white/[0.08] bg-[#0b0b0b] hover:border-white/20";
              if (showExplanation) {
                if (isOptionCorrect) {
                  style = "border-[#ff6a00] bg-[#ff6a00]/15 text-[#ff8533]";
                } else if (isSelected) {
                  style = "border-red-500/60 bg-red-500/10 text-white/70";
                } else {
                  style = "border-white/5 opacity-40";
                }
              }

              return (
                <button
                  key={option}
                  disabled={showExplanation}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full flex items-center gap-4 rounded-2xl border p-4 sm:p-5 text-left transition-all ${style}`}
                >
                  <span
                    className={`grid size-9 shrink-0 place-items-center rounded-full border text-xs font-mono font-bold transition ${
                      showExplanation && isOptionCorrect
                        ? "border-[#ff6a00] bg-[#ff6a00] text-black"
                        : isSelected
                          ? "border-[#ff6a00] text-[#ff6a00]"
                          : "border-white/10 text-white/30"
                    }`}
                  >
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="text-sm sm:text-base leading-snug">{option}</span>
                </button>
              );
            })}
          </div>

          {/* Answer Explanation Display */}
          {showExplanation && (
            <div
              className={`mt-6 rounded-2xl border p-4 text-xs sm:text-sm leading-6 transition-all ${
                isCorrect
                  ? "border-[#ff6a00]/30 bg-[#ff6a00]/5 text-white/80"
                  : "border-white/10 bg-[#0e0e0e] text-white/70"
              }`}
            >
              <div className="flex items-center gap-2 font-bold mb-1">
                {isCorrect ? (
                  <span className="text-[#ff6a00] flex items-center gap-1">
                    <CheckCircle2 size={16} /> Correct Concept!
                  </span>
                ) : (
                  <span className="text-white/60 flex items-center gap-1">
                    <HelpCircle size={16} /> Technical Explanation:
                  </span>
                )}
              </div>
              <p>{currentQuestion.explanation}</p>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="mt-8 flex items-center justify-between pt-4 border-t border-white/[0.05]">
            <button
              disabled={currentIndex === 0}
              onClick={handlePrevious}
              className="flex items-center gap-1 text-xs font-semibold text-white/40 hover:text-white disabled:opacity-0 transition"
            >
              <ArrowLeft size={14} />
              Previous
            </button>

            <button
              disabled={selectedOption === null}
              onClick={handleNext}
              className="flex items-center gap-2 rounded-full bg-[#ff6a00] px-7 py-3 text-sm font-bold text-black disabled:cursor-not-allowed disabled:opacity-30 transition hover:bg-[#ff7a1a] shadow-[0_0_25px_rgba(255,106,0,0.25)]"
            >
              {currentIndex === totalQuestions - 1 ? "Complete 20-Mark Diagnostic" : "Next Question"}
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
