import React, { useRef } from "react";
import {
    motion,
    useInView,
    useScroll,
    useTransform,
} from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import "./AboutSection.css";

/* ─── Progress bar data ─── */
const SKILLS = [
    { label: "Web Development", pct: 85, color: "#2563eb" },
    { label: "UI & UX Design", pct: 85, color: "#7c3aed" },
    { label: "PHP & MySQL", pct: 80, color: "#0891b2" },
    { label: "E-Commerce", pct: 70, color: "#059669" },
    { label: "Marketing", pct: 90, color: "#d97706" },
    { label: "Branding", pct: 90, color: "#6366f1" },
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
                        {/* Parallax image — clean, no overlays */}
                        <motion.div className="about__image-inner" style={{ y: imgY }}>
                            <img
                                src="/images/about.jpg"
                                alt="JUSCO professional"
                                className="about__img"
                            />
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
                        About <span className="about__heading-accent">Universal Technology</span>
                    </motion.h2>

                    {/* Description */}
                    <motion.p className="about__desc" variants={fadeUp} custom={2}>
                        Universal technology is the leading technology enabler in SALEM that offers innovative and extensive range of software solutions and services to consumers. Our range of dedicated services and customized solution is designed to help our client more in step with a fast –  moving world and constantly ahead. At universal technology, access to technology products and services has become a delightful experience. The firm started its operation in 2001 with its first flagship in SALEM, India.
                    </motion.p>
                    <motion.h2 className="about__heading" variants={fadeUp} custom={1}>
                        <span className="about__heading-accent">Enterprise</span>
                    </motion.h2>
                    <motion.p className="about__desc" variants={fadeUp} custom={2}>
                        Universal technology is recognized by its customers as a true IT expert. This is a key asset in a market where rapid changes in products and technologies are often confusing the customers. The role of UNIVERSAL TECHNOLOGY sales advisors is to understand customer’s needs and provide advice and solutions that best fit there requirements.
Universal technology In sep 2001, Universal opened its first and for most concept Universal express at Salem.
Universal express is a very dedicated and focused concept universal express at Salem.
UNIVERSAL intends to roll express concept in similar dedicated market segments across the regoin to provide dedicated services or products to these markets. The Express concept is the retail business unit and carries a selection of retail products dedicated to fast moving mobile technology
                    </motion.p>
                    <motion.h2 className="about__heading" variants={fadeUp} custom={1}>
                        <span className="about__heading-accent">Bargain</span>
                    </motion.h2>
                    <motion.p className="about__desc" variants={fadeUp} custom={2}>
                        Universal Technology offers the best value for money on the market with unbeatable price / quality / bundle offer and service mix.
                    </motion.p>
                     <motion.h2 className="about__heading" variants={fadeUp} custom={1}>
                        <span className="about__heading-accent">Easy in decision making</span>
                    </motion.h2>
                    <motion.p className="about__desc" variants={fadeUp} custom={2}>
                       The customer is never alone. The depth of product selection, the range of offered BRAND’S IN PC’s, LAPTOPS, SERVERS, NETWORKING, STRUCTURED CABLING, AND AFTER SALES SERVICES, state that the customer will choose the best products for his use, is assured of its use due to availability of support repairs, upgrades, installation etc.
                    </motion.p>
                     <motion.h2 className="about__heading" variants={fadeUp} custom={1}>
                        <span className="about__heading-accent">Strategy</span>
                    </motion.h2>
                    <motion.p className="about__desc" variants={fadeUp} custom={2}>
                       Universal Technology Click Strategy
Universal Technology strongly believes that electronic business in INDIA is developing fast, and hence is positioning the company to capitalize the oppurtunity. We are currently implementing BUSINESS TO BUSINESS solutions for our customers. Universal Express have got service persons in City to serve selected customer base. HARDWARE PRODUCTS LIKE consumables, cartridges, toner, printers will be delivered in 6 working hours in SALEM city. Universal Express is a complete Free service. Customers are requested to get in touch with Universal Technology.
                    </motion.p>
                    {/* Highlights */}
                    {/* <motion.ul className="about__highlights" variants={fadeUp} custom={3}>
                        {HIGHLIGHTS.map((item, i) => (
                            <li key={i} className="about__highlight">
                                <CheckCircle2 size={17} className="about__highlight-icon" />
                                {item}
                            </li>
                        ))}
                    </motion.ul> */}

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
