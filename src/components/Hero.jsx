import { useState, useEffect } from "react";
import "./Hero.scss";
import heroBg from "../assets/heroBg.mp4";

// ── Open/Closed badge — checks Philippine time (UTC+8), open 11AM–7PM ─────────
const OpenBadge = () => {
  const getStatus = () => {
    const now = new Date();
    const ph = new Date(
      now.toLocaleString("en-US", { timeZone: "Asia/Manila" }),
    );
    const hour = ph.getHours();
    const min = ph.getMinutes();
    const isOpen = hour >= 11 && (hour < 19 || (hour === 19 && min === 0));
    const fmt = (h, m) => {
      const period = h >= 12 ? "PM" : "AM";
      const h12 = h % 12 || 12;
      return `${h12}:${String(m).padStart(2, "0")} ${period}`;
    };
    return { isOpen, time: fmt(ph.getHours(), ph.getMinutes()) };
  };

  const [status, setStatus] = useState(getStatus);

  useEffect(() => {
    const id = setInterval(() => setStatus(getStatus()), 60000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={`open-badge ${status.isOpen ? "is-open" : "is-closed"}`}>
      <span className="badge-dot" />
      <span className="badge-text">
        {status.isOpen ? `Open now · Closes 7PM` : `Closed · Opens 11AM`}
      </span>
      <span className="badge-time">{status.time}</span>
    </div>
  );
};

const Hero = () => {
  return (
    <section className="hero" id="home">
      <div className="hero-container">
        {/* ── Video ── */}
        <video autoPlay muted loop playsInline className="hero-video">
          <source src={heroBg} type="video/mp4" />
        </video>

        {/* ── Gradient overlay ── */}
        <div className="hero-overlay" />

        {/* ── Top meta row ── */}
        <div className="hero-meta">
          <span className="hero-meta-tag">Est. 2026</span>
          <span className="hero-meta-divider">·</span>
          <span className="hero-meta-tag">Cabatuan, Iloilo</span>
        </div>

        {/* ── Subtitle — anchored left ── */}
        <p className="hero-subtitle">
          Experience the finest coffee and pastries in town.
        </p>

        {/* ── Main title — Cafe in italic em ── */}
        <h1 className="hero-title">
          Unicas <br className="title-break" />
          <em>Cafe</em>
        </h1>

        {/* ── Open now badge ── */}
        <OpenBadge />
        <div className="hero-cta">
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
