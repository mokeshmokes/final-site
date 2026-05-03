import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion, useInView } from "framer-motion";
import { FaXTwitter, FaLinkedinIn, FaInstagram, FaGithub } from "react-icons/fa6";

import "swiper/css";
import "swiper/css/pagination";
import "./TeamSection.css";

const TEAM = [
    {
        name: "SWAMINATHAN",
        role: "Managing Director",
        desc: "As the Managing Director of Universal Technology, he leads the company with a strong vision, ensuring high-quality service delivery, innovation, and long-term client relationships.",
        image: "/images/owner2.jpg",
        color: "#2563eb",
        rgb: "37,99,235",
        socials: [
            { icon: FaXTwitter, href: "#" },
            { icon: FaLinkedinIn, href: "#" },
            { icon: FaInstagram, href: "#" },
        ],
    },
    {
        name: "SOWMYA",
        role: "Software Developer",
        desc: "At Universal Technology, she develops scalable and efficient software solutions, transforming business requirements into reliable applications that drive growth and performance.",
        image: "/images/sowmyaa.jpg",
        color: "#7c3aed",
        rgb: "124,58,237",
        socials: [
            { icon: FaXTwitter, href: "#" },
            { icon: FaLinkedinIn, href: "#" },
            { icon: FaGithub, href: "#" },
        ],
    },
    {
        name: "PRASANNA",
        role: "Web Developer",
        desc: "Responsible for designing and developing modern, responsive websites at Universal Technology, ensuring seamless user experience and high performance across all devices.",
        image: "/images/PRASANNA.jpg",
        color: "#059669",
        rgb: "5,150,105",
        socials: [
            { icon: FaXTwitter, href: "#" },
            { icon: FaLinkedinIn, href: "#" },
            { icon: FaInstagram, href: "#" },
        ],
    },
    {
        name: "SENGEETHA",
        role: "Auditor",
        desc: "Ensures financial accuracy and transparency at Universal Technology by maintaining proper auditing standards and supporting business compliance and accountability.",
        image: "/images/auditor.jpg",
        color: "#d97706",
        rgb: "217,119,6",
        socials: [
            { icon: FaXTwitter, href: "#" },
            { icon: FaLinkedinIn, href: "#" },
            { icon: FaInstagram, href: "#" },
        ],
    },
    {
        name: "GUNASEKER",
        role: "Auditor",
        desc: "Plays a key role in managing financial audits and maintaining structured financial records, ensuring operational integrity across all departments at Universal Technology.",
        image: "/images/GUNASEKER.jpg",
        color: "#0891b2",
        rgb: "8,145,178",
        socials: [
            { icon: FaXTwitter, href: "#" },
            { icon: FaLinkedinIn, href: "#" },
            { icon: FaInstagram, href: "#" },
        ],
    },
    {
        name: "RAJESH",
        role: "Hardware & Network Technician",
        desc: "Handles system installations, network configurations, and hardware maintenance, ensuring uninterrupted IT operations for all Universal Technology clients.",
        image: "/images/RAJESH.jpg",
        color: "#6d28d9",
        rgb: "109,40,217",
        socials: [
            { icon: FaXTwitter, href: "#" },
            { icon: FaLinkedinIn, href: "#" },
            { icon: FaGithub, href: "#" },
        ],
    },
    {
        name: "ABILASH",
        role: "CCTV Technician",
        desc: "Specializes in installing and maintaining surveillance systems, providing secure and reliable monitoring solutions for homes and businesses served by Universal Technology.",
        image: "/images/ABILASH.jpg",
        color: "#e11d48",
        rgb: "225,29,72",
        socials: [
            { icon: FaXTwitter, href: "#" },
            { icon: FaLinkedinIn, href: "#" },
            { icon: FaInstagram, href: "#" },
        ],
    },
    {
        name: "SARAVANAN",
        role: "Marketing",
        desc: "Drives brand visibility and customer engagement for Universal Technology through strategic marketing initiatives, outreach campaigns, and strong client relationship management.",
        image: "/images/SARAVANAN.jpg",
        color: "#059669",
        rgb: "5,150,105",
        socials: [
            { icon: FaXTwitter, href: "#" },
            { icon: FaLinkedinIn, href: "#" },
            { icon: FaInstagram, href: "#" },
        ],
    },
    {
        name: "UMA",
        role: "General Client",
        desc: "Represents the satisfied customers of Universal Technology, benefiting from reliable service, timely support, and quality IT solutions tailored to everyday needs.",
        image: "/images/uma.jpg",
        color: "#d97706",
        rgb: "217,119,6",
        socials: [
            { icon: FaXTwitter, href: "#" },
            { icon: FaLinkedinIn, href: "#" },
            { icon: FaInstagram, href: "#" },
        ],
    },
    {
        name: "VIGNEESH",
        role: "General Client",
        desc: "A valued client of Universal Technology who experienced professional service delivery, efficient problem-solving, and a team that genuinely cares about customer satisfaction.",
        image: "/images/VIGNESH.jpg",
        color: "#2563eb",
        rgb: "37,99,235",
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
                <p className="team-card__desc" style={{ color: "#2563eb" }}>{desc}</p>
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
                        United by excellence and driven by innovation, we collaborate closely with you to bring every project to life with precision and care.
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