import { useEffect, useState } from "react";
import "./Loader.css";

export default function Loader() {
    const [visible, setVisible] = useState(true);
    const [hiding, setHiding] = useState(false);

    useEffect(() => {
        /* Start fade-out at 2.2 s, fully unmount at 2.7 s */
        const fadeTimer = setTimeout(() => setHiding(true), 2000);
        const removeTimer = setTimeout(() => setVisible(false), 3400);
        return () => {
            clearTimeout(fadeTimer);
            clearTimeout(removeTimer);
        };
    }, []);

    if (!visible) return null;

    return (
        <div className={`loader ${hiding ? "loader--hiding" : ""}`} aria-hidden="true">
            {/* Animated background rings */}
            <div className="loader__ring loader__ring--1" />
            <div className="loader__ring loader__ring--2" />

            {/* Logo */}
            <div className="loader__logo-wrap">
                <img
                    src="/images/companylogo.jpg"
                    alt="Company Logo"
                    className="loader__logo"
                    onError={(e) => {
                        /* Fallback: show initials if image is missing */
                        e.currentTarget.style.display = "none";
                        e.currentTarget.nextSibling.style.display = "flex";
                    }}
                />
                {/* Fallback initials badge */}
                <div className="loader__logo-fallback" style={{ display: "none" }}>
                    UT
                </div>
            </div>

            {/* Slogan */}
            <p className="loader__slogan">THE NAME YOU CAN TRUST</p>

            {/* Progress bar */}
            <div className="loader__bar-wrap">
                <div className="loader__bar" />
            </div>
        </div>
    );
}
