"use client";
import { ReactLenis } from "lenis/react";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import TrustedCompanies from "@/components/landing/TrustedCompanies";
import BentoGrid from "@/components/landing/BentoGrid";
import ScrollSequence from "@/components/landing/ScrollSequence";
import Testimonials from "@/components/landing/Testimonials";
import CTAFooter from "@/components/landing/CTAFooter";
import Footer from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <ReactLenis root>
      <main className="min-h-screen overflow-x-hidden">
        <Navbar />
        <Hero />
        <TrustedCompanies />
        <BentoGrid />
        <ScrollSequence />
        <Testimonials />
        <CTAFooter />
        <Footer />
      </main>
    </ReactLenis>
  );
}
