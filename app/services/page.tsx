import React from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import ServicesHero from "@/components/services/ServicesHero";
import ServiceList from "@/components/services/ServiceList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SOP Development & Small Business Formalization Services | DigitalLife",
  description: "Discover our SOP development services, small business formalization, corporate workflow design, and business system structuring. Get a custom website design to convert or book a business roadmap consultation.",
  keywords: "SOP development services, small business formalization, corporate workflow design, business system structuring, standard operating procedures template, strategic brand positioning, social media management with structure, e-commerce web development for small business, custom website design to convert, business roadmap consultation",
};

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
