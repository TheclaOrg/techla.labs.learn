import React from "react";

interface DashboardStatProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  subtitle?: string;
  badge?: string;
}

export function DashboardStat({
  icon,
  title,
  value,
  subtitle,
  badge,
}: DashboardStatProps) {
  return (
    <div className="card rounded-2xl p-5 relative overflow-hidden">
      <div className="flex items-center justify-between">
        <div className="text-[#ff6a00]">{icon}</div>
        {badge && (
          <span className="rounded-full bg-[#ff6a00]/10 border border-[#ff6a00]/20 px-2 py-0.5 text-[10px] text-[#ff8533] font-semibold">
            {badge}
          </span>
        )}
      </div>

      <p className="mt-5 text-xs text-white/40">{title}</p>
      <p className="mt-1 text-2xl sm:text-3xl font-bold text-white tracking-tight">{value}</p>
      {subtitle && <p className="mt-1 text-[11px] text-white/30">{subtitle}</p>}
    </div>
  );
}
