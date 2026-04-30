import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import CountUp from "react-countup";
import { CheckSquare, Map, Smile } from "lucide-react";
import "./StatsSection.css";

const STATS = [
    { icon: CheckSquare, value: 891, suffix: "+", label: "PROJECTS COMPLETED", color: "#2563eb", rgb: "37,99,235" },
    { icon: Map, value: 291, suffix: "+", label: "STATES COVERED", color: "#7c3aed", rgb: "124,58,237" },
    { icon: null, value: 291, suffix: "+", label: "DISTRICTS SERVED", color: "#059669", rgb: "5,150,105", imgSrc: "/images/tamilnadu-map.png" },
    { icon: Smile, value: 3890, suffix: "+", label: "SATISFIED CLIENTS", color: "#d97706", rgb: "217,119,6" },
];

const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.65, delay: i * 0.13, ease: [0.22, 1, 0.36, 1] },
    }),
};

function StatCard({ icon: Icon, imgSrc, value, suffix, label, color, rgb, index }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <motion.div
            ref={ref}
            className="stat-card"
            style={{ "--sc-color": color, "--sc-rgb": rgb }}
            variants={cardVariants}
            custom={index}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            whileHover={{ y: -8, transition: { duration: 0.3, ease: "easeOut" } }}
        >
            {/* Top glow line */}
            <div className="stat-card__line" />

            {/* Icon — lucide component OR custom image */}
            <div className="stat-card__icon-wrap">
                {imgSrc ? (
                    <img
                        src={imgSrc}
                        alt={label}
                        className="stat-card__icon-img"
                        loading="lazy"
                    />
                ) : (
                    <Icon size={28} className="stat-card__icon" />
                )}
                <div className="stat-card__icon-glow" />
            </div>

            {/* Counter */}
            <div className="stat-card__number">
                {inView ? (
                    <CountUp
                        start={0}
                        end={value}
                        duration={2.4}
                        separator=","
                        useEasing
                    />
                ) : (
                    <span>0</span>
                )}
                <span className="stat-card__suffix">{suffix}</span>
            </div>

            {/* Label */}
            <p className="stat-card__label">{label}</p>

            {/* Hover bg */}
            <div className="stat-card__hover-bg" />
        </motion.div>
    );
}

export default function StatsSection() {
    const sectionRef = useRef(null);
    const inView = useInView(sectionRef, { once: true, margin: "-80px" });

    return (
        <section className="stats" id="stats" ref={sectionRef}>
            <div className="stats__bg-orb stats__bg-orb--1" />
            <div className="stats__bg-orb stats__bg-orb--2" />

            <div className="stats__container">
                {/* Header */}
                <motion.div
                    className="stats__header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className="stats__tag">
                        <span className="stats__tag-dot" />
                        Our Achievements
                    </div>
                    <h2 className="stats__heading">
                        Numbers That <span className="stats__heading-accent">Speak</span>
                    </h2>
                </motion.div>

                {/* Cards row */}
                <div className="stats__grid">
                    {STATS.map((stat, i) => (
                        <StatCard key={stat.label} {...stat} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
