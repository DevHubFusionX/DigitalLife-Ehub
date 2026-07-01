"use client";

export const dynamic = 'force-dynamic';

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, Trash2, Edit3, LogOut, Database, Upload, Loader2, CheckCircle, 
  AlertTriangle, Search, ChevronRight, X, FileText, LayoutTemplate, Video, Wrench, ExternalLink 
} from "lucide-react";
import { auth, db, storage } from "@/lib/firebase";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from "firebase/auth";
import { collection, doc, setDoc, deleteDoc, getDocs, writeBatch } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { RESOURCES_DATA, Resource } from "@/components/resources/resourcesData";
import ResourceFrame from "@/components/resources/ResourceFrame";
import Navbar from "@/components/shared/Navbar";

// Define the schema for database resources (extending original with custom fields)
interface DBResource extends Resource {
  youtubeUrl?: string;
  createdAt?: number;
}

export default function AdminPage() {
  // Auth state
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [submittingAuth, setSubmittingAuth] = useState(false);

  // DB Data state
  const [resources, setResources] = useState<DBResource[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  const [seeding, setSeeding] = useState(false);

  // Modal / Form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Form Fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [topic, setTopic] = useState<Resource["topic"]>("Marketing");
  const [format, setFormat] = useState<Resource["format"]>("Ebook");
  const [contentType, setContentType] = useState<Resource["contentType"]>("Free");
  const [infoLabel, setInfoLabel] = useState("");
  const [tagLabel, setTagLabel] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [featured, setFeatured] = useState(false);

  // Image Upload state
  const [uploadProgress, setUploadProgress] = useState(-1);
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 1. Monitor Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoadingAuth(false);
      if (currentUser) {
        fetchResources();
      }
    });
    return () => unsubscribe();
  }, []);

  // 2. Fetch Resources from Firestore
  const fetchResources = async () => {
    setLoadingData(true);
    try {
      const querySnapshot = await getDocs(collection(db, "resources"));
      const items: DBResource[] = [];
      querySnapshot.forEach((docSnap) => {
        items.push({ id: docSnap.id, ...docSnap.data() } as DBResource);
      });
      // Sort by creation date or fallback to title
      items.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
      setResources(items);
    } catch (error) {
      console.error("Error fetching resources:", error);
    } finally {
      setLoadingData(false);
    }
  };

  // 3. Admin Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setSubmittingAuth(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      setAuthError(err.message || "Invalid credentials. Please try again.");
    } finally {
      setSubmittingAuth(false);
    }
  };

  // 4. Admin Sign Out
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setResources([]);
    } catch (err) {
      console.error("Error signing out:", err);
    }
  };

  // 5. Seed Firestore with hardcoded data
  const handleSeedDatabase = async () => {
    if (!window.confirm("This will overwrite or add all 13+ default resources into your Firestore database. Continue?")) return;
    setSeeding(true);
    try {
      const batch = writeBatch(db);
      RESOURCES_DATA.forEach((res) => {
        const docRef = doc(db, "resources", res.id);
        const seedData: DBResource = {
          ...res,
          createdAt: Date.now(),
        };
        batch.set(docRef, seedData);
      });
      await batch.commit();
      alert("Successfully seeded database with original resources!");
      fetchResources();
    } catch (err) {
      console.error("Error seeding database:", err);
      alert("Error seeding database. Check console for details.");
    } finally {
      setSeeding(false);
    }
  };

  // 6. Handle Image File Upload to Cloudinary Unsigned API
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

  // Helper to get matching cover gradient based on topic
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

  // 7. Save Resource (Create or Update)
  const handleSaveResource = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !downloadUrl) {
      alert("Please fill out Title, Description, and Download URL!");
      return;
    }

    // Generate readable ID slug from title if creating new
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
      createdAt: isEditing ? (resources.find(r => r.id === selectedId)?.createdAt || Date.now()) : Date.now(),
    };

    if (infoLabel) resourceData.infoLabel = infoLabel;
    if (tagLabel) resourceData.tagLabel = tagLabel;
    if (youtubeUrl) resourceData.youtubeUrl = youtubeUrl;
    if (coverUrl) resourceData.coverUrl = coverUrl;

    try {
      await setDoc(doc(db, "resources", idSlug), resourceData);
      setIsModalOpen(false);
      resetForm();
      fetchResources();
    } catch (err) {
      console.error("Error saving resource:", err);
      alert("Failed to save resource. Make sure Firestore rules permit writes.");
    }
  };

  // 8. Delete Resource
  const handleDeleteResource = async (resource: DBResource) => {
    if (!window.confirm(`Are you sure you want to delete "${resource.title}"?`)) return;

    try {
      // 1. Delete document from Firestore
      await deleteDoc(doc(db, "resources", resource.id));

      // 2. If it had an uploaded cover in Firebase Storage, try deleting it
      if (resource.coverUrl && resource.coverUrl.includes("firebasestorage.googleapis.com")) {
        try {
          const imageRef = ref(storage, resource.coverUrl);
          await deleteObject(imageRef);
        } catch (storageErr) {
          console.warn("Storage deletion warning (image may have been deleted already):", storageErr);
        }
      }

      fetchResources();
    } catch (err) {
      console.error("Error deleting resource:", err);
      alert("Failed to delete resource.");
    }
  };

  // 9. Open Edit modal
  const handleOpenEdit = (res: DBResource) => {
    setIsEditing(true);
    setSelectedId(res.id);
    setTitle(res.title);
    setDescription(res.description);
    setTopic(res.topic);
    setFormat(res.format);
    setContentType(res.contentType);
    setInfoLabel(res.infoLabel || "");
    setTagLabel(res.tagLabel || "");
    setDownloadUrl(res.downloadUrl);
    setYoutubeUrl(res.youtubeUrl || "");
    setCoverUrl(res.coverUrl || "");
    setFeatured(res.featured || false);
    setIsModalOpen(true);
  };

  // Helper: Reset Form states
  const resetForm = () => {
    setIsEditing(false);
    setSelectedId("");
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
    setUploadProgress(-1);
    setUploadError("");
  };

  // Filtered resources for Admin view list
  const filteredResources = resources.filter(res => 
    res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    res.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
    res.format.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loadingAuth) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center text-white">
        <Loader2 className="w-10 h-10 text-accent animate-spin" />
      </div>
    );
  }

  // SIGN IN PANEL SCREEN
  if (!user) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex flex-col justify-between font-sans relative overflow-hidden">
        <Navbar />
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[32px_32px] pointer-events-none" />

        <div className="flex-1 flex items-center justify-center px-4 relative z-10 pt-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md bg-[#1E293B] border border-white/10 p-8 sm:p-10 rounded-3xl shadow-2xl"
          >
            <div className="text-center mb-8">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#FEDB54]">DigitalLife Ehub</span>
              <h2 className="text-2xl font-bold text-white mt-2 font-display">Admin Panel Login</h2>
              <p className="text-xs text-[#94A3B8] mt-2">Sign in to manage and edit your Resource Library listings.</p>
            </div>

            {authError && (
              <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs rounded-xl flex gap-2 items-start mb-6">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
                <span>{authError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#94A3B8] mb-2">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@digitallife.com"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white placeholder-white/20 rounded-xl text-sm focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#94A3B8] mb-2">Password</label>
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white placeholder-white/20 rounded-xl text-sm focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/20 transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={submittingAuth}
                className="w-full py-3.5 bg-accent hover:bg-accent-dark text-primary font-bold rounded-xl text-xs uppercase tracking-widest transition-all active:scale-[0.98] shadow-lg shadow-accent/15 flex items-center justify-center gap-2"
              >
                {submittingAuth ? <Loader2 className="w-4 h-4 animate-spin" /> : "Authenticate"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    );
  }

  // LOGGED IN DASHBOARD
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#0F172A] font-sans flex flex-col justify-between">
      <div>
        <Navbar />

        {/* Dashboard Header Bar */}
        <section className="bg-[#0F172A] text-white pt-28 pb-12 relative overflow-hidden">
          <div className="container-custom relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#FEDB54]">Dashboard Control Panel</span>
              <h1 className="text-3xl sm:text-4xl font-display font-bold text-white mt-1">Resource Library Admin</h1>
            </div>
            
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={handleSeedDatabase}
                disabled={seeding || loadingData}
                className="px-5 py-2.5 bg-white/10 border border-white/10 hover:bg-white/15 text-white font-bold rounded-xl text-xs uppercase tracking-widest transition-all active:scale-[0.98] flex items-center gap-2 disabled:opacity-50"
              >
                {seeding ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Database size={14} />}
                Seed Data
              </button>
              
              <button
                onClick={() => {
                  resetForm();
                  setIsModalOpen(true);
                }}
                className="px-5 py-2.5 bg-accent hover:bg-accent-dark text-primary font-bold rounded-xl text-xs uppercase tracking-widest transition-all active:scale-[0.98] shadow-lg shadow-accent/15 flex items-center gap-2"
              >
                <Plus size={14} />
                Add Resource
              </button>

              <button
                onClick={handleSignOut}
                className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs uppercase tracking-widest transition-all active:scale-[0.98] flex items-center gap-2"
              >
                <LogOut size={14} />
                Sign Out
              </button>
            </div>
          </div>
        </section>

        {/* Search and Database Table Section */}
        <main className="container-custom py-12">
          <div className="bg-white rounded-3xl border border-[#0F172A]/5 shadow-sm p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h3 className="text-lg font-bold text-[#0F172A]">All Resources</h3>
                <p className="text-xs text-[#475569]/80 mt-1">Currently showing {filteredResources.length} out of {resources.length} active listings.</p>
              </div>

              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#475569]/50 w-4 h-4" />
                <input 
                  type="text"
                  placeholder="Filter resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#F8FAF9] border border-[#0F172A]/8 hover:border-[#0F172A]/15 rounded-xl text-xs font-bold text-[#0F172A] focus:outline-none focus:border-accent-dark/40 shadow-sm transition-all"
                />
              </div>
            </div>

            {loadingData ? (
              <div className="py-20 flex flex-col items-center justify-center">
                <Loader2 className="w-8 h-8 text-[#0F172A] animate-spin mb-4" />
                <span className="text-xs text-[#475569]/80 font-bold uppercase tracking-widest">Loading database...</span>
              </div>
            ) : filteredResources.length === 0 ? (
              <div className="py-20 text-center border border-dashed border-[#0F172A]/10 rounded-2xl">
                <Database className="w-12 h-12 text-[#475569]/30 mx-auto mb-4" />
                <h4 className="text-base font-bold text-[#0F172A]">No resources found</h4>
                <p className="text-xs text-[#475569]/80 mt-1 max-w-xs mx-auto">Database is either empty or filters are active. Add a new resource or click "Seed Data" to load initial samples.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#0F172A]/5 text-[#475569]/60 text-[10px] font-bold uppercase tracking-widest">
                      <th className="py-4 px-4">Title / Cover</th>
                      <th className="py-4 px-4">Format</th>
                      <th className="py-4 px-4">Topic</th>
                      <th className="py-4 px-4">Access Type</th>
                      <th className="py-4 px-4">Download / Video URL</th>
                      <th className="py-4 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#0F172A]/5">
                    {filteredResources.map((res) => (
                      <tr key={res.id} className="hover:bg-slate-50 transition-colors group">
                        <td className="py-4 px-4">
                          <div className="flex gap-4 items-center max-w-md">
                            <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-black/5 bg-slate-100 flex items-center justify-center">
                              {res.coverUrl ? (
                                <img src={res.coverUrl} alt="" className="w-full h-full object-cover" />
                              ) : (
                                <div className={`w-full h-full bg-gradient-to-br ${res.coverGradient} flex items-center justify-center`}>
                                  <span className="text-[6px] font-black text-white">DL</span>
                                </div>
                              )}
                            </div>
                            <div>
                              <span className="text-xs font-bold text-[#0F172A] block line-clamp-1">{res.title}</span>
                              <span className="text-[10px] text-[#475569]/60 mt-0.5 block line-clamp-1">{res.description}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
                            {res.format === "Ebook" && <FileText size={10} />}
                            {res.format === "Guide" && <FileText size={10} />}
                            {res.format === "Template" && <LayoutTemplate size={10} />}
                            {res.format === "Tool" && <Wrench size={10} />}
                            {res.format === "Webinar" && <Video size={10} />}
                            {res.format}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#475569]/70">{res.topic}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${res.contentType === "Free" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-amber-50 text-amber-700 border-amber-200"}`}>
                            {res.contentType}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex flex-col gap-1 max-w-[200px]">
                            <a href={res.downloadUrl} target="_blank" rel="noreferrer" className="text-[10px] font-bold text-[#0F172A] underline flex items-center gap-1 hover:text-accent-dark truncate">
                              Download Link <ExternalLink size={10} />
                            </a>
                            {res.youtubeUrl && (
                              <a href={res.youtubeUrl} target="_blank" rel="noreferrer" className="text-[10px] font-bold text-red-600 underline flex items-center gap-1 hover:text-red-700 truncate">
                                YouTube Link <ExternalLink size={10} />
                              </a>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <div className="flex gap-2 justify-end opacity-60 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => handleOpenEdit(res)}
                              className="p-1.5 bg-slate-100 hover:bg-accent/20 hover:text-accent-dark rounded-lg border border-slate-200 transition-all"
                              title="Edit Resource"
                            >
                              <Edit3 size={12} />
                            </button>
                            <button
                              onClick={() => handleDeleteResource(res)}
                              className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg border border-rose-200 transition-all"
                              title="Delete Resource"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* CRUD MODAL FOR ADDING / EDITING */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
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
                    onClick={() => setIsModalOpen(false)}
                    className="p-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-200 transition-all text-[#475569]"
                  >
                    <X size={16} />
                  </button>
                </div>

                <form onSubmit={handleSaveResource} className="space-y-4">
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-[#475569]/80 mb-1.5">Topic Topic</label>
                      <select
                        value={topic}
                        onChange={(e) => setTopic(e.target.value as Resource["topic"])}
                        className="w-full px-3 py-2 bg-[#F8FAF9] border border-[#0F172A]/8 rounded-lg text-xs font-semibold text-[#0F172A] focus:outline-none focus:border-accent-dark/40"
                      >
                        <option value="Marketing">Marketing</option>
                        <option value="Sales">Sales</option>
                        <option value="Customer Success">Customer Success</option>
                        <option value="Leadership">Leadership</option>
                        <option value="AI and Automation">AI and Automation</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-[#475569]/80 mb-1.5">Format</label>
                      <select
                        value={format}
                        onChange={(e) => setFormat(e.target.value as Resource["format"])}
                        className="w-full px-3 py-2 bg-[#F8FAF9] border border-[#0F172A]/8 rounded-lg text-xs font-semibold text-[#0F172A] focus:outline-none focus:border-accent-dark/40"
                      >
                        <option value="Ebook">Ebook</option>
                        <option value="Guide">Guide</option>
                        <option value="Template">Template</option>
                        <option value="Tool">Tool</option>
                        <option value="Webinar">Webinar (Video)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-[#475569]/80 mb-1.5">Content Type</label>
                      <select
                        value={contentType}
                        onChange={(e) => setContentType(e.target.value as Resource["contentType"])}
                        className="w-full px-3 py-2 bg-[#F8FAF9] border border-[#0F172A]/8 rounded-lg text-xs font-semibold text-[#0F172A] focus:outline-none focus:border-accent-dark/40"
                      >
                        <option value="Free">Free</option>
                        <option value="Premium">Premium</option>
                      </select>
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

                      {/* Display current image link status */}
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
                      className="flex-1 py-3 bg-[#0F172A] hover:bg-[#020617] text-white font-bold rounded-xl text-xs uppercase tracking-widest transition-all active:scale-[0.98]"
                    >
                      {isEditing ? "Save Edits" : "Publish Resource"}
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-6 py-3 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-[#475569] font-bold rounded-xl text-xs uppercase tracking-widest transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>

              {/* Cover Rendering Preview (Stands out and allows admin to check design visually!) */}
              <div className="w-full md:w-80 bg-slate-900 text-white p-6 sm:p-8 flex flex-col justify-between items-center relative select-none">
                <div className="w-full text-center mb-6">
                  <span className="text-[8px] font-black tracking-widest text-[#FEDB54] uppercase block">Interactive Live Preview</span>
                  <h4 className="text-sm font-bold text-white mt-1">Mockup Frame Rendering</h4>
                </div>

                {/* Simulated Card container */}
                <div className="w-full max-w-[240px] bg-white rounded-3xl overflow-hidden border border-white/10 text-primary shadow-2xl">
                  {/* Card Frame Header */}
                  <ResourceFrame 
                    format={format}
                    title={title || "Sample Resource Title Here"}
                    coverUrl={coverUrl}
                    coverGradient={getTopicGradient(topic)}
                    tagLabel={tagLabel}
                  />

                  {/* Card Content details */}
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
        )}
      </AnimatePresence>
    </div>
  );
}
