"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { X, Upload, Loader2 } from "lucide-react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Resource } from "@/components/resources/resourcesData";
import ResourceFrame from "@/components/resources/ResourceFrame";

interface ResourceCrudModalProps {
  isOpen: boolean;
  onClose: () => void;
  isEditing: boolean;
  selectedId: string;
  initialData: any;
  onSaveSuccess: () => void;
}

const ResourceCrudModal = ({
  isOpen,
  onClose,
  isEditing,
  selectedId,
  initialData,
  onSaveSuccess
}: ResourceCrudModalProps) => {
  // Form Fields state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [topic, setTopic] = useState("Marketing");
  const [format, setFormat] = useState("Ebook");
  const [contentType, setContentType] = useState("Free");
  const [infoLabel, setInfoLabel] = useState("");
  const [tagLabel, setTagLabel] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [featured, setFeatured] = useState(false);
  const [categorySlug, setCategorySlug] = useState("");
  const [longContent, setLongContent] = useState("");

  // Upload state
  const [uploadProgress, setUploadProgress] = useState(-1);
  const [uploadError, setUploadError] = useState("");
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync data when editing
  useEffect(() => {
    if (isOpen) {
      if (isEditing && initialData) {
        setTitle(initialData.title || "");
        setDescription(initialData.description || "");
        setTopic(initialData.topic || "Marketing");
        setFormat(initialData.format || "Ebook");
        setContentType(initialData.contentType || "Free");
        setInfoLabel(initialData.infoLabel || "");
        setTagLabel(initialData.tagLabel || "");
        setDownloadUrl(initialData.downloadUrl || "");
        setYoutubeUrl(initialData.youtubeUrl || "");
        setCoverUrl(initialData.coverUrl || "");
        setFeatured(initialData.featured || false);
        setCategorySlug(initialData.categorySlug || "");
        setLongContent(initialData.longContent || "");
      } else {
        // Reset
        setTitle("");
        setDescription("");
        setTopic("Marketing");
        setFormat("Ebook");
        setContentType("Free");
        setInfoLabel("");
        setTagLabel("");
        setDownloadUrl("");
        setYoutubeUrl("");
        setCoverUrl("");
        setFeatured(false);
        setCategorySlug("");
        setLongContent("");
      }
      setUploadProgress(-1);
      setUploadError("");
    }
  }, [isOpen, isEditing, initialData]);

  if (!isOpen) return null;

  // Handle Image File Upload to Cloudinary Unsigned API
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError("");
    setUploadProgress(0);

    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "dewxykz6v";
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "digitallife_covers";

    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    xhr.open("POST", `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, true);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const progress = Math.round((event.loaded / event.total) * 100);
        setUploadProgress(progress);
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        try {
          const response = JSON.parse(xhr.responseText);
          setCoverUrl(response.secure_url);
          setUploadProgress(-1);
        } catch (err) {
          setUploadError("Failed to parse Cloudinary response.");
          setUploadProgress(-1);
        }
      } else {
        try {
          const err = JSON.parse(xhr.responseText || "{}");
          setUploadError(err.error?.message || "Failed to upload image to Cloudinary.");
        } catch {
          setUploadError(`Failed to upload to Cloudinary (Status: ${xhr.status}).`);
        }
        setUploadProgress(-1);
      }
    };

    xhr.onerror = () => {
      setUploadError("Network error uploading to Cloudinary.");
      setUploadProgress(-1);
    };

    xhr.send(formData);
  };

  const getTopicGradient = (t: Resource["topic"]) => {
    switch (t) {
      case "Marketing": return "from-[#8B5CF6] via-[#6D28D9] to-[#4C1D95]";
      case "Sales": return "from-[#3B82F6] via-[#1D4ED8] to-[#1E3A8A]";
      case "Customer Success": return "from-[#10B981] via-[#047857] to-[#064E3B]";
      case "AI and Automation": return "from-[#F59E0B] via-[#D97706] to-[#78350F]";
      case "Leadership":
      default: return "from-[#475569] via-[#334155] to-[#0F172A]";
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !downloadUrl) {
      alert("Please fill out Title, Description, and Download URL!");
      return;
    }

    setSaving(true);
    const idSlug = isEditing 
      ? selectedId 
      : title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    const resourceData: any = {
      id: idSlug,
      title,
      description,
      topic,
      format,
      contentType,
      downloadUrl,
      coverGradient: getTopicGradient(topic),
      featured,
      createdAt: isEditing ? (initialData?.createdAt || Date.now()) : Date.now(),
    };

    if (infoLabel) resourceData.infoLabel = infoLabel;
    if (tagLabel) resourceData.tagLabel = tagLabel;
    if (youtubeUrl) resourceData.youtubeUrl = youtubeUrl;
    if (coverUrl) resourceData.coverUrl = coverUrl;
    if (categorySlug) resourceData.categorySlug = categorySlug;
    if (longContent) resourceData.longContent = longContent;

    try {
      await setDoc(doc(db, "resources", idSlug), resourceData);
      onSaveSuccess();
    } catch (err) {
      console.error("Error saving resource:", err);
      alert("Failed to save resource. Make sure Firestore rules permit writes.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-[#0F172A]/80 backdrop-blur-md"
      />

      {/* Modal Box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-5xl bg-white border border-[#0F172A]/10 rounded-3xl shadow-2xl z-10 overflow-hidden flex flex-col md:flex-row h-[90vh] md:h-[80vh]"
      >
        {/* Form Input Columns */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 border-b md:border-b-0 md:border-r border-[#0F172A]/5">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-[#0F172A] font-display">
              {isEditing ? `Edit Resource: ${title}` : "Add New Resource"}
            </h3>
            <button 
              onClick={onClose}
              className="p-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-200 transition-all text-[#475569]"
            >
              <X size={16} />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#475569]/80 mb-1.5">Resource Title</label>
              <input 
                type="text" 
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. MSME Pricing Strategy Calculator"
                className="w-full px-3 py-2 bg-[#F8FAF9] border border-[#0F172A]/8 rounded-lg text-xs font-semibold text-[#0F172A] focus:outline-none focus:border-accent-dark/40 shadow-sm"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#475569]/80 mb-1.5">Description</label>
              <textarea 
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="Write a summary describing what is contained in this resource and how it helps small business owners."
                className="w-full px-3 py-2 bg-[#F8FAF9] border border-[#0F172A]/8 rounded-lg text-xs font-semibold text-[#0F172A] focus:outline-none focus:border-accent-dark/40 shadow-sm"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#475569]/80 mb-1.5">SEO Category Slug</label>
              <input 
                type="text"
                list="category-presets"
                value={categorySlug}
                onChange={(e) => setCategorySlug(e.target.value)}
                placeholder="Select from presets or type a new custom category slug..."
                className="w-full px-3 py-2 bg-[#F8FAF9] border border-[#0F172A]/8 rounded-lg text-xs font-semibold text-[#0F172A] focus:outline-none focus:border-accent-dark/40 shadow-sm"
              />
              <datalist id="category-presets">
                <option value="business-formalization-tools" />
                <option value="free-SOP-downloads" />
                <option value="msme-growth-frameworks" />
                <option value="small-business-playbooks" />
                <option value="operational-efficiency-templates" />
                <option value="skill-monetization-guides" />
                <option value="structure-over-hustle" />
                <option value="brand-positioning-resources" />
                <option value="business-clarity-worksheets" />
              </datalist>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#475569]/80 mb-1.5">Rich Guide / Article Content (Markdown)</label>
              <textarea 
                value={longContent}
                onChange={(e) => setLongContent(e.target.value)}
                rows={8}
                placeholder="# How to write SOPs... \n\nAdd rich markdown guide contents here."
                className="w-full px-3 py-2 bg-[#F8FAF9] border border-[#0F172A]/8 rounded-lg text-xs font-semibold text-[#0F172A] focus:outline-none focus:border-accent-dark/40 shadow-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#475569]/80 mb-1.5">Topic</label>
                <input
                  type="text"
                  list="topic-presets"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Select or enter custom topic..."
                  className="w-full px-3 py-2 bg-[#F8FAF9] border border-[#0F172A]/8 rounded-lg text-xs font-semibold text-[#0F172A] focus:outline-none focus:border-accent-dark/40 shadow-sm"
                />
                <datalist id="topic-presets">
                  <option value="Marketing" />
                  <option value="Sales" />
                  <option value="Customer Success" />
                  <option value="Leadership" />
                  <option value="AI and Automation" />
                </datalist>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#475569]/80 mb-1.5">Format</label>
                <input
                  type="text"
                  list="format-presets"
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                  placeholder="Select or enter custom format..."
                  className="w-full px-3 py-2 bg-[#F8FAF9] border border-[#0F172A]/8 rounded-lg text-xs font-semibold text-[#0F172A] focus:outline-none focus:border-accent-dark/40 shadow-sm"
                />
                <datalist id="format-presets">
                  <option value="Ebook" />
                  <option value="Guide" />
                  <option value="Template" />
                  <option value="Tool" />
                  <option value="Webinar" />
                </datalist>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#475569]/80 mb-1.5">Content Type</label>
                <input
                  type="text"
                  list="contentType-presets"
                  value={contentType}
                  onChange={(e) => setContentType(e.target.value)}
                  placeholder="Select or enter custom type..."
                  className="w-full px-3 py-2 bg-[#F8FAF9] border border-[#0F172A]/8 rounded-lg text-xs font-semibold text-[#0F172A] focus:outline-none focus:border-accent-dark/40 shadow-sm"
                />
                <datalist id="contentType-presets">
                  <option value="Free" />
                  <option value="Premium" />
                </datalist>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#475569]/80 mb-1.5">Info Label</label>
                <input 
                  type="text" 
                  value={infoLabel}
                  onChange={(e) => setInfoLabel(e.target.value)}
                  placeholder="e.g. Excel Utility, 24 Pages"
                  className="w-full px-3 py-2 bg-[#F8FAF9] border border-[#0F172A]/8 rounded-lg text-xs font-semibold text-[#0F172A] focus:outline-none focus:border-accent-dark/40 shadow-sm"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#475569]/80 mb-1.5">Tag Label</label>
                <input 
                  type="text" 
                  value={tagLabel}
                  onChange={(e) => setTagLabel(e.target.value)}
                  placeholder="e.g. Guides, Templates"
                  className="w-full px-3 py-2 bg-[#F8FAF9] border border-[#0F172A]/8 rounded-lg text-xs font-semibold text-[#0F172A] focus:outline-none focus:border-accent-dark/40 shadow-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#475569]/80 mb-1.5">Resource Download Link</label>
                <input 
                  type="text" 
                  required
                  value={downloadUrl}
                  onChange={(e) => setDownloadUrl(e.target.value)}
                  placeholder="e.g. Google Drive/Selar link"
                  className="w-full px-3 py-2 bg-[#F8FAF9] border border-[#0F172A]/8 rounded-lg text-xs font-semibold text-[#0F172A] focus:outline-none focus:border-accent-dark/40 shadow-sm"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#475569]/80 mb-1.5">YouTube Video Link (Optional)</label>
                <input 
                  type="text" 
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  placeholder="e.g. https://www.youtube.com/watch?..."
                  className="w-full px-3 py-2 bg-[#F8FAF9] border border-[#0F172A]/8 rounded-lg text-xs font-semibold text-[#0F172A] focus:outline-none focus:border-accent-dark/40 shadow-sm"
                />
              </div>
            </div>

            {/* Upload File Input */}
            <div className="p-4 border border-[#0F172A]/5 bg-slate-50 rounded-2xl">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#475569]/80 mb-2">Upload Cover Image</label>
              <div className="flex gap-4 items-center">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 bg-white border border-[#0F172A]/10 hover:border-[#0F172A]/20 text-[#0F172A] text-xs font-bold rounded-xl shadow-sm transition-all flex items-center gap-1.5"
                >
                  <Upload size={12} />
                  Choose Photo
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden" 
                />

                <span className="text-[10px] text-[#475569]/80 truncate max-w-[200px]">
                  {coverUrl ? "✅ Cover Uploaded Successfully" : "No cover photo uploaded"}
                </span>
              </div>

              {uploadProgress >= 0 && (
                <div className="mt-3">
                  <div className="flex justify-between items-center text-[10px] font-bold text-accent-dark mb-1">
                    <span>Uploading cover...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-accent-dark h-full" style={{ width: `${uploadProgress}%` }} />
                  </div>
                </div>
              )}

              {uploadError && (
                <p className="text-[10px] text-red-600 mt-2 font-semibold">⚠️ {uploadError}</p>
              )}
            </div>

            {/* Featured Checkbox */}
            <div className="flex items-center gap-2 pt-2">
              <input 
                type="checkbox"
                id="featured"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-4 h-4 rounded text-accent focus:ring-accent accent-accent-dark cursor-pointer"
              />
              <label htmlFor="featured" className="text-xs font-bold text-[#0F172A] select-none cursor-pointer">
                Feature on Home/Category Top section (Limit 3 max per Topic)
              </label>
            </div>

            <div className="pt-4 flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 py-3 bg-[#0F172A] hover:bg-[#020617] text-white font-bold rounded-xl text-xs uppercase tracking-widest transition-all active:scale-[0.98] flex items-center justify-center"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : (isEditing ? "Save Edits" : "Publish Resource")}
              </button>
              
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-[#475569] font-bold rounded-xl text-xs uppercase tracking-widest transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Live Preview Pane (Hidden on Mobile) */}
        <div className="hidden md:flex md:w-80 bg-slate-900 text-white p-6 sm:p-8 flex-col justify-between items-center relative select-none">
          <div className="w-full text-center mb-6">
            <span className="text-[8px] font-black tracking-widest text-[#FEDB54] uppercase block">Interactive Live Preview</span>
            <h4 className="text-sm font-bold text-white mt-1">Mockup Frame Rendering</h4>
          </div>

          <div className="w-full max-w-[240px] bg-white rounded-3xl overflow-hidden border border-white/10 text-primary shadow-2xl">
            <ResourceFrame 
              format={format}
              title={title || "Sample Resource Title Here"}
              coverUrl={coverUrl}
              coverGradient={getTopicGradient(topic)}
              tagLabel={tagLabel}
            />

            <div className="p-4 text-left">
              <span className="text-[8px] font-black uppercase tracking-wider text-[#475569]/50 block mb-1">
                {topic}
              </span>
              <h5 className="text-xs font-bold text-[#0F172A] leading-snug line-clamp-1 mb-1">
                {title || "Sample Resource Title"}
              </h5>
              <p className="text-[9px] text-[#475569] leading-relaxed line-clamp-2 mb-3">
                {description || "A preview description summarizing the utility of this specific ebook or template."}
              </p>
              <div className="w-full py-2 bg-slate-950 text-white rounded-lg text-[8px] font-black uppercase tracking-widest text-center flex items-center justify-center gap-1.5">
                <span>Access Details</span>
              </div>
            </div>
          </div>

          <div className="text-center text-[10px] text-[#94A3B8] mt-6 leading-relaxed max-w-[200px]">
            Frame switches automatically based on your selected format:<br />
            <span className="font-bold text-accent mt-1 block">
              {format === "Ebook" || format === "Guide" ? "3D Book Frame (Tilted)" : 
               format === "Template" || format === "Tool" ? "Web Browser Window" : "Video Player Overlay"}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ResourceCrudModal;
