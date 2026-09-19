import React from "react";
import { LearningResource } from "@/types/learning";
import { ExternalLink, Video, FileText, Globe, PlayCircle } from "lucide-react";

interface ResourceCardProps {
  resource: LearningResource;
}

export function ResourceCard({ resource }: ResourceCardProps) {
  const getProviderIcon = () => {
    switch (resource.provider) {
      case "YouTube":
        return <Video size={16} className="text-[#ff6a00]" />;
      case "Documentation":
        return <FileText size={16} className="text-[#ff6a00]" />;
      default:
        return <Globe size={16} className="text-white/60" />;
    }
  };

  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className="card group flex flex-col justify-between rounded-xl p-4 transition-all hover:border-[#ff6a00]/40"
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-1.5 text-xs text-white/50">
            {getProviderIcon()}
            <span>{resource.provider}</span>
            {resource.author && <span>• {resource.author}</span>}
          </div>
          <ExternalLink size={13} className="text-white/30 group-hover:text-[#ff6a00] transition" />
        </div>

        <h4 className="text-sm font-semibold text-white group-hover:text-[#ff8533] transition line-clamp-2">
          {resource.title}
        </h4>
      </div>

      <div className="mt-4 flex items-center justify-between text-[11px] text-white/40 pt-2 border-t border-white/[0.04]">
        <div className="flex items-center gap-2">
          {resource.duration && (
            <span className="flex items-center gap-1">
              <PlayCircle size={11} />
              {resource.duration}
            </span>
          )}
          {resource.difficulty && (
            <span className="rounded bg-white/5 px-1.5 py-0.5 text-[10px] text-white/60">
              {resource.difficulty}
            </span>
          )}
        </div>
        <span className="text-[#ff8533] font-medium text-[10px] uppercase tracking-wider">
          Free
        </span>
      </div>
    </a>
  );
}
