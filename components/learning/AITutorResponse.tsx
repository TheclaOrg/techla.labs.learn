import React from "react";
import { CheckCircle2, AlertTriangle, Lightbulb, Zap, Globe, ExternalLink, ShieldCheck } from "lucide-react";

export interface AITutorWebReference {
  title: string;
  url: string;
  source: string;
  category: "DSA" | "Cybersecurity" | "General";
  description: string;
}

interface AITutorResponseProps {
  content: string;
  references?: AITutorWebReference[];
}

export function AITutorResponse({ content, references }: AITutorResponseProps) {
  if (!content) return null;

  // Clean and parse the raw text into structured sections
  const cleanLine = (line: string) =>
    line
      .replace(/^#{1,6}\s*/g, "") // remove leading #, ##, ###
      .replace(/\*\*\*(.*?)\*\*\*/g, "$1") // remove ***bold-italic***
      .replace(/\*\*(.*?)\*\*/g, "$1") // remove **bold**
      .replace(/\*(.*?)\*/g, "$1") // remove *italic*
      .replace(/^[-*•]\s+/g, "") // remove bullet markdown
      .trim();

  const lines = content.split("\n").map((l) => l.trim()).filter(Boolean);

  // Group lines into logical blocks
  const sections: { title?: string; iconType?: string; items: string[]; paragraph?: string }[] = [];
  let currentSection: { title?: string; iconType?: string; items: string[]; paragraph?: string } | null = null;

  for (const rawLine of lines) {
    const isHeading =
      rawLine.startsWith("#") ||
      rawLine.startsWith("**") && rawLine.endsWith(":**") ||
      rawLine.toLowerCase().includes("core mental model") ||
      rawLine.toLowerCase().includes("key invariant") ||
      rawLine.toLowerCase().includes("common pitfall") ||
      rawLine.toLowerCase().includes("algorithm / system mechanics") ||
      rawLine.toLowerCase().includes("time & space complexity") ||
      rawLine.toLowerCase().includes("rule of thumb");

    const isBullet = rawLine.startsWith("-") || rawLine.startsWith("*") || rawLine.startsWith("•");

    if (isHeading) {
      if (currentSection) {
        sections.push(currentSection);
      }
      const titleClean = cleanLine(rawLine).replace(/:$/, "");
      let iconType = "lightbulb";
      if (titleClean.toLowerCase().includes("pitfall") || titleClean.toLowerCase().includes("mistake")) {
        iconType = "warning";
      } else if (titleClean.toLowerCase().includes("invariant") || titleClean.toLowerCase().includes("concept")) {
        iconType = "check";
      } else if (titleClean.toLowerCase().includes("complexity") || titleClean.toLowerCase().includes("rule")) {
        iconType = "zap";
      }

      currentSection = {
        title: titleClean,
        iconType,
        items: [],
      };
    } else if (isBullet) {
      const bulletClean = cleanLine(rawLine);
      if (bulletClean) {
        if (!currentSection) {
          currentSection = { items: [] };
        }
        currentSection.items.push(bulletClean);
      }
    } else {
      const textClean = cleanLine(rawLine);
      if (textClean) {
        if (!currentSection) {
          currentSection = { items: [], paragraph: textClean };
        } else if (!currentSection.paragraph) {
          currentSection.paragraph = textClean;
        } else {
          currentSection.paragraph += " " + textClean;
        }
      }
    }
  }

  if (currentSection) {
    sections.push(currentSection);
  }

  return (
    <div className="space-y-4">
      {sections.map((sec, idx) => {
        const getIcon = () => {
          switch (sec.iconType) {
            case "warning":
              return <AlertTriangle size={15} className="text-amber-400 shrink-0" />;
            case "check":
              return <CheckCircle2 size={15} className="text-[#ff8533] shrink-0" />;
            case "zap":
              return <Zap size={15} className="text-[#ff6a00] shrink-0" />;
            default:
              return <Lightbulb size={15} className="text-[#ff6a00] shrink-0" />;
          }
        };

        const isWarning = sec.iconType === "warning";

        return (
          <div
            key={idx}
            className={`rounded-xl border p-4 transition ${
              isWarning
                ? "border-red-500/20 bg-red-500/[0.03]"
                : "border-white/[0.08] bg-[#0c0c0c]"
            }`}
          >
            {sec.title && (
              <div className="flex items-center gap-2 mb-2">
                {getIcon()}
                <h4
                  className={`text-xs uppercase font-bold tracking-wider ${
                    isWarning ? "text-red-400" : "text-[#ff8533]"
                  }`}
                >
                  {sec.title}
                </h4>
              </div>
            )}

            {sec.paragraph && (
              <p className="text-xs sm:text-sm leading-6 text-white/80">
                {sec.paragraph}
              </p>
            )}

            {sec.items.length > 0 && (
              <div className="mt-3 space-y-2">
                {sec.items.map((item, iIdx) => (
                  <div
                    key={iIdx}
                    className="flex items-start gap-2.5 rounded-lg border border-white/5 bg-white/[0.02] p-2.5 text-xs text-white/85 leading-5"
                  >
                    <div className="size-1.5 rounded-full bg-[#ff6a00] mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}

      {/* Authoritative Web References Panel */}
      {references && references.length > 0 && (
        <div className="rounded-xl border border-[#ff6a00]/30 bg-[#0d0d0d] p-4 shadow-[0_0_30px_rgba(255,106,0,0.06)]">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-[#ff8533]">
              <Globe size={15} />
              <h4 className="text-xs uppercase font-bold tracking-wider">
                Authoritative Web Citations & Research
              </h4>
            </div>
            <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
              <ShieldCheck size={11} />
              Verified Standard
            </span>
          </div>

          <p className="text-xs text-white/50 mb-3">
            Grounded against top industry platforms, MIT/Harvard lecture notes, and active documentation:
          </p>

          <div className="grid gap-2 sm:grid-cols-2">
            {references.map((ref, rIdx) => (
              <a
                key={rIdx}
                href={ref.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col justify-between rounded-lg border border-white/10 bg-white/[0.02] p-3 hover:border-[#ff6a00]/50 hover:bg-[#ff6a00]/5 transition"
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="rounded bg-[#ff6a00]/10 border border-[#ff6a00]/20 px-1.5 py-0.5 text-[9px] font-semibold text-[#ff8533] uppercase">
                      {ref.source}
                    </span>
                    <ExternalLink size={12} className="text-white/30 group-hover:text-[#ff6a00] transition" />
                  </div>
                  <h5 className="text-xs font-semibold text-white group-hover:text-[#ff8533] transition line-clamp-1">
                    {ref.title}
                  </h5>
                  <p className="mt-1 text-[11px] text-white/45 leading-4 line-clamp-2">
                    {ref.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

