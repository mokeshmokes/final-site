import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import {
    ArrowLeft,
    Globe, Layers, ShoppingCart, Palette, Server, GraduationCap,
    Monitor, Laptop, Shield, HardDrive, Printer, Network, Camera,
    Lightbulb, Wrench, FileCheck, Settings, Headphones, Wifi,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CARD_DATA } from "../data/cardData";
import "./CardDetail.css";

/* ── Category → section ID map ── */
const CATEGORY_SECTION = {
    "Services": "services",
    "WEBSITE": "showcase",
    "Products": "products",
    "IT Services": "it-services",
    "Technical": "business-services",
};

/* ── Icon map: card id → lucide icon component ── */
const ICON_MAP = {
    "web-development": Globe,
    "wordpress-customization": Layers,
    "ecommerce-development": ShoppingCart,
    "logo-brand-identity": Palette,
    "domain-hosting": Server,
    "professional-training": GraduationCap,
    "desktop": Monitor,
    "laptop": Laptop,
    "server": Server,
    "firewall": Shield,
    "nas": HardDrive,
    "printer": Printer,
    "router-switches": Network,
    "cctv": Camera,
    "it-consulting": Lightbulb,
    "installation-services": Wrench,
    "amc": FileCheck,
    "regular-maintenance": Settings,
    "oncall-support": Headphones,
    "remote-management": Monitor,
    "internet-intranet": Wifi,
};

export default function CardDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const card = CARD_DATA.find((c) => c.id === id);
    const Icon = ICON_MAP[id] || Globe;

    /* Navigate back to the section this card belongs to */
    const handleBack = () => {
        const sectionId = CATEGORY_SECTION[card?.category] || "home";
        navigate(`/#${sectionId}`);
    };

    /* Scroll to top + set page title */
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = card ? `${card.title} | Universal Technology` : "Universal Technology";
        return () => { document.title = "Universal Technology"; };
    }, [id, card]);

    /* Unknown card */
    if (!card) {
        return (
            <>
                <Navbar />
                <div className="card-detail__not-found">
                    <h2>Page not found</h2>
                    <button onClick={() => navigate("/")}>← Back to Home</button>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />

            {/* ── Hero banner ── */}
            <section className="card-detail__hero" style={{ "--cd-color": card.color, "--cd-rgb": card.rgb }}>
                <div className="card-detail__hero-overlay" />
                <div className="card-detail__hero-inner">
                    <motion.div
                        className="card-detail__category"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {card.category}
                    </motion.div>
                    <motion.h1
                        className="card-detail__hero-title"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        {card.title}
                    </motion.h1>
                </div>
            </section>

            {/* ── Main content ── */}
            <section className="card-detail__body">
                <div className="card-detail__outer">

                    {/* 2-column: images LEFT, title+text RIGHT */}
                    <div className="card-detail__layout">

                        {/* LEFT — images stacked */}
                        <motion.div
                            className="card-detail__images"
                            style={card.imageGap ? { gap: `${card.imageGap}px` } : undefined}
                            initial={{ opacity: 0, x: -40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        >
                            {(card.images || [card.image]).map((src, i, arr) => {
                                const isLast = i === arr.length - 1 && arr.length > 1;
                                return (
                                    <div
                                        key={i}
                                        className={`card-detail__img-wrap${isLast ? " card-detail__img-wrap--last" : ""}`}
                                        style={{ "--cd-color": card.color, "--cd-rgb": card.rgb }}
                                    >
                                        <img
                                            src={src}
                                            alt={`${card.title}${i > 0 ? ` — view ${i + 1}` : ""}`}
                                            className="card-detail__img"
                                            onError={(e) => {
                                                e.currentTarget.parentElement.style.display = "none";
                                            }}
                                        />
                                    </div>
                                );
                            })}
                        </motion.div>

                        {/* RIGHT — title + text content + back button */}
                        <motion.div
                            className="card-detail__content"
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        >
                            {/* Title row — inside right column */}
                            <div className="card-detail__title-row">
                                <div className="card-detail__icon-wrap" style={{ "--cd-color": card.color, "--cd-rgb": card.rgb }}>
                                    <Icon size={28} />
                                </div>
                                <h2 className="card-detail__title">{card.title}</h2>
                            </div>

                            {Array.isArray(card.description)
                                ? card.description.map((item, i) => {
                                    const text = typeof item === "object" && item.subtitle ? null : (typeof item === "string" ? item : null);
                                    const isHighlighted = text && card.highlightPoints?.includes(text);

                                    if (typeof item === "object" && item.subtitle) {
                                        return (
                                            <div key={i} className="card-detail__desc-block">
                                                <h4 className="card-detail__desc-subtitle">{item.subtitle}</h4>
                                                <p className="card-detail__desc">{item.text}</p>
                                            </div>
                                        );
                                    }
                                    return (
                                        <p
                                            key={i}
                                            className={isHighlighted ? "card-detail__desc card-detail__desc--highlight" : "card-detail__desc"}
                                        >
                                            {item}
                                        </p>
                                    );
                                })
                                : <p className="card-detail__desc">{card.description}</p>
                            }
                            {card.fullContent && (
                                <p className="card-detail__desc">{card.fullContent}</p>
                            )}

                            {/* Back button — inside content, left-aligned below text */}
                            <div className="card-detail__cta-row">
                                <button className="card-detail__back-btn" onClick={handleBack}>
                                    <ArrowLeft size={16} /> Back
                                </button>
                            </div>
                        </motion.div>

                    </div>

                </div>
            </section>

            <Footer />
        </>
    );
}
