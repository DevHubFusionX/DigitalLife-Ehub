"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Download, FileText, ArrowRight, CheckCircle } from "lucide-react";
import { Resource } from "./resourcesData";
import DownloadModal from "./DownloadModal";

interface ResourceDetailClientProps {
  resource: Resource;
}

const ResourceDetailClient = ({ resource }: ResourceDetailClientProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Simple custom renderer to convert basic Markdown to beautiful HTML elements
  const renderMarkdown = (content?: string) => {
    if (!content) return <p className="text-slate-600">No article available.</p>;

    const lines = content.split("\n");
    return lines.map((line, idx) => {
      const trimmed = line.trim();

      if (trimmed.startsWith("# ")) {
        return (
          <h1 key={idx} className="text-3xl md:text-4xl font-display font-bold text-slate-900 mt-8 mb-4">
            {trimmed.substring(2)}
          </h1>
        );
      }
      if (trimmed.startsWith("## ")) {
        return (
          <h2 key={idx} className="text-2xl md:text-3xl font-display font-semibold text-slate-900 mt-8 mb-4 border-b border-slate-100 pb-2">
            {trimmed.substring(3)}
          </h2>
        );
      }
      if (trimmed.startsWith("### ")) {
        return (
          <h3 key={idx} className="text-xl md:text-2xl font-display font-medium text-slate-800 mt-6 mb-3">
            {trimmed.substring(4)}
          </h3>
        );
      }
      if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        return (
          <li key={idx} className="text-sm md:text-base text-slate-600 ml-6 list-disc mb-2 leading-relaxed">
            {trimmed.substring(2)}
          </li>
        );
      }
      if (trimmed.startsWith("1. ") || trimmed.startsWith("2. ") || trimmed.startsWith("3. ") || trimmed.startsWith("4. ")) {
        return (
          <li key={idx} className="text-sm md:text-base text-slate-600 ml-6 list-decimal mb-2 leading-relaxed">
            {trimmed.substring(3)}
          </li>
        );
      }
      if (trimmed.startsWith("**Free Download:**") || trimmed.startsWith("**Download:**")) {
        return (
          <div key={idx} className="my-8 p-6 bg-accent/10 border-l-4 border-accent-dark rounded-r-2xl text-slate-800 text-sm md:text-base font-semibold flex items-center justify-between gap-4">
            <span>{trimmed}</span>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-5 py-2.5 bg-accent hover:bg-accent-dark text-primary font-bold rounded-xl text-xs uppercase tracking-widest transition-all shrink-0 shadow-sm"
            >
              Get Template
            </button>
          </div>
        );
      }
      if (trimmed === "") {
        return <div key={idx} className="h-4" />;
      }

      // Format bold text inline
      const boldRegex = /\*\*(.*?)\*\*/g;
      if (boldRegex.test(trimmed)) {
        const parts = trimmed.split(boldRegex);
        return (
          <p key={idx} className="text-sm md:text-base text-slate-600 mb-4 leading-relaxed">
            {parts.map((part, i) => (i % 2 === 1 ? <strong key={i} className="text-slate-900 font-bold">{part}</strong> : part))}
          </p>
        );
      }

      return (
        <p key={idx} className="text-sm md:text-base text-slate-600 mb-4 leading-relaxed">
          {trimmed}
        </p>
      );
    });
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen text-slate-800 font-sans pb-20">
      {/* Top Banner Navigation */}
      <div className="bg-slate-900 text-white/70 text-xs py-3 border-b border-white/5">
        <div className="container-custom flex items-center justify-between">
          <Link href="/resources" className="flex items-center gap-2 hover:text-white transition-colors">
            <ArrowLeft size={14} />
            Back to Resource Library
          </Link>
          <span className="hidden sm:inline font-medium text-accent">DigitalLife Growth Resources</span>
        </div>
      </div>

      {/* Hero Cover Area */}
      <section className="relative overflow-hidden bg-slate-900 py-16 md:py-24 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[32px_32px] pointer-events-none" />
        
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Title / Description */}
            <div className="lg:col-span-8">
              <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-accent mb-3 px-2.5 py-1 bg-white/5 rounded-full border border-white/10">
                {resource.topic} • {resource.format}
              </span>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6">
                {resource.title}
              </h1>
              
              <p className="text-sm sm:text-base md:text-lg text-slate-400 leading-relaxed font-medium">
                {resource.description}
              </p>
            </div>

            {/* Gradient Mockup Preview Cover */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative w-48 h-64 sm:w-56 sm:h-72 rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex-shrink-0 group">
                <div className={`absolute inset-0 bg-gradient-to-br ${resource.coverGradient} p-6 flex flex-col justify-between`} />
                <div className="absolute inset-0 bg-black/10" />
                <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                  <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center backdrop-blur-md">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="text-[9px] uppercase font-bold tracking-widest text-white/60 mb-1 block">
                      {resource.format}
                    </span>
                    <h3 className="text-sm font-bold text-white leading-snug line-clamp-3">
                      {resource.title}
                    </h3>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Layout Grid */}
      <main className="container-custom mt-12">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Article / Guide content */}
          <article className="lg:col-span-8 bg-white rounded-3xl p-8 md:p-12 border border-[#0F172A]/5 shadow-sm">
            {renderMarkdown(resource.longContent || `# ${resource.title}\n\n${resource.description}\n\nThank you for choosing DigitalLife. Click the download button on the right to claim your template.`)}
          </article>

          {/* Sticky Sidebar Meta Box */}
          <aside className="lg:col-span-4 lg:sticky lg:top-8 h-fit">
            <div className="bg-slate-900 text-white rounded-3xl p-8 border border-white/5 shadow-lg flex flex-col">
              <h3 className="text-lg font-bold mb-6 font-display">Resource Details</h3>
              
              <div className="space-y-4 mb-8 text-xs border-b border-white/5 pb-6">
                <div className="flex justify-between items-center">
                  <span className="text-white/40">Topic</span>
                  <span className="font-semibold text-white/90">{resource.topic}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/40">Format</span>
                  <span className="font-semibold text-white/90">{resource.format}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/40">Cost</span>
                  <span className="font-semibold text-accent uppercase tracking-wider">{resource.contentType}</span>
                </div>
                {resource.infoLabel && (
                  <div className="flex justify-between items-center">
                    <span className="text-white/40">File Type</span>
                    <span className="font-semibold text-white/90">{resource.infoLabel}</span>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full py-4 bg-accent hover:bg-accent-dark text-primary font-bold rounded-xl text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-md shadow-accent/15"
                >
                  <Download size={14} />
                  Download Now
                </button>
                
                <div className="flex gap-2 items-center justify-center text-[10px] text-white/40 mt-3">
                  <CheckCircle size={12} className="text-accent" />
                  <span>Personalized & Safe Download</span>
                </div>
              </div>
            </div>
          </aside>

        </div>
      </main>

      {/* Download Gating Modal */}
      <DownloadModal
        resource={resource}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default ResourceDetailClient;
