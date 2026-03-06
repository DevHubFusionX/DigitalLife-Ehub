import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import DateRangePicker from "@/components/dashboard/DateRangePicker";
import ChatPanel from "@/components/dashboard/ChatPanel";
import AdPreview from "@/components/dashboard/AdPreview";

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-[#EAEAF3] flex flex-col font-sans">
            <DashboardNavbar />

            <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 md:px-8 py-8 flex flex-col">
                {/* Top Section */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8 w-full">
                    <div>
                        <h1 className="text-[28px] font-black text-[#2A2B6A] tracking-tight mb-1">
                            Dashboard
                        </h1>
                        <p className="text-[17px] text-[#4B5563] font-medium italic">
                            Tell our AI Agent what you want
                        </p>
                    </div>

                    <DateRangePicker />
                </div>

                {/* Main Content Layout */}
                {/* min-h-[600px] to ensure the chat and ad preview have plenty of room,
                    and flex-1 to stretch based on content. grid columns responsively adjust. */}
                <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-[1fr_minmax(400px,_1.2fr)] gap-8 min-h-[600px]">
                    {/* Left Column: Chat Area */}
                    <div className="h-[600px] lg:h-auto flex flex-col shadow-xl shadow-[#2A2B6A]/5 rounded-[24px]">
                        <ChatPanel />
                    </div>

                    {/* Right Column: Ad Preview */}
                    <div className="h-[800px] lg:h-auto flex flex-col gap-4">
                        <AdPreview />
                    </div>
                </div>
            </main>
        </div>
    );
}
