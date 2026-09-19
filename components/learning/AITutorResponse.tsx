import React from "react";
import { CheckCircle2, AlertTriangle, Lightbulb, Zap, Code2 } from "lucide-react";

interface AITutorResponseProps {
  content: string;
}

export function AITutorResponse({ content }: AITutorResponseProps) {
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

  // Fallback if parsing produces no sections (just clean lines)
  if (sections.length === 0) {
    return (
      <div className="space-y-3 text-sm leading-relaxed text-white/80">
        <p>{cleanLine(content)}</p>
      </div>
    );
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
    </div>
  );
}
