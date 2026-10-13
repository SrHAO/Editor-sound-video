import { useEffect, useState } from 'react';
import type { JSX } from 'react';
import { ArrowUp, Mail } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

const FloatingButtons = (): JSX.Element => {
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const { language } = useLanguage();

  useEffect(() => {
    let ticking = false;
    const onScroll = (): void => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const scrollY: number = window.scrollY;
        const pageHeight: number = document.documentElement.scrollHeight - window.innerHeight;
        setShowScrollTop(scrollY > pageHeight / 2);
        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = (): void => {
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