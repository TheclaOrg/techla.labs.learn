import React from "react";
import Link from "next/link";
import { Topic } from "@/types/learning";
import { BrainCircuit, ArrowRight, Sparkles } from "lucide-react";

interface RecommendationCardProps {
  topic: Topic;
  reason?: string;
}

export function RecommendationCard({ topic, reason }: RecommendationCardProps) {
  return (
    <div className="rounded-2xl border border-[#ff6a00]/30 bg-[#0d0d0d] p-6 relative overflow-hidden shadow-[0_0_50px_rgba(255,106,0,0.06)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[#ff6a00]">
          <BrainCircuit size={20} />
          <span className="text-[10px] uppercase font-bold tracking-widest">
            Recommended Next Step
          </span>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-[#ff6a00]/10 px-2.5 py-0.5 text-[10px] font-semibold text-[#ff8533]">
          <Sparkles size={11} />
          Graph Optimized
        </span>
      </div>

      <h3 className="mt-4 text-2xl font-bold text-white tracking-tight">
        {topic.title}
      </h3>

      <p className="mt-2 text-xs text-white/50 leading-5">
        {topic.description}
      </p>

      {reason && (
        <div className="mt-4 rounded-xl border border-[#ff6a00]/20 bg-[#ff6a00]/5 p-3 text-xs leading-5 text-white/70">
          <p className="font-semibold text-[#ff8533] text-[11px] mb-0.5">Why this concept next?</p>
          <p>{reason}</p>
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between">
        <span className="text-xs text-white/40">{topic.estimatedMinutes} mins estimated</span>
        <Link
          href={`/learn/${topic.domain || "dsa"}/${topic.slug}`}
          className="inline-flex items-center gap-2 rounded-full bg-[#ff6a00] px-5 py-2.5 text-xs font-bold text-black hover:bg-[#ff7a1a] transition"
        >
          Start Topic
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
