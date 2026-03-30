// hooks/useGalleryAnimation.js
import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useGalleryAnimation = () => {
  const sectionRef = useRef(null);
  const headRef = useRef(null);
  const cellsRef = useRef([]);
  const previewRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([headRef.current, ...cellsRef.current], {
        opacity: 0,
        y: 40,
      });

      // Header animation
      ScrollTrigger.create({
        trigger: headRef.current,
        start: "top 85%",
        onEnter: () => {
          gsap.to(headRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          });
        },
        once: true,
      });

      // Animate tag and title separately within header
      const tagElement = headRef.current?.querySelector(".gallery-tag");
      const titleElement = headRef.current?.querySelector(".gallery-title");

      if (tagElement) {
        gsap.set(tagElement, { opacity: 0, x: -20 });
        ScrollTrigger.create({
          trigger: headRef.current,
          start: "top 90%",
          onEnter: () => {
            gsap.to(tagElement, {
              opacity: 1,
              x: 0,
              duration: 0.6,
              ease: "power2.out",
            });
          },
          once: true,
        });
      }

      if (titleElement) {
        gsap.set(titleElement, { opacity: 0, y: 30 });
        ScrollTrigger.create({
          trigger: headRef.current,
          start: "top 85%",
          onEnter: () => {
            gsap.to(titleElement, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              delay: 0.1,
              ease: "back.out(1.2)",
            });
          },
          once: true,
        });
      }

      // Animate each gallery cell with staggered entrance
      cellsRef.current.forEach((cell, index) => {
        if (cell) {
          const isWide = cell.classList.contains("is-wide");
          const isTall = cell.classList.contains("is-tall");

          // Different entrance based on cell type
          let xOffset = 0;
          let yOffset = 40;

          if (isWide) {
            xOffset = 0;
            yOffset = 30;
          } else if (isTall) {
            xOffset = 20;
            yOffset = 40;
          } else {
            xOffset = index % 2 === 0 ? -20 : 20;
          }

          gsap.set(cell, {
            opacity: 0,
            y: yOffset,
            x: xOffset,
          });

          ScrollTrigger.create({
            trigger: cell,
            start: "top 85%",
            onEnter: () => {
              gsap.to(cell, {
                opacity: 1,
                y: 0,
                x: 0,
                duration: 0.7,
                delay: index * 0.08,
                ease: "power3.out",
              });
            },
            once: true,
          });
        }
      });

      // Animate images within cells with scale effect
      cellsRef.current.forEach((cell, index) => {
        if (cell) {
          const img = cell.querySelector(".gallery-img");
          if (img) {
            gsap.set(img, { scale: 1.1 });

            ScrollTrigger.create({
              trigger: cell,
              start: "top 85%",
              onEnter: () => {
                gsap.to(img, {
                  scale: 1,
                  duration: 1.2,
                  delay: index * 0.08 + 0.2,
                  ease: "power3.out",
                });
              },
              once: true,
            });
          }

          // Animate labels
          const label = cell.querySelector(".gallery-cell-label");
          if (label) {
            gsap.set(label, { opacity: 0, y: 10 });
            ScrollTrigger.create({
              trigger: cell,
              start: "top 85%",
              onEnter: () => {
                gsap.to(label, {
                  opacity: 1,
                  y: 0,
                  duration: 0.5,
                  delay: index * 0.08 + 0.4,
                  ease: "power2.out",
                });
              },
              once: true,
            });
          }
        }
      });

      // Parallax effect on grid while scrolling
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.5,
        onUpdate: (self) => {
          if (cellsRef.current[0]) {
            cellsRef.current.forEach((cell, index) => {
              if (cell) {
                const speed = 0.1 + (index % 3) * 0.05;
                gsap.set(cell, {
                  y: self.progress * 30 * speed,
                });
              }
            });
          }
        },
      });

      // Subtle fade effect on section scroll
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          if (sectionRef.current) {
            gsap.set(sectionRef.current, {
              opacity: 1 - self.progress * 0.2,
            });
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Smooth cursor-following with GSAP
  useEffect(() => {
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
  }, []);

  const handleEnter = useCallback((item) => {
    if (previewRef.current) {
      gsap.killTweensOf(previewRef.current);
      gsap.fromTo(
        previewRef.current,
        { scale: 0.85, autoAlpha: 0, rotate: -3 },
        {
          scale: 1,
          autoAlpha: 1,
          rotate: 0,
          duration: 0.45,
          ease: "power3.out",
        },
      );
    }
  }, []);

  const handleLeave = useCallback(() => {
    if (previewRef.current) {
      gsap.to(previewRef.current, {
        scale: 0.85,
        autoAlpha: 0,
        rotate: 3,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  }, []);

  return {
    sectionRef,
    headRef,
    cellsRef,
    previewRef,
    handleEnter,
    handleLeave,
  };
};

export default useGalleryAnimation;
