import { FaUsers, FaInfoCircle, FaSmile, FaCheckCircle, FaShieldAlt, FaUserGraduate } from "react-icons/fa";
import "./ServicesSection.css";

const SERVICES = [
    {
        icon: FaUsers,
        title: "GREAT PEOPLE TRUSTED OUR SERVICES",
        frontPoints: [
            "Discover what's new at Universal Technology",
            "Get impressed with great pricing",
            "Evolving with consumer needs",
        ],
        backPoints: [
            "UNIQUE PRODUCTS & CONSUMABLES!",
            "MULTIBRAND SERVICE CENTER!",
            "VALUE FOR QUALITY.SERVICE & MONEY",
        ],
        color: "#2563eb", rgb: "37,99,235",
    },
    {
        icon: FaInfoCircle,
        title: "ABOUT UNIVERSAL TECHNOLOGY",
        frontPoints: [
            "We Discover People with ideas and experience to develop a vision for the future.",
            "We Build The right tools at the right time enhance the shared economy.",
            "We Connect Integrating clients with partners is the focus of everyday business.",
        ],
        backPoints: [
            "We Launch Bringing highly anticipated programs to the marketplace.",
            "We Provide Creative solutions to clients around the world, creating things that get attention and meaningful.",
           
        ],
        color: "#7c3aed", rgb: "124,58,237",
    },
    {
        icon: FaSmile,
        title: "CUSTOMER SATISFACTION",
        frontPoints: [
            "We are a UNIVERSAL TECHNOLOGY focused on IT CONSULTING SERVICES.NETWORKING.SECURITY SYSTEMS.OS INSTALLATION WEBSITE DESIGNING AND HOSTING SERVICES Simplicity is the one word we love and utilize through our projects everyday",
        ],
        backPoints: [
            "We are a UNIVERSAL TECHNOLOGY focused on IT CONSULTING SERVICES.NETWORKING.SECURITY SYSTEMS.OS INSTALLATION WEBSITE DESIGNING AND HOSTING SERVICES Simplicity is the one word we love and utilize through our projects everyday",
        ],
        color: "#059669", rgb: "5,150,105",
    },
    {
        icon: FaCheckCircle,
        title: "WHY CHOOSE US?",
        frontPoints: [
            "We provide up front pricing and no hidden costs.",
            "We meet their deadlines.",
            "We maintain a single point of contact.",
        ],
        backPoints: [
            "We keep them apprise of the status of their site design during the design process.",
            "We became partners in the process and remained in contact with them after the site was completed to offer any needed assistance.",
        ],
        color: "#e11d9cff", rgb: "225,29,72",
    },
    {
        icon: FaShieldAlt,
        title: "UNIVERSAL TECHNOLOGY QUALITY POLICY",
        frontPoints: [
            "TEAM WORK",
            "ASSURED QUALITY",
            "FAST AND EFFECTIVE SERVICE",
        ],
        backPoints: [
            "TRANSPARENT BUSINESS OPERATION",
            "BUSINESS SERVICE",
        ],
        color: "#0891b2", rgb: "8,145,178",
    },
    {
        icon: FaUserGraduate,
        title: "UNIVERSAL TECHNOLOGY CUSTOMERS",
        frontPoints: [
            "HOME USERS",
            "ADVISTRAMENT MEDIA",
            "SCHOOL UNIVERSITY",
            "CIVIL ENGINNERS & ENTERPRISES",
        ],
        backPoints: [
            "GOVERNMENT STAFF",
            "HOTELS & SPAA",
            "INSURANCE COMPANIES",
            "BPO & IT OFFICES",
            "HOSPITAL & ETC",
        ],
        color: "#d97706", rgb: "217,119,6",
    },
];

function ServiceCard({ icon: Icon, title, frontPoints, backPoints, color, rgb }) {
    return (
        <div className="svc-flip" style={{ "--card-color": color, "--card-rgb": rgb }}>
            <div className="svc-flip__inner">

                {/* Front — short highlights */}
                <div className="svc-flip__front svc-card">
                    <div className="svc-card__accent" />
                    <div className="svc-card__icon-wrap">
                        <Icon size={26} className="svc-card__icon" />
                    </div>
                    <h3 className="svc-card__title">{title}</h3>
                    <ul className="svc-card__list">
                        {(frontPoints || []).map((point, i) => (
                            <li key={i}>{point}</li>
                        ))}
                    </ul>
                </div>

                {/* Back — detailed info */}
                <div className="svc-flip__back">
                    <div className="svc-flip__back-icon-wrap">
                        <Icon size={32} />
                    </div>
                    <h3 className="svc-flip__back-title">{title}</h3>
                    <ul className="svc-back__list">
                        {(backPoints || []).map((point, i) => (
                            <li key={i}>{point}</li>
                        ))}
                    </ul>
                </div>

            </div>
        </div>
    );
}

export default function ServicesSection() {
    return (
        <section className="services" id="services">
            <div className="services__bg-grid" />
            <div className="services__bg-orb services__bg-orb--1" />
            <div className="services__bg-orb services__bg-orb--2" />

            <div className="services__container">
                <div className="services__header">
                    <div className="services__tag">
                        <span className="services__tag-dot" />What We Offer
                    </div>
                    <h2 className="services__heading">
                        What <span className="services__heading-accent">Universal Technology</span>
                    </h2>
                    <p className="services__subheading">
                        From concept to launch, we deliver end-to-end digital solutions that help businesses grow, compete, and thrive in the digital age.
                    </p>
                    <div className="services__divider" />
                </div>

                <div className="services__grid">
                    {SERVICES.map((svc) => <ServiceCard key={svc.title} {...svc} />)}
                </div>
            </div>
        </section>
    );
}
