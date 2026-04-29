import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaXTwitter, FaLinkedinIn, FaInstagram, FaGithub } from "react-icons/fa6";
import "./TeamSection.css";

const TEAM = [
    {
        name: "Aria Saal",
        role: "Manager",
        desc: "Aria leads our project teams with a sharp strategic mind and a passion for delivering results. She ensures every client engagement runs smoothly from kickoff to launch.",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&q=80",
        color: "#2563eb",
        rgb: "37,99,235",
        socials: [
            { icon: FaXTwitter, href: "#" },
            { icon: FaLinkedinIn, href: "#" },
            { icon: FaInstagram, href: "#" },
        ],
    },
    {
        name: "Eliea Summers",
        role: "Designer",
        desc: "Eliea crafts stunning visual experiences that balance aesthetics with usability. Her eye for detail and creative instincts bring every brand story to life.",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&q=80",
        color: "#7c3aed",
        rgb: "124,58,237",
        socials: [
            { icon: FaXTwitter, href: "#" },
            { icon: FaLinkedinIn, href: "#" },
            { icon: FaInstagram, href: "#" },
        ],
    },
    {
        name: "Lola Business",
        role: "Accountant",
        desc: "Lola keeps our financial operations precise and transparent. Her expertise in business finance ensures every project is delivered on budget with full accountability.",
        image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=500&q=80",
        color: "#059669",
        rgb: "5,150,105",
        socials: [
            { icon: FaXTwitter, href: "#" },
            { icon: FaLinkedinIn, href: "#" },
            { icon: FaGithub, href: "#" },
        ],
    },
];

const cardVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: (i) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] },
    }),
};

const headingVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
    }),
};

function TeamCard({ name, role, desc, image, color, rgb, socials, index }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-60px" });

    return (
        <motion.div
            ref={ref}
            className="team-card"
            style={{ "--tc-color": color, "--tc-rgb": rgb }}
            variants={cardVariants}
            custom={index}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            whileHover={{ y: -10, transition: { duration: 0.3, ease: "easeOut" } }}
        >
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
        </motion.div>
    );
}

export default function TeamSection() {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const headingView = useInView(headingRef, { once: true, margin: "-80px" });

    return (
        <section className="team" id="team" ref={sectionRef}>
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

                {/* Cards */}
                <div className="team__grid">
                    {TEAM.map((member, i) => (
                        <TeamCard key={member.name} {...member} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
