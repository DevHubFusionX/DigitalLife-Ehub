"use client";

import React from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import CommunityHero from "@/components/community/CommunityHero";
import CommunityEcosystem from "@/components/community/CommunityEcosystem";

export default function CommunityPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <CommunityHero />
            <CommunityEcosystem />
            <Footer />
        </main>
    );
}
