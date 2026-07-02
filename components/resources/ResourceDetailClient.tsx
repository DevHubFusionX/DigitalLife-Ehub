"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Download, FileText, CheckCircle2, ChevronRight, Share2, Sparkles, BookOpen } from "lucide-react";
import { Resource } from "./resourcesData";
import DownloadModal from "./DownloadModal";
import ResourceFrame from "./ResourceFrame";
import ResourceCard from "./ResourceCard";
import { motion } from "framer-motion";

interface ResourceDetailClientProps {
  resource: Resource;
  relatedResources: Resource[];
}

const ResourceDetailClient = ({ resource, relatedResources }: ResourceDetailClientProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeResource, setActiveResource] = useState<Resource>(resource);

  const triggerDownloadModal = (res: Resource) => {
    setActiveResource(res);
    setIsModalOpen(true);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: resource.title,
        text: resource.description,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("URL copied to clipboard!");
    }
  };

  // Custom Markdown parsing helper
  const renderMarkdown = (content?: string) => {
    if (!content) return <p className="text-[#475569]/80">No details available.</p>;

    const lines = content.split("\n");
    return lines.map((line, idx) => {
      const trimmed = line.trim();

      if (trimmed.startsWith("# ")) {
        return (
          <h1 key={idx} className="text-2xl sm:text-3xl font-display font-extrabold text-[#0F172A] mt-10 mb-5 tracking-tight border-l-4 border-accent pl-4">
            {trimmed.substring(2)}
          </h1>
        );
      }
      if (trimmed.startsWith("## ")) {
        return (
          <h2 key={idx} className="text-xl sm:text-2xl font-display font-bold text-[#0F172A] mt-8 mb-4 border-b border-[#0F172A]/5 pb-2">
            {trimmed.substring(3)}
          </h2>
        );
      }
      if (trimmed.startsWith("### ")) {
        return (
          <h3 key={idx} className="text-lg sm:text-xl font-display font-semibold text-[#0F172A] mt-6 mb-3">
            {trimmed.substring(4)}
          </h3>
        );
      }
      if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        return (
          <li key={idx} className="text-xs sm:text-sm text-[#475569]/90 ml-6 list-disc mb-2.5 leading-relaxed">
            {trimmed.substring(2)}
          </li>
        );
      }
      if (trimmed.startsWith("1. ") || trimmed.startsWith("2. ") || trimmed.startsWith("3. ") || trimmed.startsWith("4. ")) {
        return (
          <li key={idx} className="text-xs sm:text-sm text-[#475569]/90 ml-6 list-decimal mb-2.5 leading-relaxed">
            {trimmed.substring(3)}
          </li>
        );
      }
      if (trimmed.startsWith("**Free Download:**") || trimmed.startsWith("**Download:**")) {
        return (
          <div key={idx} className="my-8 p-6 bg-[#CCDCD2]/25 border border-[#CCDCD2]/40 rounded-2xl text-[#0F172A] text-xs sm:text-sm font-bold flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-center sm:text-left leading-relaxed">{trimmed}</span>
            <button
              onClick={() => triggerDownloadModal(resource)}
              className="px-6 py-3 bg-accent hover:bg-accent-dark text-primary font-bold rounded-xl text-xs uppercase tracking-widest transition-all shrink-0 shadow-lg shadow-accent/10 active:scale-[0.98]"
            >
              Get Template
            </button>
          </div>
        );
      }
      if (trimmed === "") {
        return <div key={idx} className="h-4" />;
      }

      // Inline Bold support
      const boldRegex = /\*\*(.*?)\*\*/g;
      if (boldRegex.test(trimmed)) {
        const parts = trimmed.split(boldRegex);
        return (
          <p key={idx} className="text-xs sm:text-sm text-[#475569]/90 mb-4 leading-relaxed font-medium">
            {parts.map((part, i) => (i % 2 === 1 ? <strong key={i} className="text-[#0F172A] font-extrabold">{part}</strong> : part))}
          </p>
        );
      }

      return (
        <p key={idx} className="text-xs sm:text-sm text-[#475569]/90 mb-4 leading-relaxed font-medium">
          {trimmed}
        </p>
      );
    });
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen text-[#0F172A] font-sans pb-24">
      {/* Top Banner Navigation */}
      <div className="bg-[#0F172A] text-white/60 text-xs py-4 border-b border-white/5 relative z-25">
        <div className="container-custom flex items-center justify-between">
          <Link href="/resources" className="flex items-center gap-2 hover:text-white transition-colors font-bold uppercase tracking-wider text-[10px]">
            <ArrowLeft size={12} className="text-accent" />
            Back to Resource Library
          </Link>
          <span className="hidden sm:inline font-bold text-[10px] text-accent uppercase tracking-widest">DigitalLife Operations Suite</span>
        </div>
      </div>

      {/* Hero Cover Area */}
      <section className="relative overflow-hidden bg-[#0F172A] py-20 md:py-28 text-white">
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[32px_32px] pointer-events-none" />
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container-custom relative z-10">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Title / Description */}
            <div className="lg:col-span-8 flex flex-col items-start text-left">
              <div className="flex gap-2 flex-wrap mb-4">
                <span className="inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-accent bg-white/5 border border-white/10 px-3 py-1 rounded-full backdrop-blur-md">
                  <Sparkles size={10} />
                  {resource.topic}
                </span>
                <span className="inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-[#FEDB54] bg-white/5 border border-white/10 px-3 py-1 rounded-full backdrop-blur-md">
                  <BookOpen size={10} />
                  {resource.format}
                </span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-extrabold leading-[1.1] mb-6 text-white tracking-tight drop-shadow-sm">
                {resource.title}
              </h1>
              
              <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed font-medium max-w-2xl">
                {resource.description}
              </p>

              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => triggerDownloadModal(resource)}
                  className="px-6 py-3.5 bg-accent hover:bg-accent-dark text-primary font-bold rounded-xl text-xs uppercase tracking-widest transition-all active:scale-[0.98] shadow-lg shadow-accent/20 flex items-center gap-2"
                >
                  <Download size={14} />
                  Get Access Now
                </button>
                
                <button
                  onClick={handleShare}
                  className="p-3.5 bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-xl transition-all active:scale-[0.98]"
                  title="Share Link"
                >
                  <Share2 size={14} />
                </button>
              </div>
            </div>

            {/* Gradient Mockup Preview Cover */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="w-full max-w-[280px] bg-white rounded-3xl overflow-hidden border border-white/10 text-primary shadow-2xl transform rotate-1 md:rotate-2 hover:rotate-0 transition-transform duration-300">
                <ResourceFrame 
                  format={resource.format}
                  title={resource.title}
                  coverUrl={resource.coverUrl}
                  coverGradient={resource.coverGradient}
                  tagLabel={resource.tagLabel}
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Layout Grid */}
      <main className="container-custom mt-16 relative z-10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Article / Guide content */}
          <article className="lg:col-span-8 bg-white rounded-3xl p-8 sm:p-12 border border-[#0F172A]/5 shadow-sm">
            
            {/* Outline Card inside Content */}
            <div className="p-6 bg-[#F8FAF9] rounded-2xl border border-[#0F172A]/5 mb-10">
              <h4 className="text-xs font-black uppercase tracking-wider text-[#0F172A] mb-4 flex items-center gap-2">
                <CheckCircle2 className="text-[#CCDCD2] w-4.5 h-4.5" />
                What's included in this package
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <li className="text-[11px] font-bold text-[#475569] flex items-center gap-2">
                  <ChevronRight size={12} className="text-accent-dark" />
                  Step-by-step implementation guide
                </li>
                <li className="text-[11px] font-bold text-[#475569] flex items-center gap-2">
                  <ChevronRight size={12} className="text-accent-dark" />
                  Fully customizable files & links
                </li>
                <li className="text-[11px] font-bold text-[#475569] flex items-center gap-2">
                  <ChevronRight size={12} className="text-accent-dark" />
                  SEO optimized category frameworks
                </li>
                <li className="text-[11px] font-bold text-[#475569] flex items-center gap-2">
                  <ChevronRight size={12} className="text-accent-dark" />
                  Expert monetzation strategies
                </li>
              </ul>
            </div>

            {renderMarkdown(resource.longContent || `# ${resource.title}\n\n${resource.description}\n\nThank you for choosing DigitalLife. Click the download button on the right to claim your template.`)}
          </article>

          {/* Sticky Sidebar Meta Box */}
          <aside className="lg:col-span-4 lg:sticky lg:top-8 h-fit">
            <div className="bg-[#0F172A] text-white rounded-3xl p-8 border border-white/5 shadow-2xl relative overflow-hidden flex flex-col">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-2xl pointer-events-none" />
              
              <h3 className="text-lg font-bold mb-6 font-display border-b border-white/5 pb-4">Resource Specifications</h3>
              
              <div className="space-y-4 mb-8 text-xs border-b border-white/5 pb-6">
                <div className="flex justify-between items-center">
                  <span className="text-white/40">Topic Group</span>
                  <span className="font-semibold text-white/90">{resource.topic}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/40">File Format</span>
                  <span className="font-semibold text-white/90">{resource.format}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/40">Access Cost</span>
                  <span className={`font-semibold px-2 py-0.5 rounded text-[10px] ${resource.contentType === "Free" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-amber-500/10 text-amber-400 border border-amber-500/20"}`}>
                    {resource.contentType}
                  </span>
                </div>
                {resource.infoLabel && (
                  <div className="flex justify-between items-center">
                    <span className="text-white/40">Page / File Length</span>
                    <span className="font-semibold text-white/90">{resource.infoLabel}</span>
                  </div>
                )}
              </div>

              {/* Checklist Benefits */}
              <div className="space-y-3 mb-8">
                <div className="flex gap-2.5 items-start">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-accent mt-0.5" />
                  <span className="text-[10px] text-slate-300 leading-snug font-medium">Instant secure access link sent immediately to your inbox.</span>
                </div>
                <div className="flex gap-2.5 items-start">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-accent mt-0.5" />
                  <span className="text-[10px] text-slate-300 leading-snug font-medium">No tech setup required. Compatible with Google Suite/Word/Excel.</span>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => triggerDownloadModal(resource)}
                  className="w-full py-4 bg-accent hover:bg-accent-dark text-primary font-bold rounded-xl text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-accent/15"
                >
                  <Download size={14} />
                  Download Resource
                </button>
                <span className="text-[9px] text-center text-white/30 block mt-2">Guaranteed 100% spam-free digital access</span>
              </div>
            </div>
          </aside>

        </div>
      </main>

      {/* Related Resources Footer Section */}
      {relatedResources.length > 0 && (
        <section className="border-t border-[#0F172A]/5 mt-24 pt-20">
          <div className="container-custom">
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
                <div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-[#475569]/80 block mb-1">Recommended Learning</span>
                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#0F172A] tracking-tight">Related Templates & Playbooks</h3>
                </div>
                <Link href="/resources" className="text-xs font-bold text-[#0F172A] hover:text-accent-dark flex items-center gap-1 group">
                  Browse Resource Library
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedResources.map((res) => (
                  <ResourceCard 
                    key={res.id} 
                    resource={res} 
                    onDownloadClick={triggerDownloadModal} 
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Download Gating Modal */}
      <DownloadModal
        resource={activeResource}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default ResourceDetailClient;
