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
 * OPTIMIZED:
 * - passive: true  → browser doesn't wait for JS before scrolling
 * - rAF throttle  → only reads layout once per animation frame, not on every scroll event
 *
 * @returns {number} - Current scroll position in pixels (0 = top, 100 = 100px down)
 */
export const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    let rafId = null;

    const onScroll = () => {
      if (rafId) return; // already queued — skip
      rafId = requestAnimationFrame(() => {
        setScrollPosition(window.scrollY);
        rafId = null;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    // Get initial position
    setScrollPosition(window.scrollY);

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return scrollPosition;
};
