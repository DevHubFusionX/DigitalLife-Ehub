import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import ContactHeader from "@/components/dashboard/ContactHeader";
import ContactTable from "@/components/dashboard/ContactTable";

export default function ContactDashboardPage() {
    return (
        <div className="min-h-screen bg-[#EAEAF3] flex flex-col font-sans">
            <DashboardNavbar />

            <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 py-6 md:py-10 flex flex-col">
                <div className="bg-transparent md:bg-[#EAEAF3] rounded-sm flex-1 flex flex-col w-full mx-auto md:max-w-[1200px]">
                    <ContactHeader />
                    <ContactTable />
                </div>
            </main>
        </div>
    );
}
