"use client";

import React from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

interface ResourceFrameProps {
  format: "Ebook" | "Tool" | "Guide" | "Template" | "Webinar";
  title: string;
  coverUrl?: string;
  coverGradient?: string;
  tagLabel?: string;
}

const ResourceFrame = ({
  format,
  title,
  coverUrl,
  coverGradient = "from-[#0F172A] to-[#1E293B]",
  tagLabel,
}: ResourceFrameProps) => {
  // Common Tag badge
  const renderTag = () => {
    if (!tagLabel) return null;
    return (
      <span className="absolute top-3 right-3 z-10 bg-black/45 text-accent border border-white/10 text-[9px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full backdrop-blur-md">
        {tagLabel}
      </span>
    );
  };

  // 1. 3D BOOK FRAME (Ebook & Guide)
  if (format === "Ebook" || format === "Guide") {
    return (
      <div className="relative w-full h-52 flex items-center justify-center bg-[#FAF9F6] overflow-hidden pt-4 pb-4">
        {/* Shadow under the book */}
        <div className="absolute bottom-2 w-[70%] h-4 bg-black/15 blur-md rounded-full transform scale-x-95 z-0" />

        {/* 3D Book Container */}
        <motion.div
          className="relative w-36 h-44 z-10 cursor-pointer"
          style={{
            perspective: "1000px",
            transformStyle: "preserve-3d",
          }}
          whileHover={{
            rotateY: -15,
            rotateX: 6,
            z: 10,
          }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
        >
          {/* Spine Depth (Left side of book) */}
          <div
            className="absolute left-0 top-0 w-3.5 h-full origin-left bg-black/40 z-20 border-r border-black/20"
            style={{
              transform: "rotateY(-90deg) translateZ(0px)",
              backgroundImage: "linear-gradient(to right, rgba(0,0,0,0.5), rgba(255,255,255,0.15))",
            }}
          />

          {/* Page stack (Right side of book thickness) */}
          <div
            className="absolute right-0 top-0 w-3 h-[97%] bg-white border-y border-r border-slate-200 z-10 rounded-r shadow-inner"
            style={{
              transform: "rotateY(90deg) translateZ(144px)",
              backgroundImage: "repeating-linear-gradient(90deg, #f8fafc 0px, #f8fafc 1px, #e2e8f0 2px, #e2e8f0 3px)",
            }}
          />

          {/* Front Cover */}
          <div
            className="w-full h-full rounded-l-[4px] rounded-r-[6px] overflow-hidden shadow-2xl relative border-l border-white/20"
            style={{
              transformStyle: "preserve-3d",
              transform: "translateZ(1.5px)",
            }}
          >
            {coverUrl ? (
              <img
                src={coverUrl}
                alt={title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className={`w-full h-full bg-gradient-to-br ${coverGradient} p-4 flex flex-col justify-between`}>
                <div className="flex items-center gap-1 bg-white/10 backdrop-blur-md px-1.5 py-0.5 rounded border border-white/15 w-max">
                  <span className="text-[6px] font-black tracking-widest text-white">DIGITALIFE</span>
                </div>
                <div className="text-center font-display text-white font-extrabold text-xs leading-snug line-clamp-3 select-none">
                  {title}
                </div>
                <div className="text-[8px] font-bold text-white/50 uppercase tracking-wider mt-2 border-t border-white/10 pt-1.5 text-center">
                  {format}
                </div>
              </div>
            )}

            {/* Book Spine crease effect overlay */}
            <div className="absolute left-1.5 top-0 w-1.5 h-full bg-black/10 shadow-[inset_1px_0_1px_rgba(0,0,0,0.2),_1px_0_1px_rgba(255,255,255,0.1)] pointer-events-none" />
            {/* Front cover gloss overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/15 pointer-events-none" />
            {renderTag()}
          </div>
        </motion.div>
      </div>
    );
  }

  // 2. BROWSER FRAME (Template & Tool)
  if (format === "Template" || format === "Tool") {
    return (
      <div className="relative w-full h-44 bg-slate-50 border-b border-[#0F172A]/5 overflow-hidden flex flex-col group">
        {/* Browser Top Bar */}
        <div className="h-7 w-full bg-[#1E293B] flex items-center px-4 justify-between border-b border-[#0F172A]/10 shrink-0">
          {/* Window control buttons */}
          <div className="flex gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500 block shrink-0" />
            <span className="w-2 h-2 rounded-full bg-amber-500 block shrink-0" />
            <span className="w-2 h-2 rounded-full bg-emerald-500 block shrink-0" />
          </div>
          {/* URL Bar */}
          <div className="w-[60%] h-4 bg-white/10 rounded-md border border-white/5 flex items-center justify-center text-[8px] text-white/40 font-medium tracking-wide">
            digitallife.ehub/{format.toLowerCase()}
          </div>
          {/* Placeholder for menu */}
          <div className="w-4" />
        </div>

        {/* Browser Body */}
        <div className="flex-1 relative overflow-hidden bg-slate-100">
          {coverUrl ? (
            <motion.img
              src={coverUrl}
              alt={title}
              className="w-full h-full object-cover object-top"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${coverGradient} p-5 flex flex-col justify-between items-center text-center`}>
              <div className="w-full flex justify-between items-center text-white/50 text-[7px] font-black tracking-widest uppercase">
                <span>DIGITALIFE EHUB</span>
                <span>{format}</span>
              </div>
              <div className="font-display text-white font-extrabold text-sm max-w-[85%] leading-snug line-clamp-2 select-none">
                {title}
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="w-2/3 h-full bg-accent" />
              </div>
            </div>
          )}
          {renderTag()}
        </div>
      </div>
    );
  }

  // 3. VIDEO FRAME (Webinar / Video resource)
  return (
    <div className="relative w-full h-44 bg-black overflow-hidden group flex items-center justify-center">
      {/* Background Cover */}
      {coverUrl ? (
        <motion.img
          src={coverUrl}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover filter brightness-[0.7] group-hover:scale-105 transition-all duration-500"
        />
      ) : (
        <div className={`absolute inset-0 bg-gradient-to-br ${coverGradient} filter brightness-[0.8] p-5 flex flex-col justify-between`}>
          <div className="flex items-center gap-1 bg-white/10 backdrop-blur-md px-2 py-0.5 rounded border border-white/15 w-max">
            <span className="text-[7px] font-black tracking-widest text-white">WEBINAR</span>
          </div>
          <div className="text-center font-display text-white font-extrabold text-sm px-4 drop-shadow-sm select-none leading-snug line-clamp-2">
            {title}
          </div>
          <div className="w-12 h-1 bg-accent rounded" />
        </div>
      )}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition-colors duration-300" />

      {/* Play Button Overlay */}
      <motion.div
        className="relative z-10 w-14 h-14 rounded-full bg-accent text-primary flex items-center justify-center shadow-lg cursor-pointer"
        whileHover={{ scale: 1.1, backgroundColor: "#fff" }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Play className="w-6 h-6 fill-primary text-primary ml-1" />
      </motion.div>

      {/* Bottom video duration / details tag */}
      <div className="absolute bottom-3 left-3 bg-black/60 px-2 py-0.5 rounded text-[8px] font-bold text-white tracking-widest uppercase">
        VIDEO RESOURCE
      </div>

      {renderTag()}
    </div>
  );
};

export default ResourceFrame;
