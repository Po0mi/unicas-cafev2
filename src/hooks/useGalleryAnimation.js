import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useGalleryAnimation = (sectionRef, headRef, cellsRef, previewRef) => {
  const xTo = useRef(null);
  const yTo = useRef(null);

  // ── Entrance animation ──────────────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      tl.from(headRef.current, { y: 20, autoAlpha: 0, duration: 0.7 }).from(
        cellsRef.current,
        { y: 30, autoAlpha: 0, duration: 0.7, stagger: 0.1 },
        "-=0.4",
      );
    });

    return () => ctx.revert();
  }, [sectionRef, headRef, cellsRef]);

  // ── quickTo cursor — init once ─────────────────────────────────────────────
  useEffect(() => {
    if (!previewRef.current) return;
    xTo.current = gsap.quickTo(previewRef.current, "x", {
      duration: 0.45,
      ease: "power3.out",
    });
    yTo.current = gsap.quickTo(previewRef.current, "y", {
      duration: 0.45,
      ease: "power3.out",
    });
  }, [previewRef]);

  // ── Mousemove ──────────────────────────────────────────────────────────────
  useEffect(() => {
    const onMove = (e) => {
      xTo.current?.(e.clientX);
      yTo.current?.(e.clientY);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // ── Preview show/hide ──────────────────────────────────────────────────────
  const showPreview = () => {
    gsap.killTweensOf(previewRef.current);
    gsap.fromTo(
      previewRef.current,
      { scale: 0.85, autoAlpha: 0, rotate: -3 },
      { scale: 1, autoAlpha: 1, rotate: 0, duration: 0.45, ease: "power3.out" },
    );
  };

  const hidePreview = (onComplete) => {
    gsap.to(previewRef.current, {
      scale: 0.85,
      autoAlpha: 0,
      rotate: 3,
      duration: 0.3,
      ease: "power2.in",
      onComplete,
    });
  };

  return { showPreview, hidePreview };
};

export default useGalleryAnimation;
