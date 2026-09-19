"use client";

import React, { useState } from "react";
import { DiagnosticQuestion, Topic } from "@/types/learning";
import { Check, X, ArrowRight, BrainCircuit } from "lucide-react";
import { updateTopicMastery } from "@/lib/storage/progress-store";

interface TopicAssessmentModalProps {
  topic: Topic;
  questions: DiagnosticQuestion[];
  isOpen: boolean;
  onClose: () => void;
  onAssessmentCompleted: (scorePercentage: number) => void;
}

export function TopicAssessmentModal({
  topic,
  questions,
  isOpen,
  onClose,
  onAssessmentCompleted,
}: TopicAssessmentModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  if (!isOpen) return null;

  const currentQ = questions[currentIndex] || questions[0];
  const hasQuestions = questions.length > 0;

  const handleSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    if (index === currentQ.correctAnswer) {
      setCorrectCount((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      const finalScore = Math.round(((correctCount + (selectedOption === currentQ.correctAnswer ? 0 : 0)) / questions.length) * 100);
      updateTopicMastery(topic.slug, { checkInScore: finalScore });
      setIsCompleted(true);
      onAssessmentCompleted(finalScore);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="card relative w-full max-w-xl rounded-3xl p-6 sm:p-8 border-[#ff6a00]/30 shadow-[0_0_80px_rgba(255,106,0,0.15)]">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-white/40 hover:text-white transition"
        >
          <X size={20} />
        </button>

        {!hasQuestions ? (
          <div className="text-center py-8">
            <h3 className="text-xl font-bold text-white">Assessment Coming Soon</h3>
            <p className="mt-2 text-sm text-white/50">Questions for this specific topic are currently being indexed.</p>
            <button
              onClick={onClose}
              className="mt-6 rounded-full bg-[#ff6a00] px-6 py-2.5 text-sm font-bold text-black"
            >
              Close
            </button>
          </div>
        ) : isCompleted ? (
          <div className="text-center py-4">
            <div className="mx-auto grid size-16 place-items-center rounded-2xl bg-[#ff6a00] text-black">
              <Check size={32} strokeWidth={3} />
            </div>
            <span className="mt-6 inline-block text-[10px] font-bold uppercase tracking-widest text-[#ff6a00]">
              Topic Assessment Complete
            </span>
            <h3 className="text-2xl font-bold text-white mt-2">
              Mastery Score Updated!
            </h3>
            <p className="mt-3 text-sm text-white/50">
              You answered {correctCount} out of {questions.length} correctly. Your personalized learning path and topic proficiency have been recalculated.
            </p>
            <button
              onClick={onClose}
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#ff6a00] px-6 py-3 text-sm font-bold text-black hover:bg-[#ff7a1a] transition"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            {/* Header progress */}
            <div className="flex items-center justify-between text-xs text-white/40 mb-4">
              <div className="flex items-center gap-2 text-[#ff8533] font-semibold">
                <BrainCircuit size={14} />
                <span>{topic.title} Check-in</span>
              </div>
              <span>Question {currentIndex + 1} of {questions.length}</span>
            </div>

            {/* Question Text */}
            <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
              {currentQ.question}
            </h3>

            {currentQ.codeSnippet && (
              <pre className="mt-3 overflow-x-auto rounded-xl border border-white/10 bg-black/60 p-3 font-mono text-xs text-white/80">
                <code>{currentQ.codeSnippet}</code>
              </pre>
            )}

            {/* Options */}
            <div className="mt-6 space-y-2.5">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentQ.correctAnswer;
                let optionStyle = "border-white/10 bg-[#0c0c0c] hover:border-white/25";

                if (isAnswered) {
                  if (isCorrect) {
                    optionStyle = "border-[#ff6a00] bg-[#ff6a00]/15 text-[#ff8533]";
                  } else if (isSelected) {
                    optionStyle = "border-red-500/50 bg-red-500/10 text-white/70";
                  } else {
                    optionStyle = "border-white/5 opacity-40";
                  }
                }

                return (
                  <button
                    key={opt}
                    disabled={isAnswered}
                    onClick={() => handleSelect(idx)}
                    className={`w-full flex items-center justify-between rounded-xl border p-3.5 text-left text-sm transition ${optionStyle}`}
                  >
                    <span>{opt}</span>
                    {isAnswered && isCorrect && <Check size={16} className="text-[#ff6a00]" />}
                  </button>
                );
              })}
            </div>

            {/* Explanation box when answered */}
            {isAnswered && (
              <div className="mt-4 rounded-xl border border-[#ff6a00]/20 bg-[#ff6a00]/5 p-3 text-xs text-white/70">
                <span className="font-semibold text-[#ff6a00]">Explanation: </span>
                {currentQ.explanation}
              </div>
            )}

            {/* Action footer */}
            <div className="mt-6 flex justify-end">
              <button
                disabled={!isAnswered}
                onClick={handleNext}
                className="flex items-center gap-2 rounded-full bg-[#ff6a00] px-5 py-2.5 text-xs font-bold text-black disabled:opacity-30 transition hover:bg-[#ff7a1a]"
              >
                {currentIndex === questions.length - 1 ? "Finish Assessment" : "Next Question"}
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
