// hooks/useNavbarAnimation.js
import { useEffect } from "react";
import { gsap } from "gsap";

const useNavbarAnimation = () => {
  useEffect(() => {
    const navbar = document.querySelector(".navbar");
    const logo = document.querySelector(".navbar-logo");
    const navLinks = document.querySelectorAll(".nav-link");
    const hamburger = document.querySelector(".hamburger");

    gsap.set(navbar, { opacity: 0 });
    gsap.set(logo, { opacity: 0, y: -12 });
    gsap.set(navLinks, { opacity: 0, y: -10 });
    gsap.set(hamburger, { opacity: 0, y: -10 });

    const tl = gsap.timeline({ delay: 1.1 });

    tl.to(navbar, { opacity: 1, duration: 0.5, ease: "power2.out" })
      .to(logo, { opacity: 1, y: 0, duration: 0.55, ease: "main" }, "<+=0.05")
      .to(
        navLinks,
        { opacity: 1, y: 0, stagger: 0.07, duration: 0.5, ease: "main" },
        "<+=0.08",
      )
      .to(hamburger, { opacity: 1, y: 0, duration: 0.45, ease: "main" }, "<");

    return () => {
      tl.kill();
      gsap.set([navbar, logo, navLinks, hamburger], { clearProps: "all" });
    };
  }, []);
};

export default useNavbarAnimation;
