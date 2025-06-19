// src/hooks/useResponsive.js

import { useState, useEffect } from 'react';

export const useResponsive = () => {
  const [width, setWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    
    return () => window.removeEventListener('resize', onResize);
  }, []);
  
  return {
    isMobile: width <= 767,
    isTablet: width > 767 && width <= 1023,
    isDesktop: width >= 1024,
  };
};
