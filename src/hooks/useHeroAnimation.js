import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useHeroAnimation = () => {
  const videoRef = useRef(null);
  const overlayRef = useRef(null);
  const metaRef = useRef(null);
  const subtitleRef = useRef(null);
  const titleRef = useRef(null);
  const badgeRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Overlay — slow fade in ─────────────────────────────────────────────
      gsap.from(overlayRef.current, {
        opacity: 0,
        duration: 1.8,
        ease: "power2.inOut",
      });

      // ── Meta — drifts down from top ────────────────────────────────────────
      gsap.from(metaRef.current, {
        y: -18,
        autoAlpha: 0,
        duration: 1,
        delay: 0.6,
        ease: "power2.out",
      });

      // ── Subtitle — slides from left with skew snap ─────────────────────────
      gsap.from(subtitleRef.current, {
        x: -24,
        skewX: -4,
        autoAlpha: 0,
        duration: 0.9,
        delay: 0.85,
        ease: "power3.out",
        onComplete: () =>
          gsap.to(subtitleRef.current, { skewX: 0, duration: 0.3 }),
      });

      // ── Title — elastic rise ───────────────────────────────────────────────
      gsap.from(titleRef.current, {
        y: 80,
        autoAlpha: 0,
        duration: 1.4,
        delay: 0.5,
        ease: "elastic.out(1, 0.6)",
      });

      // ── Badge — pops in from left with back bounce ─────────────────────────
      gsap.from(badgeRef.current, {
        x: -20,
        scale: 0.8,
        autoAlpha: 0,
        duration: 0.7,
        delay: 1.4,
        ease: "back.out(2)",
      });

      // ── CTA — floats up softly, last ──────────────────────────────────────
      gsap.from(ctaRef.current, {
        y: 24,
        autoAlpha: 0,
        duration: 1,
        delay: 1.6,
        ease: "power4.out",
      });

      // ── Video parallax on scroll ───────────────────────────────────────────
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

  return {
    videoRef,
    overlayRef,
    metaRef,
    subtitleRef,
    titleRef,
    badgeRef,
    ctaRef,
  };
};

export default useHeroAnimation;
