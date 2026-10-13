import React from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import Footer from '../Footer';

const SelectedWork = () => {
  const { language } = useLanguage();

  const services = [
    {
      image: 'https://images.unsplash.com/photo-1474376700777-eb547d9bed2f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBjYW1lcmF8ZW58MHx8fHwxNzYxMTAzMjMxfDA&ixlib=rb-4.1.0&q=85',
      title: language === 'en' ? 'Photo Sessions' : 'Sesiones Fotográficas',
      description: language === 'en'
        ? 'Professional photo sessions for portraits, events, products, and commercial projects. We capture every moment with artistic precision and technical excellence.'
        : 'Sesiones fotográficas profesionales para retratos, eventos, productos y proyectos comerciales. Capturamos cada momento con precisión artística y excelencia técnica.'
    },
    {
      image: 'https://images.unsplash.com/photo-1574717024757-c1ec4d86ae82?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NjZ8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMGVkaXRpbmd8ZW58MHx8fHwxNzYxMTAzMjM2fDA&ixlib=rb-4.1.0&q=85',
      title: language === 'en' ? 'Video Editing' : 'Edición de Videos',
      description: language === 'en'
        ? 'Advanced video editing services using industry-standard software. From cutting and transitions to advanced effects and motion graphics.'
        : 'Servicios avanzados de edición de video utilizando software estándar de la industria. Desde cortes y transiciones hasta efectos avanzados y motion graphics.'
    },
    {
      image: 'https://images.unsplash.com/photo-1574717024239-25253f4ef40a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwxfHxwb3N0JTIwcHJvZHVjdGlvbnxlbnwwfHx8fDE3NjExMDMyNDh8MA&ixlib=rb-4.1.0&q=85',
      title: language === 'en' ? 'Reel Creation & Editing' : 'Creación y Edición de Reels',
      description: language === 'en'
        ? 'Dynamic and engaging reels for social media platforms. Optimized content that captures attention and drives engagement for your brand.'
        : 'Reels dinámicos y atractivos para plataformas de redes sociales. Contenido optimizado que capta la atención e impulsa el engagement de tu marca.'
    },
    {
      image: 'https://images.unsplash.com/photo-1574717024757-c1ec4d86ae82?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwzfHxwb3N0JTIwcHJvZHVjdGlvbnxlbnwwfHx8fDE3NjExMDMyNDh8MA&ixlib=rb-4.1.0&q=85',
      title: language === 'en' ? 'Color Grading' : 'Corrección de Color',
      description: language === 'en'
        ? 'Professional color grading to enhance the mood and aesthetic of your videos. We create cinematic looks that elevate your visual storytelling.'
        : 'Corrección de color profesional para mejorar el ambiente y la estética de tus videos. Creamos looks cinematográficos que elevan tu narrativa visual.'
    },
    {
      image: 'https://images.unsplash.com/photo-1633311233277-b1382a98ca4b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwyfHxwcm9mZXNzaW9uYWwlMjBjYW1lcmF8ZW58MHx8fHwxNzYxMTAzMjMxfDA&ixlib=rb-4.1.0&q=85',
      title: language === 'en' ? 'Post-Production' : 'Post-Producción',
      description: language === 'en'
        ? 'Complete post-production services including audio mixing, sound design, visual effects, and final delivery in any format you need.'
        : 'Servicios completos de post-producción incluyendo mezcla de audio, diseño de sonido, efectos visuales y entrega final en cualquier formato que necesites.'
    },
    {
      image: 'https://images.unsplash.com/photo-1574717024757-c1ec4d86ae82?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NjZ8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMGVkaXRpbmd8ZW58MHx8fHwxNzYxMTAzMjM2fDA&ixlib=rb-4.1.0&q=85',
      title: language === 'en' ? 'Project Planning' : 'Planificación de Proyectos',
      description: language === 'en'
        ? 'Strategic planning and creative direction for your audiovisual projects. From concept development to execution, we guide you through every step.'
        : 'Planificación estratégica y dirección creativa para tus proyectos audiovisuales. Desde el desarrollo del concepto hasta la ejecución, te guiamos en cada paso.'
    }
  ];

  return (
    <div className="page">
      <div className="page-body">
        <div className="frame frame--7xl">
          <h1 className="page-title">
            {language === 'en' ? 'Selected Work' : 'Trabajo Selecto'}
          </h1>

          <div className="work-grid">
            {services.map((service, index) => (
              <div key={index} className="work-card">
                <div className="work-card__media">
                  <img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                    decoding="async"
                    className="work-card__img"
                  />
                  <div className="work-card__gradient" />
                  <h3 className="work-card__title">
                    {service.title}
                  </h3>
                </div>
                <div className="work-card__body">
                  <p className="work-card__desc">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SelectedWork;