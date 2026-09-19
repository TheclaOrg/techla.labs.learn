import React from "react";

interface DashboardStatProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  subtitle?: string;
  badge?: string;
  badgeClassName?: string;
  progressBar?: {
    percentage: number;
    color?: string;
  };
  footer?: React.ReactNode;
}

export function DashboardStat({
  icon,
  title,
  value,
  subtitle,
  badge,
  badgeClassName,
  progressBar,
  footer,
}: DashboardStatProps) {
  return (
    <div className="card rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between border-white/[0.08] bg-[#0c0c0c] hover:border-[#ff6a00]/30 transition">
      <div>
        <div className="flex items-center justify-between">
          <div className="text-[#ff6a00]">{icon}</div>
          {badge && (
            <span
              className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold border ${
                badgeClassName || "bg-[#ff6a00]/10 border-[#ff6a00]/20 text-[#ff8533]"
              }`}
            >
              {badge}
            </span>
          )}
        </div>

        <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-white/40">{title}</p>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-bold font-mono text-white tracking-tight">{value}</span>
          {subtitle && <span className="text-xs text-white/40">{subtitle}</span>}
        </div>
      </div>

      {progressBar && (
        <div className="mt-4 pt-3 border-t border-white/[0.05]">
          <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
            <div
              className={`h-full rounded-full transition-all duration-700 ${progressBar.color || "bg-[#ff6a00]"}`}
              style={{ width: `${progressBar.percentage}%` }}
            />
          </div>
        </div>
      )}

      {footer && <div className="mt-3 pt-2.5 border-t border-white/[0.05]">{footer}</div>}
    </div>
  );
}

