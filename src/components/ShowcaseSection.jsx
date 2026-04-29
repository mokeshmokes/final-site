import React, { useState, useRef, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, EffectFade } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import {
    Lightbulb, RefreshCw, Megaphone, MoreHorizontal, ClipboardList,
    ArrowRight,
} from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "./ShowcaseSection.css";

/* ─── Tab data ─── */
const TABS = [
    {
        id: "realization",
        label: "Realization",
        icon: Lightbulb,
        image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1600&q=80",
        title: "Turning Vision Into Reality",
        desc: "We take your ideas from concept to fully realized digital products — with precision engineering and creative execution at every step.",
        cta: "See Our Work",
    },
    {
        id: "tweek",
        label: "Tweek & Update",
        icon: RefreshCw,
        image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1600&q=80",
        title: "Continuous Improvement",
        desc: "Great products evolve. We provide ongoing optimization, updates, and refinements to keep your digital presence sharp and competitive.",
        cta: "Learn More",
    },
    {
        id: "marketing",
        label: "Marketing",
        icon: Megaphone,
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=80",
        title: "Amplify Your Brand",
        desc: "Data-driven marketing strategies that connect your brand with the right audience — driving traffic, leads, and measurable growth.",
        cta: "Explore Strategy",
    },
    {
        id: "other",
        label: "Other",
        icon: MoreHorizontal,
        image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600&q=80",
        title: "Beyond The Ordinary",
        desc: "From custom integrations to specialized consulting, we offer a wide range of services tailored to your unique business challenges.",
        cta: "Get In Touch",
    },
    {
        id: "planning",
        label: "Planning The Project",
        icon: ClipboardList,
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&q=80",
        title: "Strategic Project Planning",
        desc: "Every successful project starts with a solid plan. We map out timelines, milestones, and deliverables to ensure seamless execution.",
        cta: "Start Planning",
    },
];

/* ─── Background slider images (independent of tabs) ─── */
const BG_SLIDES = [
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1600&q=80",
    "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1600&q=80",
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600&q=80",
];

const contentVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, y: -16, transition: { duration: 0.3 } },
};

export default function ShowcaseSection() {
    const [activeTab, setActiveTab] = useState(TABS[0]);
    const swiperRef = useRef(null);

    const handleTabClick = useCallback((tab) => {
        setActiveTab(tab);
    }, []);

    return (
        <section className="showcase" id="showcase">

            {/* ── Background slider ── */}
            <div className="showcase__slider">
                <Swiper
                    modules={[Autoplay, Navigation, EffectFade]}
                    effect="fade"
                    fadeEffect={{ crossFade: true }}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    navigation={{
                        nextEl: ".showcase__arrow--next",
                        prevEl: ".showcase__arrow--prev",
                    }}
                    loop
                    speed={900}
                    onSwiper={(s) => { swiperRef.current = s; }}
                    className="showcase__swiper"
                >
                    {BG_SLIDES.map((img, i) => (
                        <SwiperSlide key={i}>
                            <div
                                className="showcase__slide-bg"
                                style={{ backgroundImage: `url(${img})` }}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Dark overlay */}
                <div className="showcase__overlay" />

                {/* Center content — changes with active tab */}
                <div className="showcase__center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab.id}
                            className="showcase__center-inner"
                            variants={contentVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <div className="showcase__center-tag">
                                <activeTab.icon size={14} />
                                {activeTab.label}
                            </div>
                            <h2 className="showcase__center-title">{activeTab.title}</h2>
                            <p className="showcase__center-desc">{activeTab.desc}</p>
                            <button className="showcase__center-btn">
                                {activeTab.cta}
                                <ArrowRight size={16} />
                            </button>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Navigation arrows */}
                <button className="showcase__arrow showcase__arrow--prev" aria-label="Previous">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                </button>
                <button className="showcase__arrow showcase__arrow--next" aria-label="Next">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                    </svg>
                </button>
            </div>

            {/* ── Floating tab bar ── */}
            <div className="showcase__tabs-wrap">
                <div className="showcase__tabs">
                    {TABS.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab.id === tab.id;
                        return (
                            <button
                                key={tab.id}
                                className={`showcase__tab ${isActive ? "showcase__tab--active" : ""}`}
                                onClick={() => handleTabClick(tab)}
                            >
                                <span className="showcase__tab-icon">
                                    <Icon size={16} />
                                </span>
                                <span className="showcase__tab-label">{tab.label}</span>
                                {isActive && (
                                    <motion.span
                                        className="showcase__tab-indicator"
                                        layoutId="tab-indicator"
                                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                                    />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

        </section>
    );
}
