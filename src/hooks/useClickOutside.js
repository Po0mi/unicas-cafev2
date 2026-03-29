import { useEffect, useRef } from "react";

/**
 * SIMPLE EXPLANATION:
 * This hook detects when you click outside a specific element.
 * Like when you click outside a dropdown menu and want it to close.
 *
 * HOW IT WORKS:
 * 1. You attach the 'ref' to your element (like a menu)
 * 2. This hook listens for clicks anywhere on the page
 * 3. If the click is NOT inside your element, it runs the handler
 *
 * @param {Function} handler - What to do when outside click happens (usually close something)
 * @returns {Object} ref - Attach this to your element
 */
export const useClickOutside = (handler) => {
  // Create a reference we can attach to an element
  const ref = useRef();

  useEffect(() => {
    /**
     * Check if click was outside our element
     * @param {Event} event - The click event
     */
    const handleClickOutside = (event) => {
      // If our element exists AND the click target is NOT inside our element
      if (ref.current && !ref.current.contains(event.target)) {
        // Run the handler (usually close the menu)
        handler();
      }
    };

    // Listen for clicks everywhere on the page
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup: stop listening when component is removed
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handler]); // Re-run if handler changes

  // Give back the ref to attach to your element
  return ref;
};
