import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
    Monitor, Laptop, Server, Shield, HardDrive,
    Printer, Network, Camera,
} from "lucide-react";
import "./ProductsSection.css";

const PRODUCTS = [
    { icon: Monitor, title: "Desktop", desc: "High-performance desktop computers for business, workstations, and enterprise environments.", color: "#2563eb", rgb: "37,99,235" },
    { icon: Laptop, title: "Laptop", desc: "Premium laptops for professionals — lightweight, powerful, and built for productivity on the go.", color: "#7c3aed", rgb: "124,58,237" },
    { icon: Server, title: "Server", desc: "Rack, tower, and blade servers engineered for reliability, scalability, and enterprise workloads.", color: "#059669", rgb: "5,150,105" },
    { icon: Shield, title: "Firewall", desc: "Next-generation firewall solutions to protect your network from threats and unauthorized access.", color: "#e11d48", rgb: "225,29,72" },
    { icon: HardDrive, title: "Network Attached Storage", desc: "NAS solutions for centralized, secure, and scalable data storage across your organization.", color: "#0891b2", rgb: "8,145,178" },
    { icon: Printer, title: "Printer", desc: "Commercial-grade printers and multifunction devices for high-volume, high-quality document output.", color: "#d97706", rgb: "217,119,6" },
    { icon: Network, title: "Router & Switches", desc: "Enterprise networking hardware for fast, reliable, and secure wired and wireless connectivity.", color: "#6d28d9", rgb: "109,40,217" },
    { icon: Camera, title: "CCTV", desc: "Advanced surveillance camera systems for comprehensive security monitoring of your premises.", color: "#dc2626", rgb: "220,38,38" },
];

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.09 } },
};

const cardVariants = {
    hidden: { opacity: 0, scale: 0.92, y: 30 },
    visible: {
        opacity: 1, scale: 1, y: 0,
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
};

const headingVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
    }),
};

function ProductCard({ icon: Icon, title, desc, color, rgb }) {
    return (
        <motion.div
            className="prod-card"
            style={{ "--pc-color": color, "--pc-rgb": rgb }}
            variants={cardVariants}
            whileHover={{ y: -8, transition: { duration: 0.28, ease: "easeOut" } }}
        >
            {/* Animated icon */}
            <div className="prod-card__icon-wrap">
                <div className="prod-card__icon-bg" />
                <Icon size={30} className="prod-card__icon" />
                <div className="prod-card__icon-ring" />
            </div>

            <h3 className="prod-card__title">{title}</h3>
            <p className="prod-card__desc">{desc}</p>

            {/* Bottom color bar */}
            <div className="prod-card__bar" />
        </motion.div>
    );
}

export default function ProductsSection() {
    const headerRef = useRef(null);
    const contentRef = useRef(null);
    const gridRef = useRef(null);

    const headerView = useInView(headerRef, { once: true, margin: "-80px" });
    const contentView = useInView(contentRef, { once: true, margin: "-60px" });
    const gridView = useInView(gridRef, { once: true, margin: "-60px" });

    return (
        <section className="products" id="products">
            <div className="products__bg-orb products__bg-orb--1" />
            <div className="products__bg-orb products__bg-orb--2" />

            <div className="products__container">

                {/* ── Top: heading left + description right ── */}
                <div className="products__top" ref={headerRef}>
                    <motion.div
                        className="products__top-left"
                        initial={{ opacity: 0, x: -40 }}
                        animate={headerView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="products__tag">
                            <span className="products__tag-dot" />
                            HARDWARE &amp; SALES
                        </div>
                        <h2 className="products__heading">
                            Our <span className="products__heading-accent">Products</span>
                        </h2>
                        <motion.div
                            className="products__divider"
                            initial={{ scaleX: 0 }}
                            animate={headerView ? { scaleX: 1 } : { scaleX: 0 }}
                            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        />
                    </motion.div>

                    <motion.div
                        className="products__top-right"
                        ref={contentRef}
                        initial={{ opacity: 0, x: 40 }}
                        animate={contentView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <p className="products__top-desc">
                            We supply and distribute a comprehensive range of premium hardware
                            products from the world's leading brands. Whether you're equipping
                            a startup or scaling an enterprise, our product portfolio covers
                            every technology need — from workstations to surveillance systems.
                        </p>
                        <p className="products__top-desc">
                            All products come with manufacturer warranties, professional
                            installation support, and ongoing maintenance options through our
                            AMC and support service plans.
                        </p>
                    </motion.div>
                </div>

                {/* ── Product grid ── */}
                <motion.div
                    className="products__grid"
                    ref={gridRef}
                    variants={containerVariants}
                    initial="hidden"
                    animate={gridView ? "visible" : "hidden"}
                >
                    {PRODUCTS.map((p) => (
                        <ProductCard key={p.title} {...p} />
                    ))}
                </motion.div>

            </div>
        </section>
    );
}
