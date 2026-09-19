import React from "react";
import { UserTopicMastery, DSACategory } from "@/types/learning";
import { dsaTopics } from "@/data/dsa/topics";

interface KnowledgeMapProps {
  masteries: Record<string, UserTopicMastery>;
}

const categories: DSACategory[] = [
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

export function KnowledgeMap({ masteries }: KnowledgeMapProps) {
  // Group topics by category
  const categoryStats = categories.map((cat) => {
    const topicsInCat = dsaTopics.filter((t) => t.category === cat);
    const total = topicsInCat.length;
    let totalScore = 0;
    let masteredCount = 0;

    topicsInCat.forEach((t) => {
      const m = masteries[t.slug]?.masteryLevel ?? 0;
      totalScore += m;
      if (m >= 4) masteredCount++;
    });

    const maxPoints = total * 5;
    const percentage = maxPoints > 0 ? Math.round((totalScore / maxPoints) * 100) : 0;

    let status = "Locked";
    let color = "gray";

    if (percentage >= 80) {
      status = "Mastered";
      color = "orange";
    } else if (percentage >= 40) {
      status = "Strong";
      color = "orange";
    } else if (percentage > 0) {
      status = "Learning";
      color = "orange";
    }

    return {
      category: cat,
      total,
      masteredCount,
      percentage,
      status,
      color,
      topics: topicsInCat,
    };
  });

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {categoryStats.map((item) => (
        <div
          key={item.category}
          className="rounded-xl border border-white/[0.07] bg-[#0b0b0b] p-4 transition-colors hover:border-white/15"
        >
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-white">{item.category}</h4>
            <div
              className={`size-2 rounded-full ${
                item.color === "orange" ? "bg-[#ff6a00] shadow-[0_0_8px_#ff6a00]" : "bg-white/10"
              }`}
            />
          </div>

          <div className="mt-2 flex items-center justify-between text-xs text-white/40">
            <span>{item.status}</span>
            <span className="font-mono text-white/60">{item.masteredCount}/{item.total} topics</span>
          </div>

          <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/5">
            <div
              className="h-full rounded-full bg-[#ff6a00] transition-all"
              style={{ width: `${item.percentage}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
