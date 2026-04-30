import React from "react";
import { Globe, Mail, Phone, Heart } from "lucide-react";
import { FaXTwitter, FaLinkedinIn, FaInstagram, FaFacebookF } from "react-icons/fa6";
import "./Footer.css";

const FOOTER_LINKS = [
    {
        heading: "Company",
        links: [
            { label: "About Us", href: "#about-us" },
            { label: "Our Team", href: "#team" },
            { label: "Careers", href: "" },
            { label: "Blog", href: "" },
        ],
    },
    {
        heading: "Services",
        links: [
            { label: "Web Development", href: "#services" },
            { label: "IT Services", href: "#it-services" },
            { label: "E-Commerce", href: "#services" },
            { label: "Branding & Design", href: "#services" },
        ],
    },
    {
        heading: "Products",
        links: [
            { label: "Desktop & Laptops", href: "#products" },
            { label: "Servers", href: "#products" },
            { label: "Networking", href: "#products" },
            { label: "CCTV & Security", href: "#products" },
        ],
    },
    {
        heading: "Support",
        links: [
            { label: "Contact Us", href: "#visit-us" },
            { label: "AMC Plans", href: "#it-services" },
            { label: "Remote Support", href: "#it-services" },
            { label: "FAQ", href: "" },
        ],
    },
];

const SOCIALS = [
    { icon: FaXTwitter, href: "", label: "Twitter / X" },
    { icon: FaLinkedinIn, href: "", label: "LinkedIn" },
    { icon: FaInstagram, href: "", label: "Instagram" },
    { icon: FaFacebookF, href: "", label: "Facebook" },
];

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="footer">
            {/* Top gradient line */}
            <div className="footer__top-line" />

            <div className="footer__container">
                {/* ── Brand column ── */}
                <div className="footer__brand">
                    <a href="#home" className="footer__logo">
                        <span className="footer__logo-icon">
                            <Globe size={18} />
                        </span>
                        <span className="footer__logo-text">
                            Corp<span className="footer__logo-accent">X</span>
                        </span>
                    </a>

                    <p className="footer__brand-desc">
                        A full-service digital agency delivering innovative web, IT, and
                        branding solutions that help businesses grow and thrive in the
                        digital age.
                    </p>

                    {/* Contact mini-list */}
                    <div className="footer__contact-list">
                        <a href="mailto:info@jusco.com" className="footer__contact-item">
                            <Mail size={14} />
                            info@jusco.com
                        </a>
                        <a href="tel:+18001234567" className="footer__contact-item">
                            <Phone size={14} />
                            +1 (800) 123-4567
                        </a>
                    </div>

                    {/* Socials */}
                    <div className="footer__socials">
                        {SOCIALS.map(({ icon: Icon, href, label }) => (
                            <a
                                key={label}
                                href={href}
                                className="footer__social-btn"
                                aria-label={label}
                                title={label}
                            >
                                <Icon style={{ fontSize: "15px" }} />
                            </a>
                        ))}
                    </div>
                </div>

                {/* ── Link columns ── */}
                {FOOTER_LINKS.map(({ heading, links }) => (
                    <div key={heading} className="footer__col">
                        <h4 className="footer__col-heading">{heading}</h4>
                        <ul className="footer__col-links">
                            {links.map(({ label, href }) => (
                                <li key={label}>
                                    <a href={href} className="footer__col-link">
                                        <span className="footer__col-link-dot" />
                                        {label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* ── Bottom bar ── */}
            <center>
            <div className="footer__bottom">
                <div className="footer__bottom-inner">
                   <center><p className="footer__copy">
                       &copy; {year} <span className="footer__copy-brand">JUSCO</span>. All rights reserved.
                    </p></center>
                    <p className="footer__made">
                        Made with <Heart size={13} className="footer__heart" fill="currentColor" /> by the JUSCO Team
                    </p>
                    {/* <div className="footer__bottom-links">
                        <a href="" className="footer__bottom-link">Privacy Policy</a>
                        <span className="footer__bottom-sep">·</span>
                        <a href="" className="footer__bottom-link">Terms of Service</a>
                    </div> */}
                </div>
            </div>
            </center>
        </footer>
    );
}
