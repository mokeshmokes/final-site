import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Globe,
  Mail,
  Phone,
  Settings,
  X,
  Check,
  Menu,
  ChevronDown,
} from "lucide-react";
import { FaFacebookF, FaXTwitter, FaInstagram } from "react-icons/fa6";
import "./Navbar.css";

/* ─── Theme definitions ─── */
const THEMES = [
  { id: "blue", label: "Royal Blue", color: "#2563EB", rgb: "37,99,235", dark: "#1D4ED8" },
  { id: "cyan", label: "Cyan", color: "#06B6D4", rgb: "6,182,212", dark: "#0891B2" },
  { id: "teal", label: "Teal", color: "#0EA5E9", rgb: "14,165,233", dark: "#0284C7" },
  { id: "violet", label: "Violet", color: "#7C3AED", rgb: "124,58,237", dark: "#6D28D9" },
  { id: "amber", label: "Amber", color: "#F59E0B", rgb: "245,158,11", dark: "#D97706" },
  { id: "yellow", label: "Yellow", color: "#FFD700", rgb: "255,215,0", dark: "#D4AF00" },
  { id: "green", label: "Green", color: "#22C55E", rgb: "34,197,94", dark: "#16A34A" },
  { id: "lightpink", label: "Light Pink", color: "#FFB6C1", rgb: "255,182,193", dark: "#FF8FA3" },
  { id: "lightgreen", label: "Light Green", color: "#90EE90", rgb: "144,238,144", dark: "#5DBD5D" },
];

/* ─── Nav link → section ID map ─── */
const NAV_LINKS = [
  { label: "Home", id: "home" },
  { label: "About Us", id: "about-us" },
  { label: "Services", id: "it-services" },  // scrolls to Professional IT Services
  { label: "Products", id: "products" },
  { label: "Website", id: "showcase" },
  { label: "Technical", id: "business-services" },  // scrolls to Technical / Business Services
  { label: "Visit Us", id: "visit-us" },
];

function applyTheme(theme) {
  const root = document.documentElement;
  root.style.setProperty("--theme-color", theme.color);
  root.style.setProperty("--theme-color-dark", theme.dark);
  root.style.setProperty("--theme-color-light", theme.color);
  root.style.setProperty("--theme-rgb", theme.rgb);
}

/* Smooth scroll with navbar offset — works on home page only */
function scrollToSectionOnPage(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const navbarHeight = 72;
  const top = el.getBoundingClientRect().top + window.scrollY - navbarHeight;
  window.scrollTo({ top, behavior: "smooth" });
}

export default function Navbar() {
  const savedId = localStorage.getItem("themeId") || "blue";
  const [activeTheme, setActiveTheme] = useState(
    () => THEMES.find((t) => t.id === savedId) || THEMES[0]
  );
  const [showSettings, setShowSettings] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");
  const settingsRef = useRef(null);
  const navigate = useNavigate();

  /* Navigate to section — works from any page */
  const scrollToSection = useCallback((id) => {
    if (window.location.pathname !== "/") {
      navigate("/#" + id);
    } else {
      scrollToSectionOnPage(id);
    }
  }, [navigate]);

  /* Apply saved theme on mount */
  useEffect(() => {
    applyTheme(activeTheme);
  }, []); // eslint-disable-line

  /* Scroll listener — navbar scrolled state + active link detection */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      // Determine which section is currently in view
      const offset = 100; // px below navbar to trigger active
      for (let i = NAV_LINKS.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV_LINKS[i].id);
        if (el && el.getBoundingClientRect().top <= offset) {
          setActiveLink(NAV_LINKS[i].label);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close settings panel on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (settingsRef.current && !settingsRef.current.contains(e.target)) {
        setShowSettings(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selectTheme = useCallback((theme) => {
    setActiveTheme(theme);
    applyTheme(theme);
    localStorage.setItem("themeId", theme.id);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__inner">

        {/* ── Logo ── */}
        <Link to="/" className="navbar__logo">
          <img
            src="/images/companylogo.jpg"
            alt="Company Logo"
            className="navbar__logo-img"
          />
          <span
            className="navbar__logo-text"
            style={{
              color: "#ffd700",
              fontWeight: "700"
            }}
          >
            UT
          </span>
        </Link>

        {/* ── Desktop nav links ── */}
        <ul className="navbar__links">
          {NAV_LINKS.map(({ label, id }) => (
            <li key={label} className="navbar__link-item">
              <a
                href={`#${id}`}
                className={`navbar__link ${activeLink === label ? "navbar__link--active" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveLink(label);
                  scrollToSection(id);
                }}
              >
                {label}
                {label === "Services" || label === "Products" ? (
                  <ChevronDown size={13} className="navbar__link-chevron" />
                ) : null}
              </a>
            </li>
          ))}
          {/* Get Quote — sits right after Visit Us */}
          <li className="navbar__link-item">
            <a
              href="#visit-us"
              className="navbar__quote-btn"
              onClick={(e) => { e.preventDefault(); scrollToSection("visit-us"); }}
            >
              Get Quote
            </a>
          </li>
        </ul>

        {/* ── Right icons ── */}
        <div className="navbar__actions">
          {/* Contact / utility icons */}
          <a href="swamijai@gmail.com" className="navbar__icon-btn" title="Email us">
            <Mail size={18} />
          </a>
          <a href="tel:+919944494299" className="navbar__icon-btn" title="Call us">
            <Phone size={18} />
          </a>
          {/* <button
            type="button"
            className="navbar__icon-btn"
            title="Global"
            aria-label="Global"
          >
            <Globe size={18} />
          </button> */}

          {/* ── Social icons ── */}
          <span className="navbar__divider" aria-hidden="true" />
          <div className="navbar__socials">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="navbar__icon-btn navbar__social-btn"
              title="Facebook"
              aria-label="Facebook"
            >
              <FaFacebookF style={{ fontSize: "16px" }} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="navbar__icon-btn navbar__social-btn"
              title="Twitter / X"
              aria-label="Twitter / X"
            >
              <FaXTwitter style={{ fontSize: "16px" }} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="navbar__icon-btn navbar__social-btn"
              title="Instagram"
              aria-label="Instagram"
            >
              <FaInstagram style={{ fontSize: "16px" }} />
            </a>
          </div>
          <span className="navbar__divider" aria-hidden="true" />

          {/* Settings trigger */}
          <div className="navbar__settings-wrap" ref={settingsRef}>
            <button
              className={`navbar__icon-btn navbar__settings-btn ${showSettings ? "navbar__settings-btn--active" : ""}`}
              onClick={() => setShowSettings((v) => !v)}
              title="Theme settings"
              aria-label="Open theme settings"
            >
              <Settings size={18} className="settings-icon" />
            </button>

            {/* Settings panel */}
            {showSettings && (
              <div className="settings-panel" role="dialog" aria-label="Theme customization">
                <div className="settings-panel__header">
                  <span className="settings-panel__title">Theme Customization</span>
                  <button
                    className="settings-panel__close"
                    onClick={() => setShowSettings(false)}
                    aria-label="Close settings"
                  >
                    <X size={16} />
                  </button>
                </div>
                <p className="settings-panel__subtitle">Choose your brand color</p>
                <div className="settings-panel__swatches">
                  {THEMES.map((theme) => (
                    <button
                      key={theme.id}
                      className={`swatch ${activeTheme.id === theme.id ? "swatch--active" : ""}`}
                      style={{ "--swatch-color": theme.color }}
                      onClick={() => selectTheme(theme)}
                      title={theme.label}
                      aria-label={`Select ${theme.label} theme`}
                    >
                      {activeTheme.id === theme.id && (
                        <Check size={14} className="swatch__check" />
                      )}
                    </button>
                  ))}
                </div>
                <div className="settings-panel__labels">
                  {THEMES.map((theme) => (
                    <span
                      key={theme.id}
                      className={`swatch-label ${activeTheme.id === theme.id ? "swatch-label--active" : ""}`}
                      style={activeTheme.id === theme.id ? { color: theme.color } : {}}
                    >
                      {theme.label}
                    </span>
                  ))}
                </div>
                <div className="settings-panel__preview">
                  <span>Active:</span>
                  <span
                    className="settings-panel__preview-chip"
                    style={{ background: activeTheme.color }}
                  >
                    {activeTheme.label}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="navbar__hamburger"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle mobile menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      <div className={`navbar__mobile ${mobileOpen ? "navbar__mobile--open" : ""}`}>
        <ul className="navbar__mobile-links">
          {NAV_LINKS.map(({ label, id }) => (
            <li key={label}>
              <a
                href={`#${id}`}
                className={`navbar__mobile-link ${activeLink === label ? "navbar__mobile-link--active" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveLink(label);
                  setMobileOpen(false);
                  scrollToSection(id);
                }}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
        <div className="navbar__mobile-icons">
          <a href="mailto:info@corpx.com" className="navbar__icon-btn" title="Email us"><Mail size={18} /></a>
          <a href="tel:+1234567890" className="navbar__icon-btn" title="Call us"><Phone size={18} /></a>
          <button type="button" className="navbar__icon-btn" title="Global" aria-label="Global"><Globe size={18} /></button>
        </div>
      </div>
    </nav>
  );
}
