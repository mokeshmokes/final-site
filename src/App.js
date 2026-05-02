import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

/* ── Page components ── */
import CardDetail from "./pages/CardDetail";

/* ── Section components ── */
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
import QualityBadges from "./components/QualityBadges";
import ContactSection from "./components/ContactSection";
import NewsletterSection from "./components/NewsletterSection";
import PaymentSection from "./components/PaymentSection";
import MediaShowcase from "./components/MediaShowcase";
import Footer from "./components/Footer";
import TawkChat from "./components/TawkChat";
import Loader from "./components/Loader";
import "./App.css";

/* ── Home page (all sections) ── */
function Home() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <HeroSlider />
        <AboutSection />
        <ServicesSection />
        <StatsSection />
        <TeamSection />
        <SkillSection />
        <PartnersSection />
        <ShowcaseSection />
        <ProductsSection />
        <ITServicesSection />
        <TestimonialsSection />
        <QualityBadges />
        <ContactSection />
        <NewsletterSection />
        <PaymentSection />
        <MediaShowcase />
      </main>
      <Footer />
      <TawkChat />
    </div>
  );
}

/* ── Root app with router ── */
export default function App() {
  return (
    <BrowserRouter>
      <Loader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/card/:id" element={<CardDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
