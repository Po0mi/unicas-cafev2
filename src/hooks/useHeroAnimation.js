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
      // ── Entrance timeline ──────────────────────────────────────────────────
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(overlayRef.current, {
        opacity: 0,
        duration: 1.2,
      })
        .from(metaRef.current, { y: 16, autoAlpha: 0, duration: 0.7 }, "-=0.6")
        .from(
          subtitleRef.current,
          { y: 16, autoAlpha: 0, duration: 0.7 },
          "-=0.5",
        )
        .from(
          titleRef.current,
          { y: 60, autoAlpha: 0, duration: 1, ease: "expo.out" },
          "-=0.5",
        )
        .from(
          badgeRef.current,
          { x: -12, autoAlpha: 0, duration: 0.6 },
          "-=0.4",
        )
        .from(ctaRef.current, { y: 16, autoAlpha: 0, duration: 0.6 }, "-=0.4");

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
