"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Loader2, CheckCircle2, FileText, LayoutTemplate, Video, ShieldCheck, Wrench } from "lucide-react";
import { Resource } from "./resourcesData";

interface DownloadModalProps {
  resource: Resource | null;
  isOpen: boolean;
  onClose: () => void;
}

const DownloadModal = ({ resource, isOpen, onClose }: DownloadModalProps) => {
  const [formData, setFormData] = useState({ name: "", email: "", businessName: "" });
  const [step, setStep] = useState<"form" | "loading" | "success">("form");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setFormData({ name: "", email: "", businessName: "" });
      setStep("form");
      setProgress(0);
    }
  }, [isOpen]);

  useEffect(() => {
    if (step === "loading") {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setStep("success"), 500);
            return 100;
          }
          return prev + 10;
        });
      }, 150);
      return () => clearInterval(interval);
    }
  }, [step]);

  if (!resource) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.businessName) return;
    setStep("loading");
  };

  const getFormatIcon = (format: Resource["format"]) => {
    switch (format) {
      case "Ebook":
      case "Guide":
        return <FileText className="w-12 h-12 text-accent" />;
      case "Template":
        return <LayoutTemplate className="w-12 h-12 text-accent" />;
      case "Webinar":
        return <Video className="w-12 h-12 text-accent" />;
      case "Tool":
      default:
        return <Wrench className="w-12 h-12 text-accent" />;
    }
  };

  // Generate a dynamic mock file content to actually download
  const generateMockDownloadLink = () => {
    const fileContent = `--- DIGITALIFE EHUB PREMIUM RESOURCE ---
Title: ${resource.title}
Format: ${resource.format}
Topic: ${resource.topic}

Thank you for downloading our resource, ${formData.name}!
Prepared for: ${formData.businessName} (${formData.email})

Summary:
${resource.description}

To schedule a growth clarity call, visit: https://selar.com/71g17u467o
Or reach us on WhatsApp: https://wa.me/2349083731989

Build People. Brands. Purpose.
DigitalLife Ehub Team.
`;
    const encodedUri = encodeURIComponent(fileContent);
    return `data:text/plain;charset=utf-8,${encodedUri}`;
  };

  const getDownloadFileName = () => {
    return `${resource.id}-digitalife-ehub.txt`;
  };

  const getYouTubeId = (url?: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const youtubeId = getYouTubeId(resource.youtubeUrl);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0F172A]/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className={`relative w-full ${step === "success" && youtubeId ? "max-w-3xl" : "max-w-lg"} bg-[#1E293B] border border-white/10 rounded-3xl overflow-y-auto max-h-[90vh] md:max-h-[95vh] shadow-2xl z-10 transition-all duration-500`}
          >
            {/* Header / Info bar */}
            <div className="absolute top-4 right-4 z-20">
              <button
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 text-white/60 hover:text-white hover:bg-white/10 active:scale-95 transition-all"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content Area */}
            <div className="p-8 sm:p-10">
              {step === "form" && (
                <div>
                  <div className="flex gap-4 items-start mb-6">
                    <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
                      {getFormatIcon(resource.format)}
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-accent mb-1 block">
                        {resource.format} • {resource.topic}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-display font-bold text-white leading-tight">
                        Unlock {resource.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-sm text-[#94A3B8] mb-8 leading-relaxed">
                    Fill out the form below to receive instant access to this resource. We'll use this information to customize your experience.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-[#94A3B8] mb-2">
                        Your Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. John Doe"
                        className="w-full px-5 py-4 bg-white/5 border border-white/10 text-white placeholder-white/20 rounded-xl text-sm focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/20 transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-[#94A3B8] mb-2">
                        Work Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. john@business.com"
                        className="w-full px-5 py-4 bg-white/5 border border-white/10 text-white placeholder-white/20 rounded-xl text-sm focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/20 transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="businessName" className="block text-xs font-bold uppercase tracking-wider text-[#94A3B8] mb-2">
                        Business / Company Name
                      </label>
                      <input
                        type="text"
                        id="businessName"
                        required
                        value={formData.businessName}
                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                        placeholder="e.g. Acme Agency"
                        className="w-full px-5 py-4 bg-white/5 border border-white/10 text-white placeholder-white/20 rounded-xl text-sm focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/20 transition-all"
                      />
                    </div>

                    <div className="pt-2 flex items-center gap-2 text-xs text-[#94A3B8]">
                      <ShieldCheck size={16} className="text-accent" />
                      <span>We respect your privacy. No spam, ever.</span>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 mt-2 bg-accent text-[#0F172A] hover:bg-accent/90 rounded-xl font-bold uppercase tracking-widest text-xs transition-all active:scale-[0.98] shadow-lg shadow-accent/15"
                    >
                      Instant Access
                    </button>
                  </form>
                </div>
              )}

              {step === "loading" && (
                <div className="py-12 flex flex-col items-center justify-center text-center">
                  <Loader2 className="w-12 h-12 text-accent animate-spin mb-6" />
                  <h3 className="text-xl font-display font-bold text-white mb-2">
                    Generating Your Resource
                  </h3>
                  <p className="text-sm text-[#94A3B8] mb-6 max-w-xs">
                    Please wait while we personalize your download package...
                  </p>
                  
                  {/* Progress bar container */}
                  <div className="w-full max-w-xs bg-white/5 h-2.5 rounded-full overflow-hidden border border-white/5">
                    <motion.div 
                      className="bg-accent h-full rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ ease: "linear" }}
                    />
                  </div>
                  <span className="text-xs font-bold text-accent mt-3">{progress}%</span>
                </div>
              )}

              {step === "success" && (
                <div className="py-4 text-center flex flex-col items-center">
                  {youtubeId ? (
                    // Widescreen Video Embed Player for Video/Webinar Resource
                    <div className="w-full">
                      <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mb-4 mx-auto">
                        <CheckCircle2 className="w-6 h-6 text-accent" />
                      </div>
                      
                      <h3 className="text-xl font-display font-bold text-white mb-1">
                        Enjoy the Video Resource!
                      </h3>
                      <p className="text-xs text-[#94A3B8] mb-6 max-w-md mx-auto">
                        Thank you, <span className="text-white font-bold">{formData.name}</span>. You now have full access to <span className="italic text-white">"{resource.title}"</span>.
                      </p>

                      <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl bg-black border border-white/10 mb-6">
                        <iframe
                          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
                          title={resource.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full"
                        ></iframe>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                        {resource.downloadUrl && resource.downloadUrl !== "#" && (
                          <a
                            href={resource.downloadUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="flex-1 py-3.5 bg-accent hover:bg-accent/90 text-[#0F172A] font-bold rounded-xl text-xs uppercase tracking-widest transition-all active:scale-[0.98] shadow-lg shadow-accent/15 flex items-center justify-center gap-1.5"
                          >
                            <Download size={14} />
                            Download Slides / Material
                          </a>
                        )}
                        <button
                          onClick={onClose}
                          className="w-full sm:w-auto px-6 py-3.5 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold rounded-xl text-xs uppercase tracking-widest transition-all"
                        >
                          Finish
                        </button>
                      </div>
                    </div>
                  ) : (
                    // Standard File Download success
                    <>
                      <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mb-6">
                        <CheckCircle2 className="w-8 h-8 text-accent" />
                      </div>

                      <h3 className="text-2xl font-display font-bold text-white mb-2">
                        Ready to Download!
                      </h3>
                      <p className="text-sm text-[#94A3B8] mb-8 max-w-sm">
                        Thank you, <span className="text-white font-bold">{formData.name}</span>. Your personalized file for <span className="italic text-white">"{resource.title}"</span> is ready.
                      </p>

                      <div className="flex flex-col w-full gap-3">
                        <a
                          href={generateMockDownloadLink()}
                          download={getDownloadFileName()}
                          onClick={onClose}
                          className="w-full py-4 flex items-center justify-center gap-2 bg-accent text-[#0F172A] hover:bg-accent/90 rounded-xl font-bold uppercase tracking-widest text-xs transition-all active:scale-[0.98] shadow-lg shadow-accent/15"
                        >
                          <Download size={16} />
                          Download {resource.format}
                        </a>
                        
                        <button
                          onClick={onClose}
                          className="w-full py-3 text-xs text-[#94A3B8] hover:text-white transition-colors"
                        >
                          Close Window
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DownloadModal;

