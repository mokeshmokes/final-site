import React, { useState } from "react";
import "./PartnersSection.css";

/*
 * Primary:  Wikipedia SVG logos — unique per company, no hotlink block,
 *           public domain / freely licensed.
 * Fallback: Simple text initial rendered via CSS when both fail.
 *
 * Each entry has a completely different URL — no duplicates.
 */
const LOGOS = [
    {
        name: "Dell",
        img: "https://upload.wikimedia.org/wikipedia/commons/4/48/Dell_Logo.svg",
        initial: "D",
        color: "#007DB8",
    },
    {
        name: "Samsung",
        img: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg",
        initial: "S",
        color: "#1428A0",
    },
    {
        name: "HP",
        img: "https://upload.wikimedia.org/wikipedia/commons/a/ad/HP_logo_2012.svg",
        initial: "HP",
        color: "#0096D6",
    },
    {
        name: "Lenovo",
        img: "https://upload.wikimedia.org/wikipedia/commons/b/b8/Lenovo_logo_2015.svg",
        initial: "L",
        color: "#E2231A",
    },
    {
        name: "Intel",
        img: "https://upload.wikimedia.org/wikipedia/commons/7/7d/Intel_logo_%282006-2020%29.svg",
        initial: "i",
        color: "#0071C5",
    },
    {
        name: "AMD",
        img: "https://upload.wikimedia.org/wikipedia/commons/7/7c/AMD_Logo.svg",
        initial: "A",
        color: "#ED1C24",
    },
    {
        name: "Wipro",
        img: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Wipro_Primary_Logo_Color_RGB.svg",
        initial: "W",
        color: "#341F6A",
    },
    {
        name: "IBM",
        img: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
        initial: "IBM",
        color: "#1F70C1",
    },
    {
        name: "Acer",
        img: "https://upload.wikimedia.org/wikipedia/commons/0/00/Acer_2011.svg",
        initial: "Ac",
        color: "#83B81A",
    },
    {
        name: "Apple",
        img: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
        initial: "🍎",
        color: "#555555",
    },
];

/* Duplicate for seamless infinite CSS marquee loop */
const TRACK = [...LOGOS, ...LOGOS];

function LogoItem({ name, img, initial, color }) {
    const [failed, setFailed] = useState(false);

    return (
        <div className="partner-logo" title={name}>
            <div className="partner-logo__inner">
                {failed ? (
                    /* Unique colored initial shown only when image truly fails */
                    <span
                        className="partner-logo__initial"
                        style={{ background: color }}
                    >
                        {initial}
                    </span>
                ) : (
                    <img
                        src={img}
                        alt={`${name} logo`}
                        className="partner-logo__img"
                        loading="lazy"
                        onError={() => setFailed(true)}
                    />
                )}
            </div>
            <span className="partner-logo__name">{name}</span>
        </div>
    );
}

export default function PartnersSection() {
    return (
        <section className="partners" id="partners">
            <div className="partners__container">
                {/* Heading */}
                <div className="partners__header">
                    <p className="partners__eyebrow">Trusted By Industry Leaders</p>
                    <h2 className="partners__heading">
                        WHOLESALE DISTRIBUTOR FOR<br />
                        <span className="partners__heading-accent">
                            COMPUTER PERIPHERALS &amp; ACCESSORIES
                        </span>
                    </h2>
                    <div className="partners__underline">
                        <span className="partners__underline-bar" />
                        <span className="partners__underline-dot" />
                        <span className="partners__underline-bar" />
                    </div>
                </div>

                {/* Marquee slider */}
                <div className="partners__track-wrap">
                    <div className="partners__fade partners__fade--left" />
                    <div className="partners__fade partners__fade--right" />
                    <div className="partners__track">
                        {TRACK.map((logo, i) => (
                            <LogoItem key={`${logo.name}-${i}`} {...logo} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
