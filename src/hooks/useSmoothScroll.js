import { useEffect } from "react";

const useSmoothScroll = () => {
  useEffect(() => {
    let lenis;
    let rafId;

    // Dynamic import — Lenis only downloads after hero paint
    const init = async () => {
      const { default: Lenis } = await import("lenis");
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      gsap.registerPlugin(ScrollTrigger);

      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        syncTouch: false, // native scroll on touch — better mobile perf
      });

      // Sync Lenis with ScrollTrigger
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    };

    // Defer until after first paint — hero loads first
    const id = requestIdleCallback
      ? requestIdleCallback(init, { timeout: 2000 })
      : setTimeout(init, 200);

    return () => {
      if (requestIdleCallback) {
        cancelIdleCallback(id);
      } else {
        clearTimeout(id);
      }
      if (lenis) lenis.destroy();
      cancelAnimationFrame(rafId);
    };
  }, []);
};

export default useSmoothScroll;
