import { useState, useEffect } from "react";

/**
 * SIMPLE EXPLANATION:
 * This hook tells you which section of the page is currently visible.
 * Like when you scroll and the navbar highlights "Home" or "Features".
 *
 * HOW IT WORKS:
 * - Uses Intersection Observer (modern browser feature)
 * - Watches multiple sections at once
 * - Tells you which one is most visible
 *
 * @param {string[]} sections - Array of section IDs to watch (e.g., ['home', 'features'])
 * @returns {string} - ID of the currently visible section
 */
export const useActiveSection = (sections) => {
  // State: remembers which section is currently visible
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    // Create an observer for each section
    const observers = sections.map((section) => {
      // Find the section element by its ID
      const element = document.getElementById(section);
      if (!element) return null; // Skip if section doesn't exist

      /**
       * Intersection Observer watches when elements enter/leave the screen
       * threshold: 0.5 means "consider it visible when 50% is on screen"
       */
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // If this section is visible on screen
            if (entry.isIntersecting) {
              setActiveSection(section); // Set it as active
            }
          });
        },
        { threshold: 0.5 }, // 50% visibility required
      );

      // Start watching this section
      observer.observe(element);
      return observer;
    });

    // Cleanup: stop watching when component is removed
    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, [sections]); // Re-run if sections array changes

  // Give back the ID of the active section
  return activeSection;
};
