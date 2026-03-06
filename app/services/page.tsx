"use client";

import React from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import ServicesHero from "@/components/services/ServicesHero";
import ServiceList from "@/components/services/ServiceList";

export default function ServicesPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <ServicesHero />
            <ServiceList />
            <Footer />
        </main>
    );
}
