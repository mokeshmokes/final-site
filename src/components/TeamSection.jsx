import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion, useInView } from "framer-motion";
import { FaXTwitter, FaLinkedinIn, FaInstagram, FaGithub } from "react-icons/fa6";

import "swiper/css";
import "swiper/css/pagination";
import "./TeamSection.css";

const TEAM = [
    {
        name: "Rajesh Kumar",
        role: "Managing Director",
        desc: "Rajesh drives the company's vision and strategic direction with over 15 years of leadership in the IT industry. His commitment to excellence sets the standard for every team and project.",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&q=80",
        color: "#2563eb",
        rgb: "37,99,235",
        socials: [
            { icon: FaXTwitter, href: "#" },
            { icon: FaLinkedinIn, href: "#" },
            { icon: FaInstagram, href: "#" },
        ],
    },
    {
        name: "Arjun Mehta",
        role: "Software Developer",
        desc: "Arjun builds robust, scalable software solutions with expertise in full-stack development. He turns complex requirements into clean, efficient code that powers our clients' businesses.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80",
        color: "#7c3aed",
        rgb: "124,58,237",
        socials: [
            { icon: FaXTwitter, href: "#" },
            { icon: FaLinkedinIn, href: "#" },
            { icon: FaGithub, href: "#" },
        ],
    },
    {
        name: "Priya Sharma",
        role: "Web Developer",
        desc: "Priya crafts responsive, high-performance websites that combine beautiful design with technical precision. Her attention to detail ensures every pixel and interaction is flawless.",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&q=80",
        color: "#059669",
        rgb: "5,150,105",
        socials: [
            { icon: FaXTwitter, href: "#" },
            { icon: FaLinkedinIn, href: "#" },
            { icon: FaInstagram, href: "#" },
        ],
    },
    {
        name: "Lola Fernandez",
        role: "Accountant",
        desc: "Lola keeps our financial operations precise and transparent. Her expertise in business finance ensures every project is delivered on budget with full accountability.",
        image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=500&q=80",
        color: "#d97706",
        rgb: "217,119,6",
        socials: [
            { icon: FaXTwitter, href: "#" },
            { icon: FaLinkedinIn, href: "#" },
            { icon: FaInstagram, href: "#" },
        ],
    },
    {
        name: "Vikram Nair",
        role: "Hardware & Network Technician",
        desc: "Vikram designs and maintains reliable network infrastructure and hardware systems. His hands-on expertise keeps our clients' IT environments running at peak performance.",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&q=80",
        color: "#0891b2",
        rgb: "8,145,178",
        socials: [
            { icon: FaXTwitter, href: "#" },
            { icon: FaLinkedinIn, href: "#" },
            { icon: FaGithub, href: "#" },
        ],
    },
    {
        name: "Suresh Babu",
        role: "CCTV Technician",
        desc: "Suresh specializes in the installation and maintenance of advanced surveillance systems. He ensures every security setup is optimized for maximum coverage and reliability.",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&q=80",
        color: "#6d28d9",
        rgb: "109,40,217",
        socials: [
            { icon: FaXTwitter, href: "#" },
            { icon: FaLinkedinIn, href: "#" },
            { icon: FaInstagram, href: "#" },
        ],
    },
];

const headingVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
    }),
};

function TeamCard({ name, role, desc, image, color, rgb, socials }) {
    return (
        <div className="team-card" style={{ "--tc-color": color, "--tc-rgb": rgb }}>
            {/* Image */}
            <div className="team-card__img-wrap">
                <img src={image} alt={name} className="team-card__img" />
                <div className="team-card__img-overlay" />

                {/* Social icons — slide up on hover */}
                <div className="team-card__socials">
                    {socials.map(({ icon: Icon, href }, i) => (
                        <a
                            key={i}
                            href={href}
                            className="team-card__social-btn"
                            aria-label={`${name} social link`}
                            style={{ transitionDelay: `${i * 0.05}s` }}
                        >
                            <Icon style={{ fontSize: "16px" }} />
                        </a>
                    ))}
                </div>

                {/* Role badge */}
                <span className="team-card__role-badge">{role}</span>
            </div>

            {/* Content */}
            <div className="team-card__body">
                <h3 className="team-card__name">{name}</h3>
                <p className="team-card__desc">{desc}</p>
            </div>

            {/* Bottom accent */}
            <div className="team-card__accent" />
        </div>
    );
}

export default function TeamSection() {
    const headingRef = useRef(null);
    const headingView = useInView(headingRef, { once: true, margin: "-80px" });

    return (
        <section className="team" id="team">
            <div className="team__bg-orb team__bg-orb--1" />
            <div className="team__bg-orb team__bg-orb--2" />

            <div className="team__container">
                {/* Header */}
                <div className="team__header" ref={headingRef}>
                    <motion.div
                        className="team__tag"
                        variants={headingVariants} custom={0}
                        initial="hidden" animate={headingView ? "visible" : "hidden"}
                    >
                        <span className="team__tag-dot" />
                        One &amp; Only
                    </motion.div>

                    <motion.h2
                        className="team__heading"
                        variants={headingVariants} custom={1}
                        initial="hidden" animate={headingView ? "visible" : "hidden"}
                    >
                        Team of <span className="team__heading-accent">Experts</span>
                    </motion.h2>

                    <motion.p
                        className="team__subheading"
                        variants={headingVariants} custom={2}
                        initial="hidden" animate={headingView ? "visible" : "hidden"}
                    >
                        Meet the talented people behind every project — a diverse team
                        united by a shared passion for excellence and innovation.
                    </motion.p>

                    <motion.div
                        className="team__divider"
                        initial={{ scaleX: 0 }}
                        animate={headingView ? { scaleX: 1 } : { scaleX: 0 }}
                        transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    />
                </div>

                {/*
         * Swiper carousel
         * — pagination is managed internally (no external el selector)
         *   so the instance always initialises correctly
         * — pauseOnMouseEnter pauses autoplay when hovering any card
         */}
                <Swiper
                    modules={[Autoplay, Pagination]}
                    autoplay={{
                        delay: 1,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: false,
                    }}
                    pagination={{ clickable: true }}
                    loop
                    speed={4000}
                    spaceBetween={24}
                    breakpoints={{
                        0: { slidesPerView: 1, spaceBetween: 16 },
                        768: { slidesPerView: 2, spaceBetween: 24 },
                        1024: { slidesPerView: 3, spaceBetween: 24 },
                    }}
                    className="team__swiper"
                >
                    {TEAM.map((member) => (
                        <SwiperSlide key={member.name}>
                            <TeamCard {...member} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
