"use client";

import React from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import CommunityHero from "@/components/community/CommunityHero";
import CommunityEcosystem from "@/components/community/CommunityEcosystem";
import VisibilityTools from "@/components/community/VisibilityTools";
import OpportunityBoard from "@/components/community/OpportunityBoard";
import FoundingBenefits from "@/components/community/FoundingBenefits";
import Testimonials from "@/components/community/Testimonials";

export default function CommunityPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <CommunityHero />
            <CommunityEcosystem />
            <VisibilityTools />
            <OpportunityBoard />
            <FoundingBenefits />
            <Testimonials />
            <Footer />
        </main>
    );
}
