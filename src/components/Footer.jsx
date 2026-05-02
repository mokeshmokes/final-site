import { Link, useNavigate } from "react-router-dom";
import { Mail, Phone, Heart } from "lucide-react";
import { FaXTwitter, FaLinkedinIn, FaInstagram, FaFacebookF } from "react-icons/fa6";
import "./Footer.css";

const FOOTER_LINKS = [
    {
        heading: "Company",
        links: [
            { label: "About Us", sectionId: "about-us" },
            { label: "Our Team", sectionId: "team" },
            { label: "Careers", sectionId: null },
            { label: "Blog", sectionId: null },
        ],
    },
    {
        heading: "Services",
        links: [
            { label: "IT Consulting", sectionId: "it-services" },
            { label: "Installation Services", sectionId: "it-services" },
            { label: "Annual Maintenance", sectionId: "it-services" },
            { label: "Regular Maintenance", sectionId: "it-services" },
            { label: "Oncall Support", sectionId: "it-services" },
            { label: "Remote Management", sectionId: "it-services" },
            { label: "Internet & Intranet", sectionId: "it-services" },
        ],
    },
    {
        heading: "Products",
        links: [
            { label: "Desktop", sectionId: "products" },
            { label: "Laptop", sectionId: "products" },
            { label: "Server", sectionId: "products" },
            { label: "Firewall", sectionId: "products" },
            { label: "NAS Storage", sectionId: "products" },
            { label: "Printer", sectionId: "products" },
            { label: "Router & Switches", sectionId: "products" },
            { label: "CCTV", sectionId: "products" },
        ],
    },
    {
        heading: "Website",
        links: [
            { label: "Web Development", sectionId: "services" },
            { label: "WordPress", sectionId: "services" },
            { label: "E-Commerce", sectionId: "services" },
            { label: "Logo & Branding", sectionId: "services" },
            { label: "Domain & Hosting", sectionId: "services" },
            { label: "Professional Training", sectionId: "services" },
        ],
    },
    {
        heading: "Technical",
        links: [
            { label: "Business Units", sectionId: "business-services" },
            { label: "Software Development", sectionId: "business-services" },
            { label: "Portfolio", sectionId: "business-services" },
        ],
    },
    {
        heading: "Support",
        links: [
            { label: "Contact Us", sectionId: "visit-us" },
            { label: "AMC Plans", sectionId: "it-services" },
            { label: "Remote Support", sectionId: "it-services" },
            { label: "FAQ", sectionId: null },
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
    const navigate = useNavigate();

    const handleSectionLink = (sectionId) => {
        if (!sectionId) return;
        if (window.location.pathname !== "/") {
            navigate("/#" + sectionId);
        } else {
            const el = document.getElementById(sectionId);
            if (el) {
                const top = el.offsetTop - 80;
                window.scrollTo({ top, behavior: "smooth" });
            }
        }
    };

    return (
        <footer className="footer">
            {/* Top gradient line */}
            <div className="footer__top-line" />

            <div className="footer__container">
                {/* ── Brand column ── */}
                <div className="footer__brand">
                    <Link to="/" className="footer__logo">
                        <img
                            src="/images/companylogo.jpg"
                            alt="Company Logo"
                            className="footer__logo-img"
                        />
                        <span className="footer__logo-text">
                            <span
                                className="footer__logo-accent"
                                style={{
                                    color: "#ffd700"
                                }}
                            >
                                UT
                            </span>
                        </span>
                    </Link>

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

                {/* ── Link columns — single row ── */}
                <div className="footer__links">
                    {FOOTER_LINKS.map(({ heading, links }) => (
                        <div key={heading} className="footer__col">
                            <h4 className="footer__col-heading">{heading}</h4>
                            <ul className="footer__col-links">
                                {links.map(({ label, sectionId }) => (
                                    <li key={label}>
                                        {sectionId ? (
                                            <button
                                                className="footer__col-link footer__col-link--btn"
                                                onClick={() => handleSectionLink(sectionId)}
                                            >
                                                <span className="footer__col-link-dot" />
                                                {label}
                                            </button>
                                        ) : (
                                            <span className="footer__col-link footer__col-link--disabled">
                                                <span className="footer__col-link-dot" />
                                                {label}
                                            </span>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Bottom bar ── */}
            <div className="footer__bottom">
                <div className="footer__bottom-inner">

                    <p className="footer__copy">
                        &copy; {year} <span className="footer__copy-brand">Universal Technology</span>. All copy rights reserved.
                    </p>

                    <p className="footer__made">
                        Made with <Heart size={13} className="footer__heart" fill="currentColor" /> by the Universal Technology Team
                    </p>

                </div>
            </div>
        </footer>
    );
}
