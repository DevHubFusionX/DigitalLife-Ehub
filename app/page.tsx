import type { Metadata } from "next";
import Navbar from "@/components/shared/Navbar";
import Hero from "@/components/landing/Hero";
import Solution from "@/components/landing/Solution";
import Grow from "@/components/landing/Grow";
import Features from "@/components/landing/Features";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/shared/Footer";

export const metadata: Metadata = {
  title: "Structured Business Growth & MSME Growth Framework | DigitalLife",
  description: "Transition from hustle to structured growth with DigitalLife. Partner with a professional business structure consultant for business development support, corporate structure for MSMEs, SME scaling strategy, and operational systems design.",
  keywords: "business structure consultant, business development support, MSME growth framework, moving from hustle to structured growth, small business development services, structured business growth, corporate structure for MSMEs, SME scaling strategy, business clarity development, operational systems design",
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Solution />
      <Grow />
      <Features />
      <CTA />
      <Footer />
    </main>
  );
}
