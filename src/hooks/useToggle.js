import { useState, useCallback } from "react";

/**
 * SIMPLE EXPLANATION:
 * This hook manages anything that can be either open or closed.
 * Like a light switch - on or off.
 *
 * REAL WORLD EXAMPLES:
 * - Mobile menu (open/closed)
 * - Dropdown menus
 * - Popup modals
 * - Accordion sections
 *
 * @param {boolean} initialState - Start open (true) or closed (false)?
 * @returns {Object} - Functions to control the state
 */
export const useToggle = (initialState = false) => {
  // State: remembers if something is open (true) or closed (false)
  const [isOpen, setIsOpen] = useState(initialState);

  // toggle(): flips between open and closed (like a light switch)
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  // open(): forces it to be open (sets to true)
  const open = useCallback(() => setIsOpen(true), []);

  // close(): forces it to be closed (sets to false)
  const close = useCallback(() => setIsOpen(false), []);

  // Give back the state and all control functions
  return { isOpen, toggle, open, close };
};
