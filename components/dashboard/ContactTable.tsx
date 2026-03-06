"use client";

import React from "react";
import { MoreHorizontal } from "lucide-react";

const ContactTable = () => {
    return (
        <div className="w-full flex-1 flex flex-col gap-4">

            {/* Desktop Table Header - Hidden on Mobile */}
            <div className="hidden md:grid grid-cols-4 px-6 py-4 bg-white rounded-t-sm border border-[#2A2B6A]/10 border-b-0">
                <div className="text-[12px] font-black text-[#2A2B6A]">Tag name</div>
                <div className="text-[12px] font-black text-[#2A2B6A]">Total subscribers</div>
                <div className="text-[12px] font-black text-[#2A2B6A]">Subscriber today</div>
                <div className="text-[12px] font-black text-[#2A2B6A]">Created date</div>
            </div>

            {/* Content Area */}
            <div className="flex-1 flex flex-col gap-4 md:gap-0 md:bg-white md:border md:border-[#2A2B6A]/10 md:rounded-b-sm md:shadow-sm">

                {/* 3 Mobile Cards, representing the empty state rows in the mock */}
                {[1, 2, 3].map((item, index) => (
                    <div
                        key={item}
                        className={`
                            relative bg-white p-5 rounded-sm border border-[#2A2B6A]/10 shadow-sm flex flex-col gap-5
                            md:flex-row md:items-center md:px-6 md:py-4 md:border-0 md:rounded-none md:shadow-none
                            ${index > 0 ? "md:border-t md:border-[#2A2B6A]/5" : ""}
                        `}
                    >
                        {/* Mobile Stacked Labels */}
                        <div className="flex flex-col gap-4 flex-1 md:hidden">
                            <span className="text-[12px] font-black text-[#2A2B6A] underline underline-offset-2 decoration-[#2A2B6A]/30">Tag name</span>
                            <span className="text-[11px] font-black text-[#1F2937]">Total subscribers</span>
                            <span className="text-[11px] font-black text-[#1F2937]">Subscriber today</span>
                            <span className="text-[11px] font-black text-[#1F2937]">Created date</span>
                        </div>

                        {/* Desktop empty row flex spacer */}
                        <div className="hidden md:flex flex-1"></div>

                        {/* Options Button floating top right */}
                        <button className="absolute top-4 right-4 md:relative md:top-auto md:right-auto md:ml-auto h-fit p-1 text-[#2327A9] hover:bg-[#F4F4F9] rounded transition-colors">
                            <MoreHorizontal size={18} />
                        </button>
                    </div>
                ))}

                {/* Extra space on desktop to fill area */}
                <div className="hidden md:block flex-1 min-h-[300px]"></div>
            </div>
        </div>
    );
};

export default ContactTable;
