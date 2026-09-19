import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "orange" | "gray" | "outline" | "subtle";
  size?: "sm" | "md";
  className?: string;
}

export function Badge({
  children,
  variant = "orange",
  size = "sm",
  className = "",
}: BadgeProps) {
  const variantStyles = {
    orange: "border-[#ff6a00]/30 bg-[#ff6a00]/10 text-[#ff8533]",
    gray: "border-white/10 bg-white/5 text-white/50",
    outline: "border-white/20 text-white/70",
    subtle: "border-transparent bg-white/[0.03] text-white/40",
  };

  const sizeStyles = {
    sm: "px-2.5 py-0.5 text-[11px]",
    md: "px-3 py-1 text-xs",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-medium tracking-wide ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </span>
  );
}
