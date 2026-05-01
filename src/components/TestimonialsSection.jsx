import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion, useInView } from "framer-motion";
import { Quote, Star } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";
import "./TestimonialsSection.css";

/* ─── Testimonial data ─── */
const TESTIMONIALS = [
    {
        text: "JUSCO transformed our entire digital presence. Their team delivered a stunning website that exceeded every expectation — on time and within budget. Truly world-class service.",
        name: "Michael Anderson",
        role: "CEO, TechVentures Inc.",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=120&q=80",
        rating: 5,
    },
    {
        text: "The UI/UX design work from JUSCO is phenomenal. They understood our brand vision immediately and translated it into a beautiful, intuitive product our users absolutely love.",
        name: "Sarah Mitchell",
        role: "Product Director, NovaSoft",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&q=80",
        rating: 5,
    },
    {
        text: "From e-commerce development to SEO strategy, JUSCO handled everything flawlessly. Our online sales increased by 140% within three months of launch. Incredible results.",
        name: "David Chen",
        role: "Founder, ShopElite",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80",
        rating: 5,
    },
    {
        text: "Professional, responsive, and highly skilled. JUSCO's WordPress customization work gave us a site that's fast, secure, and easy to manage. Highly recommend their team.",
        name: "Priya Sharma",
        role: "Marketing Head, BrandAxis",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&q=80",
        rating: 5,
    },
    {
        text: "The branding package JUSCO delivered was exceptional. Our new logo and brand identity perfectly capture who we are. The attention to detail and creativity was outstanding.",
        name: "James Okafor",
        role: "Creative Director, Luminary Co.",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&q=80",
        rating: 5,
    },
];

const headingVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
    }),
};

function StarRow({ count }) {
    return (
        <div className="testi-card__stars">
            {Array.from({ length: count }).map((_, i) => (
                <Star key={i} size={14} className="testi-card__star" fill="currentColor" />
            ))}
        </div>
    );
}

export default function TestimonialsSection() {
    const headerRef = useRef(null);
    const headerView = useInView(headerRef, { once: true, margin: "-80px" });

    return (
        <section className="testi" id="testimonials">
            {/* Background image with overlay */}
            <div className="testi__bg" />
            <div className="testi__overlay" />

            <div className="testi__container">
                {/* Header — relative so Justdial logo can be positioned top-right */}
                <div className="testi__header" ref={headerRef}>
                    <motion.div
                        className="testi__tag"
                        variants={headingVariants} custom={0}
                        initial="hidden" animate={headerView ? "visible" : "hidden"}
                    >
                        <span className="testi__tag-dot" />
                        Client Reviews
                    </motion.div>

                    <motion.h2
                        className="testi__heading"
                        variants={headingVariants} custom={1}
                        initial="hidden" animate={headerView ? "visible" : "hidden"}
                    >
                        OUR <span className="testi__heading-accent">CLIENTS</span> SAY
                    </motion.h2>

                    <motion.div
                        className="testi__divider"
                        initial={{ scaleX: 0 }}
                        animate={headerView ? { scaleX: 1 } : { scaleX: 0 }}
                        transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    />

                    {/* Justdial logo — top-right of header */}
                  <motion.img
    src="/images/justdial.jpg"
    alt="Justdial"
    className="testi__justdial-logo"
    style={{ width: "180px", height: "auto" }}
    initial={{ opacity: 0, scale: 0.85 }}
    animate={headerView ? { opacity: 1, scale: 1.1 } : {}}
    transition={{ delay: 0.5, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
/> 
                </div>

                {/* Swiper carousel */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={headerView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.4 }}
                >
                    <Swiper
                        modules={[Autoplay, Pagination]}
                        slidesPerView={1}
                        spaceBetween={28}
                        autoplay={{ delay: 4500, disableOnInteraction: false }}
                        pagination={{ clickable: true, el: ".testi__dots" }}
                        loop
                        speed={800}
                        breakpoints={{
                            640: { slidesPerView: 1 },
                            900: { slidesPerView: 2 },
                            1200: { slidesPerView: 3 },
                        }}
                        className="testi__swiper"
                    >
                        {TESTIMONIALS.map((t, i) => (
                            <SwiperSlide key={i}>
                                <div className="testi-card">
                                    {/* Quote icon */}
                                    <div className="testi-card__quote-icon">
                                        <Quote size={22} fill="currentColor" />
                                    </div>

                                    {/* Stars */}
                                    <StarRow count={t.rating} />

                                    {/* Review text */}
                                    <p className="testi-card__text">"{t.text}"</p>

                                    {/* Author */}
                                    <div className="testi-card__author">
                                        <div className="testi-card__avatar-wrap">
                                            <img
                                                src={t.image}
                                                alt={t.name}
                                                className="testi-card__avatar"
                                            />
                                        </div>
                                        <div className="testi-card__author-info">
                                            <span className="testi-card__name">{t.name}</span>
                                            <span className="testi-card__role">{t.role}</span>
                                        </div>
                                    </div>

                                    {/* Hover glow */}
                                    <div className="testi-card__glow" />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Pagination dots */}
                    <div className="testi__dots" />
                </motion.div>
            </div>
        </section>
    );
}
