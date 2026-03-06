"use client";

import React from "react";

interface ChatMessageProps {
    role: "agent" | "user";
    content: string;
}

const ChatMessage = ({ role, content }: ChatMessageProps) => {
    const isAgent = role === "agent";

    return (
        <div className={`flex gap-3 ${isAgent ? "justify-start" : "justify-end"}`}>
            {isAgent && (
                <div className="w-10 h-10 rounded-full bg-slate-900 border-2 border-white flex items-center justify-center shrink-0 shadow-sm overflow-hidden">
                    <img src="/logo.svg" alt="AI Agent" className="w-6 h-6 object-contain" />
                </div>
            )}
            <div
                className={`max-w-[85%] md:max-w-[70%] px-5 py-3.5 text-[14px] leading-relaxed font-medium shadow-sm ${isAgent
                        ? "bg-[#F3E8BA] text-[#374151] rounded-2xl rounded-tl-sm"
                        : "bg-[#C8C6E6] text-[#1F2937] rounded-2xl rounded-tr-sm"
                    }`}
            >
                {content}
            </div>
        </div>
    );
};

export default ChatMessage;
