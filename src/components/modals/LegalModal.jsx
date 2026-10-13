import React, { useEffect } from 'react';

const LegalModal = ({ content, values = {}, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!content) return null;

  const fill = (text) =>
    text.replace(/\{(\w+)\}/g, (match, key) => values[key] ?? match);

  return (
    <div className="legal-modal-root" aria-hidden="false">
      <div
        data-modal-backdrop
        className="legal-modal-backdrop"
        onClick={onClose}
      />
      <div
        data-modal-dialog
        role="dialog"
        aria-modal="true"
        aria-label={content.title}
        className="legal-modal-dialog"
      >
        <header className="legal-modal__head">
          <h3 className="legal-modal__title">
            {content.title}
          </h3>
          <button
            onClick={onClose}
            autoFocus
            aria-label={content.ariaClose}
            className="legal-modal__close"
          >
            &times;
          </button>
        </header>

        {content.lastUpdated && (
          <p className="legal-modal__meta">
            {content.lastUpdated}
          </p>
        )}

        {content.intro && (
          <p className="legal-modal__intro">
            {fill(content.intro)}
          </p>
        )}

        <div className="legal-modal__body">
          {content.sections.map((section) => (
            <section key={section.title} className="legal-modal__section">
              <h4 className="legal-modal__section-title">
                {section.title}
              </h4>
              <p className="legal-modal__section-text">
                {fill(section.body)}
              </p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LegalModal;