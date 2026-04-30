import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import emailjs from "@emailjs/browser";
import { Mail, Send, CheckCircle2, AlertCircle, Loader } from "lucide-react";
import "./NewsletterSection.css";

/*
 * ─── EmailJS Configuration ───────────────────────────────────────────────────
 *
 * HOW TO SET UP (free — 200 emails/month):
 *
 * 1. Sign up at https://www.emailjs.com
 * 2. Add an Email Service (Gmail, Outlook, etc.)
 *    → copy the Service ID  (e.g. "service_abc123")
 * 3. Create TWO email templates:
 *
 *    ADMIN TEMPLATE  (notifies you of new subscriber)
 *    Subject: New Newsletter Subscriber
 *    Body:    New subscriber: {{user_email}}
 *    → copy the Template ID  (e.g. "template_admin_xyz")
 *
 *    USER TEMPLATE  (auto-reply to subscriber)
 *    Subject: Welcome to our Newsletter!
 *    Body:    Thank you for subscribing! We'll keep you updated.
 *    To:      {{user_email}}
 *    → copy the Template ID  (e.g. "template_user_xyz")
 *
 * 4. Go to Account → API Keys → copy your Public Key
 *
 * 5. Replace the four constants below with your real values.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 */
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";       // ← replace
const EMAILJS_ADMIN_TEMPLATE = "YOUR_ADMIN_TEMPLATE_ID"; // ← replace
const EMAILJS_USER_TEMPLATE = "YOUR_USER_TEMPLATE_ID";  // ← replace
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";        // ← replace

/* ─── Status states ─── */
const STATUS = { IDLE: "idle", SENDING: "sending", SUCCESS: "success", ERROR: "error" };

export default function NewsletterSection() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState(STATUS.IDLE);
    const [errMsg, setErrMsg] = useState("");

    const sectionRef = useRef(null);
    const inView = useInView(sectionRef, { once: true, margin: "-60px" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email.trim()) return;

        setStatus(STATUS.SENDING);
        setErrMsg("");

        const templateParams = { user_email: email.trim() };

        try {
            /* 1 — Notify admin */
            await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_ADMIN_TEMPLATE,
                templateParams,
                EMAILJS_PUBLIC_KEY
            );

            /* 2 — Auto-reply to subscriber */
            await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_USER_TEMPLATE,
                templateParams,
                EMAILJS_PUBLIC_KEY
            );

            setStatus(STATUS.SUCCESS);
            setEmail("");

            /* Reset to idle after 5 s */
            setTimeout(() => setStatus(STATUS.IDLE), 5000);

        } catch (err) {
            console.error("EmailJS error:", err);
            setErrMsg("Something went wrong. Please try again.");
            setStatus(STATUS.ERROR);
            setTimeout(() => setStatus(STATUS.IDLE), 5000);
        }
    };

    return (
        <section className="newsletter" id="newsletter" ref={sectionRef}>
            {/* Background decoration */}
            <div className="newsletter__bg-orb newsletter__bg-orb--1" />
            <div className="newsletter__bg-orb newsletter__bg-orb--2" />

            <div className="newsletter__container">

                {/* Icon */}
                <motion.div
                    className="newsletter__icon-wrap"
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                >
                    <Mail size={28} />
                </motion.div>

                {/* Heading */}
                <motion.div
                    className="newsletter__tag"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.1, duration: 0.5 }}
                >
                    <span className="newsletter__tag-dot" />
                    Stay Updated
                </motion.div>

                <motion.h2
                    className="newsletter__heading"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
                >
                    NEWSLETTER
                </motion.h2>

                <motion.p
                    className="newsletter__sub"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.35, duration: 0.6 }}
                >
                    Subscribe for the latest updates, offers, and promotions from JUSCO.
                    No spam — only what matters.
                </motion.p>

                {/* Form */}
                <motion.form
                    className="newsletter__form"
                    onSubmit={handleSubmit}
                    noValidate
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.45, duration: 0.6 }}
                >
                    <div className="newsletter__input-wrap">
                        <Mail size={16} className="newsletter__input-icon" />
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Your Email Address"
                            className="newsletter__input"
                            required
                            disabled={status === STATUS.SENDING || status === STATUS.SUCCESS}
                            aria-label="Email address for newsletter"
                        />
                    </div>

                    <motion.button
                        type="submit"
                        className={`newsletter__btn ${status === STATUS.SENDING ? "newsletter__btn--sending" : ""} ${status === STATUS.SUCCESS ? "newsletter__btn--success" : ""}`}
                        disabled={status === STATUS.SENDING || status === STATUS.SUCCESS}
                        whileHover={status === STATUS.IDLE ? { scale: 1.03, y: -2 } : {}}
                        whileTap={status === STATUS.IDLE ? { scale: 0.97 } : {}}
                        transition={{ duration: 0.2 }}
                    >
                        {status === STATUS.SENDING && (
                            <><Loader size={16} className="newsletter__spinner" /> Sending…</>
                        )}
                        {status === STATUS.SUCCESS && (
                            <><CheckCircle2 size={16} /> Subscribed!</>
                        )}
                        {(status === STATUS.IDLE || status === STATUS.ERROR) && (
                            <><Send size={16} /> Subscribe</>
                        )}
                    </motion.button>
                </motion.form>

                {/* Feedback messages */}
                {status === STATUS.SUCCESS && (
                    <motion.p
                        className="newsletter__feedback newsletter__feedback--ok"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <CheckCircle2 size={15} />
                        Thank you! Check your inbox for a confirmation email.
                    </motion.p>
                )}

                {status === STATUS.ERROR && (
                    <motion.p
                        className="newsletter__feedback newsletter__feedback--err"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <AlertCircle size={15} />
                        {errMsg}
                    </motion.p>
                )}

                {/* Setup reminder — visible only when placeholder keys are present */}
                {EMAILJS_PUBLIC_KEY === "YOUR_PUBLIC_KEY" && (
                    <p className="newsletter__setup-note">
                        ⚙️ Replace the EmailJS constants in <code>NewsletterSection.jsx</code> to activate email sending.
                    </p>
                )}

            </div>
        </section>
    );
}
