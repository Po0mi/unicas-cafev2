import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useLocationAnimation = (sectionRef, leftRef, rightRef) => {
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

      tl.from(leftRef.current, { x: -24, autoAlpha: 0, duration: 0.7 }).from(
        rightRef.current,
        { x: 24, autoAlpha: 0, duration: 0.7 },
        "-=0.5",
      );
    });

    return () => ctx.revert();
  }, [sectionRef, leftRef, rightRef]);
};

export default useLocationAnimation;
