import { useRef } from "react";
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
        text: "Universal Technology delivered excellent service with a quick turnaround. Their team is highly professional, reliable, and always goes the extra mile for customers.",
        name: "Gayathri",
        role: "",
        image: "/images/Gayathri.jpg",
        rating: 5,
    },
    {
        text: "Excellent service and superb product quality — 100% satisfaction guaranteed. They show a genuine willingness to go the extra mile even during peak workloads.",
        name: "CHANDRAN",
        role: "",
        image: "/images/chandran.jpg",
        rating: 5,
    },
    {
        text: "Best service provider in Salem! Amazing technical expertise and an effective communicator. They truly understand customer needs and deliver outstanding results every time.",
        name: "HARIHARAKRISHNAN",
        role: "",
        image: "/images/HARIHARAKRISHNAN.jpg",
        rating: 5,
    },
    {
        text: "The team managed to fix a computer we were told was beyond repair. Highly skilled technicians with a strong work ethic and a dedication to solving problems completely.",
        name: "UMA",
        role: "",
        image: "/images/uma.jpg",
        rating: 5,
    },
    {
        text: "Great service provided — knowledgeable, helpful, and consistently delivers beyond expectations. I am very impressed with their technical knowledge and professionalism.",
        name: "VIGNESH",
        role: "",
        image: "/images/VIGNESH.jpg",
        rating: 5,
    },
    // {
    //     text: "The service here is outstanding. They always address the underlying cause of problems and solve them successfully. If they say they can fix it, they fix it — every time.",
    //     name: "sowmyaa",
    //     role: "",
    //     image: "/images/sowmyaa.jpg",
    //     rating: 5,
    // },
    {
        text: "Great service at great prices. My laptop issue was resolved faster than expected. Affordable pricing with no compromise on quality — highly recommended for everyone.",
        name: "RAJALAKSHMI",
        role: "",
        image: "/images/RAJALAKSHMI.jpg",
        rating: 5,
    },
    {
        text: "Friendly approach and clear communication throughout the entire service process. Their customer handling is excellent and the results speak for themselves.",
        name: "BRINDHA",
        role: "",
        image: "/images/BRINDHA.jpg",
        rating: 5,
    },
    {
        text: "Reliable and trustworthy service provider. They handled my system issues very efficiently and explained every step clearly. I will definitely return for future needs.",
        name: "SANTHIYA",
        role: "",
        image: "/images/SANTHIYA.jpg",
        rating: 5,
    },
    {
        text: "Very skilled technicians and great support throughout. My system is now running perfectly. I am completely satisfied with the quality and speed of their service.",
        name: "RAJASEKER",
        role: "",
        image: "/images/RAJASEKER.jpg",
        rating: 5,
    },
    {
        text: "Excellent experience with Universal Technology. Their solutions are effective and long-lasting. The team is patient, thorough, and truly committed to customer satisfaction.",
        name: "MANI",
        role: "",
        image: "/images/MANI.jpg",
        rating: 5,
    },
    {
        text: "They provide clear explanations and fix issues perfectly the first time. Highly professional service with a team that genuinely cares about the outcome for each customer.",
        name: "SRIKANTH DEVA",
        role: "",
        image: "/images/SRIKANTH DEVA.jpg",
        rating: 5,
    },
    {
        text: "Great support and timely service delivery. My system performance improved significantly after their maintenance. I appreciate their dedication and attention to detail.",
        name: "NATASAN",
        role: "",
        image: "/images/NATASAN.jpg",
        rating: 5,
    },
    {
        text: "Very responsive team with excellent technical knowledge. They diagnosed and resolved my issue quickly and professionally. Highly recommended to anyone in Salem.",
        name: "VIJAYARAGAVAN",
        role: "",
        image: "/images/VIJAYARAGAVAN.jpg",
        rating: 5,
    },
    {
        text: "Smooth service process and great results every time. I appreciate their dedication and effort. Universal Technology is my go-to for all IT needs without hesitation.",
        name: "SENTHIL",
        role: "",
        image: "/images/SENTHIL.jpg",
        rating: 5,
    },
    {
        text: "Good pricing and excellent service quality. Very happy with their work and the way they handled my request. The entire experience was professional from start to finish.",
        name: "VINOTH",
        role: "",
        image: "/images/VINOTH.jpg",
        rating: 5,
    },
    {
        text: "Professional and efficient service from start to finish. They handled everything perfectly and kept me informed throughout. A truly reliable IT partner in Salem.",
        name: "NIVATHAA",
        role: "",
        image: "/images/NIVATHAA.jpg",
        rating: 5,
    },
    {
        text: "Great experience working with Universal Technology. Highly reliable service with a team that is always available and ready to help. I strongly recommend their services.",
        name: "RAMOORTHY",
        role: "",
        image: "/images/RAMOORTHY.jpg",
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
