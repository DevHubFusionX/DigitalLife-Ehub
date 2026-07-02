import React from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import AboutHero from "@/components/about/AboutHero";
import WhoWeAre from "@/components/about/WhoWeAre";
import WhatWeDo from "@/components/about/WhatWeDo";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Business Growth Strategists & MSME Consultants | DigitalLife",
  description: "Meet DigitalLife, the business development service providers and MSME structural gap experts. We help small business consultants and enterprise builders transition to value over skills monetization and corporate accountability systems with an organic client acquisition strategy.",
  keywords: "business development service providers, business growth strategists, value over skills monetization, product first business approach, small business consultants, MSME structural gap experts, enterprise builders, corporate accountability systems, organic client acquisition strategy",
};

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            <WhoWeAre />
            <AboutHero />

            <WhatWeDo />
            <Footer />
        </main>
    );
}
