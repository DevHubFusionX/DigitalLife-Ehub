"use client";

import React, { useState, useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

interface Message {
    id: number;
    role: "agent" | "user";
    content: string;
}

const initialMessages: Message[] = [
    {
        id: 1,
        role: "agent",
        content: "Hi, Emilia, give me a brief description of the product/service you want to promote",
    },
    { id: 2, role: "user", content: "Digital product" },
    {
        id: 3,
        role: "agent",
        content: "Who is your ideal customer? Give details like: Age, Location, Gender and Interest",
    },
];

const ChatPanel = () => {
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSend = (text: string) => {
        const userMsg: Message = { id: Date.now(), role: "user", content: text };
        setMessages((prev) => [...prev, userMsg]);
        setIsTyping(true);

        setTimeout(() => {
            setIsTyping(false);
            const agentMsg: Message = {
                id: Date.now() + 1,
                role: "agent",
                content: "Generating Ads.......",
            };
            setMessages((prev) => [...prev, agentMsg]);
        }, 2000);
    };

    return (
        <div className="flex flex-col bg-white rounded-[24px] border border-[#2A2B6A]/10 shadow-sm overflow-hidden h-full">
            {/* Header */}
            <div className="px-6 py-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-900 border-2 border-white flex items-center justify-center shrink-0 shadow-sm overflow-hidden z-10">
                    <img src="/logo.svg" alt="AI Agent" className="w-8 h-8 object-contain" />
                </div>
                <div>
                    <h3 className="text-[17px] font-black tracking-tight text-[#4B5563]">AI Agent</h3>
                </div>
            </div>

            {/* Messages Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 pb-6 space-y-6 min-h-0 scroll-smooth">
                {messages.map((msg) => (
                    <ChatMessage key={msg.id} role={msg.role} content={msg.content} />
                ))}

                {isTyping && (
                    <div className="flex gap-3 justify-start">
                        <div className="w-10 h-10 rounded-full bg-slate-900 border-2 border-white flex items-center justify-center shrink-0 shadow-sm overflow-hidden">
                            <img src="/logo.svg" alt="AI Agent" className="w-6 h-6 object-contain" />
                        </div>
                        <div className="px-5 py-4 bg-[#F3E8BA] rounded-2xl rounded-tl-sm shadow-sm flex items-center justify-center">
                            <div className="flex gap-1.5">
                                <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce [animation-delay:0ms]" />
                                <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce [animation-delay:150ms]" />
                                <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce [animation-delay:300ms]" />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Input Form */}
            <ChatInput onSend={handleSend} />
        </div>
    );
};

export default ChatPanel;
