import React, { useState, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import { ArrowRight, Play, ChevronDown } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "./HeroSlider.css";

/* ─── Slide data ─── */
const SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1600&q=80",
    tag: "Innovation & Growth",
    title: "Transforming Ideas Into",
    titleAccent: "Digital Reality",
    description:
      "We craft cutting-edge digital solutions that empower businesses to scale, innovate, and lead in an ever-evolving marketplace.",
    cta: "Explore Our Work",
    ctaSecondary: "Watch Demo",
    gradient: "linear-gradient(135deg, rgba(10,10,20,0.75) 0%, rgba(10,10,30,0.55) 100%)",
  },
  {
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600&q=80",
    tag: "World-Class Team",
    title: "Driven by Passion,",
    titleAccent: "Powered by Expertise",
    description:
      "Our team of seasoned professionals brings decades of combined experience to deliver solutions that exceed expectations every time.",
    cta: "Meet Our Team",
    ctaSecondary: "Our Story",
    gradient: "linear-gradient(135deg, rgba(10,10,20,0.78) 0%, rgba(20,10,30,0.55) 100%)",
  },
  {
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1600&q=80",
    tag: "Enterprise Solutions",
    title: "Building Tomorrow's",
    titleAccent: "Business Today",
    description:
      "From strategy to execution, we partner with enterprises to design scalable architectures and deliver measurable business outcomes.",
    cta: "Get Started",
    ctaSecondary: "View Services",
    gradient: "linear-gradient(135deg, rgba(10,10,20,0.72) 0%, rgba(10,20,30,0.52) 100%)",
  },
  {
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&q=80",
    tag: "Strategic Consulting",
    title: "Your Vision,",
    titleAccent: "Our Blueprint",
    description:
      "We align technology with your business goals through deep strategic consulting, ensuring every decision drives real, lasting value.",
    cta: "Start a Project",
    ctaSecondary: "Case Studies",
    gradient: "linear-gradient(135deg, rgba(10,10,20,0.76) 0%, rgba(20,10,20,0.54) 100%)",
  },
];

/* ─── Stat counter ─── */
const STATS = [
  { value: "500+", label: "Projects Delivered" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "12+", label: "Years Experience" },
  { value: "80+", label: "Team Members" },
];

export default function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSlideChange = useCallback((swiper) => {
    setIsAnimating(true);
    setActiveIndex(swiper.realIndex);
    setTimeout(() => setIsAnimating(false), 600);
  }, []);

  return (
    <section className="hero" id="home">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 5500, disableOnInteraction: false }}
        pagination={{ clickable: true, el: ".hero__dots" }}
        navigation={{
          nextEl: ".hero__arrow--next",
          prevEl: ".hero__arrow--prev",
        }}
        loop
        speed={900}
        onSlideChange={handleSlideChange}
        className="hero__swiper"
      >
        {SLIDES.map((slide, i) => (
          <SwiperSlide key={i}>
            {/* Background image */}
            <div
              className="hero__bg"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            {/* Gradient overlay */}
            <div className="hero__overlay" style={{ background: slide.gradient }} />
            {/* Noise texture */}
            <div className="hero__noise" />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ── Content (outside Swiper so it animates independently) ── */}
      <div className={`hero__content ${isAnimating ? "hero__content--exit" : "hero__content--enter"}`}>
        <div className="hero__content-inner">

          {/* Tag */}
          <div className="hero__tag">
            <span className="hero__tag-dot" />
            {SLIDES[activeIndex].tag}
          </div>

          {/* Heading */}
          <h1 className="hero__heading">
            {SLIDES[activeIndex].title}
            <br />
            <span className="hero__heading-accent">
              {SLIDES[activeIndex].titleAccent}
            </span>
          </h1>

          {/* Description */}
          <p className="hero__description">
            {SLIDES[activeIndex].description}
          </p>

          {/* CTA buttons */}
          <div className="hero__ctas">
            <button className="hero__btn hero__btn--primary">
              {SLIDES[activeIndex].cta}
              <ArrowRight size={18} className="hero__btn-icon" />
            </button>
            <button className="hero__btn hero__btn--ghost">
              <span className="hero__play-ring">
                <Play size={14} fill="currentColor" />
              </span>
              {SLIDES[activeIndex].ctaSecondary}
            </button>
          </div>

          {/* Stats row */}
          <div className="hero__stats">
            {STATS.map((stat, i) => (
              <div key={i} className="hero__stat">
                <span className="hero__stat-value">{stat.value}</span>
                <span className="hero__stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Custom navigation arrows ── */}
      <button className="hero__arrow hero__arrow--prev" aria-label="Previous slide">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <button className="hero__arrow hero__arrow--next" aria-label="Next slide">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* ── Pagination dots ── */}
      <div className="hero__dots" />

      {/* ── Slide counter ── */}
      <div className="hero__counter">
        <span className="hero__counter-current">
          {String(activeIndex + 1).padStart(2, "0")}
        </span>
        <span className="hero__counter-sep" />
        <span className="hero__counter-total">
          {String(SLIDES.length).padStart(2, "0")}
        </span>
      </div>

      {/* ── Scroll indicator ── */}
      <a href="#about-us" className="hero__scroll" aria-label="Scroll down">
        <span className="hero__scroll-text">Scroll</span>
        <span className="hero__scroll-line">
          <ChevronDown size={16} className="hero__scroll-chevron" />
        </span>
      </a>

      {/* ── Decorative floating orbs ── */}
      <div className="hero__orb hero__orb--1" />
      <div className="hero__orb hero__orb--2" />
    </section>
  );
}
