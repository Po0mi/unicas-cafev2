import { useState, useEffect, useRef } from "react";
import useHeroAnimation from "../hooks/useHeroAnimation.js";
import "./Hero.scss";
import heroBg from "../assets/heroBg.webm";

const OpenBadge = ({ badgeRef }) => {
  const getStatus = () => {
    const now = new Date();
    // Use UTC conversion instead of locale string parsing for more reliable timezone handling
    const phTime = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Manila",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    }).formatToParts(now);

    const getPart = (type) => phTime.find((p) => p.type === type)?.value;
    const hour = parseInt(getPart("hour"), 10);
    const min = parseInt(getPart("minute"), 10);

    // Open from 11:00 AM to 7:00 PM (19:00)
    const isOpen = hour >= 11 && (hour < 19 || (hour === 19 && min === 0));

    const fmt = (h, m) => {
      const period = h >= 12 ? "PM" : "AM";
      const h12 = h % 12 || 12;
      return `${h12}:${String(m).padStart(2, "0")} ${period}`;
    };

    return { isOpen, time: fmt(hour, min) };
  };

  const [status, setStatus] = useState(getStatus);

  useEffect(() => {
    const id = setInterval(() => setStatus(getStatus()), 60000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className={`open-badge ${status.isOpen ? "is-open" : "is-closed"}`}
      ref={badgeRef}
    >
      <span className="badge-dot" />
      <span className="badge-text">
        {status.isOpen ? `Open now · Closes 7PM` : `Closed · Opens 11AM`}
      </span>
      <span className="badge-time">{status.time}</span>
    </div>
  );
};

const Hero = () => {
  const {
    videoRef,
    overlayRef,
    metaRef,
    subtitleRef,
    titleRef,
    badgeRef,
    ctaRef,
  } = useHeroAnimation();

  const containerRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;

    if (!video || !container) return;

    // Ensure video is muted to allow autoplay policies to pass
    video.muted = true;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Play when visible
          video.play().catch((err) => {
            console.warn("Video play failed:", err);
          });
        } else {
          // Pause when hidden
          video.pause();
        }
      },
      {
        threshold: 0.5, // Changed from 1 to 0.5 for better trigger reliability
      },
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
      // Optional: pause video on unmount to save resources
      if (video) video.pause();
    };
  }, [videoRef]);

  return (
    <section className="hero" id="home">
      <div className="hero-container" ref={containerRef}>
        {/* Removed autoPlay - let IntersectionObserver handle it */}
        <video muted loop playsInline className="hero-video" ref={videoRef}>
          <source src={heroBg} type="video/webm" />
        </video>

        <div className="hero-overlay" ref={overlayRef} />

        <div className="hero-meta" ref={metaRef}>
          <span className="hero-meta-tag">Est. 2026</span>
          <span className="hero-meta-divider">·</span>
          <span className="hero-meta-tag">Cabatuan, Iloilo</span>
        </div>

        <p className="hero-subtitle" ref={subtitleRef}>
          Experience the finest coffee and pastries in town.
        </p>

        <h1 className="hero-title" ref={titleRef}>
          Unica's <br className="title-break" />
          <em>Cafe</em>
        </h1>

        <OpenBadge badgeRef={badgeRef} />

        <div className="hero-cta" ref={ctaRef}>
          <a href="#menu" className="cta-btn">
            Explore Menu
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
