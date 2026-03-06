import Navbar from "@/components/shared/Navbar";
import Hero from "@/components/landing/Hero";
import Solution from "@/components/landing/Solution";
import Grow from "@/components/landing/Grow";
import Features from "@/components/landing/Features";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/shared/Footer";

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
