'use client';

import { useState, useEffect } from 'react';
import { useTheme } from '../ColorThemeProvider/ColorThemeProvider';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const colorTheme = useTheme();

  const handleScroll = () => {
    if (window.scrollY > 200) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed w-12 h-12 bottom-10 right-10 p-3 bg-primary-${colorTheme} text-white rounded-full shadow-lg transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      ↑
    </button>
  );
};

export default ScrollToTopButton;
