import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useMenuAnimation = (sectionRef, headRef) => {
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

      tl.from(headRef.current, { y: 24, autoAlpha: 0, duration: 0.7 }).from(
        ".accord-cat",
        { y: 16, autoAlpha: 0, stagger: 0.07, duration: 0.5 },
        "-=0.3",
      );
    });

    return () => ctx.revert();
  }, [sectionRef, headRef]);
};

export default useMenuAnimation;
