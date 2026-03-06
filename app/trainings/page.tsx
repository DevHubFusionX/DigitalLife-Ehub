"use client";

import React from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import TrainingsHero from "@/components/trainings/TrainingsHero";
import TrainingModules from "@/components/trainings/TrainingModules";

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
