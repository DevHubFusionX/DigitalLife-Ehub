"use client";

import React from "react";
import { CalendarDays } from "lucide-react";

const DateRangePicker = () => {
    return (
        <button className="flex items-center gap-4 px-4 py-2.5 bg-white border border-[#E5E7EB] rounded-xl shadow-sm hover:border-[#D1D5DB] hover:shadow transition-all group w-full sm:w-auto justify-between sm:justify-start">
            <span className="text-[13px] font-medium text-[#4B5563]">
                December 24, 2024 - January 23, 2025
            </span>
            <div className="w-7 h-7 bg-[#4F46E5] rounded-md flex items-center justify-center transition-transform group-hover:scale-105">
                <CalendarDays size={14} className="text-white" />
            </div>
        </button>
    );
};

export default DateRangePicker;
