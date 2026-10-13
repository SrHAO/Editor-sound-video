import React, { useState, useEffect } from 'react';
import { ArrowUp, Mail } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

const FloatingButtons = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
      const halfPage = pageHeight / 2;

      setShowScrollTop(scrollPosition > halfPage);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="float-btn"
          aria-label="Scroll to top"
        >
          <ArrowUp />
        </button>
      )}

      <a
        href="mailto:contact@example.com"
        className="float-btn--contact"
        aria-label="Contact us"
      >
        <Mail />
        <span className="float-btn__label">
          {language === 'en' ? "What's on your mind?" : '¿Qué tienes en mente?'}
        </span>
      </a>
    </>
  );
};

export default FloatingButtons;