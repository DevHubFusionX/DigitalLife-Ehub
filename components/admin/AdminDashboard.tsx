"use client";

import React, { useState } from "react";
import { 
  Plus, Trash2, Edit3, LogOut, Database, Search, 
  FileText, LayoutTemplate, Video, Wrench, ExternalLink, Loader2, KeyRound
} from "lucide-react";
import { Resource } from "@/components/resources/resourcesData";

interface DBResource extends Resource {
  youtubeUrl?: string;
  createdAt?: number;
}

interface AdminDashboardProps {
  resources: DBResource[];
  loadingData: boolean;
  onSignOut: () => void;
  onEdit: (resource: DBResource) => void;
  onDelete: (resource: DBResource) => void;
  onAdd: () => void;
  onChangePassword: () => void;
}

const AdminDashboard = ({
  resources,
  loadingData,
  onSignOut,
  onEdit,
  onDelete,
  onAdd,
  onChangePassword
}: AdminDashboardProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredResources = resources.filter(res => 
    res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    res.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
    res.format.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#0F172A] font-sans flex flex-col justify-between">
      <div>
        {/* Dashboard Header Bar */}
        <section className="bg-[#0F172A] text-white py-12 relative overflow-hidden">
          <div className="container-custom relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#FEDB54]">Dashboard Control Panel</span>
              <h1 className="text-3xl sm:text-4xl font-display font-bold text-white mt-1">Resource Library Admin</h1>
            </div>
            
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={onAdd}
                className="px-5 py-2.5 bg-accent hover:bg-accent-dark text-primary font-bold rounded-xl text-xs uppercase tracking-widest transition-all active:scale-[0.98] shadow-lg shadow-accent/15 flex items-center gap-2"
              >
                <Plus size={14} />
                Add Resource
              </button>

              <button
                onClick={onChangePassword}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold rounded-xl text-xs uppercase tracking-widest transition-all active:scale-[0.98] flex items-center gap-2"
              >
                <KeyRound size={14} />
                Change Password
              </button>

              <button
                onClick={onSignOut}
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
              <div>
                {/* Mobile Cards View */}
                <div className="block md:hidden space-y-4">
                  {filteredResources.map((res) => (
                    <div key={res.id} className="bg-slate-50 border border-[#0F172A]/5 rounded-2xl p-5 flex flex-col gap-4">
                      <div className="flex gap-4 items-center">
                        <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-black/5 bg-slate-100 flex items-center justify-center">
                          {res.coverUrl ? (
                            <img src={res.coverUrl} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <div className={`w-full h-full bg-gradient-to-br ${res.coverGradient} flex items-center justify-center`}>
                              <span className="text-[6px] font-black text-white">DL</span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-xs font-bold text-[#0F172A] block truncate">{res.title}</span>
                          <span className="text-[10px] text-[#475569]/60 mt-0.5 block truncate">{res.description}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <span className="inline-flex items-center gap-1 text-[9px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
                          {res.format === "Ebook" && <FileText size={8} />}
                          {res.format === "Guide" && <FileText size={8} />}
                          {res.format === "Template" && <LayoutTemplate size={8} />}
                          {res.format === "Tool" && <Wrench size={8} />}
                          {res.format === "Webinar" && <Video size={8} />}
                          {res.format}
                        </span>
                        <span className="text-[9px] font-bold uppercase tracking-wider text-[#475569]/70 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
                          {res.topic}
                        </span>
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${res.contentType === "Free" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-amber-50 text-amber-700 border-amber-200"}`}>
                          {res.contentType}
                        </span>
                      </div>

                      <div className="flex justify-between items-center pt-3 border-t border-[#0F172A]/5">
                        <div className="flex gap-3">
                          <a href={res.downloadUrl} target="_blank" rel="noreferrer" className="text-[10px] font-bold text-[#0F172A] underline flex items-center gap-1 hover:text-[#4F46E5] truncate max-w-[100px]">
                            Download <ExternalLink size={8} />
                          </a>
                          {res.youtubeUrl && (
                            <a href={res.youtubeUrl} target="_blank" rel="noreferrer" className="text-[10px] font-bold text-red-600 underline flex items-center gap-1 hover:text-red-700 truncate max-w-[100px]">
                              Video <ExternalLink size={8} />
                            </a>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => onEdit(res)}
                            className="p-1.5 bg-slate-100 hover:bg-accent/20 hover:text-accent-dark rounded-lg border border-slate-200 transition-all text-[#0F172A]"
                            title="Edit Resource"
                          >
                            <Edit3 size={12} />
                          </button>
                          <button
                            onClick={() => onDelete(res)}
                            className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg border border-rose-200 transition-all"
                            title="Delete Resource"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop Table View */}
                <div className="hidden md:block overflow-x-auto">
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
                              <a href={res.downloadUrl} target="_blank" rel="noreferrer" className="text-[10px] font-bold text-[#0F172A] underline flex items-center gap-1 hover:text-[#4F46E5] truncate">
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
                                onClick={() => onEdit(res)}
                                className="p-1.5 bg-slate-100 hover:bg-accent/20 hover:text-accent-dark rounded-lg border border-slate-200 transition-all"
                                title="Edit Resource"
                              >
                                <Edit3 size={12} />
                              </button>
                              <button
                                onClick={() => onDelete(res)}
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
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
