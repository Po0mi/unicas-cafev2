import { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Gallery.scss";

import nightExterior from "../assets/nightExterior.jpg";
import exterior from "../assets/exterior.jpg";
import cornerInterior from "../assets/cornerInterior.jpg";
import handDrink from "../assets/handDrink.jpg";
import meal from "../assets/meal.jpg";
import cookies from "../assets/cookies.jpg";

gsap.registerPlugin(ScrollTrigger);

const ITEMS = [
  {
    src: nightExterior,
    alt: "Unica's at night",
    pos: "center 25%",
    span: "wide",
  },
  { src: handDrink, alt: "Biscoff frappe", pos: "center 15%", span: "tall" },
  { src: exterior, alt: "Exterior", pos: "center 40%", span: "" },
  { src: cookies, alt: "House cookies", pos: "center 50%", span: "" },
  { src: cornerInterior, alt: "The cozy corner", pos: "center 20%", span: "" },
  { src: meal, alt: "Rice meals", pos: "top center", span: "" },
];

const Gallery = () => {
  const [hoveredImg, setHoveredImg] = useState(null);
  const sectionRef = useRef(null);
  const headRef = useRef(null);
  const cellsRef = useRef([]);
  const previewRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  // ── Entrance animation ──────────────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headRef.current, {
        y: 20,
        autoAlpha: 0,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });
      gsap.from(cellsRef.current, {
        y: 24,
        autoAlpha: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  // ── Smooth cursor-following with GSAP ──────────────────────────────────────
  useEffect(() => {
    const onMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (previewRef.current) {
        gsap.to(previewRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.55,
          ease: "power3.out",
        });
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // ── Show / hide preview ────────────────────────────────────────────────────
  const handleEnter = useCallback((item) => {
    setHoveredImg(item);
    if (previewRef.current) {
      gsap.killTweensOf(previewRef.current);
      gsap.fromTo(
        previewRef.current,
        { scale: 0.85, autoAlpha: 0, rotate: -3 },
        {
          scale: 1,
          autoAlpha: 1,
          rotate: 0,
          duration: 0.45,
          ease: "power3.out",
        },
      );
    }
  }, []);

  const handleLeave = useCallback(() => {
    if (previewRef.current) {
      gsap.to(previewRef.current, {
        scale: 0.85,
        autoAlpha: 0,
        rotate: 3,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => setHoveredImg(null),
      });
    }
  }, []);

  return (
    <>
      <section className="gallery" id="gallery" ref={sectionRef}>
        <div className="gallery-inner">
          {/* ── Header ── */}
          <div className="gallery-head" ref={headRef}>
            <span className="gallery-tag">A glimpse inside</span>
            <h2 className="gallery-title">
              Our <em>Gallery.</em>
            </h2>
          </div>

          {/* ── Grid ── */}
          <div className="gallery-grid">
            {ITEMS.map((item, i) => (
              <div
                key={i}
                className={`gallery-cell ${item.span ? `is-${item.span}` : ""}`}
                ref={(el) => (cellsRef.current[i] = el)}
                onMouseEnter={() => handleEnter(item)}
                onMouseLeave={handleLeave}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="gallery-img"
                  style={{ objectPosition: item.pos }}
                  loading="lazy"
                  decoding="async"
                />
                {/* Label bottom left */}
                <div className="gallery-cell-label">
                  <span>{item.alt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cursor-following preview ── */}
      <div className="gallery-preview" ref={previewRef}>
        {hoveredImg && (
          <img
            src={hoveredImg.src}
            alt={hoveredImg.alt}
            className="gallery-preview-img"
          />
        )}
      </div>
    </>
  );
};

export default Gallery;
