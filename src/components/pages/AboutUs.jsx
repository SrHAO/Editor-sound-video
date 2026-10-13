import React, { useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { X } from 'lucide-react';
import Footer from '../Footer';

const AboutUs = () => {
  const { language } = useLanguage();
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    {
      url: 'https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwyfHxwaG90b2dyYXBoeSUyMHN0dWRpb3xlbnwwfHx8fDE3NjExMDMxOTZ8MA&ixlib=rb-4.1.0&q=85',
      title: language === 'en' ? 'Professional Studio Setup' : 'Estudio Profesional',
      caption: language === 'en' ? 'State-of-the-art photography equipment' : 'Equipo fotográfico de última generación',
      location: language === 'en' ? 'Main Studio, Los Angeles' : 'Estudio Principal, Los Ángeles',
      date: language === 'en' ? 'March 15, 2024' : '15 de marzo, 2024',
      photographer: 'Carlos Mendez'
    },
    {
      url: 'https://images.unsplash.com/photo-1641236210747-48bc43e4517f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHw0fHxwaG90b2dyYXBoeSUyMHN0dWRpb3xlbnwwfHx8fDE3NjExMDMxOTZ8MA&ixlib=rb-4.1.0&q=85',
      title: language === 'en' ? 'Creative Production Process' : 'Proceso Creativo de Producción',
      caption: language === 'en' ? 'Behind-the-scenes of a photo session' : 'Detrás de cámaras de una sesión fotográfica',
      location: language === 'en' ? 'Studio B, Miami' : 'Estudio B, Miami',
      date: language === 'en' ? 'April 22, 2024' : '22 de abril, 2024',
      photographer: 'Ana Rodríguez'
    },
    {
      url: 'https://images.unsplash.com/photo-1632187989763-c9c620420b4d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHwzfHx2aWRlbyUyMHByb2R1Y3Rpb258ZW58MHx8fHwxNzYxMTAzMjA0fDA&ixlib=rb-4.1.0&q=85',
      title: language === 'en' ? 'Video Production Team' : 'Equipo de Producción de Video',
      caption: language === 'en' ? 'Collaborative workspace for video projects' : 'Espacio colaborativo para proyectos de video',
      location: language === 'en' ? 'Post-Production Suite, New York' : 'Suite de Post-Producción, Nueva York',
      date: language === 'en' ? 'May 10, 2024' : '10 de mayo, 2024',
      photographer: 'Miguel Torres'
    },
    {
      url: 'https://images.unsplash.com/photo-1625690303837-654c9666d2d0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHwyfHx2aWRlbyUyMHByb2R1Y3Rpb258ZW58MHx8fHwxNzYxMTAzMjA0fDA&ixlib=rb-4.1.0&q=85',
      title: language === 'en' ? 'Professional Video Equipment' : 'Equipo de Video Profesional',
      caption: language === 'en' ? 'High-end cinema cameras and lighting' : 'Cámaras de cine y iluminación de alta gama',
      location: language === 'en' ? 'Equipment Room, Houston' : 'Sala de Equipo, Houston',
      date: language === 'en' ? 'June 5, 2024' : '5 de junio, 2024',
      photographer: 'Luis García'
    }
  ];

  return (
    <div className="page">
      <div className="page-body">
        <div className="frame frame--6xl">
          <h1 className="page-title">
            {language === 'en' ? 'About Us' : 'Acerca de Nosotros'}
          </h1>

          <div className="about-intro">
            <p className="about-intro__text">
              {language === 'en'
                ? 'We are an emerging studio dedicated to photo editing, video post-production, and comprehensive project planning in the audiovisual industry. Our team brings fresh, innovative ideas combined with professional expertise to transform your creative vision into reality. With state-of-the-art equipment and cutting-edge techniques, we deliver exceptional quality in every project we undertake.'
                : 'Somos un estudio emergente dedicado a la edición de fotos, post-producción de video y planificación integral de proyectos en la industria audiovisual. Nuestro equipo aporta ideas frescas e innovadoras combinadas con experiencia profesional para transformar tu visión creativa en realidad. Con equipo de última generación y técnicas vanguardistas, entregamos calidad excepcional en cada proyecto que emprendemos.'}
            </p>
          </div>

          <div className="about-gallery">
            <h2 className="section-title--sm">
              {language === 'en' ? 'Our Studio' : 'Nuestro Estudio'}
            </h2>
            <div className="about-gallery__grid">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="studio-card"
                  onClick={() => setSelectedImage(image)}
                >
                  <div className="studio-card__media">
                    <img
                      src={image.url}
                      alt={image.title}
                      loading="lazy"
                      decoding="async"
                      className="studio-card__img"
                    />
                  </div>
                  <div className="studio-card__body">
                    <h3 className="studio-card__title">
                      {image.title}
                    </h3>
                    <p className="studio-card__caption">
                      {image.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {selectedImage && (
        <div
          className="lightbox-overlay"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="lightbox__close"
            onClick={() => setSelectedImage(null)}
          >
            <X />
          </button>
          <div
            className="lightbox__panel"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.url}
              alt={selectedImage.title}
              loading="lazy"
              decoding="async"
              className="lightbox__img"
            />
            <div className="lightbox__body">
              <h3 className="lightbox__title">
                {selectedImage.title}
              </h3>
              <div className="lightbox__meta">
                <p>
                  <span className="lightbox__label">
                    {language === 'en' ? 'Location:' : 'Ubicación:'}
                  </span>{' '}
                  {selectedImage.location}
                </p>
                <p>
                  <span className="lightbox__label">
                    {language === 'en' ? 'Date:' : 'Fecha:'}
                  </span>{' '}
                  {selectedImage.date}
                </p>
                <p>
                  <span className="lightbox__label">
                    {language === 'en' ? 'Photographer:' : 'Fotógrafo:'}
                  </span>{' '}
                  {selectedImage.photographer}
                </p>
                <p className="lightbox__caption">
                  {selectedImage.caption}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default AboutUs;