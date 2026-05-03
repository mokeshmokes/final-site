import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import emailjs from "@emailjs/browser";
import {
    User, Mail, Phone, MessageSquare, Send,
    CheckCircle2, AlertCircle, MapPin, Clock,
} from "lucide-react";
import "./ContactSection.css";

/* ─── EmailJS config — replace with your real IDs from emailjs.com ─── */
const EJS_SERVICE_ID = "YOUR_SERVICE_ID";   // e.g. "service_abc123"
const EJS_ADMIN_TPL = "YOUR_ADMIN_TEMPLATE_ID";  // template that mails YOU
const EJS_REPLY_TPL = "YOUR_REPLY_TEMPLATE_ID";  // auto-reply template to user
const EJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";   // Account → API Keys → Public Key

/* ─── Validation helpers ─── */
const validators = {
    name: (v) => v.trim().length >= 2 ? "" : "Name must be at least 2 characters.",
    address: (v) => v.trim().length >= 5 ? "" : "Please enter your address.",
    phone: (v) => /^[+]?[\d\s\-().]{7,15}$/.test(v.trim()) ? "" : "Please enter a valid phone number.",
    mobile: (v) => v.trim() === "" || /^[+]?[\d\s\-().]{7,15}$/.test(v.trim()) ? "" : "Please enter a valid mobile number.",
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? "" : "Please enter a valid email address.",
    subjects: (v) => v.trim().length >= 5 ? "" : "Subject must be at least 5 characters.",
};

const INITIAL = { name: "", address: "", phone: "", mobile: "", email: "", subjects: "" };

const headingVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
    }),
};

const formVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};

const infoVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};

/* ─── Single field ─── */
function Field({ id, label, icon: Icon, type = "text", placeholder, value, error, touched, onChange, onBlur, rows }) {
    const isTextarea = rows > 1;
    const hasError = touched && error;
    const isValid = touched && !error && value.trim();

    return (
        <div className={`cf-field ${hasError ? "cf-field--error" : ""} ${isValid ? "cf-field--valid" : ""}`}>
            <label className="cf-field__label" htmlFor={id}>{label}</label>
            <div className="cf-field__wrap">
                <span className="cf-field__icon"><Icon size={16} /></span>
                {isTextarea ? (
                    <textarea
                        id={id}
                        name={id}
                        className="cf-field__input cf-field__textarea"
                        placeholder={placeholder}
                        value={value}
                        rows={rows}
                        onChange={(e) => onChange(id, e.target.value)}
                        onBlur={() => onBlur(id)}
                        aria-describedby={hasError ? `${id}-error` : undefined}
                    />
                ) : (
                    <input
                        id={id}
                        name={id}
                        type={type}
                        className="cf-field__input"
                        placeholder={placeholder}
                        value={value}
                        onChange={(e) => onChange(id, e.target.value)}
                        onBlur={() => onBlur(id)}
                        aria-describedby={hasError ? `${id}-error` : undefined}
                    />
                )}
                {isValid && <CheckCircle2 size={16} className="cf-field__status cf-field__status--ok" />}
                {hasError && <AlertCircle size={16} className="cf-field__status cf-field__status--err" />}
            </div>
            {hasError && (
                <span id={`${id}-error`} className="cf-field__error" role="alert">{error}</span>
            )}
        </div>
    );
}

/* ─── Main component ─── */
export default function ContactSection() {
    const sectionRef = useRef(null);
    const formRef = useRef(null);
    const inView = useInView(sectionRef, { once: true, margin: "-80px" });

    const [values, setValues] = useState(INITIAL);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [status, setStatus] = useState("idle");

    const handleChange = (id, val) => {
        setValues((v) => ({ ...v, [id]: val }));
        if (touched[id]) {
            setErrors((e) => ({ ...e, [id]: validators[id](val) }));
        }
    };

    const handleBlur = (id) => {
        setTouched((t) => ({ ...t, [id]: true }));
        setErrors((e) => ({ ...e, [id]: validators[id](values[id]) }));
    };

    const validate = () => {
        const newErrors = {};
        const newTouched = {};
        Object.keys(validators).forEach((k) => {
            newTouched[k] = true;
            newErrors[k] = validators[k](values[k]);
        });
        setTouched(newTouched);
        setErrors(newErrors);
        return Object.values(newErrors).every((e) => e === "");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        setStatus("sending");

        try {
            /* 1. Send notification to admin */
            await emailjs.sendForm(
                EJS_SERVICE_ID,
                EJS_ADMIN_TPL,
                formRef.current,
                EJS_PUBLIC_KEY
            );

            /* 2. Send auto-reply to user */
            await emailjs.sendForm(
                EJS_SERVICE_ID,
                EJS_REPLY_TPL,
                formRef.current,
                EJS_PUBLIC_KEY
            );

            setStatus("success");
            setValues(INITIAL);
            setTouched({});
            setErrors({});
            setTimeout(() => setStatus("idle"), 5000);
        } catch (err) {
            console.error("EmailJS error:", err);
            setStatus("idle");
            alert("Failed to send message. Please try again or email us directly at swamijai@gmail.com");
        }
    };

    /* ── Info cards data ── */
    const INFO_CARDS = [
        { icon: Mail, label: "MAIL US", value: "swamijai@gmail.com", href: "swamijai@gmail.com" },
        { icon: Phone, label: "CALL ME", value: "9944494399  9944494299", href: "tel:+9944494399  9944494299" },
        { icon: MessageSquare, label: "SUPPORT", value: "swamijai@gmail.co", href: "swamijai@gmail.co" },
        { icon: MapPin, label: "MY LOCATION", value: "UNIVERSAL TECHNOLOGY 250/187, GUPTHA NAGAR,ANGAMMAL COLONY,SALEM-636009,LAND MARK: NEAR KRISHNA MEDICALS.", href: "https://maps.app.goo.gl/QpYcVCLJZPwqbStk8" },
        { icon: Clock, label: "OFFICE TIMEING", value: "Mon - Sat : 9:00 AM - 9:00 PM", href: null },
    ];

    return (
        <section className="contact-sec" id="visit-us" ref={sectionRef}>
            <div className="contact-sec__bg-orb contact-sec__bg-orb--1" />
            <div className="contact-sec__bg-orb contact-sec__bg-orb--2" />
            <div className="contact-sec__bg-grid" />

            <div className="contact-sec__container">

                {/* ── Left info panel ── */}
                <motion.div
                    className="contact-sec__info"
                    variants={infoVariants}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                >
                    <motion.div className="contact-sec__tag" variants={headingVariants} custom={0}
                        initial="hidden" animate={inView ? "visible" : "hidden"}>
                        <span className="contact-sec__tag-dot" />
                        Get In Touch
                    </motion.div>

                    <motion.h2 className="contact-sec__heading" variants={headingVariants} custom={1}
                        initial="hidden" animate={inView ? "visible" : "hidden"}>
                        Contact <span className="contact-sec__heading-accent">Us</span>
                    </motion.h2>

                    <motion.p className="contact-sec__desc" variants={headingVariants} custom={2}
                        initial="hidden" animate={inView ? "visible" : "hidden"}>
                        Have a project in mind or want to learn more about our services?
                        Fill in the form and our team will get back to you within 24 hours.
                    </motion.p>

                    {/* Info cards — existing 3 + 2 new */}
                    {INFO_CARDS.map(({ icon: Icon, label, value, href }, i) => {
                        const CardTag = href ? motion.a : motion.div;
                        const linkProps = href ? { href } : {};
                        return (
                            <CardTag
                                key={label}
                                {...linkProps}
                                className="contact-sec__info-card"
                                variants={headingVariants}
                                custom={3 + i}
                                initial="hidden"
                                animate={inView ? "visible" : "hidden"}
                                whileHover={{ x: 6, transition: { duration: 0.2 } }}
                            >
                                <div className="contact-sec__info-icon">
                                    <Icon size={18} />
                                </div>
                                <div>
                                    <span className="contact-sec__info-label">{label}</span>
                                    <span className="contact-sec__info-value">{value}</span>
                                </div>
                            </CardTag>
                        );
                    })}

                    {/* Google Map */}
                    <motion.div
                        className="contact-sec__map"
                        variants={headingVariants}
                        custom={8}
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                    >
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3907.4025611517814!2d78.14077879999999!3d11.6658566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3babf0476a064e87%3A0xe6b8d4d1a2c17b0e!2sGuptha%20Nagar%2C%20250%2F187%2C%20Guptha%20Nagar%2C%20Four%20roads%2C%20Angammal%20Colony%2C%20Salem%2C%20Tamil%20Nadu%20636009!5e0!3m2!1sen!2sin!4v1777801574911!5m2!1sen!2sin"
                            width="100%"
                            style={{ border: 0, borderRadius: "12px", display: "block" }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Universal Technology — 250/187, Guptha Nagar, Salem 636009"
                        />
                    </motion.div>
                </motion.div>

                {/* ── Right form panel ── */}
                <motion.div
                    className="contact-sec__form-wrap"
                    variants={formVariants}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                >
                    {status === "success" ? (
                        <motion.div
                            className="contact-sec__success"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                        >
                            <div className="contact-sec__success-icon">
                                <CheckCircle2 size={40} />
                            </div>
                            <h3 className="contact-sec__success-title">Message Sent!</h3>
                            <p className="contact-sec__success-desc">
                                Thank you for reaching out. We'll get back to you within 24 hours.
                            </p>
                        </motion.div>
                    ) : (
                        <form className="contact-sec__form" onSubmit={handleSubmit} ref={formRef} noValidate>
                            <div className="contact-sec__form-header">
                                <h3 className="contact-sec__form-title">LEAVE US YOUR INFO</h3>
                                <p className="contact-sec__form-sub">And we will get back to you soon.</p>
                            </div>

                            {/* Name */}
                            <Field
                                id="name" label="Name *" icon={User} type="text"
                                placeholder="Your full name"
                                value={values.name} error={errors.name} touched={touched.name}
                                onChange={handleChange} onBlur={handleBlur}
                            />

                            {/* Address */}
                            <Field
                                id="address" label="Address *" icon={MapPin}
                                placeholder="Your full address"
                                value={values.address} error={errors.address} touched={touched.address}
                                onChange={handleChange} onBlur={handleBlur} rows={3}
                            />

                            {/* Phone + Mobile */}
                            <div className="contact-sec__row">
                                <Field
                                    id="phone" label="Mobile Number 1 *" icon={Phone} type="tel"
                                    placeholder="+91 XXXXX XXXXX"
                                    value={values.phone} error={errors.phone} touched={touched.phone}
                                    onChange={handleChange} onBlur={handleBlur}
                                />
                                <Field
                                    id="mobile" label="Mobile Number 2" icon={Phone} type="tel"
                                    placeholder="+91 XXXXX XXXXX"
                                    value={values.mobile} error={errors.mobile} touched={touched.mobile}
                                    onChange={handleChange} onBlur={handleBlur}
                                />
                            </div>

                            {/* Email */}
                            <Field
                                id="email" label="Email *" icon={Mail} type="email"
                                placeholder="you@example.com"
                                value={values.email} error={errors.email} touched={touched.email}
                                onChange={handleChange} onBlur={handleBlur}
                            />

                            {/* Subjects */}
                            <Field
                                id="subjects" label="Subjects *" icon={MessageSquare}
                                placeholder="What is this regarding?"
                                value={values.subjects} error={errors.subjects} touched={touched.subjects}
                                onChange={handleChange} onBlur={handleBlur} rows={4}
                            />

                            {/* Submit */}
                            <motion.button
                                type="submit"
                                className={`contact-sec__submit ${status === "sending" ? "contact-sec__submit--sending" : ""}`}
                                disabled={status === "sending"}
                                whileHover={status !== "sending" ? { scale: 1.02, y: -2 } : {}}
                                whileTap={status !== "sending" ? { scale: 0.98 } : {}}
                                transition={{ duration: 0.2 }}
                            >
                                {status === "sending" ? (
                                    <>
                                        <span className="contact-sec__spinner" />
                                        Sending…
                                    </>
                                ) : (
                                    <>
                                        <Send size={17} />
                                        Send Message
                                    </>
                                )}
                            </motion.button>
                        </form>
                    )}
                </motion.div>

            </div>
        </section>
    );
}
