import { useRef, useEffect, useState, useCallback } from "react";
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
  const [modalImg, setModalImg] = useState(null); // ← modal state
  const [isMobile, setIsMobile] = useState(false);

  const sectionRef = useRef(null);
  const headRef = useRef(null);
  const cellsRef = useRef([]);
  const previewRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const modalRef = useRef(null);

  const { showPreview, hidePreview } = useGalleryAnimation(
    sectionRef,
    headRef,
    cellsRef,
    previewRef,
  );

  // ── Detect mobile ──────────────────────────────────────────────────────────
  useEffect(() => {
    const mq = window.matchMedia("(hover: none)");
    setIsMobile(mq.matches);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // ── Lock scroll when modal open ────────────────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = modalImg ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalImg]);

  // ── Animate modal in/out ───────────────────────────────────────────────────
  useEffect(() => {
    if (!modalRef.current) return;
    if (modalImg) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.96 },
        { opacity: 1, scale: 1, duration: 0.35, ease: "power3.out" },
      );
    }
  }, [modalImg]);

  const closeModal = useCallback(() => {
    if (!modalRef.current) return;
    gsap.to(modalRef.current, {
      opacity: 0,
      scale: 0.96,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => setModalImg(null),
    });
  }, []);

  // ── Smooth cursor-following ────────────────────────────────────────────────
  useEffect(() => {
    if (isMobile) return;
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
  }, [isMobile]);

  // ── Cell interactions ──────────────────────────────────────────────────────
  const handleEnter = useCallback(
    (item) => {
      if (isMobile) return;
      setHoveredImg(item);
      if (previewRef.current) showPreview();
    },
    [isMobile, showPreview],
  );

  const handleLeave = useCallback(() => {
    if (isMobile) return;
    if (previewRef.current) hidePreview(() => setHoveredImg(null));
  }, [isMobile, hidePreview]);

  const handleClick = useCallback(
    (item) => {
      if (!isMobile) return;
      setModalImg(item);
    },
    [isMobile],
  );

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
                onClick={() => handleClick(item)}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="gallery-img"
                  style={{ objectPosition: item.pos }}
                  loading="lazy"
                  decoding="async"
                />
                <div className="gallery-cell-label">
                  <span>{item.alt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Cursor preview (desktop only) ── */}
      <div className="gallery-preview" ref={previewRef}>
        {hoveredImg && (
          <img
            src={hoveredImg.src}
            alt={hoveredImg.alt}
            className="gallery-preview-img"
          />
        )}
      </div>

      {/* ── Modal (mobile only) ── */}
      {modalImg && (
        <div className="gallery-modal" onClick={closeModal}>
          <div
            className="gallery-modal-inner"
            ref={modalRef}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={modalImg.src}
              alt={modalImg.alt}
              className="gallery-modal-img"
              style={{ objectPosition: modalImg.pos }}
            />
            <div className="gallery-modal-footer">
              <span>{modalImg.alt}</span>
              <button
                className="gallery-modal-close"
                onClick={closeModal}
                aria-label="Close"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;
