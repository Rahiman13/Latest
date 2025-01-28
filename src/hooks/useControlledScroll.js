import { useEffect, useRef } from 'react';

export const useControlledScroll = (options = {}) => {
  const {
    speed = 1,            // Normal speed
    maxStep = 100,        // Normal max step
    smooth = true,
    threshold = 0         // No threshold for normal scrolling
  } = options;

  const lastScrollTime = useRef(Date.now());
  const rafId = useRef(null);

  useEffect(() => {
    const handleScroll = (event) => {
      const now = Date.now();
      const timeDelta = now - lastScrollTime.current;
      
      if (timeDelta < 16) { // Basic frame limiting
        return;
      }

      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }

      rafId.current = requestAnimationFrame(() => {
        const delta = event.deltaY;
        const currentScroll = window.scrollY;
        const targetScroll = currentScroll + delta;

        if (smooth) {
          window.scrollTo({
            top: targetScroll,
            behavior: 'smooth'
          });
        } else {
          window.scrollTo(0, targetScroll);
        }

        lastScrollTime.current = now;
      });
    };

    window.addEventListener('wheel', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('wheel', handleScroll);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [speed, maxStep, smooth, threshold]);
}; 