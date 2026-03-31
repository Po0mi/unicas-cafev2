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
    // Guard — if any ref didn't mount, bail
    const els = [overlayRef, metaRef, subtitleRef, titleRef, badgeRef, ctaRef];
    if (els.some((r) => !r.current)) return;

    const ctx = gsap.context(() => {
      // ── Set initial states instantly via gsap.set ─────────────────────────
      // Avoids FOUC (flash of unstyled content) by hiding before first paint
      gsap.set(
        [
          metaRef.current,
          subtitleRef.current,
          titleRef.current,
          badgeRef.current,
          ctaRef.current,
        ],
        { autoAlpha: 0 },
      );

      // ── Single timeline — one RAF loop instead of 6 separate tweens ───────
      const tl = gsap.timeline({ delay: 0.1 });

      tl.to(overlayRef.current, {
        opacity: 1,
        duration: 1.8,
        ease: "power2.inOut",
      })
        .to(
          metaRef.current,
          {
            y: 0,
            autoAlpha: 1,
            duration: 1,
            ease: "power2.out",
          },
          0.6,
        ) // absolute label — starts at t=0.6s
        .to(
          subtitleRef.current,
          {
            x: 0,
            skewX: 0,
            autoAlpha: 1,
            duration: 0.9,
            ease: "power3.out",
          },
          0.85,
        )
        .to(
          titleRef.current,
          {
            y: 0,
            autoAlpha: 1,
            duration: 1.4,
            ease: "elastic.out(1, 0.6)",
          },
          0.5,
        )
        .to(
          badgeRef.current,
          {
            x: 0,
            scale: 1,
            autoAlpha: 1,
            duration: 0.7,
            ease: "back.out(2)",
          },
          1.4,
        )
        .to(
          ctaRef.current,
          {
            y: 0,
            autoAlpha: 1,
            duration: 1,
            ease: "power4.out",
          },
          1.6,
        );

      // ── Set FROM values before timeline runs (replaces gsap.from) ─────────
      gsap.set(metaRef.current, { y: -18 });
      gsap.set(subtitleRef.current, { x: -24, skewX: -4 });
      gsap.set(titleRef.current, { y: 80 });
      gsap.set(badgeRef.current, { x: -20, scale: 0.8 });
      gsap.set(ctaRef.current, { y: 24 });

      // ── Video parallax — will-change set in SCSS ───────────────────────────
      if (videoRef.current) {
        ScrollTrigger.create({
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: 1, // smoothed scrub, less jank
          animation: gsap.to(videoRef.current, {
            yPercent: 20,
            ease: "none",
          }),
        });
      }
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
