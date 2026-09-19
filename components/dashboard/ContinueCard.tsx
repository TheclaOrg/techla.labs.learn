import React from "react";
import Link from "next/link";
import { Topic, UserTopicMastery } from "@/types/learning";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { ArrowRight } from "lucide-react";

interface ContinueCardProps {
  topic: Topic;
  mastery?: UserTopicMastery;
}

export function ContinueCard({ topic, mastery }: ContinueCardProps) {
  const level = mastery?.masteryLevel ?? 2;
  const progressPercent = Math.min(100, Math.max(15, level * 20));

  return (
    <div className="card rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[10px] uppercase font-bold tracking-widest text-white/30">
              Continue Learning
            </p>
            <h3 className="mt-1 text-2xl font-bold text-white tracking-tight">
              {topic.title}
            </h3>
          </div>
          <span className="rounded-full bg-[#ff6a00]/10 border border-[#ff6a00]/20 px-3 py-1 text-xs text-[#ff8533] font-semibold">
            {progressPercent}% Complete
          </span>
        </div>

        <p className="mt-3 text-xs text-white/50 leading-5 line-clamp-2">
          {topic.description}
        </p>

        <div className="mt-6">
          <ProgressBar value={progressPercent} size="md" />
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-white/[0.05] flex items-center justify-between">
        <span className="text-xs text-white/40">{topic.category}</span>
        <Link
          href={`/learn/dsa/${topic.slug}`}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#ff6a00] hover:text-[#ff7a1a] transition"
        >
          Resume Concept
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
