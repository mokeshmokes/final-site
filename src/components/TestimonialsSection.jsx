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
        text: "They are very professional and do what they say. You will not be disappointed. Develops constructive working relationships with clients.",
        name: "Gayathri",
        role: "",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=120&q=80",
        rating: 5,
    },
    {
        text: "Excellent Service, Superb Product, 100% Satisfaction shows willingness to go extra mile during peak of work",
        name: "CHANDRAN",
        role: "",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&q=80",
        rating: 5,
    },
    {
        text: "YOU ARE PILLER OF MY LIFE WHICH IS A STORY, THANK YOU FOR BEING PART OF MY STORY It's amazing and excellent service Best Service Provider in SALEM Effective communicator and good demonstrator.",
        name: "HARIHARAKRISHNAN",
        role: "",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80",
        rating: 5,
    },
    {
        text: "capable of translating vision into actions.Super thankful for your service! My computer works smoother than ever. The tech is very skilled, appreciate that patience and hard work you put into fixing my computer. Thank you thank you thank you!",
        name: "USHA",
        role: "",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&q=80",
        rating: 5,
    },
    {
        text: "The team managed to fix a computer we were told was beyond fixing and we are grateful! Displays strong work ethic and sets",
        name: "UMA",
        role: "",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&q=80",
        rating: 5,
    },
     {
        text: "Great Service provided. Knowledgeable and helpful.consistently delivers beyond expectations",
        name: "VIGNESH",
        role: "",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&q=80",
        rating: 5,
    },
    {
        text: "The service at this place is great. They are very expensive but if you have an issue and they say they can fix it. They fix it!!! Always addresses underlying causes of problems and solve it successfully",
        name: "sowmyaa",
        role: "",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&q=80",
        rating: 5,
    },
     {
        text: "Great deal and great company I'm very happy with all of your products thank you. willing to experiment fresh approaches and ideas.",
        name: "KARTHICK",
        role: "",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&q=80",
        rating: 5,
    },
     {
        text: "Able to handle difficult customers and situations.Great service at great prices. Check them out with your faulty pc/laptop; you won't regret it",
        name: "RAJALAKSHMI",
        role: "",
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
