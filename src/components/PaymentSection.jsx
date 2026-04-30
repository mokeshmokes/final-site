import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import "./PaymentSection.css";

/* ─── Payment method data ─── */
/* Using well-known public CDN icon sources so images load without
   needing local assets. Each entry also has a fallback emoji/letter
   shown if the image fails. */
const PAYMENTS = [
    {
        name: "Cash",
        emoji: "💵",
        color: "#16a34a",
        rgb: "22,163,74",
        img: "https://cdn-icons-png.flaticon.com/512/2489/2489756.png",
    },
    {
        name: "Cheque",
        emoji: "🏦",
        color: "#2563eb",
        rgb: "37,99,235",
        img: "https://cdn-icons-png.flaticon.com/512/2830/2830284.png",
    },
    {
        name: "IMPS",
        emoji: "⚡",
        color: "#f59e0b",
        rgb: "245,158,11",
        img: "https://cdn-icons-png.flaticon.com/512/2331/2331970.png",
    },
    {
        name: "NEFT",
        emoji: "🔄",
        color: "#0891b2",
        rgb: "8,145,178",
        img: "https://cdn-icons-png.flaticon.com/512/2331/2331966.png",
    },
    {
        name: "RTGS",
        emoji: "🏛️",
        color: "#7c3aed",
        rgb: "124,58,237",
        img: "https://cdn-icons-png.flaticon.com/512/2331/2331967.png",
    },
    {
        name: "G-Pay",
        emoji: "📱",
        color: "#4285f4",
        rgb: "66,133,244",
        img: "https://cdn-icons-png.flaticon.com/512/6124/6124998.png",
    },
    {
        name: "Cash On Delivery",
        emoji: "📦",
        color: "#e11d48",
        rgb: "225,29,72",
        img: "https://cdn-icons-png.flaticon.com/512/3500/3500833.png",
    },
];

/* ─── Animation variants ─── */
const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.09 } },
};

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const headingVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: (i) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
    }),
};

/* ─── Single payment card ─── */
function PaymentCard({ name, emoji, color, rgb, img }) {
    const [imgFailed, setImgFailed] = React.useState(false);

    return (
        <motion.div
            className="pay-card"
            style={{ "--pay-color": color, "--pay-rgb": rgb }}
            variants={cardVariants}
            whileHover={{ y: -10, transition: { duration: 0.28, ease: "easeOut" } }}
        >
            {/* Top accent line on hover */}
            <div className="pay-card__accent" />

            {/* Icon / image */}
            <div className="pay-card__icon-wrap">
                {imgFailed ? (
                    <span className="pay-card__emoji">{emoji}</span>
                ) : (
                    <img
                        src={img}
                        alt={name}
                        className="pay-card__img"
                        loading="lazy"
                        onError={() => setImgFailed(true)}
                    />
                )}
            </div>

            {/* Name */}
            <p className="pay-card__name">{name}</p>

            {/* Bottom glow on hover */}
            <div className="pay-card__glow" />
        </motion.div>
    );
}

/* ─── QR code card ─── */
function QRCard({ inView }) {
    return (
        <motion.div
            className="pay-card pay-card--qr"
            style={{ "--pay-color": "#2563eb", "--pay-rgb": "37,99,235" }}
            variants={cardVariants}
            whileHover={{ y: -10, transition: { duration: 0.28, ease: "easeOut" } }}
        >
            <div className="pay-card__accent" />
            <div className="pay-card__qr-wrap">
                {/* Placeholder QR pattern — replace src with real QR image */}
                <div className="pay-card__qr-placeholder" aria-label="QR Code">
                    <svg viewBox="0 0 100 100" width="90" height="90" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {/* Top-left finder */}
                        <rect x="5" y="5" width="30" height="30" rx="3" fill="#2563eb" opacity="0.15" />
                        <rect x="10" y="10" width="20" height="20" rx="2" fill="#2563eb" opacity="0.3" />
                        <rect x="14" y="14" width="12" height="12" rx="1" fill="#2563eb" />
                        {/* Top-right finder */}
                        <rect x="65" y="5" width="30" height="30" rx="3" fill="#2563eb" opacity="0.15" />
                        <rect x="70" y="10" width="20" height="20" rx="2" fill="#2563eb" opacity="0.3" />
                        <rect x="74" y="14" width="12" height="12" rx="1" fill="#2563eb" />
                        {/* Bottom-left finder */}
                        <rect x="5" y="65" width="30" height="30" rx="3" fill="#2563eb" opacity="0.15" />
                        <rect x="10" y="70" width="20" height="20" rx="2" fill="#2563eb" opacity="0.3" />
                        <rect x="14" y="74" width="12" height="12" rx="1" fill="#2563eb" />
                        {/* Data dots */}
                        {[45, 50, 55, 60, 65, 70, 75, 80, 85, 90].map((x, i) =>
                            [45, 50, 55, 60, 65, 70, 75, 80, 85, 90].map((y, j) =>
                                (i + j) % 3 === 0 ? (
                                    <rect key={`${i}-${j}`} x={x - 42} y={y - 42} width="4" height="4" rx="1" fill="#2563eb" opacity="0.6" />
                                ) : null
                            )
                        )}
                    </svg>
                </div>
            </div>
            <p className="pay-card__name">Scan &amp; Pay</p>
            <p className="pay-card__qr-sub">Point your camera to pay instantly</p>
            <div className="pay-card__glow" />
        </motion.div>
    );
}

/* ─── Main section ─── */
export default function PaymentSection() {
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const gridRef = useRef(null);

    const headingInView = useInView(headingRef, { once: true, margin: "-80px" });
    const gridInView = useInView(gridRef, { once: true, margin: "-60px" });

    return (
        <section className="payment" id="payment" ref={sectionRef}>
            {/* Background decoration */}
            <div className="payment__bg-orb payment__bg-orb--1" />
            <div className="payment__bg-orb payment__bg-orb--2" />

            <div className="payment__container">

                {/* ── Header ── */}
                <div className="payment__header" ref={headingRef}>
                    <motion.div
                        className="payment__tag"
                        variants={headingVariants} custom={0}
                        initial="hidden" animate={headingInView ? "visible" : "hidden"}
                    >
                        <span className="payment__tag-dot" />
                        Easy &amp; Secure
                    </motion.div>

                    <motion.h2
                        className="payment__heading"
                        variants={headingVariants} custom={1}
                        initial="hidden" animate={headingInView ? "visible" : "hidden"}
                    >
                        Mode of <span className="payment__heading-accent">Payment</span>
                    </motion.h2>

                    <motion.p
                        className="payment__subheading"
                        variants={headingVariants} custom={2}
                        initial="hidden" animate={headingInView ? "visible" : "hidden"}
                    >
                        We accept multiple payment methods for your convenience.
                        Choose the one that works best for you.
                    </motion.p>

                    {/* Decorative divider */}
                    <motion.div
                        className="payment__divider"
                        initial={{ scaleX: 0 }}
                        animate={headingInView ? { scaleX: 1 } : { scaleX: 0 }}
                        transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    />
                </div>

                {/* ── Cards grid ── */}
                <motion.div
                    className="payment__grid"
                    ref={gridRef}
                    variants={containerVariants}
                    initial="hidden"
                    animate={gridInView ? "visible" : "hidden"}
                >
                    {PAYMENTS.map((p) => (
                        <PaymentCard key={p.name} {...p} />
                    ))}

                    {/* QR code card */}
                    <QRCard inView={gridInView} />
                </motion.div>

            </div>
        </section>
    );
}
