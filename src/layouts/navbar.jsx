import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useToggle } from "../hooks/useToggle";
import { useClickOutside } from "../hooks/useClickOutside";
import { useScrollPosition } from "../hooks/useScrollPosition";
import { useActiveSection } from "../hooks/useActiveSection";
import useNavbarAnimation from "../hooks/useNavbarAnimation";
import logo from "../assets/logo.png";
import "./navbar.scss";

gsap.registerPlugin(CustomEase, ScrollToPlugin);
CustomEase.create("main", "0.65, 0.01, 0.05, 0.99");

const Navbar = () => {
  useNavbarAnimation();
  const [isMobile, setIsMobile] = useState(false);
  const scrollPosition = useScrollPosition();
  const {
    isOpen: isMenuOpen,
    toggle: toggleMenu,
    close: closeMenu,
  } = useToggle();
  const menuRef = useClickOutside(closeMenu);

  const sections = ["home", "about", "menu", "gallery", "contact"];
  const activeSection = useActiveSection(sections);

  // Refs for GSAP
  const dropdownRef = useRef(null);
  const menuLinksRef = useRef([]);
  const hamburgerSpansRef = useRef([]);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // GSAP dropdown open/close
  useEffect(() => {
    if (!isMobile || !dropdownRef.current) return;

    if (isMenuOpen) {
      gsap.set(dropdownRef.current, {
        display: "flex",
        autoAlpha: 0,
        yPercent: -8,
      });
      gsap.to(dropdownRef.current, {
        autoAlpha: 1,
        yPercent: 0,
        duration: 0.35,
        ease: "main",
      });
      gsap.fromTo(
        menuLinksRef.current,
        { autoAlpha: 0, y: -10 },
        {
          autoAlpha: 1,
          y: 0,
          stagger: 0.05,
          duration: 0.3,
          ease: "main",
          delay: 0.1,
        },
      );
      // Animate to X
      gsap.to(hamburgerSpansRef.current[0], {
        rotate: 45,
        y: 9,
        duration: 0.3,
        ease: "main",
      });
      gsap.to(hamburgerSpansRef.current[1], { autoAlpha: 0, duration: 0.15 });
      gsap.to(hamburgerSpansRef.current[2], {
        rotate: -45,
        y: -9,
        duration: 0.3,
        ease: "main",
      });
    } else {
      gsap.to(dropdownRef.current, {
        autoAlpha: 0,
        yPercent: -8,
        duration: 0.25,
        ease: "main",
        onComplete: () => gsap.set(dropdownRef.current, { display: "none" }),
      });
      // Reset to hamburger
      gsap.to(hamburgerSpansRef.current[0], {
        rotate: 0,
        y: 0,
        duration: 0.3,
        ease: "main",
      });
      gsap.to(hamburgerSpansRef.current[1], { autoAlpha: 1, duration: 0.2 });
      gsap.to(hamburgerSpansRef.current[2], {
        rotate: 0,
        y: 0,
        duration: 0.3,
        ease: "main",
      });
    }
  }, [isMenuOpen, isMobile]);

  const navLinks = [
    { href: "#home", label: "Home", id: "home" },
    { href: "#about", label: "About", id: "about" },
    { href: "#menu", label: "Menu", id: "menu" },
    { href: "#gallery", label: "Gallery", id: "gallery" },
    { href: "#contact", label: "Contact", id: "contact" },
  ];

  // ── GSAP smooth scroll ──
  // ScrollToPlugin handles the eased scroll,
  // offset accounts for the fixed navbar height
  const handleSmoothScroll = (e, href) => {
    e.preventDefault();

    const target = document.querySelector(href);
    if (!target) return;

    const navbarHeight = document.querySelector(".navbar")?.offsetHeight ?? 0;
    const targetY =
      target.getBoundingClientRect().top + window.scrollY - navbarHeight;

    gsap.to(window, {
      scrollTo: { y: targetY, autoKill: false },
      duration: 1.2,
      ease: "main",
    });

    closeMenu();
  };

  return (
    <nav className={`navbar ${scrollPosition > 50 ? "scrolled" : ""}`}>
      <div className="navbar-container" ref={menuRef}>
        {/* Logo */}
        <a
          href="#home"
          className="navbar-logo"
          onClick={(e) => handleSmoothScroll(e, "#home")}
        >
          <img src={logo} alt="Unica's Cafe" />
        </a>

        {/* Desktop Menu */}
        {!isMobile && (
          <div className="desktop-menu">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`nav-link ${activeSection === link.id ? "active" : ""}`}
                onClick={(e) => handleSmoothScroll(e, link.href)}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}

        {/* Mobile Hamburger */}
        {isMobile && (
          <button
            className="hamburger"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span ref={(el) => (hamburgerSpansRef.current[0] = el)} />
            <span ref={(el) => (hamburgerSpansRef.current[1] = el)} />
            <span ref={(el) => (hamburgerSpansRef.current[2] = el)} />
          </button>
        )}
      </div>

      {/* Mobile Dropdown */}
      {isMobile && (
        <div className="mobile-dropdown" ref={dropdownRef}>
          {navLinks.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              className={`dropdown-link ${activeSection === link.id ? "active" : ""}`}
              onClick={(e) => handleSmoothScroll(e, link.href)}
              ref={(el) => (menuLinksRef.current[index] = el)}
            >
              <span className="dropdown-index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="dropdown-label">{link.label}</span>
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
