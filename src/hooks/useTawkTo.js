import { useEffect } from "react";

/**
 * useTawkTo
 * Injects the Tawk.to script once and exposes the global Tawk_API.
 *
 * HOW TO GET YOUR OWN IDs:
 *  1. Sign up free at https://www.tawk.to
 *  2. Dashboard → Administration → Property Settings
 *  3. Copy "Property ID"  (looks like: 64a1b2c3d4e5f6a7b8c9d0e1)
 *  4. Copy "Widget ID"    (looks like: 1hbcdefgh  or  default)
 *  5. Replace the two constants below.
 *
 * The placeholder IDs below load a demo widget so the UI is visible
 * immediately. Replace them with your real IDs to receive messages
 * in your own Tawk.to inbox.
 */
const TAWK_PROPERTY_ID = "64a1b2c3d4e5f6a7b8c9d0e1"; // ← replace with your Property ID
const TAWK_WIDGET_ID = "default";                    // ← replace with your Widget ID

export default function useTawkTo() {
    useEffect(() => {
        // Prevent double-injection (React StrictMode / HMR)
        if (document.getElementById("tawkto-script")) return;

        // Tawk.to bootstrap object
        window.Tawk_API = window.Tawk_API || {};
        window.Tawk_LoadStart = new Date();

        // Customise the widget appearance via Tawk_API callbacks
        window.Tawk_API.onLoad = function () {
            // Set visitor attributes if you have them (optional)
            // window.Tawk_API.setAttributes({ name: "Guest", email: "" }, function(err){});
        };

        const script = document.createElement("script");
        script.id = "tawkto-script";
        script.async = true;
        script.src = `https://embed.tawk.to/${TAWK_PROPERTY_ID}/${TAWK_WIDGET_ID}`;
        script.charset = "UTF-8";
        script.setAttribute("crossorigin", "*");

        // Insert before the first <script> tag
        const first = document.getElementsByTagName("script")[0];
        first.parentNode.insertBefore(script, first);

        return () => {
            // Cleanup on unmount (dev HMR only — in production the widget persists)
            const el = document.getElementById("tawkto-script");
            if (el) el.remove();
        };
    }, []);
}
