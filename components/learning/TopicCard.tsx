import React from "react";
import Link from "next/link";
import { Topic, UserTopicMastery } from "@/types/learning";
import { MasteryBadge } from "@/components/ui/MasteryBadge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Clock } from "lucide-react";

interface TopicCardProps {
  topic: Topic;
  mastery?: UserTopicMastery;
  isRecommended?: boolean;
  recommendationReason?: string;
}

export function TopicCard({
  topic,
  mastery,
  isRecommended,
  recommendationReason,
}: TopicCardProps) {
  const level = mastery?.masteryLevel ?? 0;
  const progressPercent = Math.min(100, level * 20);

  return (
    <Link
      href={`/learn/dsa/${topic.slug}`}
      className={`group card block rounded-2xl p-5 relative overflow-hidden ${
        isRecommended ? "border-[#ff6a00]/40 bg-[#0d0d0d]" : ""
      }`}
    >
      {isRecommended && (
        <div className="absolute top-0 right-0 bg-[#ff6a00] text-black text-[9px] font-extrabold uppercase tracking-wider px-3 py-0.5 rounded-bl-lg">
          Next In Path
        </div>
      )}

      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#ff6a00]">
            {topic.category}
          </span>
          <h3 className="text-base font-semibold text-white group-hover:text-[#ff8533] transition mt-1">
            {topic.title}
          </h3>
        </div>
        <MasteryBadge level={level} status={mastery?.status} />
      </div>

      <p className="mt-2.5 text-xs leading-5 text-white/45 line-clamp-2">
        {topic.description}
      </p>

      {recommendationReason && (
        <div className="mt-3 rounded-lg border border-[#ff6a00]/15 bg-[#ff6a00]/5 p-2 text-[11px] leading-4 text-white/60">
          <span className="text-[#ff6a00] font-semibold">Why next: </span>
          {recommendationReason}
        </div>
      )}

      <div className="mt-4 pt-3 border-t border-white/[0.05]">
        <div className="flex items-center justify-between text-[11px] text-white/40 mb-1.5">
          <div className="flex items-center gap-1.5">
            <Clock size={12} />
            <span>{topic.estimatedMinutes} mins</span>
          </div>
          <span className="font-mono text-[#ff8533]">{progressPercent}%</span>
        </div>
        <ProgressBar value={progressPercent} size="sm" />
      </div>
    </Link>
  );
}
