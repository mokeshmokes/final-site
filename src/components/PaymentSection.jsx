import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { motion, useInView } from "framer-motion";

import "swiper/css";
import "./PaymentSection.css";

/* ─── Payment method data (unchanged) ─── */
const PAYMENTS = [
    { name: "Cash", emoji: "💵", color: "#16a34a", rgb: "22,163,74", img: "https://cdn-icons-png.flaticon.com/512/2489/2489756.png" },
    { name: "Cheque", emoji: "🏦", color: "#2563eb", rgb: "37,99,235", img: "https://cdn-icons-png.flaticon.com/512/2830/2830284.png" },
    { name: "IMPS", emoji: "⚡", color: "#f59e0b", rgb: "245,158,11", img: "https://cdn-icons-png.flaticon.com/512/2331/2331970.png" },
    { name: "NEFT", emoji: "🔄", color: "#0891b2", rgb: "8,145,178", img: "https://cdn-icons-png.flaticon.com/512/2331/2331966.png" },
    { name: "RTGS", emoji: "🏛️", color: "#7c3aed", rgb: "124,58,237", img: "https://cdn-icons-png.flaticon.com/512/2331/2331967.png" },
    { name: "G-Pay", emoji: "📱", color: "#4285f4", rgb: "66,133,244", img: "https://cdn-icons-png.flaticon.com/512/6124/6124998.png" },
    { name: "Cash On Delivery", emoji: "📦", color: "#e11d48", rgb: "225,29,72", img: "https://cdn-icons-png.flaticon.com/512/3500/3500833.png" },
];

/* ─── Owner images from public/images/ (no import needed) ─── */
const OWNER_IMAGES = [
    { src: "/images/owner1.jpg", alt: "Owner 1" },
    { src: "/images/owner2.jpg", alt: "Owner 2" },
    { src: "/images/owner3.jpg", alt: "Owner 3" },
    { src: "/images/owner4.jpg", alt: "Owner 4" },
    { src: "/images/owner5.jpg", alt: "Owner 5" },
    { src: "/images/owner6.jpg", alt: "Owner 6" },
    // { src: "/images/owner7.jpg", alt: "Owner 7", name: "Owner 7" },
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

/* ─── Single payment card (unchanged) ─── */
function PaymentCard({ name, emoji, color, rgb, img }) {
    const [imgFailed, setImgFailed] = React.useState(false);

    return (
        <motion.div
            className="pay-card"
            style={{ "--pay-color": color, "--pay-rgb": rgb }}
            variants={cardVariants}
            whileHover={{ y: -10, transition: { duration: 0.28, ease: "easeOut" } }}
        >
            <div className="pay-card__accent" />
            <div className="pay-card__icon-wrap">
                {imgFailed ? (
                    <span className="pay-card__emoji">{emoji}</span>
                ) : (
                    <img src={img} alt={name} className="pay-card__img" loading="lazy"
                        onError={() => setImgFailed(true)} />
                )}
            </div>
            <p className="pay-card__name">{name}</p>
            <div className="pay-card__glow" />
        </motion.div>
    );
}

/* ─── QR code card (with modal on click) ─── */
function QRCard() {
    const [showQR, setShowQR] = useState(false);

    return (
        <>
            {/* Card — clickable */}
            <motion.div
                className="pay-card pay-card--qr"
                style={{ "--pay-color": "#2563eb", "--pay-rgb": "37,99,235" }}
                variants={cardVariants}
                whileHover={{ y: -10, transition: { duration: 0.28, ease: "easeOut" } }}
                onClick={() => setShowQR(true)}
                role="button"
                tabIndex={0}
                aria-label="Open QR code to scan and pay"
                onKeyDown={(e) => e.key === "Enter" && setShowQR(true)}
            >
                <div className="pay-card__accent" />
                <div className="pay-card__qr-wrap">
                    <div className="pay-card__qr-placeholder" aria-label="QR Code">
                        <svg viewBox="0 0 100 100" width="90" height="90" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="5" y="5" width="30" height="30" rx="3" fill="#2563eb" opacity="0.15" />
                            <rect x="10" y="10" width="20" height="20" rx="2" fill="#2563eb" opacity="0.3" />
                            <rect x="14" y="14" width="12" height="12" rx="1" fill="#2563eb" />
                            <rect x="65" y="5" width="30" height="30" rx="3" fill="#2563eb" opacity="0.15" />
                            <rect x="70" y="10" width="20" height="20" rx="2" fill="#2563eb" opacity="0.3" />
                            <rect x="74" y="14" width="12" height="12" rx="1" fill="#2563eb" />
                            <rect x="5" y="65" width="30" height="30" rx="3" fill="#2563eb" opacity="0.15" />
                            <rect x="10" y="70" width="20" height="20" rx="2" fill="#2563eb" opacity="0.3" />
                            <rect x="14" y="74" width="12" height="12" rx="1" fill="#2563eb" />
                            {[45, 50, 55, 60, 65, 70, 75, 80, 85, 90].map((x, i) =>
                                [45, 50, 55, 60, 65, 70, 75, 80, 85, 90].map((y, j) =>
                                    (i + j) % 3 === 0 ? <rect key={`${i}-${j}`} x={x - 42} y={y - 42} width="4" height="4" rx="1" fill="#2563eb" opacity="0.6" /> : null
                                )
                            )}
                        </svg>
                    </div>
                </div>
                <p className="pay-card__name">Scan &amp; Pay</p>
                <p className="pay-card__qr-sub">Tap to open QR code</p>
                <div className="pay-card__glow" />
            </motion.div>

            {/* QR Modal */}
            {showQR && (
                <div
                    className="qr-modal"
                    onClick={() => setShowQR(false)}
                    role="dialog"
                    aria-modal="true"
                    aria-label="QR Code payment"
                >
                    <motion.div
                        className="qr-box"
                        onClick={(e) => e.stopPropagation()}
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.7 }}
                        transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
                    >
                        <p className="qr-box__title">Scan &amp; Pay</p>
                        <img
                            src="/images/qrcode.jpg"
                            alt="QR Code — Scan to Pay"
                            className="qr-box__img"
                        />
                        <p className="qr-box__sub">Point your camera at the QR code to pay instantly</p>
                        <button
                            className="qr-box__close"
                            onClick={() => setShowQR(false)}
                            aria-label="Close QR code"
                        >
                            Close
                        </button>
                    </motion.div>
                </div>
            )}
        </>
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
            <div className="payment__bg-orb payment__bg-orb--1" />
            <div className="payment__bg-orb payment__bg-orb--2" />

            <div className="payment__container">

                {/* ── Header (full width, centred) ── */}
                <div className="payment__header" ref={headingRef}>
                    <motion.div className="payment__tag" variants={headingVariants} custom={0}
                        initial="hidden" animate={headingInView ? "visible" : "hidden"}>
                        <span className="payment__tag-dot" />
                        Easy &amp; Secure
                    </motion.div>

                    <motion.h2 className="payment__heading" variants={headingVariants} custom={1}
                        initial="hidden" animate={headingInView ? "visible" : "hidden"}>
                        Mode of <span className="payment__heading-accent">Payment</span>
                    </motion.h2>

                    <motion.p className="payment__subheading" variants={headingVariants} custom={2}
                        initial="hidden" animate={headingInView ? "visible" : "hidden"}>
                        We accept multiple payment methods for your convenience.
                        Choose the one that works best for you.
                    </motion.p>

                    <motion.div className="payment__divider"
                        initial={{ scaleX: 0 }}
                        animate={headingInView ? { scaleX: 1 } : { scaleX: 0 }}
                        transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    />
                </div>

                {/* ── Two-column body: cards LEFT + image slider RIGHT ── */}
                <div className="payment__body">

                    {/* LEFT — payment cards, always visible */}
                    <div className="payment__left">
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
                            <QRCard />
                        </motion.div>
                    </div>

                    {/* RIGHT — continuous owner image slider + owner details */}
                    <div className="payment__right">
                        <Swiper
                            modules={[Autoplay]}
                            slidesPerView={1}
                            loop
                            speed={3000}
                            autoplay={{ delay: 0, disableOnInteraction: false }}
                            className="payment__img-swiper"
                        >
                            {OWNER_IMAGES.map(({ src, alt, name }) => (
                                <SwiperSlide key={src}>
                                    <div className="payment__owner-card">
                                        <img
                                            src={src}
                                            alt={alt}
                                            className="payment__owner-img"
                                            loading="lazy"
                                        />
                                        <p className="payment__owner-name">{name}</p>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        {/* Owner details — below the slider */}
                        <div className="payment__owner-details">
                            <p className="payment__owner-details-name">
                                C. SWAMINATHAN. MCP, BCA, PGDCA, DIM, DHE, DNE, DTP.
                            </p>
                            <p className="payment__owner-details-role">
                                HUMAN RIGHTS — SALEM CITY ORGANIZER
                            </p>
                            <p className="payment__owner-details-role">
                                LION CLUB OF SALEM — ACT. SECRETARY
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
