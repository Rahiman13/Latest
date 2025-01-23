import { useEffect } from 'react';
import { useAnimation } from 'framer-motion';

export const useResetAnimation = () => {
  const controls = useAnimation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) {
            controls.start("hidden");
          } else {
            controls.start("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animate-reset');
    elements.forEach(element => observer.observe(element));

    return () => observer.disconnect();
  }, [controls]);

  return controls;
}; 