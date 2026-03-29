import { useState, useEffect } from "react";

/**
 * SIMPLE EXPLANATION:
 * This hook tells you how far the user has scrolled down the page.
 *
 * WHY USE IT:
 * - Change navbar style when scrolled (add background)
 * - Show "Back to Top" button after scrolling
 * - Trigger animations when user scrolls
 *
 * @returns {number} - Current scroll position in pixels (0 = top, 100 = 100px down)
 */
export const useScrollPosition = () => {
  // State: remembers how far we've scrolled (in pixels)
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    /**
     * Update function: gets current scroll position
     */
    const updatePosition = () => {
      // pageYOffset = how many pixels from top we've scrolled
      setScrollPosition(window.pageYOffset);
    };

    // Listen for scroll events
    window.addEventListener("scroll", updatePosition);

    // Get initial position (in case page starts scrolled)
    updatePosition();

    // Cleanup: stop listening when component is removed
    return () => window.removeEventListener("scroll", updatePosition);
  }, []); // Empty array = run once when component loads

  // Give back the current scroll position
  return scrollPosition;
};
