import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Building2, Code2, Briefcase } from "lucide-react";
import "./BusinessServices.css";

const CARDS = [
    {
        icon: Building2,
        title: "Business Units",
        desc: "Dedicated divisions covering hardware supply, IT services, web solutions, and training — each focused on delivering excellence in its domain.",
        color: "#2563eb",
        rgb: "37,99,235",
    },
    {
        icon: Code2,
        title: "Software Development",
        desc: "Custom software solutions built to automate processes, improve efficiency, and give your business a competitive digital edge.",
        color: "#7c3aed",
        rgb: "124,58,237",
    },
    {
        icon: Briefcase,
        title: "Portfolio",
        desc: "A proven track record of successful projects across industries — from enterprise IT deployments to creative digital experiences.",
        color: "#059669",
        rgb: "5,150,105",
    },
];

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function BusinessServices() {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const gridRef = useRef(null);

    const headingInView = useInView(headingRef, { once: true, margin: "-80px" });
    const gridInView = useInView(gridRef, { once: true, margin: "-60px" });

    const navigate = useNavigate();

    return (
        <section className="biz-svc" id="business-services" ref={sectionRef}>
            {/* Background decoration */}
            <div className="biz-svc__bg-orb biz-svc__bg-orb--1" />
            <div className="biz-svc__bg-orb biz-svc__bg-orb--2" />

            <div className="biz-svc__container">

                {/* Header */}
                <div className="biz-svc__header" ref={headingRef}>
                    <motion.div
                        className="biz-svc__tag"
                        initial={{ opacity: 0 }}
                        animate={headingInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="biz-svc__tag-dot" />
                        Our Business Areas
                    </motion.div>

                    <motion.h2
                        className="biz-svc__heading"
                        initial={{ opacity: 0, y: 30 }}
                        animate={headingInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <span className="biz-svc__heading-accent">Technical Services</span>
                    </motion.h2>

                    <motion.p
                        className="biz-svc__sub"
                        initial={{ opacity: 0 }}
                        animate={headingInView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        From troubleshooting to optimization, our expert team delivers scalable, secure, and future-ready solutions tailored to your business needs.
                    </motion.p>

                    <motion.div
                        className="biz-svc__divider"
                        initial={{ scaleX: 0 }}
                        animate={headingInView ? { scaleX: 1 } : { scaleX: 0 }}
                        transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    />
                </div>

                {/* Cards */}
                <motion.div
                    className="biz-svc__grid"
                    ref={gridRef}
                    variants={containerVariants}
                    initial="hidden"
                    animate={gridInView ? "visible" : "hidden"}
                >
                    {CARDS.map(({ icon: Icon, title, desc, color, rgb }) => (
                        <motion.div
                            key={title}
                            className="biz-card"
                            style={{ "--bc-color": color, "--bc-rgb": rgb }}
                            variants={cardVariants}
                            whileHover={{ y: -8, scale: 1.03, transition: { duration: 0.25, ease: "easeOut" } }}
                            onClick={() => navigate(`/card/${title.toLowerCase().replace(/\s+/g, "-")}`)}
                            role="button"
                            tabIndex={0}
                            aria-label={title}
                            onKeyDown={(e) => e.key === "Enter" && navigate(`/card/${title.toLowerCase().replace(/\s+/g, "-")}`)}
                        >
                            {/* Bottom accent bar */}
                            <div className="biz-card__bar" />

                            {/* Icon */}
                            <div className="biz-card__icon-wrap">
                                <Icon size={28} className="biz-card__icon" />
                            </div>

                            {/* Text */}
                            <h3 className="biz-card__title">{title}</h3>
                            <p className="biz-card__desc">{desc}</p>

                            {/* Hover glow */}
                            <div className="biz-card__glow" />
                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
}
