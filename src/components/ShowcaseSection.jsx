import { useState, useRef, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, EffectFade } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import {
    Lightbulb, RefreshCw, Megaphone, MoreHorizontal, ClipboardList,
} from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "./ShowcaseSection.css";

/* ─── Tab data ─── */
const TABS = [
    {
        id: "realization",
        label: "WEB SERVICES",
        icon: Lightbulb,
        image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1600&q=80",
        title: "WEB DESIGN",
        desc: "We are very much committed in designing websites. We use Latest Technologies for creating Amazing experince for the visitors for your websites.UNIVERSAL TECHNOLOGY offers great quality website designs. Design of the website plays very important role as it attracts targeted customers. We have different type of design ready which are very unique and just mind blowing. UNIVERSAL TECHNOLOGY closely aligns with your marketing goals to deliver results based on performance. We are all about ideas, actions, and results. Our process has been thoroughly developed and contoured over the years, gathering as much of your requirements through our pre-development survey before the design is started. By adhering to this practice we’re able to develop a design concept that will meet both your expectations and your marketing goals.",
        points: [
            "Basic Website Designing",
            "Responsive Website Designing",
            "Corporate Website Designing",
            "CMS Website Designing",
            "Website Redesigning",
            "Website Updates & Maintenance",
        ],
        // cta: "See Our Work",
    },
    {
        id: "tweek",
        label: "WEB DEVELOPMENT",
        icon: RefreshCw,
        image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1600&q=80",
        title: "WEB DEVELOPMENT",
        desc: "Web development is a broad term for the work involved in developing a web site. This can include web design, web content development, client liaison, client-side server-side scripting, web server and network security configuration, and e-commerce development. Our team uses latest technologies to develop your websites in order to give you the best you need We have a team of technically well-endowed specialists, knowledgeable across multiple platforms. We make websites using the latest technological platforms keeping ourselves abreast of the latest technological developments. We ensure the websites we make for our clients are up to date with the constant evolution of both new hardware and operating systems. The websites we develop are technically strong with solid design, well-coded functions and robust security features.",
        points: [
            // "Custom web applications built to scale",
            // "React, Node.js & modern tech stack",
            // "API integrations & third-party services",
            // "Ongoing maintenance & performance tuning",
        ],
        cta: "Learn More",
    },
    {
        id: "marketing",
        label: "MOBILE APP DEVELOPMENT",
        icon: Megaphone,
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=80",
        title: "MOBILE APP DEVELOPMENT",
        desc: "At UNIVERSAL TECHNOLOGY we provide a wide range of android application development services, and build customized apps that can meet the requirements of any individual client. We have a powerful and experienced team of developers and engineers that can tackle any challenge and work on any Android platform.",
        points: [
            "With us, you will be able to convert your ideas into functional, user-friendly and easy-to-use applications, which significantly increase your chances of success at the global Android market, and provide you with many different options for further development and advance.",
            // "Cross-platform solutions with React Native",
            "Android with 85% market share in mobiles, must be the first choice for any Mobile App development.",
            // "App Store & Play Store deployment support",
        ],
        cta: "Explore Strategy",
    },
    {
        id: "other",
        label: "WEB HOSTING",
        icon: MoreHorizontal,
        image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600&q=80",
        title: "WEB HOSTING",
        desc: "As a one stop solution for web services and solutions, we offers web hosting services to organizations and individuals to host basic website to customized web applications. We believe in Quality and Reliable hosting with on time customer support when ever customer needs. We believe in our partners has allowed us to support from a decade with our in-house domain expertise and dedicated technical staffs with development to offer suitable and effective hosting solutions to existing and prospective customers.",
        points: [
            "Our specialists are experienced in hosting both static and dynamic websites. Our professionals suggest the suitable type of hosting based on client’s business requirements whether to choose high traffic websites (ecommerce) or enterprise website (complex hosting).",
            "What is Web hosting?",
            "Web hosting is the technology that puts your website online. It is one of the three essential components of establishing your Web presence: a domain name (Web address), a website and a Web host.",
            "Does your hosting come with a control panel?",
            "Yes, your hosting comes packed with control panel, cPanel.",
        ],
        cta: "Get In Touch",
    },
    {
        id: "planning",
        label: "SEARCH ENGINE OPTIMIZATION",
        icon: ClipboardList,
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&q=80",
        title: "SEARCH ENGINE OPTIMIZATION",
        desc: "SEO is to make your website appear on Google Top Listings for relevant keywords of your business. It is very important part of every website. Having a website build with everything & having no SEO is like having a store without any visitors. Through SEO lots & lots of visitors come into your website & explore. Visitors through SEO, gain trust & create Brand  Image  for the company.",
        points: [
            "With the flourishing internet users, we have a lot of opportunities to get deals over the internet, precisely, Google. So what does it take to reach up to the target audience? Search Engine Optimization being the only strategy to drive in more users to your website via Search Engines like Google, Bing, Yahoo, etc., you need to hold on to     UNIVERSAL TECHNOLOGY",
            // "On-page & technical SEO optimisation",
            // "Link building & authority growth",
            // "Monthly performance reports & insights",
        ],
        cta: "Start Planning",
    },
    {
        id: "planning1",
        label: "DOMAIN REGISTRATION",
        icon: ClipboardList,
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&q=80",
        title: "DOMAIN REGISTRATION",
        desc: "Just as we all want unique identification of our website, it openly links to the term Domain. The Domain names serve as the uniqueness of your business on the internet and it is always different for the entire website, which speaks your visitors to connect with you effortlessly. Choose your domain name from among flexible domain extensions (.com, .co.in, in etc)",
        points: [
            "Create and maintain the great impact with the great domain name. Pick the best and flexible domain extensions like .com, .net, .buzz, asia, .info, .wiki, .company, biz, .social, .org, and .us, etc in accordance with their prices suitable and affordable for you. Choose us and avoid difficulty and complexity to pick out most catchy domain name, perfectly apt for your business.",
            "What is a domain name? If you look at the URL for this page, you’ll see it begins with www.swaminathansystems.com. Our domain name is the part that comes after the www, therefore it is UNIVERSAL TECHNOLOGY. The domain name should be unique and can give your company or organization an identity on the Internet.",
            "Why do I need a domain name?  Domain name is your identity on the web. To promote yourself and your business on the web, it is highly recommended have one. Worldwide, people can visit your website online and can know about your business through your site.",
            "How can I get a Domain Name? You can get a Domain name registered from one of the Domain name registrars. The pricing for Domains varies from registrar to registrar..",
            "How long does it take to register a domain name? As soon as we receive the payment you Domain Name gets registered. Once domain is registered it will immediately show in the whois DNS mapping of the domain takes upto 48 hrs to fully take effect and show up on the WHOIS query of other registrars.",
        ],
        cta: "Register Now",
    },
];

/* ─── Background slider images (independent of tabs) ─── */
const BG_SLIDES = [
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1600&q=80",
    "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1600&q=80",
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600&q=80",
];

const contentVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, y: -16, transition: { duration: 0.3 } },
};

export default function ShowcaseSection() {
    const [activeTab, setActiveTab] = useState(TABS[0]);
    const swiperRef = useRef(null);

    const handleTabClick = useCallback((tab) => {
        setActiveTab(tab);
    }, []);

    return (
        <section className="showcase" id="showcase">

            {/* ── Background slider ── */}
            <div className="showcase__slider">
                <Swiper
                    modules={[Autoplay, Navigation, EffectFade]}
                    effect="fade"
                    fadeEffect={{ crossFade: true }}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    navigation={{
                        nextEl: ".showcase__arrow--next",
                        prevEl: ".showcase__arrow--prev",
                    }}
                    loop
                    speed={900}
                    onSwiper={(s) => { swiperRef.current = s; }}
                    className="showcase__swiper"
                >
                    {BG_SLIDES.map((img, i) => (
                        <SwiperSlide key={i}>
                            <div
                                className="showcase__slide-bg"
                                style={{ backgroundImage: `url(${img})` }}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Dark overlay */}
                <div className="showcase__overlay" />

                {/* Center content — changes with active tab */}
                <div className="showcase__center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab.id}
                            className="showcase__center-inner"
                            variants={contentVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <div className="showcase__center-tag">
                                <activeTab.icon size={14} />
                                {activeTab.label}
                            </div>
                            <h2 className="showcase__center-title">{activeTab.title}</h2>
                            <p className="showcase__center-desc">{activeTab.desc}</p>

                            {/* Bullet points below description */}
                            {activeTab.points && activeTab.points.length > 0 && (
                                <ul className="showcase__points">
                                    {activeTab.points.map((point, i) => (
                                        <li key={i}>{point}</li>
                                    ))}
                                </ul>
                            )}

                            {/* <button className="showcase__center-btn">
                                {activeTab.cta}
                                <ArrowRight size={16} />
                            </button> */}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Navigation arrows */}
                <button className="showcase__arrow showcase__arrow--prev" aria-label="Previous">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                </button>
                <button className="showcase__arrow showcase__arrow--next" aria-label="Next">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                    </svg>
                </button>
            </div>

            {/* ── Floating tab bar ── */}
            <div className="showcase__tabs-wrap">
                <div className="showcase__tabs">
                    {TABS.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab.id === tab.id;
                        return (
                            <button
                                key={tab.id}
                                className={`showcase__tab ${isActive ? "showcase__tab--active" : ""}`}
                                onClick={() => handleTabClick(tab)}
                            >
                                <span className="showcase__tab-icon">
                                    <Icon size={16} />
                                </span>
                                <span className="showcase__tab-label">{tab.label}</span>
                                {isActive && (
                                    <motion.span
                                        className="showcase__tab-indicator"
                                        layoutId="tab-indicator"
                                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                                    />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

        </section>
    );
}
