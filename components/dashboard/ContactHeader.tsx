"use client";

import React from "react";
import { Plus } from "lucide-react";

const ContactHeader = () => {
    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <h1 className="text-[24px] md:text-[28px] font-black text-[#2A2B6A] tracking-tight">
                0 Contact Tags
            </h1>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-[#2327A9] hover:bg-[#1E1B4B] text-white text-[14px] font-bold rounded-md shadow-sm transition-all active:scale-[0.98]">
                <div className="bg-white rounded-full p-[2px] shadow-sm flex items-center justify-center">
                    <Plus size={14} className="text-[#2327A9] stroke-[4]" />
                </div>
                Create tag
            </button>
        </div>
    );
};

export default ContactHeader;
