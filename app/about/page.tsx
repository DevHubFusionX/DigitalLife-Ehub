"use client";

import React from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import AboutHero from "@/components/about/AboutHero";
import WhoWeAre from "@/components/about/WhoWeAre";
import WhatWeDo from "@/components/about/WhatWeDo";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            <WhoWeAre />
            ;<AboutHero />

            <WhatWeDo />
            <Footer />
        </main>
    );
}
