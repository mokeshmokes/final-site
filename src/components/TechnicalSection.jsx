import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaFeatherAlt, FaQuestionCircle, FaHeadset, FaBriefcase } from "react-icons/fa";
import "./TechnicalSection.css";

const CARDS = [
    {
        title: "OUR FEATURES",
        Icon: FaFeatherAlt,
        frontPoints: [
"Corporate services",

"Data recovery",

"Corporate solutions",

"Retail solutions",

"CCTV solutions",

"Network solutions",
        ],
        backPoints: [
"Consultancy",

"Wireless solutions",

"Consumable division",

"System Administration",

"Project Management",
        ],
        color: "#2563eb",
    },
    {
        title: "GET A QUESTION?",
        Icon: FaQuestionCircle,
        frontPoints: [
            "Quick, clear answers",
            "Expert guidance available",
            "24/7 support access",
        ],
        backPoints: [
            "Dedicated support team",
            "Fast response time guaranteed",
            "Clear communication process",
            "Customer-focused solutions",
        ],
        color: "#7c3aed",
    },
    {
        title: "SUPPORT",
        Icon: FaHeadset,
        frontPoints: [
            "24/7 service availability",
            "Reliable technical support",
            "Quick issue resolution",
        ],
        backPoints: [
            "Round-the-clock monitoring",
            "Instant issue resolution",
            "Minimal downtime guarantee",
            "Strong technical assistance",
        ],
        color: "#059669",
    },
    {
        title: "BUSINESS RECORDS",
        Icon: FaBriefcase,
        frontPoints: [
            "Secure data management",
            "Easy access & retrieval",
            "Well-organised system",
        ],
        backPoints: [
            "Secure record management",
            "Accurate data tracking",
            "Compliance-ready storage",
            "Efficient business handling",
        ],
        color: "#d97706",
    },
];

export default function TechnicalSection() {
    const headingRef = useRef(null);
    const headingInView = useInView(headingRef, { once: true, margin: "-80px" });

    return (
        <section className="tech-sec" id="technical-info">
            <div className="tech-sec__orb tech-sec__orb--1" />
            <div className="tech-sec__orb tech-sec__orb--2" />

            <div className="tech-sec__container">

                {/* Header — Framer Motion only here, NOT on cards */}
                <div className="tech-sec__header" ref={headingRef}>
                    <motion.div
                        className="tech-sec__tag"
                        initial={{ opacity: 0 }}
                        animate={headingInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="tech-sec__tag-dot" />
                        What We Offer
                    </motion.div>

                    <motion.h2
                        className="tech-sec__heading"
                        initial={{ opacity: 0, y: 28 }}
                        animate={headingInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    >
                        Technical <span className="tech-sec__heading-accent">Overview</span>
                    </motion.h2>

                    <motion.div
                        className="tech-sec__divider"
                        initial={{ scaleX: 0 }}
                        animate={headingInView ? { scaleX: 1 } : { scaleX: 0 }}
                        transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    />
                </div>

                {/* Cards — plain HTML, NO Framer Motion, pure CSS flip */}
                <div className="tech-sec__grid">
                    {CARDS.map(({ title, Icon, frontPoints, backPoints, color }) => (
                        <div className="tc-flip" key={title} style={{ "--tc-color": color }}>
                            <div className="tc-flip__inner">

                                {/* Front — short highlights */}
                                <div className="tc-flip__front">
                                    <div className="tc-flip__icon-wrap">
                                        <Icon className="tc-flip__icon" />
                                    </div>
                                    <h3 className="tc-flip__title">{title}</h3>
                                    <ul className="tc-flip__front-list">
                                        {(frontPoints || []).map((point, i) => (
                                            <li key={i}>{point}</li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Back — detailed info */}
                                <div className="tc-flip__back">
                                    <h3 className="tc-flip__back-title">{title}</h3>
                                    <ul className="tc-flip__back-list">
                                        {(backPoints || []).map((point, i) => (
                                            <li key={i}>{point}</li>
                                        ))}
                                    </ul>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
