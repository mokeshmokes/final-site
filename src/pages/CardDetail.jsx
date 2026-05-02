import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import {
    ArrowLeft, CheckCircle2,
    Globe, Layers, ShoppingCart, Palette, Server, GraduationCap,
    Monitor, Laptop, Shield, HardDrive, Printer, Network, Camera,
    Lightbulb, Wrench, FileCheck, Settings, Headphones, Wifi,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CARD_DATA } from "../data/cardData";
import "./CardDetail.css";

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

    /* Scroll to top + set page title */
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = card ? `${card.title} — JUSCO` : "JUSCO";
        return () => { document.title = "JUSCO"; };
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
                <div className="card-detail__container">

                    {/* LEFT — image */}
                    <motion.div
                        className="card-detail__left"
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="card-detail__img-wrap" style={{ "--cd-color": card.color, "--cd-rgb": card.rgb }}>
                            <img
                                src={card.image}
                                alt={card.title}
                                className="card-detail__img"
                                onError={(e) => {
                                    e.currentTarget.style.display = "none";
                                    e.currentTarget.nextSibling.style.display = "flex";
                                }}
                            />
                            <div className="card-detail__img-fallback" style={{ display: "none" }}>
                                <Icon size={64} style={{ color: card.color }} />
                            </div>
                        </div>
                    </motion.div>

                    {/* RIGHT — content */}
                    <motion.div
                        className="card-detail__right"
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="card-detail__title-row">
                            <div className="card-detail__icon-wrap" style={{ "--cd-color": card.color, "--cd-rgb": card.rgb }}>
                                <Icon size={28} />
                            </div>
                            <h2 className="card-detail__title">{card.title}</h2>
                        </div>

                        <p className="card-detail__desc">{card.description}</p>
                        <p className="card-detail__full-content">{card.fullContent}</p>

                        <h3 className="card-detail__features-heading">Key Features</h3>
                        <ul className="card-detail__features">
                            {card.features.map((f) => (
                                <li key={f} className="card-detail__feature">
                                    <CheckCircle2 size={16} className="card-detail__feature-icon" style={{ color: card.color }} />
                                    {f}
                                </li>
                            ))}
                        </ul>

                        <div className="card-detail__cta-row">
                            <a href="/#visit-us" className="card-detail__cta-btn" style={{ background: card.color }}>
                                Get a Quote
                            </a>
                            <button className="card-detail__back-btn" onClick={() => navigate(-1)}>
                                <ArrowLeft size={16} /> Back
                            </button>
                        </div>
                    </motion.div>

                </div>
            </section>

            <Footer />
        </>
    );
}
