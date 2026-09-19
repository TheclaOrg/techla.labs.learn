import React from "react";
import { MasteryLevel } from "@/types/learning";
import { Check, Lock, Sparkles, BookOpen, Flame, Trophy } from "lucide-react";

interface MasteryBadgeProps {
  level: MasteryLevel;
  status?: "locked" | "available" | "learning" | "practicing" | "mastered";
  showIcon?: boolean;
  size?: "sm" | "md";
}

export function MasteryBadge({
  level,
  status,
  showIcon = true,
  size = "sm",
}: MasteryBadgeProps) {
  const configs: Record<
    number,
    { label: string; bg: string; border: string; text: string; icon: React.ReactNode }
  > = {
    0: {
      label: status === "locked" ? "Locked" : "Not Started",
      bg: "bg-white/[0.03]",
      border: "border-white/10",
      text: "text-white/30",
      icon: status === "locked" ? <Lock size={12} /> : <div className="size-1.5 rounded-full bg-white/20" />,
    },
    1: {
      label: "Introduced",
      bg: "bg-[#ff6a00]/5",
      border: "border-[#ff6a00]/20",
      text: "text-white/60",
      icon: <BookOpen size={12} className="text-[#ff6a00]" />,
    },
    2: {
      label: "Learning",
      bg: "bg-[#ff6a00]/10",
      border: "border-[#ff6a00]/30",
      text: "text-[#ff8533]",
      icon: <Sparkles size={12} className="text-[#ff6a00]" />,
    },
    3: {
      label: "Practicing",
      bg: "bg-[#ff6a00]/15",
      border: "border-[#ff6a00]/40",
      text: "text-[#ff8533]",
      icon: <Flame size={12} className="text-[#ff6a00]" />,
    },
    4: {
      label: "Proficient",
      bg: "bg-[#ff6a00]/20",
      border: "border-[#ff6a00]/50",
      text: "text-[#ff8533] font-semibold",
      icon: <Check size={12} className="text-[#ff6a00]" />,
    },
    5: {
      label: "Mastered",
      bg: "bg-[#ff6a00] text-black",
      border: "border-[#ff6a00]",
      text: "text-black font-bold",
      icon: <Trophy size={12} className="text-black" />,
    },
  };

  const config = configs[level] || configs[0];
  const sizeStyles = size === "sm" ? "px-2.5 py-0.5 text-[11px]" : "px-3 py-1 text-xs";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border ${config.bg} ${config.border} ${config.text} ${sizeStyles}`}
    >
      {showIcon && config.icon}
      <span>{config.label}</span>
    </span>
  );
}
