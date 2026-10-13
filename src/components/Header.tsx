import { useEffect, useRef, useState } from 'react';
import type { JSX } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useStore } from '@nanostores/react';
import { toggleSidebar, sidebarStore } from '../stores/ui';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../hooks/useLanguage';

const HIDE_THRESHOLD = 120;

const Header = (): JSX.Element => {
  const isOpen = useStore(sidebarStore);
  const { isDark, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const [hidden, setHidden] = useState<boolean>(false);
  const lastScrollY = useRef<number>(0);

  useEffect(() => {
    let ticking = false;
    const onScroll = (): void => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const currentY: number = window.scrollY;
        const prevY: number = lastScrollY.current;

        if (!isOpen && currentY > HIDE_THRESHOLD && currentY > prevY) {
          setHidden(true);
        } else if (currentY <= HIDE_THRESHOLD || currentY < prevY) {
          setHidden(false);
        }

        lastScrollY.current = currentY;
        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [isOpen]);

  return (
    <>
      <button
        onClick={toggleSidebar}
        className={`site-header__toggle${hidden ? ' site-header__toggle--hidden' : ''}`}
        aria-label="Toggle menu"
      >
        <span className={`hamburger${isOpen ? ' is-active' : ''}`}>
          <span className="hamburger-line" />
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </span>
      </button>

      <header className={`site-header${hidden ? ' site-header--hidden' : ''}`}>
        <div className="site-header__inner">
          <div className="site-header__row">
            <div className="site-header__title-wrap">
              <span className="site-header__title">Portfolio</span>
            </div>

            <div className="site-header__controls">
              <button
                onClick={toggleTheme}
                role="switch"
                aria-checked={isDark}
                aria-label="Toggle theme"
                className={`sidebar__theme-switch ${isDark ? 'sidebar__theme-switch--dark' : ''}`}
              >
                <span
                  className={`sidebar__sky ${isDark ? 'sidebar__sky--on' : ''}`}
                  aria-hidden="true"
                >
                  <span className="sidebar__star sidebar__star--1" />
                  <span className="sidebar__star sidebar__star--2" />
                  <span className="sidebar__star sidebar__star--3" />
                  <span className="sidebar__star sidebar__star--4" />
                </span>

                <span
                  className={`sidebar__sky ${isDark ? '' : 'sidebar__sky--on'}`}
                  aria-hidden="true"
                >
                  <span className="sidebar__cloud sidebar__cloud--1" />
                  <span className="sidebar__cloud sidebar__cloud--2" />
                </span>

                <span className={`sidebar__knob ${isDark ? 'sidebar__knob--dark' : ''}`}>
                  {isDark ? (
                    <Moon className="sidebar__icon sidebar__icon--moon" />
                  ) : (
                    <Sun className="sidebar__icon sidebar__icon--sun" />
                  )}
                </span>
              </button>

              <button
                onClick={toggleLanguage}
                aria-label="Toggle language"
                className={`sidebar__lang-switch ${language === 'en' ? 'sidebar__lang-switch--en' : ''}`}
              >
                <img
                  className="sidebar__lang-flag sidebar__lang-flag--mx"
                  src="/flag-mexico.svg"
                  alt=""
                  aria-hidden="true"
                />
                <img
                  className="sidebar__lang-flag sidebar__lang-flag--us"
                  src="/flag-usa.svg"
                  alt=""
                  aria-hidden="true"
                />
                <span className="sidebar__lang-knob" aria-hidden="true">
                  <img
                    src={language === 'en' ? '/flag-usa.svg' : '/flag-mexico.svg'}
                    alt=""
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;