import React, { useRef } from "react";
import {
    motion,
    useInView,
    useScroll,
    useTransform,
} from "framer-motion";
import { CheckCircle2, Award, Users, TrendingUp } from "lucide-react";
import "./AboutSection.css";

/* ─── Progress bar data ─── */
const SKILLS = [
    { label: "Web Development", pct: 85, color: "#2563eb" },
    { label: "UI & UX Design", pct: 85, color: "#7c3aed" },
    { label: "PHP & MySQL", pct: 80, color: "#0891b2" },
    { label: "E-Commerce", pct: 70, color: "#059669" },
    { label: "Marketing", pct: 90, color: "#d97706" },
    { label: "Branding", pct: 90, color: "#e11d48" },
];

/* ─── Stats ─── */
const STATS = [
    { icon: Award, value: "12+", label: "Years Experience" },
    { icon: Users, value: "500+", label: "Happy Clients" },
    { icon: TrendingUp, value: "98%", label: "Success Rate" },
];

/* ─── Highlights ─── */
const HIGHLIGHTS = [
    "Creative & innovative design solutions",
    "Dedicated team of expert professionals",
    "On-time delivery with premium quality",
    "24/7 client support & maintenance",
];

/* ─── Animation variants ─── */
const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
    }),
};

const fadeLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
    },
};

const fadeRight = {
    hidden: { opacity: 0, x: 50 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
    },
};

/* ─── Single animated progress bar ─── */
function SkillBar({ label, pct, color, index }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-60px" });

    return (
        <motion.div
            ref={ref}
            className="skill"
            variants={fadeUp}
            custom={index * 0.08}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
        >
            <div className="skill__header">
                <span className="skill__label">{label}</span>
                <motion.span
                    className="skill__pct"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.4 + index * 0.08 }}
                >
                    {pct}%
                </motion.span>
            </div>
            <div className="skill__track">
                <motion.div
                    className="skill__fill"
                    style={{ background: color }}
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${pct}%` } : { width: 0 }}
                    transition={{
                        duration: 1.1,
                        delay: 0.25 + index * 0.1,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                >
                    <span className="skill__glow" style={{ background: color }} />
                </motion.div>
            </div>
        </motion.div>
    );
}

/* ─── Main component ─── */
export default function AboutSection() {
    const sectionRef = useRef(null);
    const inView = useInView(sectionRef, { once: true, margin: "-80px" });

    /* Subtle parallax on the image */
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });
    const imgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

    return (
        <section className="about" id="about-us" ref={sectionRef}>
            {/* Background decoration */}
            <div className="about__bg-orb about__bg-orb--1" />
            <div className="about__bg-orb about__bg-orb--2" />

            <div className="about__container">

                {/* ── LEFT — image ── */}
                <motion.div
                    className="about__image-col"
                    variants={fadeLeft}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                >
                    <div className="about__image-wrap">
                        {/* Decorative frame */}
                        <div className="about__image-frame" />

                        {/* Parallax image */}
                        <motion.div className="about__image-inner" style={{ y: imgY }}>
                            <img
                                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=700&q=80"
                                alt="JUSCO professional"
                                className="about__img"
                            />
                        </motion.div>

                        {/* Floating badge */}
                        <motion.div
                            className="about__badge"
                            initial={{ opacity: 0, scale: 0.7 }}
                            animate={inView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ delay: 0.55, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                        >
                            <span className="about__badge-value">12+</span>
                            <span className="about__badge-label">Years of<br />Excellence</span>
                        </motion.div>

                        {/* Stats strip */}
                        <motion.div
                            className="about__stats-strip"
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.65, duration: 0.55 }}
                        >
                            {STATS.map(({ icon: Icon, value, label }, i) => (
                                <div key={i} className="about__stat">
                                    <Icon size={18} className="about__stat-icon" />
                                    <span className="about__stat-value">{value}</span>
                                    <span className="about__stat-label">{label}</span>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>

                {/* ── RIGHT — content ── */}
                <motion.div
                    className="about__content-col"
                    variants={fadeRight}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                >
                    {/* Section tag */}
                    <motion.div className="about__tag" variants={fadeUp} custom={0}>
                        <span className="about__tag-dot" />
                        Who We Are
                    </motion.div>

                    {/* Heading */}
                    <motion.h2 className="about__heading" variants={fadeUp} custom={1}>
                        About <span className="about__heading-accent">JUSCO</span>
                    </motion.h2>

                    {/* Description */}
                    <motion.p className="about__desc" variants={fadeUp} custom={2}>
                        JUSCO is a full-service digital agency committed to transforming
                        businesses through innovative technology and creative design. We
                        blend strategy, design, and engineering to deliver digital
                        experiences that drive real results and lasting impact.
                    </motion.p>

                    {/* Highlights */}
                    <motion.ul className="about__highlights" variants={fadeUp} custom={3}>
                        {HIGHLIGHTS.map((item, i) => (
                            <li key={i} className="about__highlight">
                                <CheckCircle2 size={17} className="about__highlight-icon" />
                                {item}
                            </li>
                        ))}
                    </motion.ul>

                    {/* Expertise heading */}
                    <motion.div className="about__expertise-header" variants={fadeUp} custom={4}>
                        <h3 className="about__expertise-title">Our Expertise Area</h3>
                        <p className="about__expertise-sub">
                            We bring deep technical knowledge across every discipline we
                            practice — ensuring quality at every layer of your project.
                        </p>
                    </motion.div>

                    {/* Progress bars */}
                    <div className="about__skills">
                        {SKILLS.map((skill, i) => (
                            <SkillBar key={skill.label} {...skill} index={i} />
                        ))}
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
