import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaLaptopCode, FaCode, FaMobileAlt, FaServer, FaSearch, FaGlobe } from "react-icons/fa";
import "./ShowcaseSection.css";
import "./FlipCard.css";

/* ─── Web services — each id maps to an existing card detail page ─── */
const WEB_SERVICES = [
    { id: "web-development", icon: FaLaptopCode, title: "Web Services", desc: "Creative and modern website designs tailored to your business goals and target audience.", color: "#2563eb", rgb: "37,99,235" },
    { id: "wordpress-customization", icon: FaCode, title: "Web Development", desc: "High-performance websites built with the latest technologies for speed, security, and scale.", color: "#7c3aed", rgb: "124,58,237" },
    { id: "ecommerce-development", icon: FaMobileAlt, title: "Mobile App Development", desc: "Cross-platform mobile apps for Android and iOS that deliver seamless user experiences.", color: "#059669", rgb: "5,150,105" },
    { id: "domain-hosting", icon: FaServer, title: "Web Hosting", desc: "Secure and reliable hosting with 99.9% uptime, SSL certificates, and daily backups.", color: "#0891b2", rgb: "8,145,178" },
    { id: "professional-training", icon: FaSearch, title: "SEO Optimization", desc: "Improve your ranking and visibility on search engines to drive more organic traffic.", color: "#d97706", rgb: "217,119,6" },
    { id: "logo-brand-identity", icon: FaGlobe, title: "Domain Registration", desc: "Get your perfect business domain with easy management and flexible extensions.", color: "#e11da9ff", rgb: "225,29,72" },
];

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.09 } },
};

const cardVariants = {
    hidden: { opacity: 0, scale: 0.92, y: 30 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

function WebServiceCard({ id, icon: Icon, title, desc, color, rgb }) {
    const navigate = useNavigate();
    return (
        <motion.div
            variants={cardVariants}
            className="flip-card"
            onClick={() => navigate(`/card/${id}`)}
            role="button"
            tabIndex={0}
            aria-label={`Learn more about ${title}`}
            onKeyDown={(e) => e.key === "Enter" && navigate(`/card/${id}`)}
        >
            <div className="flip-inner">
                <div className="flip-front prod-card" style={{ "--pc-color": color, "--pc-rgb": rgb }}>
                    <div className="prod-card__icon-wrap">
                        <div className="prod-card__icon-bg" />
                        <Icon size={30} className="prod-card__icon" />
                        <div className="prod-card__icon-ring" />
                    </div>
                    <h3 className="prod-card__title">{title}</h3>
                    <p className="prod-card__desc">{desc}</p>
                    <p className="card-hint">Tap to learn more</p>
                    <div className="prod-card__bar" />
                </div>
            </div>
        </motion.div>
    );
}

export default function ShowcaseSection() {
    const headerRef = useRef(null);
    const contentRef = useRef(null);
    const gridRef = useRef(null);
    const headerView = useInView(headerRef, { once: true, margin: "-80px" });
    const contentView = useInView(contentRef, { once: true, margin: "-60px" });
    const gridView = useInView(gridRef, { once: true, margin: "-60px" });

    return (
        <section className="showcase" id="showcase">
            <div className="showcase__bg-orb showcase__bg-orb--1" />
            <div className="showcase__bg-orb showcase__bg-orb--2" />

            <div className="showcase__container">

                {/* ── Header row — mirrors ProductsSection layout ── */}
                <div className="showcase__top" ref={headerRef}>
                    <motion.div
                        className="showcase__top-left"
                        initial={{ opacity: 0, x: -40 }}
                        animate={headerView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="showcase__tag">
                            <span className="showcase__tag-dot" />
                            WEB SERVICES
                        </div>
                        <h2 className="showcase__heading">
                            Our <span className="showcase__heading-accent">Web Services</span>
                        </h2>
                        <motion.div
                            className="showcase__divider"
                            initial={{ scaleX: 0 }}
                            animate={headerView ? { scaleX: 1 } : { scaleX: 0 }}
                            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        />
                    </motion.div>

                    <motion.div
                        className="showcase__top-right"
                        ref={contentRef}
                        initial={{ opacity: 0, x: 40 }}
                        animate={contentView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <p className="showcase__top-desc">
                            We provide complete web solutions — from design and development to hosting and optimization — helping your business grow and thrive in the digital age.
                        </p>
                        <p className="showcase__top-desc">
                            Whether your needs involve a basic landing page or a complex e-commerce platform, our team consistently delivers rapid, secure, and visually compelling solutions.
                        </p>
                    </motion.div>
                </div>

                {/* ── Card grid ── */}
                <motion.div
                    className="showcase__grid"
                    ref={gridRef}
                    variants={containerVariants}
                    initial="hidden"
                    animate={gridView ? "visible" : "hidden"}
                >
                    {WEB_SERVICES.map((svc) => (
                        <WebServiceCard key={svc.id} {...svc} />
                    ))}
                </motion.div>

            </div>
        </section>
    );
}
