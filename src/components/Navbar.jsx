import React, { useState, useEffect, useRef, useCallback } from "react";
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
import "./Navbar.css";

/* ─── Theme definitions ─── */
const THEMES = [
  { id: "blue", label: "Royal Blue", color: "#2563eb", rgb: "37,99,235", dark: "#1d4ed8" },
  { id: "violet", label: "Deep Violet", color: "#7c3aed", rgb: "124,58,237", dark: "#6d28d9" },
  { id: "rose", label: "Rose Red", color: "#e11d48", rgb: "225,29,72", dark: "#be123c" },
  { id: "emerald", label: "Emerald", color: "#059669", rgb: "5,150,105", dark: "#047857" },
  { id: "amber", label: "Amber Gold", color: "#d97706", rgb: "217,119,6", dark: "#b45309" },
  { id: "cyan", label: "Cyan Tech", color: "#0891b2", rgb: "8,145,178", dark: "#0e7490" },
  { id: "slate", label: "Slate Dark", color: "#334155", rgb: "51,65,85", dark: "#1e293b" },
];

/* ─── Nav link → section ID map ─── */
const NAV_LINKS = [
  { label: "Home", id: "home" },
  { label: "About Us", id: "about-us" },
  { label: "Services", id: "services" },
  { label: "Products", id: "products" },
  { label: "Website", id: "showcase" },
  { label: "Technical", id: "it-services" },
  { label: "Visit Us", id: "visit-us" },
];

function applyTheme(theme) {
  const root = document.documentElement;
  root.style.setProperty("--theme-color", theme.color);
  root.style.setProperty("--theme-color-dark", theme.dark);
  root.style.setProperty("--theme-color-light", theme.color);
  root.style.setProperty("--theme-rgb", theme.rgb);
}

/* Smooth scroll with navbar offset */
function scrollToSection(id) {
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

  /* Apply saved theme on mount */
  useEffect(() => {
    applyTheme(activeTheme);
  }, []); // eslint-disable-line

  /* Scroll listener */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
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
        <a href="#home" className="navbar__logo">
          <span className="navbar__logo-icon">
            <Globe size={20} />
          </span>
          <span className="navbar__logo-text">
            Corp<span className="navbar__logo-accent">X</span>
          </span>
        </a>

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
        </ul>

        {/* ── Right icons ── */}
        <div className="navbar__actions">
          {/* Contact / utility icons */}
          <a href="mailto:info@corpx.com" className="navbar__icon-btn" title="Email us">
            <Mail size={18} />
          </a>
          <a href="tel:+1234567890" className="navbar__icon-btn" title="Call us">
            <Phone size={18} />
          </a>
          <button
            type="button"
            className="navbar__icon-btn"
            title="Global"
            aria-label="Global"
          >
            <Globe size={18} />
          </button>

          {/* Settings trigger */}
          <div className="navbar__settings-wrap" ref={settingsRef}>
            <button
              className={`navbar__icon-btn navbar__settings-btn ${showSettings ? "navbar__settings-btn--active" : ""}`}
              onClick={() => setShowSettings((v) => !v)}
              title="Theme settings"
              aria-label="Open theme settings"
            >
              <Settings size={18} className={showSettings ? "spin" : ""} />
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
