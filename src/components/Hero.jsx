import { useState, useEffect, useCallback } from "react";
import useHeroAnimation from "../hooks/useHeroAnimation.js";
import "./Hero.scss";
import heroBg from "../assets/heroBg.webm";

// Defined outside component — stable reference, never re-created
const getStatus = () => {
  const now = new Date();
  const ph = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Manila" }));
  const hour = ph.getHours();
  const min = ph.getMinutes();
  const isOpen = hour >= 11 && (hour < 19 || (hour === 19 && min === 0));
  const fmt = (h, m) => {
    const period = h >= 12 ? "PM" : "AM";
    const h12 = h % 12 || 12;
    return `${h12}:${String(m).padStart(2, "0")} ${period}`;
  };
  return { isOpen, time: fmt(hour, min) };
};

const OpenBadge = ({ badgeRef }) => {
  const [status, setStatus] = useState(getStatus);

  useEffect(() => {
    const id = setInterval(() => setStatus(getStatus()), 60_000);
    return () => clearInterval(id);
  }, []); // no deps — getStatus is stable (defined outside)

  return (
    <div
      className={`open-badge ${status.isOpen ? "is-open" : "is-closed"}`}
      ref={badgeRef}
    >
      <span className="badge-dot" />
      <span className="badge-text">
        {status.isOpen ? "Open now · Closes 7PM" : "Closed · Opens 11AM"}
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

  return (
    <section className="hero" id="home">
      <div className="hero-container">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="hero-video"
          ref={videoRef}
          poster="/assets/heroPoster.webp"
          // Hint to browser this is low priority for interaction
          tabIndex={-1}
          aria-hidden="true"
        >
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
          Unicas <br className="title-break" />
          <em>Cafe</em>
        </h1>

        <OpenBadge badgeRef={badgeRef} />

        <div className="hero-cta" ref={ctaRef}>
          <a href="#menu" className="cta-btn">
            Explore Menu
          </a>
          <a href="#about" className="cta-link">
            Our Story
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
