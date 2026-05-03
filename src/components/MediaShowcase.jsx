import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2, Video } from "lucide-react";
import "./MediaShowcase.css";

/* ─── Animation variants ─── */
const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.6, delay: i * 0.15, ease: "easeOut" },
    }),
};

export default function MediaShowcase() {
    const audioRef = useRef(null);
    const videoRef = useRef(null);

    const [audioPlaying, setAudioPlaying] = useState(false);
    const [videoPlaying, setVideoPlaying] = useState(false);
    const [audioRevealed, setAudioRevealed] = useState(false);
    const [videoRevealed, setVideoRevealed] = useState(false);

    /* ── Play / pause audio, pause video if running ── */
    const handleAudio = () => {
        const audio = audioRef.current;
        const video = videoRef.current;
        if (!audio) return;

        if (!audioRevealed) setAudioRevealed(true);

        if (audioPlaying) {
            audio.pause();
            setAudioPlaying(false);
        } else {
            // Pause video if playing
            if (videoPlaying && video) {
                video.pause();
                setVideoPlaying(false);
            }
            audio.play().catch(() => { });
            setAudioPlaying(true);
        }
    };

    /* ── Play / pause video, pause audio if running ── */
    const handleVideo = () => {
        const video = videoRef.current;
        const audio = audioRef.current;
        if (!video) return;

        if (!videoRevealed) setVideoRevealed(true);

        if (videoPlaying) {
            video.pause();
            setVideoPlaying(false);
        } else {
            // Pause audio if playing
            if (audioPlaying && audio) {
                audio.pause();
                setAudioPlaying(false);
            }
            video.play().catch(() => { });
            setVideoPlaying(true);
        }
    };

    /* Keep state in sync when media ends naturally */
    const onAudioEnded = () => setAudioPlaying(false);
    const onVideoEnded = () => setVideoPlaying(false);

    return (
        <section className="media" id="media">
            {/* Background decoration */}
            <div className="media__bg-orb media__bg-orb--1" />
            <div className="media__bg-orb media__bg-orb--2" />

            <div className="media__container">

                {/* ── Header ── */}
                <motion.div
                    className="media__header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <div className="media__tag">
                        <span className="media__tag-dot" />
                        Media Showcase
                    </div>
                    <h2 className="media__heading">
                        See &amp; Hear <span className="media__heading-accent">Who We Are</span>
                    </h2>
                    <p className="media__sub">
                        Explore our introduction through audio and video — get to know Universal Technology before you reach out.
                    </p>
                    <motion.div
                        className="media__divider"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
                    />
                </motion.div>

                {/* ── 2-column grid ── */}
                <div className="media__grid">

                    {/* ── AUDIO BOX ── */}
                    <motion.div
                        className="media-box"
                        custom={0}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <div className="media-box__icon-wrap media-box__icon-wrap--audio">
                            <Volume2 size={28} />
                        </div>

                        <h3 className="media-box__title">Listen to Our Introduction</h3>
                        <p className="media-box__desc">
                            Hear directly from our team about what makes Universal Technology the trusted partner for businesses across the region.
                        </p>

                        {/* Play / Pause button */}
                        <button
                            className={`media-box__btn ${audioPlaying ? "media-box__btn--active" : ""}`}
                            onClick={handleAudio}
                            aria-label={audioPlaying ? "Pause audio" : "Play audio"}
                        >
                            {audioPlaying ? <Pause size={18} /> : <Play size={18} />}
                            {audioPlaying ? "Pause Audio" : "Play Audio"}
                        </button>

                        {/* Native audio — revealed after first click */}
                        <div className={`media-box__player ${audioRevealed ? "media-box__player--visible" : ""}`}>
                            <audio
                                ref={audioRef}
                                controls
                                onEnded={onAudioEnded}
                                style={{ width: "100%" }}
                            >
                                <source src="/audio/sample.mp3" type="audio/mpeg" />
                                Your browser does not support the audio element.
                            </audio>
                        </div>

                        {/* <p className="media-box__hint">
                            Replace <code>/audio/sample.mp3</code> with your real audio file.
                        </p> */}
                    </motion.div>

                    {/* ── VIDEO BOX ── */}
                    <motion.div
                        className="media-box"
                        custom={1}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <div className="media-box__icon-wrap media-box__icon-wrap--video">
                            <Video size={28} />
                        </div>

                        <h3 className="media-box__title">Watch Our Overview</h3>
                        <p className="media-box__desc">
                            A short visual walkthrough of our services, team, and the solutions we deliver to clients every day.
                        </p>

                        {/* Play / Pause button */}
                        <button
                            className={`media-box__btn ${videoPlaying ? "media-box__btn--active" : ""}`}
                            onClick={handleVideo}
                            aria-label={videoPlaying ? "Pause video" : "Play video"}
                        >
                            {videoPlaying ? <Pause size={18} /> : <Play size={18} />}
                            {videoPlaying ? "Pause Video" : "Play Video"}
                        </button>

                        {/* Native video — revealed after first click */}
                        <div className={`media-box__player ${videoRevealed ? "media-box__player--visible" : ""}`}>
                            <video
                                ref={videoRef}
                                controls
                                onEnded={onVideoEnded}
                                style={{ width: "100%", borderRadius: "10px" }}
                            >
                                <source src="/video/sample.mp4" type="video/mp4" />
                                Your browser does not support the video element.
                            </video>
                        </div>

                        {/* <p className="media-box__hint">
                            Replace <code>/video/sample.mp4</code> with your real video file.
                        </p> */}
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
