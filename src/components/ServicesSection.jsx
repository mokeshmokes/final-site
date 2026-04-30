import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
    Globe,
    Layers,
    ShoppingCart,
    Palette,
    Server,
    GraduationCap,
} from "lucide-react";
import "./ServicesSection.css";
import "./FlipCard.css";

/* ─── Service card data ─── */
const SERVICES = [
    {
        icon: Globe,
        title: "Web Development",
        description:
            "We build fast, scalable, and visually stunning websites tailored to your brand — from landing pages to complex web applications.",
        color: "#2563eb",
        rgb: "37,99,235",
        tag: "Development",
        features: ["Custom Design", "SEO Optimized", "Mobile Responsive"],
    },
    {
        icon: Layers,
        title: "WordPress Customization",
        description:
            "Custom WordPress themes, plugins, and full-site builds that are easy to manage and optimized for performance and SEO.",
        color: "#7c3aed",
        rgb: "124,58,237",
        tag: "CMS",
        features: ["Custom Themes", "Plugin Development", "Performance Tuning"],
    },
    {
        icon: ShoppingCart,
        title: "E-Commerce Development",
        description:
            "End-to-end e-commerce solutions with seamless checkout, payment integration, and inventory management built to convert.",
        color: "#059669",
        rgb: "5,150,105",
        tag: "E-Commerce",
        features: ["Secure Checkout", "Payment Gateway", "Inventory Management"],
    },
    {
        icon: Palette,
        title: "Logo & Brand Identity",
        description:
            "Memorable logos and cohesive brand identities that communicate your values and leave a lasting impression on your audience.",
        color: "#e11d48",
        rgb: "225,29,72",
        tag: "Branding",
        features: ["Logo Design", "Brand Guidelines", "Visual Identity"],
    },
    {
        icon: Server,
        title: "Domain & Hosting",
        description:
            "Reliable domain registration and managed hosting solutions with 99.9% uptime, SSL certificates, and expert support.",
        color: "#0891b2",
        rgb: "8,145,178",
        tag: "Infrastructure",
        features: ["99.9% Uptime", "SSL Certificates", "24/7 Monitoring"],
    },
    {
        icon: GraduationCap,
        title: "Professional Training",
        description:
            "Hands-on training programs in web development, design, and digital marketing — empowering individuals and teams to grow.",
        color: "#d97706",
        rgb: "217,119,6",
        tag: "Education",
        features: ["Live Sessions", "Hands-on Projects", "Certification"],
    },
];

/* ─── Animation variants ─── */
const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1, y: 0,
        transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
    },
};

const headingVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
    }),
};

/* ─── Single service card ─── */
function ServiceCard({ icon: Icon, title, description, color, rgb, tag, features }) {
    return (
        <motion.div variants={cardVariants} className="flip-card">
            <div className="flip-inner">

                {/* ── FRONT ── */}
                <div
                    className="flip-front svc-card"
                    style={{ "--card-color": color, "--card-rgb": rgb }}
                >
                    <div className="svc-card__accent" />
                    <div className="svc-card__icon-wrap">
                        <Icon size={26} className="svc-card__icon" />
                        <div className="svc-card__icon-glow" />
                    </div>
                    <span className="svc-card__tag">{tag}</span>
                    <h3 className="svc-card__title">{title}</h3>
                    <p className="svc-card__desc">{description}</p>
                    <div className="svc-card__hover-bg" />
                </div>

                {/* ── BACK ── */}
                <div className="flip-back">
                    <p className="flip-back__title">{title}</p>
                    <ul className="flip-back__list">
                        {features.map((f) => <li key={f}>{f}</li>)}
                    </ul>
                    <span className="flip-back__cta">Hover to explore</span>
                </div>

            </div>
        </motion.div>
    );
}

/* ─── Main component ─── */
export default function ServicesSection() {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const gridRef = useRef(null);

    const headingInView = useInView(headingRef, { once: true, margin: "-80px" });
    const gridInView = useInView(gridRef, { once: true, margin: "-60px" });

    return (
        <section className="services" id="services" ref={sectionRef}>
            <div className="services__bg-grid" />
            <div className="services__bg-orb services__bg-orb--1" />
            <div className="services__bg-orb services__bg-orb--2" />

            <div className="services__container">
                <div className="services__header" ref={headingRef}>
                    <motion.div className="services__tag" variants={headingVariants} custom={0}
                        initial="hidden" animate={headingInView ? "visible" : "hidden"}>
                        <span className="services__tag-dot" />
                        What We Offer
                    </motion.div>
                    <motion.h2 className="services__heading" variants={headingVariants} custom={1}
                        initial="hidden" animate={headingInView ? "visible" : "hidden"}>
                        What <span className="services__heading-accent">JUSCO</span> Do
                    </motion.h2>
                    <motion.p className="services__subheading" variants={headingVariants} custom={2}
                        initial="hidden" animate={headingInView ? "visible" : "hidden"}>
                        From concept to launch, we deliver end-to-end digital solutions
                        that help businesses grow, compete, and thrive in the digital age.
                    </motion.p>
                    <motion.div className="services__divider"
                        initial={{ scaleX: 0 }}
                        animate={headingInView ? { scaleX: 1 } : { scaleX: 0 }}
                        transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    />
                </div>

                <motion.div className="services__grid" ref={gridRef}
                    variants={containerVariants} initial="hidden"
                    animate={gridInView ? "visible" : "hidden"}>
                    {SERVICES.map((svc) => (
                        <ServiceCard key={svc.title} {...svc} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
