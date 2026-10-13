import React, { useRef, useState } from 'react';
import { Send } from 'lucide-react';
import LegalModal from './modals/LegalModal';
import { useLanguage } from '../hooks/useLanguage';
import { COMPANY, SITE_URL } from '../data/site';

const LEGAL_LOADERS = {
  en: () => import('../i18n/legal-en.js'),
  es: () => import('../i18n/legal-es.js'),
};

const socialLinks = [
  {
    href: 'https://youtube.com',
    src: '/youtube.svg',
    alt: 'YouTube',
    variant: 'social-btn--youtube',
  },
  {
    href: 'https://instagram.com',
    src: '/instagram.svg',
    alt: 'Instagram',
    variant: 'social-btn--instagram',
  },
];

const Footer = () => {
  const { t, language } = useLanguage();
  const [form, setForm] = useState({ name: '', message: '' });
  const [modalType, setModalType] = useState(null);
  const [legalContent, setLegalContent] = useState(null);
  const requestRef = useRef(0);

  const openLegal = async (type) => {
    const request = ++requestRef.current;
    setModalType(type);
    setLegalContent(null);
    try {
      const { legal } = await LEGAL_LOADERS[language]();
      if (request === requestRef.current) setLegalContent(legal[type]);
    } catch {
      if (request === requestRef.current) setModalType(null);
    }
  };

  const closeLegal = () => setModalType(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      language === 'en'
        ? `Message from ${form.name || 'the website'}`
        : `Mensaje de ${form.name || 'el sitio web'}`
    );
    const body = encodeURIComponent(
      `${form.message}${form.name ? `\n\n— ${form.name}` : ''}`
    );
    window.location.href = `mailto:${t('email')}?subject=${subject}&body=${body}`;
  };

  const legalValues = { company: COMPANY.name, email: t('email'), website: SITE_URL };

  return (
    <footer className="site-footer">
      <div className="frame site-footer__body">
        <div className="site-footer__grid">
          <div className="site-footer__col">
            <h3 className="site-footer__heading">
              {t('createdBy')}
            </h3>
            <a
              href={COMPANY.portfolioUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('logoAria')}
            >
              <span
                className={`footer-logo ${language === 'en' ? 'footer-logo--en' : ''}`}
                role="img"
                aria-label="Alan Logo"
              />
            </a>
          </div>

          <div className="site-footer__col">
            <h3 className="site-footer__heading">
              {language === 'en' ? 'Discover the Story Behind the Frame' : 'Descubre la Historia Detrás del Marco'}
            </h3>
            <div className="site-footer__socials">
              {socialLinks.map((link) => (
                <a
                  key={link.alt}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`social-btn ${link.variant}`}
                  aria-label={link.alt}
                >
                  <img src={link.src} alt={link.alt} />
                </a>
              ))}

              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn social-btn--tiktok"
                aria-label="TikTok"
              >
                <img
                  src="/tiktok2.svg"
                  alt="TikTok"
                  className="site-footer__icon--light"
                />
                <img
                  src="/tiktok.svg"
                  alt="TikTok"
                  className="site-footer__icon--dark"
                />
              </a>
            </div>
          </div>

          <div className="site-footer__col">
            <h3 className="site-footer__heading">
              {language === 'en' ? 'Contact' : 'Contacto'}
            </h3>

            <div className="site-footer__socials">
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

            <form onSubmit={handleSubmit} className="site-footer__form">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder={language === 'en' ? 'Your name' : 'Tu nombre'}
                className="site-footer__input"
              />
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={3}
                placeholder={language === 'en' ? 'Your message...' : 'Tu mensaje...'}
                className="site-footer__input site-footer__input--area"
              />
              <button type="submit" className="site-footer__submit">
                <Send />
                {language === 'en' ? 'Send email' : 'Enviar correo'}
              </button>
            </form>
          </div>
        </div>

        <div className="site-footer__legal">
          <p className="site-footer__rights">
            {t('rights')(new Date().getFullYear())}
          </p>
          <div className="site-footer__legal-links">
            <button
              onClick={() => openLegal('privacy')}
              className="site-footer__legal-link"
            >
              {t('legalPrivacy')}
            </button>
            <span className="site-footer__legal-sep">·</span>
            <button
              onClick={() => openLegal('terms')}
              className="site-footer__legal-link"
            >
              {t('legalTerms')}
            </button>
            <span className="site-footer__legal-sep">·</span>
            <a
              href={COMPANY.portfolioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="site-footer__legal-link"
            >
              {t('contactCreator')}
            </a>
          </div>
        </div>
      </div>

      {modalType && legalContent && (
        <LegalModal
          content={legalContent}
          values={legalValues}
          onClose={closeLegal}
        />
      )}
    </footer>
  );
};

export default Footer;