"use client";

import React from "react";

const AdPreview = () => {
    return (
        <div className="flex flex-col h-full gap-4">
            {/* Main Preview Card */}
            <div className="flex-1 bg-white rounded-[4px] border border-[#2A2B6A]/10 shadow-sm overflow-hidden flex flex-col">
                <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="text-[20px] font-black text-[#4B5563]">Ad preview</h3>
                </div>

                <div className="flex-1 p-6 overflow-y-auto">
                    {/* Social Post Mockup */}
                    <div className="border border-[#2A2B6A]/10 rounded shadow-sm overflow-hidden bg-white max-w-sm mx-auto">
                        {/* Post Header */}
                        <div className="flex items-center gap-3 p-4 bg-white border-b border-[#2A2B6A]/5">
                            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                                <img src="https://i.pravatar.cc/150?img=47" alt="Emili Jones" className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <h4 className="text-[15px] font-bold text-[#374151]">Emili Jones</h4>
                            </div>
                        </div>

                        {/* Ad Image */}
                        <div className="aspect-[4/3] w-full relative overflow-hidden bg-[#FFD700]">
                            <img
                                src="/ad-preview.png"
                                alt="Delicious Fried Chicken"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Post Body */}
                        <div className="p-4 bg-white">
                            <h4 className="text-[18px] font-black text-[#374151] leading-tight mb-3">
                                Learn How To Grow Your Business
                            </h4>
                            <p className="text-[12px] text-[#4B5563] font-medium leading-[1.6] line-clamp-6 mb-4">
                                Who is your ideal customer? Give details like: Age, Location, Gender and Interest
                                Who is your ideal customer? Give details like: Age, Location, Gender and Interest
                                Who is your ideal customer? Give details like: Age, Location, Gender and
                                InterestWho is your ideal customer? Give details like: Age, Location, Gender and
                                Interest
                            </p>

                            {/* Learn More Button */}
                            <div className="flex justify-end pt-2 border-t border-gray-100 mt-2">
                                <button className="px-5 py-2.5 bg-[#4B5563] text-white text-[13px] font-bold rounded shadow-sm hover:bg-[#374151] transition-all">
                                    Learn more
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
                <button className="flex-1 py-4 bg-[#41458A] text-white text-[14px] font-bold rounded shadow-sm hover:bg-[#2A2B6A] transition-all active:scale-[0.99]">
                    Upload image/video
                </button>
                <button className="flex-1 sm:flex-none sm:w-[120px] py-4 bg-[#41458A] text-white text-[14px] font-bold rounded shadow-sm hover:bg-[#2A2B6A] transition-all active:scale-[0.99] flex items-center justify-center">
                    Run
                </button>
            </div>
        </div>
    );
};

export default AdPreview;
