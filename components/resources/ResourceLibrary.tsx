"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, ArrowRight, ArrowDownToLine, Users, Check, BookOpen, AlertCircle } from "lucide-react";
import { RESOURCES_DATA, EXPERTS_DATA, TOPICS, CONTENT_TYPES, FORMATS, Resource } from "./resourcesData";
import DownloadModal from "./DownloadModal";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import ResourceCard from "./ResourceCard";

const LATEST_REPORT: Resource = {
  id: 'msme-growth-report-2026',
  title: 'DigitalLife MSME Growth & Operations Report 2026',
  description: 'An in-depth study highlighting key trends, operational challenges, scaling pathways, and technology adoption rates among 500+ small and medium enterprises in 2026.',
  topic: 'Leadership',
  format: 'Ebook',
  contentType: 'Free',
  downloadUrl: '#',
  infoLabel: '32 Pages',
  coverGradient: 'from-[#0F172A] via-[#1E293B] to-[#FEDB54]',
  tagLabel: 'Ebook'
};

const ResourceLibrary = () => {
  // Section 2: Featured Resources tab state
  const [featuredTopic, setFeaturedTopic] = useState<typeof TOPICS[number]>('Marketing');

  // Section 4: Browse All filters state
  const [browseTopic, setBrowseTopic] = useState<string>('All Topics');
  const [browseType, setBrowseType] = useState<string>('All Content Types');
  const [browseFormat, setBrowseFormat] = useState<string>('All Formats');
  const [searchQuery, setSearchQuery] = useState("");

  // Dropdown open states
  const [topicDropdownOpen, setTopicDropdownOpen] = useState(false);
  const [typeDropdownOpen, setTypeDropdownOpen] = useState(false);
  const [formatDropdownOpen, setFormatDropdownOpen] = useState(false);

  // Modal states
  const [activeResource, setActiveResource] = useState<Resource | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const browseRef = useRef<HTMLDivElement>(null);

  // Live resources state
  const [resourcesList, setResourcesList] = useState<Resource[]>(RESOURCES_DATA);

  useEffect(() => {
    const fetchLiveResources = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "resources"));
        if (!querySnapshot.empty) {
          const liveItems: Resource[] = [];
          querySnapshot.forEach((docSnap) => {
            liveItems.push({ id: docSnap.id, ...docSnap.data() } as Resource);
          });
          liveItems.sort((a: any, b: any) => (b.createdAt || 0) - (a.createdAt || 0));
          setResourcesList(liveItems);
        }
      } catch (err) {
        console.warn("Could not load resources from database, using static fallback:", err);
      }
    };
    fetchLiveResources();
  }, []);

  // Filter for Section 2 (Featured Resources) - 3 cards max
  const featuredResources = useMemo(() => {
    return resourcesList.filter(
      (r) => r.featured && r.topic === featuredTopic
    ).slice(0, 3);
  }, [resourcesList, featuredTopic]);

  // Filter for Section 4 (Browse All Resources)
  const browseResources = useMemo(() => {
    return resourcesList.filter((r) => {
      const matchesTopic = browseTopic === 'All Topics' || r.topic === browseTopic;
      const matchesType = browseType === 'All Content Types' || r.contentType === browseType;
      const matchesFormat = browseFormat === 'All Formats' || r.format === browseFormat;
      const matchesSearch =
        r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.format.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesTopic && matchesType && matchesFormat && matchesSearch;
    });
  }, [resourcesList, browseTopic, browseType, browseFormat, searchQuery]);

  const handleDownloadClick = (resource: Resource) => {
    setActiveResource(resource);
    setIsModalOpen(true);
  };

  const handleReportClick = () => {
    setActiveResource(LATEST_REPORT);
    setIsModalOpen(true);
  };

  const scrollToBrowse = () => {
    browseRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = () => {
      setTopicDropdownOpen(false);
      setTypeDropdownOpen(false);
      setFormatDropdownOpen(false);
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="bg-[#FAF9F6] text-[#0F172A] font-sans overflow-x-hidden min-h-screen">
      
      {/* SECTION 1: HERO HEADER */}
      <section className="relative bg-[#0F172A] pt-32 md:pt-44 pb-24 md:pb-36 overflow-hidden">
        {/* Organic Sage-Teal swoosh background on the right */}
        <div 
          className="absolute top-0 right-0 h-full w-[45%] bg-[#CCDCD2] rounded-bl-[350px] md:rounded-bl-[450px] z-0 hidden md:block" 
          aria-hidden="true"
        />
        
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[32px_32px] pointer-events-none" />

        <div className="container-custom relative z-10">
          <div className="max-w-3xl md:max-w-2xl lg:max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold text-white mb-6 tracking-tight leading-[1.1]">
                Resource Library
              </h1>
              
              <p className="text-sm sm:text-base md:text-lg text-text-on-dark-muted mb-10 leading-relaxed font-medium max-w-xl">
                Browse ebooks, tools, guides, templates, webinars and more - all designed to help you grow your business. Filter by topic or format to find exactly what you need.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto sm:items-center">
                <button
                  onClick={scrollToBrowse}
                  className="w-full sm:w-auto px-8 py-4 bg-accent hover:bg-accent-dark text-primary font-bold rounded-xl text-xs uppercase tracking-widest transition-all active:scale-[0.98] shadow-lg shadow-accent/20"
                >
                  Explore All Resources
                </button>
                
                <button
                  onClick={handleReportClick}
                  className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-white text-white hover:bg-white/5 font-bold rounded-xl text-xs uppercase tracking-widest transition-all active:scale-[0.98]"
                >
                  Our Latest Report
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* SECTION 2: FEATURED RESOURCES */}
      <section className="py-20 md:py-28 bg-[#FAF9F6]">
        <div className="container-custom">
          {/* Centered Heading */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold text-[#0F172A] tracking-tight mb-4">
              Featured Resources
            </h2>
            <div className="w-12 h-1 bg-[#0F172A] mx-auto rounded-full" />
          </div>

          {/* Topic Selector Tabs (Underline link style) */}
          <div className="flex justify-start md:justify-center border-b border-[#0F172A]/10 mb-12 max-w-4xl mx-auto overflow-x-auto scrollbar-none pb-px px-4">
            <div className="flex gap-8 md:gap-12 whitespace-nowrap">
              {TOPICS.map((topic) => (
                <button
                  key={topic}
                  onClick={() => setFeaturedTopic(topic)}
                  className={`relative pb-4 text-xs md:text-sm font-bold uppercase tracking-widest transition-colors ${
                    featuredTopic === topic 
                      ? "text-primary" 
                      : "text-text-secondary/60 hover:text-primary"
                  }`}
                >
                  {topic}
                  {featuredTopic === topic && (
                    <motion.div 
                      layoutId="activeFeaturedTab"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent-dark"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatePresence mode="wait">
              {featuredResources.map((resource) => (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                >
                  <ResourceCard resource={resource} onDownloadClick={handleDownloadClick} />
                </motion.div>
              ))}
            </AnimatePresence>

            {featuredResources.length === 0 && (
              <div className="col-span-3 py-12 text-center text-[#475569]/60">
                No featured resources available for this category yet.
              </div>
            )}
          </div>
        </div>
      </section>


      {/* SECTION 3: EXPERT PLAYBOOKS */}
      <section className="py-20 md:py-28 bg-white border-y border-[#0F172A]/5">
        <div className="container-custom">
          {/* Centered Heading */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold text-[#0F172A] tracking-tight mb-4">
              Expert Playbooks
            </h2>
            <div className="w-12 h-1 bg-[#0F172A] mx-auto rounded-full" />
          </div>

          {/* Experts 3-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {EXPERTS_DATA.map((expert) => (
              <div 
                key={expert.id}
                className="bg-[#F9F7F1] rounded-3xl p-8 flex flex-col justify-between border border-[#0F172A]/5 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div>
                  {/* Bio Info header */}
                  <div className="flex gap-4 items-center mb-6">
                    <img 
                      src={expert.avatarUrl} 
                      alt={expert.name}
                      className="w-14 h-14 rounded-full object-cover border border-black/5" 
                    />
                    <div>
                      <h4 className="text-base font-bold text-primary">{expert.name}</h4>
                      <p className="text-xs text-text-secondary/70 font-medium">{expert.title}</p>
                    </div>
                  </div>

                  {/* Bio Description */}
                  <p className="text-xs text-text-secondary leading-relaxed mb-8">
                    {expert.bio}
                  </p>
                </div>

                {/* Bottom link */}
                <button
                  onClick={() => handleDownloadClick({
                    id: expert.id,
                    title: expert.playbookTitle,
                    description: `An exclusive expert playbook on ${expert.title} curated by ${expert.name}.`,
                    topic: 'Leadership',
                    format: 'Guide',
                    contentType: 'Free',
                    downloadUrl: '#',
                    infoLabel: 'Playbook',
                    coverGradient: 'from-[#FAF9F6] to-[#F9F7F1]'
                  })}
                  className="flex items-center gap-2 text-xs font-bold text-primary hover:text-accent-dark transition-colors group text-left pt-4 border-t border-primary/5"
                >
                  <span className="flex-1 leading-snug">{expert.playbookTitle}</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform shrink-0" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* SECTION 4: BROWSE ALL RESOURCES */}
      <section ref={browseRef} className="py-20 md:py-28 bg-[#FAF9F6] scroll-mt-12">
        <div className="container-custom">
          {/* Centered Heading & Subtitle */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-semibold text-[#0F172A] tracking-tight mb-2">
              Browse all resources
            </h2>
            <p className="text-xs sm:text-sm text-[#475569]/80 uppercase tracking-widest font-bold">
              700+ Free Resources from DigitalLife | Templates, Ebooks, & More
            </p>
          </div>

          {/* 4-Column Filtering Toolbar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10 z-30 relative">
            {/* Topic Dropdown */}
            <div className="relative">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#475569]/60 mb-2 px-1">
                All Topics
              </label>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setTopicDropdownOpen(!topicDropdownOpen);
                  setTypeDropdownOpen(false);
                  setFormatDropdownOpen(false);
                }}
                className="w-full flex items-center justify-between px-5 py-4 bg-white border border-[#0F172A]/8 hover:border-[#0F172A]/15 rounded-xl text-xs font-bold text-[#0F172A] shadow-sm transition-all focus:outline-none"
              >
                <span>{browseTopic}</span>
                <ChevronDown size={14} className={`text-[#475569]/80 transition-transform ${topicDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              
              <AnimatePresence>
                {topicDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute left-0 right-0 mt-2 bg-white border border-[#0F172A]/10 rounded-2xl shadow-xl overflow-hidden z-40 max-h-60 overflow-y-auto"
                  >
                    <button
                      onClick={() => setBrowseTopic('All Topics')}
                      className="w-full px-5 py-3.5 text-left text-xs font-semibold hover:bg-slate-50 border-b border-slate-100 flex justify-between items-center"
                    >
                      <span>- All Topics -</span>
                      {browseTopic === 'All Topics' && <Check size={12} className="text-accent-dark" />}
                    </button>
                    {TOPICS.map((topic) => (
                      <button
                        key={topic}
                        onClick={() => setBrowseTopic(topic)}
                        className="w-full px-5 py-3.5 text-left text-xs font-semibold hover:bg-slate-50 border-b border-slate-100 last:border-0 flex justify-between items-center"
                      >
                        <span>{topic}</span>
                        {browseTopic === topic && <Check size={12} className="text-accent-dark" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Content Type Dropdown */}
            <div className="relative">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#475569]/60 mb-2 px-1">
                All Content Types
              </label>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setTypeDropdownOpen(!typeDropdownOpen);
                  setTopicDropdownOpen(false);
                  setFormatDropdownOpen(false);
                }}
                className="w-full flex items-center justify-between px-5 py-4 bg-white border border-[#0F172A]/8 hover:border-[#0F172A]/15 rounded-xl text-xs font-bold text-[#0F172A] shadow-sm transition-all focus:outline-none"
              >
                <span>{browseType}</span>
                <ChevronDown size={14} className={`text-[#475569]/80 transition-transform ${typeDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {typeDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute left-0 right-0 mt-2 bg-white border border-[#0F172A]/10 rounded-2xl shadow-xl overflow-hidden z-40"
                  >
                    <button
                      onClick={() => setBrowseType('All Content Types')}
                      className="w-full px-5 py-3.5 text-left text-xs font-semibold hover:bg-slate-50 border-b border-slate-100 flex justify-between items-center"
                    >
                      <span>- All Content Types -</span>
                      {browseType === 'All Content Types' && <Check size={12} className="text-accent-dark" />}
                    </button>
                    {CONTENT_TYPES.map((type) => (
                      <button
                        key={type}
                        onClick={() => setBrowseType(type)}
                        className="w-full px-5 py-3.5 text-left text-xs font-semibold hover:bg-slate-50 border-b border-slate-100 last:border-0 flex justify-between items-center"
                      >
                        <span>{type} Resources</span>
                        {browseType === type && <Check size={12} className="text-accent-dark" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Format Dropdown */}
            <div className="relative">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#475569]/60 mb-2 px-1">
                All Formats
              </label>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setFormatDropdownOpen(!formatDropdownOpen);
                  setTopicDropdownOpen(false);
                  setTypeDropdownOpen(false);
                }}
                className="w-full flex items-center justify-between px-5 py-4 bg-white border border-[#0F172A]/8 hover:border-[#0F172A]/15 rounded-xl text-xs font-bold text-[#0F172A] shadow-sm transition-all focus:outline-none"
              >
                <span>{browseFormat}</span>
                <ChevronDown size={14} className={`text-[#475569]/80 transition-transform ${formatDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {formatDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="absolute left-0 right-0 mt-2 bg-white border border-[#0F172A]/10 rounded-2xl shadow-xl overflow-hidden z-40 max-h-60 overflow-y-auto"
                  >
                    <button
                      onClick={() => setBrowseFormat('All Formats')}
                      className="w-full px-5 py-3.5 text-left text-xs font-semibold hover:bg-slate-50 border-b border-slate-100 flex justify-between items-center"
                    >
                      <span>- All Formats -</span>
                      {browseFormat === 'All Formats' && <Check size={12} className="text-accent-dark" />}
                    </button>
                    {FORMATS.map((format) => (
                      <button
                        key={format}
                        onClick={() => setBrowseFormat(format)}
                        className="w-full px-5 py-3.5 text-left text-xs font-semibold hover:bg-slate-50 border-b border-slate-100 last:border-0 flex justify-between items-center"
                      >
                        <span>{format}</span>
                        {browseFormat === format && <Check size={12} className="text-accent-dark" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Search Input */}
            <div>
              <label htmlFor="search-input" className="block text-[10px] font-bold uppercase tracking-wider text-[#475569]/60 mb-2 px-1">
                Search all resources
              </label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#475569]/60 w-4 h-4" />
                <input
                  id="search-input"
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-4 bg-white border border-primary/8 hover:border-primary/15 rounded-xl text-xs font-bold text-primary focus:outline-none focus:border-accent-dark/40 focus:ring-1 focus:ring-accent-dark/10 shadow-sm transition-all"
                />
              </div>
            </div>
          </div>

          {/* Results count label */}
          <div className="flex justify-between items-center mb-8 px-2 border-t border-[#0F172A]/5 pt-6">
            <span className="text-xs font-bold text-[#475569]/60 uppercase tracking-widest">
              Showing 1 - {browseResources.length} of {resourcesList.length}
            </span>
          </div>

          {/* Cards Grid */}
          <motion.div 
            layout 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {browseResources.map((resource) => (
                <motion.div
                  key={resource.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <ResourceCard resource={resource} onDownloadClick={handleDownloadClick} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty state view */}
          {browseResources.length === 0 && (
            <div className="py-20 text-center bg-white border border-[#0F172A]/5 rounded-3xl p-8 max-w-lg mx-auto shadow-sm">
              <AlertCircle className="w-12 h-12 text-[#475569]/40 mx-auto mb-4 animate-pulse" />
              <h3 className="text-xl font-bold text-[#0F172A] mb-2 font-display">
                No Resources Found
              </h3>
              <p className="text-sm text-[#475569] mb-6 leading-relaxed">
                We couldn't find any resources matching your search or dropdown criteria. Try resetting the filters to explore everything.
              </p>
              <button
                onClick={() => {
                  setBrowseTopic('All Topics');
                  setBrowseType('All Content Types');
                  setBrowseFormat('All Formats');
                  setSearchQuery("");
                }}
                className="px-6 py-3 bg-[#0F172A] hover:bg-[#020617] text-white font-bold rounded-xl text-xs uppercase tracking-widest transition-all"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </section>


      {/* SECTION 5: CTA FOOTER BLOCK */}
      <section className="bg-[#0F172A] py-20 overflow-hidden relative border-t border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left side Image with offset Gold geometry block */}
            <div className="lg:col-span-5 flex justify-center lg:justify-start order-2 lg:order-1">
              <div className="relative w-64 h-64 sm:w-72 sm:h-72">
                {/* Backing Gold shape */}
                <div className="absolute -inset-2 bg-gradient-to-tr from-[#FEDB54] to-[#EAB308] rounded-3xl transform rotate-6 scale-95 opacity-90" />
                {/* Image panel */}
                <div className="absolute inset-0 rounded-3xl overflow-hidden border border-white/10 bg-[#1E293B] shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&h=400&q=80" 
                    alt="Business Development Consultation"
                    className="w-full h-full object-cover filter brightness-95" 
                  />
                </div>
              </div>
            </div>

            {/* Right side CTA text content */}
            <div className="lg:col-span-7 text-center lg:text-left order-1 lg:order-2 flex flex-col items-center lg:items-start">
              <span className="inline-block text-[10px] font-black uppercase tracking-widest text-[#FEDB54] mb-3">
                DigitalLife Growth Advisory
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-6 leading-tight max-w-xl">
                Get your free operational audit today
              </h2>
              <p className="text-sm md:text-base text-[#94A3B8] mb-8 leading-relaxed max-w-xl">
                Found the resources you need? Take the next step. Let’s identify bottlenecks in your workflow, structure your roles, and set up automated marketing assets tailored specifically for your business size.
              </p>
              
              <button
                onClick={handleReportClick}
                className="w-full sm:w-auto px-8 py-4 bg-accent hover:bg-accent-dark text-primary font-bold rounded-xl text-xs uppercase tracking-widest transition-all active:scale-[0.98] shadow-lg shadow-accent/20"
              >
                Get Free Audit
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Lead gating modal */}
      <DownloadModal
        resource={activeResource}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setActiveResource(null);
        }}
      />

    </div>
  );
};

export default ResourceLibrary;
