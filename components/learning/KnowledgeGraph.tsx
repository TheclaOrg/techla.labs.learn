"use client";

import React, { useState } from "react";
import Link from "next/link";
import { UserTopicMastery, Topic } from "@/types/learning";
import { topicsBySlug } from "@/lib/learning/graph";
import { Check, Lock, Sparkles, ArrowRight } from "lucide-react";

interface KnowledgeGraphProps {
  domain?: "dsa" | "cybersecurity";
  masteries?: Record<string, UserTopicMastery>;
  activeSlug?: string;
  onSelectTopic?: (topic: Topic) => void;
}

// Curated canonical flow path nodes for DSA
const dsaGraphChain = [
  { slug: "programming-fundamentals", x: "8%", y: "45%" },
  { slug: "big-o-notation", x: "20%", y: "45%" },
  { slug: "arrays", x: "32%", y: "45%" },
  { slug: "two-pointers", x: "44%", y: "25%" },
  { slug: "sliding-window", x: "56%", y: "25%" },
  { slug: "hash-tables", x: "44%", y: "65%" },
  { slug: "binary-search", x: "56%", y: "65%" },
  { slug: "binary-trees", x: "68%", y: "45%" },
  { slug: "tree-traversal", x: "80%", y: "45%" },
  { slug: "bfs", x: "92%", y: "45%" },
];

// Curated canonical flow path nodes for Cybersecurity
const cyberGraphChain = [
  { slug: "computer-hardware-architecture", x: "8%", y: "45%" },
  { slug: "operating-systems-internals", x: "20%", y: "45%" },
  { slug: "osi-and-tcpip-models", x: "32%", y: "45%" },
  { slug: "linux-cli-fundamentals", x: "44%", y: "25%" },
  { slug: "linux-permissions-and-users", x: "56%", y: "25%" },
  { slug: "transport-layer-protocols", x: "44%", y: "65%" },
  { slug: "core-network-protocols", x: "56%", y: "65%" },
  { slug: "cia-triad-and-security-principles", x: "68%", y: "45%" },
  { slug: "threat-modeling-and-attack-vectors", x: "80%", y: "45%" },
  { slug: "web-security-fundamentals", x: "92%", y: "45%" },
];

export function KnowledgeGraph({
  domain = "dsa",
  masteries = {},
  activeSlug,
  onSelectTopic,
}: KnowledgeGraphProps) {
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(
    activeSlug && topicsBySlug[activeSlug] ? topicsBySlug[activeSlug] : null
  );

  const graphChain = domain === "cybersecurity" ? cyberGraphChain : dsaGraphChain;

  return (
    <div className="relative w-full rounded-2xl border border-white/[0.08] bg-[#080808] p-4 lg:p-6 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#ff6a00]/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Header bar inside graph */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 relative z-10">
        <div>
          <span className="text-[10px] uppercase tracking-widest text-[#ff6a00] font-semibold">
            Interactive Directed Graph
          </span>
          <h3 className="text-sm font-semibold text-white">
            {domain === "cybersecurity" ? "Cybersecurity Knowledge Map" : "DSA Prerequisite Flow & Discovery Map"}
          </h3>
        </div>
        <div className="flex items-center gap-4 text-xs text-white/40">
          <div className="flex items-center gap-1.5">
            <div className="size-2 rounded-full bg-[#ff6a00]" />
            <span>Mastered</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="size-2 rounded-full border border-[#ff6a00] bg-[#ff6a00]/20" />
            <span>Recommended</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="size-2 rounded-full bg-white/10" />
            <span>Locked</span>
          </div>
        </div>
      </div>

      {/* Visual canvas container */}
      <div className="relative h-[340px] sm:h-[380px] w-full overflow-x-auto overflow-y-hidden border border-white/[0.04] rounded-xl bg-[#060606]">
        <div className="relative min-w-[700px] h-full">
          {/* Connecting SVG Path Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-white/10" strokeWidth="2">
            {/* Stage 1 to 2 to 3 */}
            <line x1="8%" y1="45%" x2="20%" y2="45%" stroke="#ff6a00" strokeOpacity="0.4" />
            <line x1="20%" y1="45%" x2="32%" y2="45%" stroke="#ff6a00" strokeOpacity="0.4" />
            {/* Node 3 to Branch 1 & 2 */}
            <line x1="32%" y1="45%" x2="44%" y2="25%" stroke="#ff6a00" strokeOpacity="0.3" strokeDasharray="4 4" />
            <line x1="32%" y1="45%" x2="44%" y2="65%" stroke="#ff6a00" strokeOpacity="0.3" strokeDasharray="4 4" />
            {/* Branch 1 step */}
            <line x1="44%" y1="25%" x2="56%" y2="25%" stroke="rgba(255,255,255,0.1)" />
            {/* Branch 2 step */}
            <line x1="44%" y1="65%" x2="56%" y2="65%" stroke="rgba(255,255,255,0.1)" />
            {/* Converge */}
            <line x1="56%" y1="25%" x2="68%" y2="45%" stroke="rgba(255,255,255,0.08)" />
            <line x1="56%" y1="65%" x2="68%" y2="45%" stroke="rgba(255,255,255,0.08)" />
            {/* Final stretch */}
            <line x1="68%" y1="45%" x2="80%" y2="45%" stroke="rgba(255,255,255,0.08)" />
            <line x1="80%" y1="45%" x2="92%" y2="45%" stroke="rgba(255,255,255,0.08)" />
          </svg>

          {/* Graph Nodes */}
          {graphChain.map((node) => {
            const topic = topicsBySlug[node.slug];
            if (!topic) return null;

            const mastery = masteries[node.slug]?.masteryLevel ?? 0;
            const isMastered = mastery >= 4;
            const isLearning = mastery >= 1 && mastery < 4;
            const isCurrent = activeSlug === node.slug;
            const isNext =
              !isMastered &&
              !isLearning &&
              (topic.prerequisites.length === 0 ||
                topic.prerequisites.every((p) => (masteries[p]?.masteryLevel ?? 0) >= 3));

            return (
              <div
                key={node.slug}
                style={{ left: node.x, top: node.y }}
                className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                onClick={() => {
                  setSelectedTopic(topic);
                  if (onSelectTopic) onSelectTopic(topic);
                }}
              >
                {/* Node circle */}
                <div
                  className={`grid size-12 place-items-center rounded-full border transition-all duration-300 ${
                    isMastered
                      ? "border-[#ff6a00] bg-[#ff6a00] text-black shadow-[0_0_20px_rgba(255,106,0,0.35)]"
                      : isNext || isCurrent
                        ? "border-[#ff6a00] bg-[#ff6a00]/15 text-[#ff6a00] shadow-[0_0_30px_rgba(255,106,0,0.25)] ring-2 ring-[#ff6a00]/30 animate-pulse"
                        : isLearning
                          ? "border-[#ff8533]/50 bg-[#ff8533]/10 text-[#ff8533]"
                          : "border-white/10 bg-[#0c0c0c] text-white/25 hover:border-white/20"
                  }`}
                >
                  {isMastered ? (
                    <Check size={18} strokeWidth={3} />
                  ) : isNext || isCurrent ? (
                    <Sparkles size={17} />
                  ) : isLearning ? (
                    <span className="text-xs font-bold">{mastery}</span>
                  ) : (
                    <Lock size={15} />
                  )}
                </div>

                {/* Node label */}
                <div className="mt-2 w-28 -translate-x-1/2 text-center pointer-events-none">
                  <p
                    className={`text-[11px] leading-tight font-medium ${
                      isMastered ? "text-white" : isNext ? "text-[#ff8533]" : "text-white/40"
                    }`}
                  >
                    {topic.title}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Node Details Box */}
      {selectedTopic && (
        <div className="mt-4 rounded-xl border border-[#ff6a00]/25 bg-[#0d0d0d] p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold text-[#ff6a00] tracking-wider">
                {selectedTopic.category}
              </span>
              <span className="text-xs text-white/30">•</span>
              <span className="text-xs text-white/50">{selectedTopic.estimatedMinutes} mins</span>
            </div>
            <h4 className="text-base font-semibold text-white mt-0.5">{selectedTopic.title}</h4>
            <p className="text-xs text-white/50 mt-1 max-w-xl line-clamp-1">{selectedTopic.description}</p>
          </div>
          <Link
            href={`/learn/${selectedTopic.domain || domain}/${selectedTopic.slug}`}
            className="shrink-0 flex items-center gap-2 rounded-full bg-[#ff6a00] px-4 py-2 text-xs font-bold text-black hover:bg-[#ff7a1a] transition"
          >
            Open Topic
            <ArrowRight size={13} />
          </Link>
        </div>
      )}
    </div>
  );
}
