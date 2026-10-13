import React from 'react';
import { useStore } from '@nanostores/react';
import { toggleSidebar, sidebarStore } from '../stores/ui';

const Header = () => {
  const isOpen = useStore(sidebarStore);
  return (
    <>
      <button
        onClick={toggleSidebar}
        className="site-header__toggle"
        aria-label="Toggle menu"
      >
        <span className={`hamburger${isOpen ? ' is-active' : ''}`}>
          <span className="hamburger-line" />
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </span>
      </button>

      <header className="site-header">
        <div className="site-header__inner">
          <div className="site-header__row">
            <div className="site-header__title-wrap">
              <span className="site-header__title">Portfolio</span>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;