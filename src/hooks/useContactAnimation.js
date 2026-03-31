import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useContactAnimation = (
  sectionRef,
  headerRef,
  formRef,
  bottomRef,
  footerRef,
) => {
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

      tl.from(headerRef.current, { y: 24, autoAlpha: 0, duration: 0.7 })
        .from(formRef.current, { y: 20, autoAlpha: 0, duration: 0.7 }, "-=0.4")
        .from(
          bottomRef.current,
          { y: 16, autoAlpha: 0, duration: 0.6 },
          "-=0.4",
        )
        .from(
          footerRef.current,
          { y: 12, autoAlpha: 0, duration: 0.5 },
          "-=0.3",
        );
    });

    return () => ctx.revert();
  }, [sectionRef, headerRef, formRef, bottomRef, footerRef]);
};

export default useContactAnimation;
