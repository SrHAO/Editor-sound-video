import React, { useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Footer from '../Footer';

const OurReels = () => {
  const { language } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);

  const videos = [
    {
      id: 'dQw4w9WgXcQ',
      title: language === 'en' ? 'Commercial Production Showcase' : 'Muestra de Producción Comercial'
    },
    {
      id: 'jNQXAC9IVRw',
      title: language === 'en' ? 'Creative Studio Reel 2024' : 'Reel Creativo del Estudio 2024'
    },
    {
      id: '9bZkp7q19f0',
      title: language === 'en' ? 'Behind the Scenes: Professional Shoot' : 'Detrás de Cámaras: Filmación Profesional'
    },
    {
      id: 'hY7m5jjJ9mM',
      title: language === 'en' ? 'Color Grading Tutorial' : 'Tutorial de Corrección de Color'
    },
    {
      id: 'ZXsQAXx_ao0',
      title: language === 'en' ? 'Cinematic Video Production' : 'Producción de Video Cinematográfico'
    }
  ];

  const goTo = (index) => {
    setActiveIndex((index + videos.length) % videos.length);
  };

  const activeVideo = videos[activeIndex];

  return (
    <div className="page">
      <div className="page-body">
        <div className="frame frame--4xl">
          <h1 className="page-title">
            {language === 'en' ? "Our Reel's" : "Nuestros Reel's"}
          </h1>

          <div className="reels-player">
            <button
              onClick={() => goTo(activeIndex - 1)}
              className="reels-nav reels-nav--prev"
              aria-label="Previous"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={() => goTo(activeIndex + 1)}
              className="reels-nav reels-nav--next"
              aria-label="Next"
            >
              <ChevronRight />
            </button>

            <div className="reels-frame">
              <div className="reels-frame__video">
                <iframe
                  key={activeVideo.id}
                  src={`https://www.youtube.com/embed/${activeVideo.id}`}
                  title={activeVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="reels-frame__caption">
                <p>{activeVideo.title}</p>
              </div>
            </div>

            <div className="reels-dots">
              {videos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goTo(index)}
                  className={`reel-dot ${activeIndex === index ? 'reel-dot--active' : ''}`}
                  aria-label={`Go to video ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="reels-info">
            <p>
              {language === 'en'
                ? 'Explore our portfolio of professional video productions and creative projects'
                : 'Explora nuestro portafolio de producciones de video profesionales y proyectos creativos'}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OurReels;