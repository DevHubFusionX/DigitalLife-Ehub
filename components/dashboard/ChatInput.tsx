"use client";

import React, { useState } from "react";
import { SendIcon } from "lucide-react";

interface ChatInputProps {
    onSend: (message: string) => void;
}

const ChatInput = ({ onSend }: ChatInputProps) => {
    const [value, setValue] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (value.trim()) {
            onSend(value.trim());
            setValue("");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-white mt-auto">
            <div className="flex items-center gap-3 bg-[#E5E5E5] rounded-full px-5 py-3 shadow-inner">
                <input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Write something.."
                    className="flex-1 bg-transparent text-[14px] text-gray-800 outline-none placeholder:text-gray-500 font-medium"
                />
                <button
                    type="submit"
                    disabled={!value.trim()}
                    className="flex shrink-0 items-center justify-center text-[#2A2B6A] hover:text-[#4F46E5] transition-colors disabled:opacity-30 disabled:pointer-events-none"
                >
                    <SendIcon size={24} className="fill-current stroke-current" />
                </button>
            </div>
        </form>
    );
};

export default ChatInput;
