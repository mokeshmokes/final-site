import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Clock, Phone } from "lucide-react";
import "./ContactBar.css";

const CONTACT_ITEMS = [
    {
        icon: Mail,
        label: "Email Us",
        value: "info@jusco.com",
        sub: "support@jusco.com",
        href: "mailto:info@jusco.com",
        color: "#2563eb",
        rgb: "37,99,235",
    },
    {
        icon: Clock,
        label: "Working Hours",
        value: "Mon – Sat: 9:00 AM – 6:00 PM",
        sub: "Sunday: Closed",
        href: null,
        color: "#7c3aed",
        rgb: "124,58,237",
    },
    {
        icon: Phone,
        label: "Call Us",
        value: "+1 (800) 123-4567",
        sub: "+1 (800) 765-4321",
        href: "tel:+18001234567",
        color: "#059669",
        rgb: "5,150,105",
    },
];

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
    }),
};

export default function ContactBar() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-60px" });

    return (
        <section className="contact-bar" id="contact" ref={ref}>
            {/* Decorative top border */}
            <div className="contact-bar__top-line" />

            <div className="contact-bar__container">
                {CONTACT_ITEMS.map(({ icon: Icon, label, value, sub, href, color, rgb }, i) => {
                    const Inner = (
                        <motion.div
                            className="contact-bar__item"
                            style={{ "--cb-color": color, "--cb-rgb": rgb }}
                            variants={itemVariants}
                            custom={i}
                            initial="hidden"
                            animate={inView ? "visible" : "hidden"}
                            whileHover={{ y: -4, transition: { duration: 0.25, ease: "easeOut" } }}
                        >
                            {/* Icon */}
                            <div className="contact-bar__icon-wrap">
                                <Icon size={22} className="contact-bar__icon" />
                                <div className="contact-bar__icon-ring" />
                            </div>

                            {/* Text */}
                            <div className="contact-bar__text">
                                <span className="contact-bar__label">{label}</span>
                                <span className="contact-bar__value">{value}</span>
                                <span className="contact-bar__sub">{sub}</span>
                            </div>

                            {/* Hover bg */}
                            <div className="contact-bar__hover-bg" />
                        </motion.div>
                    );

                    return href ? (
                        <a key={i} href={href} className="contact-bar__link">
                            {Inner}
                        </a>
                    ) : (
                        <div key={i} className="contact-bar__link">
                            {Inner}
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
