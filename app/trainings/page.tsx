"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrainingsHero from "@/components/TrainingsHero";
import TrainingModules from "@/components/TrainingModules";

export default function TrainingsPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <TrainingsHero />
            <TrainingModules />
            <Footer />
        </main>
    );
}
