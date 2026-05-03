import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCube, Autoplay, Pagination, Navigation } from "swiper/modules";
import { ChevronDown } from "lucide-react";

import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./HeroSlider.css";

/* ─── Slide data (unchanged) ─── */
const SLIDES = [
  {
  image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=80",
  tag: "Technology Without Boundaries",
  title: "Empowering Every",
  titleAccent: "Dream, Everywhere",
  description: "Universal technology bridges gaps, breaks barriers, and brings opportunity to every corner of the world — because progress should have no limits.",
  cta: "Discover How",
  ctaSecondary: "Watch Impact",
  gradient: "linear-gradient(135deg, rgba(0,20,40,0.75) 0%, rgba(0,40,60,0.55) 100%)",
},
  {
  image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1600&q=80",
  tag: "Innovation for All",
  title: "Technology That",
  titleAccent: "Leaves No One Behind",
  description: "From rural communities to global enterprises, universal access to smart technology creates a future where everyone can learn, grow, and succeed together.",
  cta: "See the Vision",
  ctaSecondary: "Global Stories",
  gradient: "linear-gradient(135deg, rgba(20,20,35,0.75) 0%, rgba(30,30,50,0.55) 100%)",
},
 {
  image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1600&q=80",
  tag: "Human-Centered Tech",
  title: "Serving Humanity,",
  titleAccent: "One Solution at a Time",
  description: "Universal technology isn't just smart — it's kind, accessible, and designed to uplift. It turns complexity into clarity and problems into possibilities.",
  cta: "Explore Impact",
  ctaSecondary: "Our Promise",
  gradient: "linear-gradient(135deg, rgba(30,20,35,0.78) 0%, rgba(40,30,45,0.55) 100%)",
},
 {
  image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1600&q=80",
  tag: "Universal Connection",
  title: "Bringing the World",
  titleAccent: "Closer Together",
  description: "With universal technology, distance disappears. Ideas flow freely, collaborations thrive, and every voice finds its place in a truly connected world.",
  cta: "Join the Movement",
  ctaSecondary: "Learn More",
  gradient: "linear-gradient(135deg, rgba(10,20,25,0.72) 0%, rgba(20,30,40,0.52) 100%)",
},
  {
  image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1600&q=80",
  tag: "A Brighter Tomorrow",
  title: "Building Hope,",
  titleAccent: "With Code & Compassion",
  description: "Universal technology is the great equalizer. It fuels education, healthcare, and opportunity — turning today's challenges into tomorrow's breakthroughs.",
  cta: "See the Future",
  ctaSecondary: "Our Mission",
  gradient: "linear-gradient(135deg, rgba(15,20,35,0.76) 0%, rgba(25,30,45,0.54) 100%)",
},
];

/* ─── Stat counter (unchanged) ─── */
const STATS = [
  { value: "500+", label: "Projects Delivered" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "12+", label: "Years Experience" },
  { value: "80+", label: "Team Members" },
];

export default function HeroSlider() {
  return (
    <section className="hero" id="home">
      <Swiper
        modules={[EffectCube, Autoplay, Pagination, Navigation]}
        effect="cube"
        grabCursor={false}
        cubeEffect={{
          shadow: true,
          slideShadows: true,
          shadowOffset: 20,
          shadowScale: 0.94,
        }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true, el: ".hero__dots" }}
        navigation={{
          nextEl: ".hero__arrow--next",
          prevEl: ".hero__arrow--prev",
        }}
        loop
        speed={800}
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

            {/* ── Slide content (inside each slide for cube effect) ── */}
            <div className="hero__content hero__content--enter">
              <div className="hero__content-inner">

                {/* Tag */}
                <div className="hero__tag">
                  <span className="hero__tag-dot" />
                  {slide.tag}
                </div>

                {/* Heading */}
                <h1 className="hero__heading">
                  {slide.title}
                  <br />
                  <span className="hero__heading-accent">{slide.titleAccent}</span>
                </h1>

                {/* Description */}
                <p className="hero__description">{slide.description}</p>

                {/* Stats row */}
                <div className="hero__stats">
                  {STATS.map((stat, j) => (
                    <div key={j} className="hero__stat">
                      <span className="hero__stat-value">{stat.value}</span>
                      <span className="hero__stat-label">{stat.label}</span>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ── Custom navigation arrows (outside Swiper, z-index above cube) ── */}
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

      {/* ── Scroll indicator ── */}
      <a href="#intro" className="hero__scroll" aria-label="Scroll down">
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
