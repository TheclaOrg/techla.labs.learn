"use client";

import React, { useState } from "react";
import { PracticeProblem, ProblemProgress } from "@/types/learning";
import { ExternalLink, CheckCircle2, Circle, Code2 } from "lucide-react";
import { saveProblemStatus } from "@/lib/storage/progress-store";

interface ProblemCardProps {
  problem: PracticeProblem;
  progress?: ProblemProgress;
  onStatusChange?: (status: "not_started" | "attempted" | "solved") => void;
}

export function ProblemCard({
  problem,
  progress,
  onStatusChange,
}: ProblemCardProps) {
  const [status, setStatus] = useState<"not_started" | "attempted" | "solved">(
    progress?.status || "not_started"
  );

  const handleToggleSolved = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newStatus = status === "solved" ? "not_started" : "solved";
    setStatus(newStatus);
    saveProblemStatus(problem.slug, newStatus);
    if (onStatusChange) {
      onStatusChange(newStatus);
    }
  };

  const getDifficultyColor = () => {
    switch (problem.difficulty) {
      case "Easy":
        return "text-[#ff8533] border-[#ff6a00]/30 bg-[#ff6a00]/5";
      case "Medium":
        return "text-[#ff6a00] border-[#ff6a00]/50 bg-[#ff6a00]/10";
      case "Hard":
        return "text-white font-bold border-white/40 bg-white/10";
      default:
        return "text-white/60 border-white/10 bg-white/5";
    }
  };

  return (
    <div className="card group flex flex-col justify-between rounded-xl p-4 transition-all hover:border-[#ff6a00]/40">
      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <span
              className={`rounded-full border px-2 py-0.5 text-[10px] uppercase font-semibold tracking-wider ${getDifficultyColor()}`}
            >
              {problem.difficulty}
            </span>
            {problem.acceptanceRate && (
              <span className="text-[11px] text-white/35 font-mono">
                {problem.acceptanceRate} acceptance
              </span>
            )}
          </div>

          {/* Quick Solve Toggle Button */}
          <button
            onClick={handleToggleSolved}
            className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs transition ${
              status === "solved"
                ? "bg-[#ff6a00] text-black font-bold"
                : "border border-white/10 text-white/40 hover:text-white hover:border-white/30"
            }`}
          >
            {status === "solved" ? (
              <>
                <CheckCircle2 size={13} />
                <span>Solved</span>
              </>
            ) : (
              <>
                <Circle size={13} />
                <span>Mark Solved</span>
              </>
            )}
          </button>
        </div>

        <h4 className="mt-3 text-sm font-semibold text-white group-hover:text-[#ff8533] transition flex items-center gap-1.5">
          <Code2 size={14} className="text-[#ff6a00]" />
          {problem.title}
        </h4>

        {problem.summary && (
          <p className="mt-2 text-xs leading-5 text-white/45 line-clamp-2">
            {problem.summary}
          </p>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-white/[0.04] flex items-center justify-between">
        <span className="text-[11px] text-white/30 font-mono">Platform: {problem.platform}</span>
        <a
          href={problem.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-semibold text-[#ff6a00] hover:text-[#ff7a1a] transition"
        >
          Solve on LeetCode
          <ExternalLink size={12} />
        </a>
      </div>
    </div>
  );
}
