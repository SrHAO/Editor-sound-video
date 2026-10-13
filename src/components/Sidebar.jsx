import React from 'react';
import { useStore } from '@nanostores/react';
import { sidebarStore, closeSidebar } from '../stores/ui';
import { useLanguage } from '../hooks/useLanguage';

const Sidebar = ({ path = '/' }) => {
  const isOpen = useStore(sidebarStore);
  const { language, t } = useLanguage();

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
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;