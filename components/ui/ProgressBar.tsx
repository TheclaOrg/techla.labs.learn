import React from "react";

interface ProgressBarProps {
  value: number; // 0 to 100
  max?: number;
  className?: string;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export function ProgressBar({
  value,
  max = 100,
  className = "",
  size = "md",
  showLabel = false,
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  const sizeClasses = {
    sm: "h-1",
    md: "h-1.5",
    lg: "h-2.5",
  };

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="mb-1.5 flex justify-between text-xs text-white/50">
          <span>Progress</span>
          <span className="font-mono text-[#ff6a00]">{percentage}%</span>
        </div>
      )}
      <div className={`w-full overflow-hidden rounded-full bg-white/[0.07] ${sizeClasses[size]}`}>
        <div
          className="h-full rounded-full bg-[#ff6a00] transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
