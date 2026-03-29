import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Hero.scss";
import heroBg from "../assets/heroBg.mp4";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const metaRef = useRef(null);
  const ctaRef = useRef(null);
  const taglineRef = useRef(null);
  const overlayRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Entrance timeline ──────────────────────────────────────────────────
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(overlayRef.current, { opacity: 0, duration: 1.2 })
        .from(
          [subtitleRef.current, metaRef.current],
          { y: 20, autoAlpha: 0, duration: 0.8, stagger: 0.12 },
          "-=0.6",
        )
        .from(
          titleRef.current,
          { y: 60, autoAlpha: 0, duration: 1, ease: "expo.out" },
          "-=0.4",
        )
        .from(ctaRef.current, { y: 16, autoAlpha: 0, duration: 0.7 }, "-=0.3")
        .from(
          taglineRef.current,
          { x: -12, autoAlpha: 0, duration: 0.9, ease: "power2.out" },
          "-=0.4",
        );

      // ── Video parallax ─────────────────────────────────────────────────────
      gsap.to(videoRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" id="home">
      <div className="hero-container">
        {/* ── Video ── */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="hero-video"
          ref={videoRef}
        >
          <source src={heroBg} type="video/mp4" />
        </video>

        {/* ── Gradient overlay ── */}
        <div className="hero-overlay" ref={overlayRef} />

        {/* ── Top meta row ── */}
        <div className="hero-meta" ref={metaRef}>
          <span className="hero-meta-tag">Est. 2026</span>
          <span className="hero-meta-divider">·</span>
          <span className="hero-meta-tag">Cabatuan, Iloilo</span>
        </div>

        {/* ── Subtitle — anchored left ── */}
        <p className="hero-subtitle" ref={subtitleRef}>
          Experience the finest coffee and pastries in town.
        </p>

        {/* ── Main title — Cafe in italic em ── */}
        <h1 className="hero-title" ref={titleRef}>
          Unicas <br className="title-break" />
          <em>Cafe</em>
        </h1>

        {/* ── CTA ── */}
        <div className="hero-cta" ref={ctaRef}>
          <a href="#menu" className="cta-btn">
            <span>Explore Menu</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                d="M5 12h14M13 6l6 6-6 6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
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
