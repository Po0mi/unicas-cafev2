// hooks/useAboutAnimation.js
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useAboutAnimation = () => {
  const sectionRef = useRef(null);
  const metaRef = useRef(null);
  const titleRef = useRef(null);
  const blocksRef = useRef([]);
  const imageRef = useRef(null);
  const bodyRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(
        [
          metaRef.current,
          titleRef.current,
          ...blocksRef.current,
          imageRef.current,
          bodyRef.current,
        ],
        {
          opacity: 0,
          y: 60,
        },
      );

      // Meta animation
      ScrollTrigger.create({
        trigger: metaRef.current,
        start: "top 85%",
        onEnter: () => {
          gsap.to(metaRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          });
        },
        once: true,
      });

      // Title animation
      ScrollTrigger.create({
        trigger: titleRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.to(titleRef.current, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "back.out(1.2)",
          });
        },
        once: true,
      });

      // Individual block animations with different starts
      blocksRef.current.forEach((block, index) => {
        if (block) {
          const isLeft = block.classList.contains("about-block--left");
          const startOffset = isLeft ? "top 75%" : "top 70%";

          ScrollTrigger.create({
            trigger: block,
            start: startOffset,
            onEnter: () => {
              gsap.to(block, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: index * 0.1,
                ease: "power3.out",
              });
            },
            once: true,
          });
        }
      });

      // Center image animation with scale effect
      ScrollTrigger.create({
        trigger: imageRef.current,
        start: "top 70%",
        onEnter: () => {
          gsap.fromTo(
            imageRef.current,
            {
              opacity: 0,
              scale: 0.8,
              y: 40,
            },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 1.2,
              ease: "elastic.out(1, 0.6)",
            },
          );
        },
        once: true,
      });

      // Bottom body text animation
      ScrollTrigger.create({
        trigger: bodyRef.current,
        start: "top 85%",
        onEnter: () => {
          gsap.to(bodyRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          });
        },
        once: true,
      });

      // Optional: Reveal blocks with alternating directions
      blocksRef.current.forEach((block) => {
        if (block) {
          const isLeft = block.classList.contains("about-block--left");
          const xDirection = isLeft ? -30 : 30;

          gsap.set(block, {
            x: xDirection,
          });

          ScrollTrigger.create({
            trigger: block,
            start: "top 75%",
            onEnter: () => {
              gsap.to(block, {
                x: 0,
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out",
              });
            },
            once: true,
          });
        }
      });

      // Fade in numbers and tags with delay
      blocksRef.current.forEach((block) => {
        if (block) {
          const numElement = block.querySelector(".block-num");
          const tagElement = block.querySelector(".block-tag");

          if (numElement) {
            gsap.set(numElement, { opacity: 0, scale: 0.5 });
            ScrollTrigger.create({
              trigger: block,
              start: "top 75%",
              onEnter: () => {
                gsap.to(numElement, {
                  opacity: 1,
                  scale: 1,
                  duration: 0.5,
                  delay: 0.2,
                  ease: "back.out(1.5)",
                });
              },
              once: true,
            });
          }

          if (tagElement) {
            gsap.set(tagElement, { opacity: 0, x: -10 });
            ScrollTrigger.create({
              trigger: block,
              start: "top 75%",
              onEnter: () => {
                gsap.to(tagElement, {
                  opacity: 1,
                  x: 0,
                  duration: 0.4,
                  delay: 0.3,
                  ease: "power2.out",
                });
              },
              once: true,
            });
          }
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return {
    sectionRef,
    metaRef,
    titleRef,
    blocksRef,
    imageRef,
    bodyRef,
  };
};

export default useAboutAnimation;
