import React from 'react';
import { useStore } from '@nanostores/react';
import { Sun, Moon } from 'lucide-react';
import { sidebarStore, closeSidebar } from '../stores/ui';
import { useLanguage } from '../hooks/useLanguage';
import { useTheme } from '../hooks/useTheme';

const Sidebar = ({ path = '/' }) => {
  const isOpen = useStore(sidebarStore);
  const { toggleLanguage, language, t } = useLanguage();
  const { isDark, toggleTheme } = useTheme();

  const navigationItems = [
    { path: '/', label: language === 'en' ? 'Home' : 'Inicio' },
    { path: '/about', label: t('aboutUs') },
    { path: '/talents', label: t('talents') },
    { path: '/gallery', label: t('gallery') },
    { path: '/work', label: t('selectedWork') },
    { path: '/reels', label: t('ourReels') },
  ];

  return (
    <>
      {isOpen && (
        <div className="sidebar-overlay" onClick={closeSidebar} />
      )}

      <aside
        className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}
      >
        <div className="sidebar__body">
          <div className="sidebar__header">
            <button
              onClick={closeSidebar}
              className="sidebar__close"
              aria-label="Close menu"
            >
              <span className={`hamburger${isOpen ? ' is-active' : ''}`}>
                <span className="hamburger-line" />
                <span className="hamburger-line" />
                <span className="hamburger-line" />
              </span>
            </button>
          </div>

          <nav className="sidebar__nav">
            <ul className="sidebar__list">
              {navigationItems.map((item, index) => {
                const isActive = path === item.path;
                return (
                  <li key={index} className="sidebar__item">
                    <a
                      href={item.path}
                      onClick={closeSidebar}
                      className={`sidebar__link ${isActive ? 'sidebar__link--active' : ''}`}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="sidebar__controls">
            <div className="sidebar__socials">
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn social-btn--whatsapp"
                aria-label="WhatsApp"
              >
                <img src="/whatsapp.svg" alt="WhatsApp" />
              </a>
              <a
                href={`mailto:${t('email')}`}
                className="social-btn social-btn--email"
                aria-label="Email"
              >
                <img src="/Gmail2.svg" alt="Email" />
              </a>
            </div>

            <div className="sidebar__theme">
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

                <span
                  className={`sidebar__knob ${isDark ? 'sidebar__knob--dark' : ''}`}
                >
                  {isDark ? (
                    <Moon className="sidebar__icon sidebar__icon--moon" />
                  ) : (
                    <Sun className="sidebar__icon sidebar__icon--sun" />
                  )}
                </span>
              </button>
              <span className="sidebar__theme-label">
                {isDark ? 'Dark Mode' : 'Light Mode'}
              </span>
            </div>

            <div className="sidebar__lang">
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
              <span className="sidebar__lang-label">
                {language === 'en' ? 'English' : 'Español'}
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;