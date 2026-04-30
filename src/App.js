import React from "react";
import Navbar from "./components/Navbar";
import HeroSlider from "./components/HeroSlider";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import StatsSection from "./components/StatsSection";
import TeamSection from "./components/TeamSection";
import SkillSection from "./components/SkillSection";
import PartnersSection from "./components/PartnersSection";
import ShowcaseSection from "./components/ShowcaseSection";
import ITServicesSection from "./components/ITServicesSection";
import ProductsSection from "./components/ProductsSection";
import TestimonialsSection from "./components/TestimonialsSection";
import ContactSection from "./components/ContactSection";
import PaymentSection from "./components/PaymentSection";
import Footer from "./components/Footer";
import TawkChat from "./components/TawkChat";
import "./App.css";

function App() {
  return (
    <div className="app">
      {/* 1 — Navbar */}
      <Navbar />

      <main>
        {/* 2 — Hero Slider */}
        <HeroSlider />

        {/* 3 — About Section */}
        <AboutSection />

        {/* 4 — What Jusco Do (Services cards) */}
        <ServicesSection />

        {/* 5 — Numbers That Speak (Counter section) */}
        <StatsSection />

        {/* 6 — Team of Experts (slider) */}
        <TeamSection />

        {/* 7 — Evolution & Growth (Skills / progress bars) */}
        <SkillSection />

        {/* 8 — Trusted by Industry Leaders (Company logos slider) */}
        <PartnersSection />

        {/* 9 — Services Slideshow Section */}
        <ShowcaseSection />

        {/* 10 — Our Products */}
        <ProductsSection />

        {/* 11 — Professional IT Services */}
        <ITServicesSection />

        {/* 12 — Client Reviews (Testimonials) */}
        <TestimonialsSection />

        {/* 13 — Contact Section */}
        <ContactSection />

        {/* 14 — Mode of Payment */}
        <PaymentSection />
      </main>

      {/* 15 — Footer */}
      <Footer />

      {/* Live Chat — renders nothing, injects Tawk.to widget */}
      <TawkChat />
    </div>
  );
}

export default App;
