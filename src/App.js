import React from "react";
import Navbar from "./components/Navbar";
import HeroSlider from "./components/HeroSlider";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import ITServicesSection from "./components/ITServicesSection";
import ProductsSection from "./components/ProductsSection";
import StatsSection from "./components/StatsSection";
import TeamSection from "./components/TeamSection";
import SkillSection from "./components/SkillSection";
import PartnersSection from "./components/PartnersSection";
import ShowcaseSection from "./components/ShowcaseSection";
import TestimonialsSection from "./components/TestimonialsSection";
import ContactBar from "./components/ContactBar";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import TawkChat from "./components/TawkChat";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        {/* Task 1 — Hero */}
        <HeroSlider />

        {/* Task 2 — About + Services */}
        <AboutSection />
        <ServicesSection />

        {/* Task 8 — IT Services + Products */}
        <ITServicesSection />
        <ProductsSection />

        {/* Task 3 — Stats / Counters */}
        <StatsSection />

        {/* Task 4 — Team + Skills */}
        <TeamSection />
        <SkillSection />

        {/* Task 5 — Partners Logo Slider */}
        <PartnersSection />

        {/* Task 6 — Showcase Slider + Tabs */}
        <ShowcaseSection />

        {/* Task 7 — Testimonials + Contact Info Bar */}
        <TestimonialsSection />
        <ContactBar />

        {/* Task 9 — Contact Form */}
        <ContactSection />
      </main>

      {/* Task 9 — Footer */}
      <Footer />

      {/* Live Chat — Tawk.to (renders nothing, injects widget script) */}
      <TawkChat />
    </div>
  );
}

export default App;
