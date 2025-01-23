import React, { useEffect, useState, useCallback, useRef } from 'react';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const frameRef = useRef();
  const positionRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0, y: 0 });
  const lastMouseRef = useRef({ x: 0, y: 0 });

  const updatePosition = useCallback((e) => {
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }

    const targetX = e.clientX;
    const targetY = e.clientY;
    
    // Calculate mouse velocity
    const mouseVelocityX = targetX - lastMouseRef.current.x;
    const mouseVelocityY = targetY - lastMouseRef.current.y;
    lastMouseRef.current = { x: targetX, y: targetY };

    frameRef.current = requestAnimationFrame(() => {
      if (cursorRef.current && dotRef.current) {
        // Adjust velocity based on mouse speed
        const speed = Math.sqrt(mouseVelocityX ** 2 + mouseVelocityY ** 2);
        const smoothing = Math.max(0.15, Math.min(0.3, 0.4 - speed * 0.002));

        velocityRef.current.x = (targetX - positionRef.current.x) * smoothing;
        velocityRef.current.y = (targetY - positionRef.current.y) * smoothing;

        positionRef.current.x += velocityRef.current.x;
        positionRef.current.y += velocityRef.current.y;

        // When hovering, make dot follow cursor exactly
        const dotX = isHovering ? targetX : targetX * 0.85 + positionRef.current.x * 0.15;
        const dotY = isHovering ? targetY : targetY * 0.85 + positionRef.current.y * 0.15;
        
        dotRef.current.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`;
        cursorRef.current.style.transform = `translate(${positionRef.current.x}px, ${positionRef.current.y}px) translate(-50%, -50%)`;

        if (Math.abs(velocityRef.current.x) > 0.01 || Math.abs(velocityRef.current.y) > 0.01) {
          frameRef.current = requestAnimationFrame(() => updatePosition(e));
        }
      }
    });
  }, [isHovering]);

  const handleMouseEnter = useCallback(() => {
    setIsVisible(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  const handleMouseOver = useCallback((e) => {
    const target = e.target;
    const isClickable = 
      target.tagName.toLowerCase() === 'button' ||
      target.tagName.toLowerCase() === 'a' ||
      target.closest('button') ||
      target.closest('a') ||
      target.classList.contains('clickable');
    
    setIsHovering(isClickable);
  }, []);

  useEffect(() => {
    document.addEventListener('mousemove', updatePosition, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [updatePosition, handleMouseEnter, handleMouseLeave, handleMouseOver]);

  // Don't render on touch devices
  if (window.matchMedia('(hover: none)').matches) {
    return null;
  }

  return (
    <>
      <div
        ref={cursorRef}
        className={`custom-cursor ${isHovering ? 'cursor-hover' : ''}`}
        style={{
          opacity: isVisible ? 1 : 0,
        }}
      />
      <div
        ref={dotRef}
        className={`custom-cursor-dot ${isHovering ? 'cursor-dot-hover' : ''}`}
        style={{
          opacity: isVisible ? 1 : 0,
        }}
      />
    </>
  );
};

export default CustomCursor; 