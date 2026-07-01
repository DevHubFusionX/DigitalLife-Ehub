import Navbar from "@/components/shared/Navbar";
import ResourceLibrary from "@/components/resources/ResourceLibrary";
import Footer from "@/components/shared/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resource Library | DigitalLife Ehub",
  description: "Access free ebooks, business templates, calculators, and webinars designed to help MSMEs & SMEs transition from hustle to structured growth.",
};

export default function ResourcesPage() {
  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <Navbar />
      <ResourceLibrary />
      <Footer />
    </main>
  );
}
