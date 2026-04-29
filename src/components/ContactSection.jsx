import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { User, Mail, Phone, MessageSquare, Send, CheckCircle2, AlertCircle } from "lucide-react";
import "./ContactSection.css";

/* ─── Validation helpers ─── */
const validators = {
    firstName: (v) => v.trim().length >= 2 ? "" : "First name must be at least 2 characters.",
    lastName: (v) => v.trim().length >= 2 ? "" : "Last name must be at least 2 characters.",
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? "" : "Please enter a valid email address.",
    phone: (v) => /^[+]?[\d\s\-().]{7,15}$/.test(v.trim()) ? "" : "Please enter a valid phone number.",
    message: (v) => v.trim().length >= 10 ? "" : "Message must be at least 10 characters.",
};

const INITIAL = { firstName: "", lastName: "", email: "", phone: "", message: "" };

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
    const inView = useInView(sectionRef, { once: true, margin: "-80px" });

    const [values, setValues] = useState(INITIAL);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [status, setStatus] = useState("idle"); // idle | sending | success | error

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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;
        setStatus("sending");
        // Simulate async send
        setTimeout(() => {
            setStatus("success");
            setValues(INITIAL);
            setTouched({});
            setErrors({});
            setTimeout(() => setStatus("idle"), 5000);
        }, 1800);
    };

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

                    {/* Info cards */}
                    {[
                        { icon: Mail, label: "Email", value: "info@jusco.com", href: "mailto:info@jusco.com" },
                        { icon: Phone, label: "Phone", value: "+1 (800) 123-4567", href: "tel:+18001234567" },
                        { icon: MessageSquare, label: "Support", value: "support@jusco.com", href: "mailto:support@jusco.com" },
                    ].map(({ icon: Icon, label, value, href }, i) => (
                        <motion.a
                            key={i}
                            href={href}
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
                        </motion.a>
                    ))}

                    {/* Decorative dots grid */}
                    <div className="contact-sec__dots-grid" aria-hidden="true">
                        {Array.from({ length: 25 }).map((_, i) => (
                            <span key={i} className="contact-sec__dot" />
                        ))}
                    </div>
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
                        <form className="contact-sec__form" onSubmit={handleSubmit} noValidate>
                            <div className="contact-sec__form-header">
                                <h3 className="contact-sec__form-title">Send Us a Message</h3>
                                <p className="contact-sec__form-sub">All fields are required</p>
                            </div>

                            {/* Row: First + Last name */}
                            <div className="contact-sec__row">
                                <Field id="firstName" label="First Name" icon={User} placeholder="John" value={values.firstName} error={errors.firstName} touched={touched.firstName} onChange={handleChange} onBlur={handleBlur} />
                                <Field id="lastName" label="Last Name" icon={User} placeholder="Doe" value={values.lastName} error={errors.lastName} touched={touched.lastName} onChange={handleChange} onBlur={handleBlur} />
                            </div>

                            {/* Row: Email + Phone */}
                            <div className="contact-sec__row">
                                <Field id="email" label="Email Address" icon={Mail} type="email" placeholder="john@example.com" value={values.email} error={errors.email} touched={touched.email} onChange={handleChange} onBlur={handleBlur} />
                                <Field id="phone" label="Phone Number" icon={Phone} type="tel" placeholder="+1 (555) 000-0000" value={values.phone} error={errors.phone} touched={touched.phone} onChange={handleChange} onBlur={handleBlur} />
                            </div>

                            {/* Message */}
                            <Field id="message" label="Message" icon={MessageSquare} placeholder="Tell us about your project..." value={values.message} error={errors.message} touched={touched.message} onChange={handleChange} onBlur={handleBlur} rows={5} />

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
