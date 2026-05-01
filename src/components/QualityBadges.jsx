import { motion } from "framer-motion";
import "./QualityBadges.css";

/*
 * Badge images — replace src values with your real badge images.
 * Drop files into public/images/ and update the paths below.
 */
const BADGES = [
    {
        src: "/images/satisfaction.jpg",
        alt: "Premium Quality",
        // label: "Premium Quality",
        fallbackIcon: "🏆",
        color: "#0f53e7ff",
    },
    {
        src: "/images/bestquality1.jpg",
        alt: "100% Satisfaction",
        // label: "100% Satisfaction",
        fallbackIcon: "⭐",
        color: "#7c3aed",
    },
    {
        src: "/images/bestquality.jpg",
        alt: "Best Service",
        // label: "Best Service",
        fallbackIcon: "✅",
        color: "#059669",
    },
    // {
    //     src: "/images/badge4.png",
    //     alt: "Trusted Brand",
    //     // label: "Trusted Brand",
    //     fallbackIcon: "🛡️",
    //     color: "#d97706",
    // },
];

function Badge({ src, alt, label, fallbackIcon, color, index }) {
    return (
        <motion.div
            className="qb-badge"
            style={{ "--qb-color": color }}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
            whileHover={{ scale: 1.1, y: -6, transition: { duration: 0.25 } }}
        >
            <img
                src={src}
                alt={alt}
                className="qb-badge__img"
                onError={(e) => {
                    e.currentTarget.style.display = "none";
                    if (e.currentTarget.nextSibling) {
                        e.currentTarget.nextSibling.style.display = "flex";
                    }
                }}
            />
            {/* Fallback tile shown when image is missing */}
            <div className="qb-badge__fallback" style={{ display: "none" }}>
                <span className="qb-badge__emoji">{fallbackIcon}</span>
            </div>
            <p className="qb-badge__label">{label}</p>
        </motion.div>
    );
}

export default function QualityBadges() {
    return (
        <section className="quality-badges" id="quality">
            <div className="quality-badges__container">

                {/* Heading */}
                <motion.div
                    className="quality-badges__header"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <div className="quality-badges__tag">
                        <span className="quality-badges__tag-dot"/>
                        Our Commitment
                    </div>
                    <h2 className="quality-badges__heading">
                        Quality You Can <span className="quality-badges__heading-accent">Trust</span>
                    </h2>
                </motion.div>

                {/* Badges row */}
                <div className="quality-badges__grid">
                    {BADGES.map((badge, i) => (
                        <Badge key={badge.alt} {...badge} index={i} />
                    ))}
                </div>

            </div>
        </section>
    );
}