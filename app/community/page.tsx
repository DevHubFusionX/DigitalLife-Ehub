"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CommunityHero from "@/components/CommunityHero";
import CommunityEcosystem from "@/components/CommunityEcosystem";

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
