import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingUp, Zap, Star } from "lucide-react";
import "./SkillSection.css";

const SKILLS = [
    { label: "Programming", pct: 100, color: "#2563eb", icon: Zap },
    { label: "Design", pct: 100, color: "#7c3aed", icon: Star },
    { label: "Managing & SEO", pct: 100, color: "#059669", icon: TrendingUp },
];

const fadeLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};
const fadeRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};
const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
    }),
};

function SkillBar({ label, pct, color, icon: Icon, index }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-60px" });

    return (
        <motion.div
            ref={ref}
            className="sk-bar"
            variants={fadeUp}
            custom={index}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
        >
            <div className="sk-bar__header">
                <div className="sk-bar__label-wrap">
                    <span className="sk-bar__icon-wrap" style={{ background: `rgba(${color.replace('#', '').match(/.{2}/g).map(h => parseInt(h, 16)).join(',')},0.15)`, borderColor: `rgba(${color.replace('#', '').match(/.{2}/g).map(h => parseInt(h, 16)).join(',')},0.3)` }}>
                        <Icon size={14} style={{ color }} />
                    </span>
                    <span className="sk-bar__label">{label}</span>
                </div>
                <motion.span
                    className="sk-bar__pct"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.5 + index * 0.1 }}
                >
                    {pct}%
                </motion.span>
            </div>

            <div className="sk-bar__track">
                <motion.div
                    className="sk-bar__fill"
                    style={{ background: `linear-gradient(90deg, ${color}, ${color}cc)` }}
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${pct}%` } : { width: 0 }}
                    transition={{ duration: 1.3, delay: 0.3 + index * 0.12, ease: [0.22, 1, 0.36, 1] }}
                >
                    <span className="sk-bar__shine" />
                    <span className="sk-bar__tip" style={{ background: color, boxShadow: `0 0 10px ${color}` }} />
                </motion.div>
            </div>
        </motion.div>
    );
}

export default function SkillSection() {
    const sectionRef = useRef(null);
    const leftRef = useRef(null);
    const rightRef = useRef(null);
    const leftView = useInView(leftRef, { once: true, margin: "-80px" });
    const rightView = useInView(rightRef, { once: true, margin: "-80px" });

    return (
        <section className="skill-sec" id="skills" ref={sectionRef}>
            <div className="skill-sec__bg-orb skill-sec__bg-orb--1" />
            <div className="skill-sec__bg-orb skill-sec__bg-orb--2" />

            <div className="skill-sec__container">

                {/* LEFT */}
                <motion.div
                    className="skill-sec__left"
                    ref={leftRef}
                    variants={fadeLeft}
                    initial="hidden"
                    animate={leftView ? "visible" : "hidden"}
                >
                    <div className="skill-sec__tag">
                        <span className="skill-sec__tag-dot" />
                        Growth &amp; Mastery
                    </div>

                    <h2 className="skill-sec__heading">
                        Evolution &amp; <span className="skill-sec__heading-accent">Growth</span>
                    </h2>

                    <h3 className="skill-sec__sub-title">Concept of Skill and Mastery</h3>

                    <p className="skill-sec__desc">
                        At Universal Technology, we believe mastery is never a destination — it's a continuous journey of learning, refining, and evolving.Our team invests relentlessly in sharpening technical skills, design thinking, and strategic execution to stay ahead of the curve.
                        From clean code architecture to pixel-perfect interfaces, every deliverable reflects the highest standard of craft and care.
                    </p>

                    <p className="skill-sec__desc">
                       We pair data-driven marketing strategies with human-centered design to create solutions that are both powerful and purposeful.Our expertise spans the full digital spectrum — from concept to launch, from growth to scale.
                       We don't just build products — we build excellence, one project at a time.
                    </p>

                    {/* Decorative feature pills */}
                    {/* <div className="skill-sec__pills">
    {["Clean Code", "Pixel Perfect", "SEO Optimized", "Fast Delivery"].map((p) => (
        <span key={p} className="skill-sec__pill" style={{ color: "#2563eb" }}>{p}</span>
    ))}
</div> */}
                </motion.div>

                {/* RIGHT */}
                <motion.div
                    className="skill-sec__right"
                    ref={rightRef}
                    variants={fadeRight}
                    initial="hidden"
                    animate={rightView ? "visible" : "hidden"}
                >
                    <div className="skill-sec__bars">
                        {SKILLS.map((skill, i) => (
                            <SkillBar key={skill.label} {...skill} index={i} />
                        ))}
                    </div>

                    {/* Decorative card */}
                    <div className="skill-sec__card">
                        <div className="skill-sec__card-icon">
                            <TrendingUp size={22} />
                        </div>
                        <div>
                            <p className="skill-sec__card-title">100% Commitment</p>
                            <p className="skill-sec__card-sub">Every project, every time — no exceptions.</p>
                            &nbsp;
                            <p className="skill-sec__card-sub"style={{ fontWeight: 'bold' }}>The Name You Can Trust</p>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
