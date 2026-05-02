import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
    Lightbulb, Wrench, FileCheck, Settings, Headphones,
    Monitor, Wifi,
} from "lucide-react";
import "./ITServicesSection.css";
import "./FlipCard.css";

const IT_SERVICES = [
    {
        icon: Lightbulb,
        title: "IT Consulting",
        desc: "Strategic technology guidance to align your IT infrastructure with business goals and drive digital transformation.",
        color: "#2563eb", rgb: "37,99,235",
        features: ["Strategy Planning", "Tech Roadmap", "Cost Optimization"],
    },
    {
        icon: Wrench,
        title: "One Time Installation Services",
        desc: "Professional setup and configuration of hardware, software, and network systems — done right the first time.",
        color: "#7c3aed", rgb: "124,58,237",
        features: ["Hardware Setup", "Software Config", "Network Install"],
    },
    {
        icon: FileCheck,
        title: "Annual Maintenance Contract",
        desc: "Comprehensive AMC plans that keep your IT systems running at peak performance with scheduled maintenance.",
        color: "#059669", rgb: "5,150,105",
        features: ["Scheduled Visits", "Priority Support", "Parts Coverage"],
    },
    {
        icon: Settings,
        title: "Regular Maintenance Services",
        desc: "Proactive, routine maintenance to prevent downtime, extend hardware life, and ensure system reliability.",
        color: "#d97706", rgb: "217,119,6",
        features: ["Preventive Care", "Health Checks", "Extended Lifespan"],
    },
    {
        icon: Headphones,
        title: "Oncall Support",
        desc: "Rapid on-demand technical support whenever you need it — minimizing disruption and maximizing uptime.",
        color: "#e11d48", rgb: "225,29,72",
        features: ["Rapid Response", "On-site & Remote", "Minimal Downtime"],
    },
    {
        icon: Monitor,
        title: "Remote Management IT Services",
        desc: "24/7 remote monitoring and management of your IT environment, resolving issues before they impact operations.",
        color: "#0891b2", rgb: "8,145,178",
        features: ["24/7 Monitoring", "Proactive Alerts", "Remote Resolution"],
    },
    {
        icon: Wifi,
        title: "Internet & Intranet",
        desc: "End-to-end network design, deployment, and management for reliable internet and secure intranet connectivity.",
        color: "#6d28d9", rgb: "109,40,217",
        features: ["Network Design", "Secure Intranet", "High Availability"],
    },
];

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const headingVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
    }),
};

function ITCard({ icon: Icon, title, desc, color, rgb, features, onOpen }) {
    return (
        <motion.div
            variants={cardVariants}
            className="flip-card"
            onClick={() => onOpen({ title, features })}
            role="button"
            tabIndex={0}
            aria-label={`Learn more about ${title}`}
            onKeyDown={(e) => e.key === "Enter" && onOpen({ title, features })}
        >
            <div className="flip-inner">
                <div className="flip-front it-card" style={{ "--it-color": color, "--it-rgb": rgb }}>
                    <div className="it-card__accent" />
                    <div className="it-card__icon-wrap">
                        <Icon size={24} className="it-card__icon" />
                        <div className="it-card__icon-glow" />
                    </div>
                    <h3 className="it-card__title">{title}</h3>
                    <p className="it-card__desc">{desc}</p>
                    <p className="card-hint">Tap to learn more</p>
                    <div className="it-card__hover-bg" />
                </div>
            </div>
        </motion.div>
    );
}

export default function ITServicesSection() {
    const headerRef = useRef(null);
    const gridRef = useRef(null);
    const headerView = useInView(headerRef, { once: true, margin: "-80px" });
    const gridView = useInView(gridRef, { once: true, margin: "-60px" });

    const [activeCard, setActiveCard] = useState(null);

    return (
        <section className="it-services" id="it-services">
            <div className="it-services__bg-grid" />
            <div className="it-services__bg-orb it-services__bg-orb--1" />
            <div className="it-services__bg-orb it-services__bg-orb--2" />

            <div className="it-services__container">
                <div className="it-services__header" ref={headerRef}>
                    <motion.div className="it-services__tag" variants={headingVariants} custom={0}
                        initial="hidden" animate={headerView ? "visible" : "hidden"}>
                        <span className="it-services__tag-dot" />
                        OUR EXPERTISE
                    </motion.div>
                    <motion.h2 className="it-services__heading" variants={headingVariants} custom={1}
                        initial="hidden" animate={headerView ? "visible" : "hidden"}>
                        Professional{" "}
                        <span className="it-services__heading-accent">IT Services</span>
                    </motion.h2>
                    <motion.p className="it-services__subheading" variants={headingVariants} custom={2}
                        initial="hidden" animate={headerView ? "visible" : "hidden"}>
                        End-to-end IT solutions designed to keep your business running
                        smoothly, securely, and efficiently — from consulting to 24/7 support.
                    </motion.p>
                    <motion.div className="it-services__divider"
                        initial={{ scaleX: 0 }}
                        animate={headerView ? { scaleX: 1 } : { scaleX: 0 }}
                        transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    />
                </div>

                <motion.div className="it-services__grid" ref={gridRef}
                    variants={containerVariants} initial="hidden"
                    animate={gridView ? "visible" : "hidden"}>
                    {IT_SERVICES.map((svc) => (
                        <ITCard key={svc.title} {...svc} onOpen={setActiveCard} />
                    ))}
                </motion.div>
            </div>

            {/* ── Modal ── */}
            {activeCard && (
                <div className="card-modal-overlay" onClick={() => setActiveCard(null)}>
                    <motion.div
                        className="card-modal-box"
                        onClick={(e) => e.stopPropagation()}
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
                    >
                        <h2 className="card-modal-box__title">{activeCard.title}</h2>
                        <div className="card-modal-box__content">
                            {/* ── Add your custom content here ── */}
                            <ul className="card-modal-box__list">
                                {activeCard.features.map((f) => <li key={f}>{f}</li>)}
                            </ul>
                        </div>
                        <button className="card-modal-box__close" onClick={() => setActiveCard(null)}>
                            Close
                        </button>
                    </motion.div>
                </div>
            )}
        </section>
    );
}
