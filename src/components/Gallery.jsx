import { useRef, useEffect, useState, useCallback, memo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useGalleryAnimation from "../hooks/useGalleryAnimation";
import "./Gallery.scss";

import nightExterior from "../assets/nightExterior.webp";
import exterior from "../assets/exterior.webp";
import cornerInterior from "../assets/cornerInterior.webp";
import handDrink from "../assets/handDrink.webp";
import meal from "../assets/meal.webp";
import cookies from "../assets/cookies.webp";

gsap.registerPlugin(ScrollTrigger);

// Defined outside — never recreated on render
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

// ── Memoized cell — only re-renders if its own props change ───────────────────
const GalleryCell = memo(({ item, index, cellRef, onEnter, onLeave }) => (
  <div
    className={`gallery-cell ${item.span ? `is-${item.span}` : ""}`}
    ref={cellRef}
    onMouseEnter={onEnter}
    onMouseLeave={onLeave}
  >
    <img
      src={item.src}
      alt={item.alt}
      className="gallery-img"
      style={{ objectPosition: item.pos }}
      // First image eager — it may be above fold on large screens
      loading={index === 0 ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={index === 0 ? "high" : "auto"}
    />
    <div className="gallery-cell-label">
      <span>{item.alt}</span>
    </div>
  </div>
));

// ── Memoized preview — only re-renders when hoveredImg changes ────────────────
const GalleryPreview = memo(({ hoveredImg, previewRef }) => (
  <div className="gallery-preview" ref={previewRef}>
    {hoveredImg && (
      <img
        src={hoveredImg.src}
        alt={hoveredImg.alt}
        className="gallery-preview-img"
        // Already loaded in the grid — instant
        loading="eager"
        decoding="sync"
      />
    )}
  </div>
));

const Gallery = () => {
  const [hoveredImg, setHoveredImg] = useState(null);
  const sectionRef = useRef(null);
  const headRef = useRef(null);
  const cellsRef = useRef([]);
  const previewRef = useRef(null);

  // quickTo setters — created once, reused on every mousemove
  const xSetter = useRef(null);
  const ySetter = useRef(null);

  const { showPreview, hidePreview } = useGalleryAnimation(
    sectionRef,
    headRef,
    cellsRef,
    previewRef,
  );

  // ── Init quickTo after mount ───────────────────────────────────────────────
  useEffect(() => {
    if (!previewRef.current) return;
    xSetter.current = gsap.quickTo(previewRef.current, "x", {
      duration: 0.55,
      ease: "power3.out",
    });
    ySetter.current = gsap.quickTo(previewRef.current, "y", {
      duration: 0.55,
      ease: "power3.out",
    });
  }, []);

  // ── Mousemove — quickTo is far cheaper than gsap.to on every event ────────
  useEffect(() => {
    const onMove = (e) => {
      xSetter.current?.(e.clientX);
      ySetter.current?.(e.clientY);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // ── Stable handlers — useCallback with no deps (showPreview/hidePreview stable) ──
  const handleEnter = useCallback(
    (item) => {
      setHoveredImg(item);
      showPreview();
    },
    [showPreview],
  );

  const handleLeave = useCallback(() => {
    hidePreview(() => setHoveredImg(null));
  }, [hidePreview]);

  // ── Pre-bind handlers per item — avoids inline arrow fn on each render ────
  const handlers = useRef(
    ITEMS.map((item) => ({
      onEnter: null,
      onLeave: null,
    })),
  );

  // Rebuild stable per-item handlers only when handleEnter/Leave change
  useEffect(() => {
    ITEMS.forEach((item, i) => {
      handlers.current[i].onEnter = () => handleEnter(item);
      handlers.current[i].onLeave = handleLeave;
    });
  }, [handleEnter, handleLeave]);

  return (
    <>
      <section className="gallery" id="gallery" ref={sectionRef}>
        <div className="gallery-inner">
          <div className="gallery-head" ref={headRef}>
            <span className="gallery-tag">A glimpse inside</span>
            <h2 className="gallery-title">
              Our <em>Gallery.</em>
            </h2>
          </div>

          <div className="gallery-grid">
            {ITEMS.map((item, i) => (
              <GalleryCell
                key={item.alt}
                item={item}
                index={i}
                cellRef={(el) => (cellsRef.current[i] = el)}
                onEnter={handlers.current[i].onEnter}
                onLeave={handlers.current[i].onLeave}
              />
            ))}
          </div>
        </div>
      </section>

      <GalleryPreview hoveredImg={hoveredImg} previewRef={previewRef} />
    </>
  );
};

export default Gallery;
