import { useEffect } from "react";

/**
 * TawkChat
 * --------
 * Drop-in component that loads the Tawk.to live-chat widget.
 * Renders nothing to the DOM — the widget is injected by the script.
 *
 * ─── SETUP (one-time, 2 minutes) ────────────────────────────────────
 *  1. Create a FREE account at  https://www.tawk.to
 *  2. Go to  Administration → Property Settings
 *  3. Copy your  Property ID  and  Widget ID
 *  4. Paste them into the two constants below
 * ────────────────────────────────────────────────────────────────────
 *
 * Until you replace the placeholder IDs the script will 404 silently —
 * no errors, no broken UI. The moment you add real IDs the widget
 * appears automatically.
 */

const TAWK_PROPERTY_ID = "YOUR_PROPERTY_ID"; // e.g. "64a1b2c3d4e5f6a7b8c9d0e1"
const TAWK_WIDGET_ID = "YOUR_WIDGET_ID";   // e.g. "1hbcdefgh"  or  "default"

export default function TawkChat() {
    useEffect(() => {
        // Guard: don't inject twice (React StrictMode / hot-reload)
        if (document.getElementById("tawk-script")) return;

        // Required Tawk.to bootstrap globals
        window.Tawk_API = window.Tawk_API || {};
        window.Tawk_LoadStart = new Date();

        // Optional: customise widget behaviour after it loads
        window.Tawk_API.onLoad = function () {
            // Maximise on first visit (optional — remove if you prefer minimised)
            // window.Tawk_API.maximize();
        };

        const s = document.createElement("script");
        s.id = "tawk-script";
        s.async = true;
        s.src = `https://embed.tawk.to/${TAWK_PROPERTY_ID}/${TAWK_WIDGET_ID}`;
        s.charset = "UTF-8";
        s.crossOrigin = "*";

        const ref = document.getElementsByTagName("script")[0];
        ref.parentNode.insertBefore(s, ref);

        return () => {
            // Remove on unmount so HMR doesn't stack multiple instances
            const el = document.getElementById("tawk-script");
            if (el) el.remove();
            // Hide widget if Tawk_API is already initialised
            if (window.Tawk_API && window.Tawk_API.hideWidget) {
                window.Tawk_API.hideWidget();
            }
        };
    }, []);

    // Renders nothing — widget is injected into <body> by Tawk.to
    return null;
}
