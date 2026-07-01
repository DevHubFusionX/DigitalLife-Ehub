"use client";

import React from "react";
import { BookOpen, HelpCircle, FileText, ArrowDownToLine, PlayCircle, Layers, Cpu, Award } from "lucide-react";
import { Resource } from "./resourcesData";
import ResourceFrame from "./ResourceFrame";

interface ResourceCardProps {
  resource: Resource;
  onDownloadClick: (resource: Resource) => void;
}

const ResourceCard = ({ resource, onDownloadClick }: ResourceCardProps) => {
  // Determine gradient and icon based on Topic to create a premium cover visual
  const getCoverStyles = (topic: Resource["topic"]) => {
    switch (topic) {
      case "Marketing":
        return {
          gradient: "from-[#8B5CF6] via-[#6D28D9] to-[#4C1D95]", // Purple/Violet
          icon: <BookOpen className="w-10 h-10 text-white/90" />,
          accentBg: "bg-[#8B5CF6]/10 text-[#8B5CF6] border-[#8B5CF6]/20"
        };
      case "Sales":
        return {
          gradient: "from-[#3B82F6] via-[#1D4ED8] to-[#1E3A8A]", // Blue
          icon: <Layers className="w-10 h-10 text-white/90" />,
          accentBg: "bg-[#3B82F6]/10 text-[#3B82F6] border-[#3B82F6]/20"
        };
      case "Customer Success":
        return {
          gradient: "from-[#10B981] via-[#047857] to-[#064E3B]", // Emerald/Green
          icon: <Award className="w-10 h-10 text-white/90" />,
          accentBg: "bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20"
        };
      case "AI and Automation":
        return {
          gradient: "from-[#F59E0B] via-[#D97706] to-[#78350F]", // Amber/Orange
          icon: <Cpu className="w-10 h-10 text-white/90" />,
          accentBg: "bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20"
        };
      case "Leadership":
      default:
        return {
          gradient: "from-[#475569] via-[#334155] to-[#0F172A]", // Navy/Slate
          icon: <FileText className="w-10 h-10 text-white/90" />,
          accentBg: "bg-[#0F172A]/10 text-[#0F172A] border-[#0F172A]/20"
        };
    }
  };

  const styles = getCoverStyles(resource.topic);

  // Return appropriate format icons for card display
  const getFormatIcon = (format: Resource["format"]) => {
    switch (format) {
      case "Webinar":
        return <PlayCircle size={14} className="mr-1 inline" />;
      case "Tool":
      case "Template":
      case "Ebook":
      case "Guide":
      default:
        return <FileText size={14} className="mr-1 inline" />;
    }
  };

  return (
    <div 
      onClick={() => onDownloadClick(resource)}
      className="group bg-white rounded-3xl overflow-hidden border border-[#0F172A]/8 hover:border-[#0F172A]/15 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full hover:-translate-y-1 cursor-pointer"
    >
      {/* Visual Cover Header */}
      <ResourceFrame
        format={resource.format}
        title={resource.title}
        coverUrl={resource.coverUrl}
        coverGradient={resource.coverGradient || styles.gradient}
        tagLabel={resource.tagLabel}
      />

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        {/* Tag Badges */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${styles.accentBg}`}>
            {resource.topic}
          </span>
          <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200 flex items-center">
            {getFormatIcon(resource.format)}
            {resource.format}
          </span>
        </div>

        {/* Title */}
        <h4 className="text-lg font-bold text-[#0F172A] leading-snug mb-2 group-hover:text-accent-dark transition-colors duration-200">
          {resource.title}
        </h4>

        {/* Description */}
        <p className="text-xs text-[#475569] leading-relaxed mb-6 flex-1 line-clamp-3">
          {resource.description}
        </p>

        {/* Action Button */}
        <button
          onClick={() => onDownloadClick(resource)}
          className="w-full mt-auto py-3 bg-[#0F172A] hover:bg-[#020617] text-white hover:text-accent font-bold rounded-xl text-xs uppercase tracking-widest flex items-center justify-center gap-2 group-hover:shadow-md transition-all active:scale-[0.98]"
        >
          <ArrowDownToLine size={14} className="group-hover:translate-y-0.5 transition-transform" />
          Download Now
        </button>
      </div>
    </div>
  );
};

export default ResourceCard;
