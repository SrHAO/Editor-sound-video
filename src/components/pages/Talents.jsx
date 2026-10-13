import React, { useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import Footer from '../Footer';

const Talents = () => {
  const { language } = useLanguage();
  const [flippedCard, setFlippedCard] = useState(null);

  const talents = [
    {
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=800&fit=crop',
      name: language === 'en' ? 'Carlos Mendez' : 'Carlos Méndez',
      specialty: language === 'en' ? 'Lead Photographer' : 'Fotógrafo Principal',
      experience: language === 'en' ? '12 years' : '12 años',
      bio: language === 'en'
        ? 'Carlos brings over a decade of experience in commercial and artistic photography. Graduate of the School of Visual Arts in New York, his work has been featured in international magazines and exhibitions. Inspired by natural light and urban landscapes, Carlos aspires to push the boundaries of visual storytelling. He brings technical excellence and creative vision to every project.'
        : 'Carlos aporta más de una década de experiencia en fotografía comercial y artística. Graduado de la Escuela de Artes Visuales de Nueva York, su trabajo ha sido presentado en revistas y exposiciones internacionales. Inspirado por la luz natural y los paisajes urbanos, Carlos aspira a empujar los límites de la narrativa visual. Aporta excelencia técnica y visión creativa a cada proyecto.'
    },
    {
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=800&fit=crop',
      name: language === 'en' ? 'Ana Rodriguez' : 'Ana Rodríguez',
      specialty: language === 'en' ? 'Video Editor' : 'Editora de Video',
      experience: language === 'en' ? '8 years' : '8 años',
      bio: language === 'en'
        ? 'Ana is a master of post-production with expertise in Adobe Premiere Pro, After Effects, and DaVinci Resolve. Educated at the Film Institute in Los Angeles, she specializes in narrative storytelling through precise editing. Her inspiration comes from classic cinema and modern visual effects. Ana aspires to create content that moves audiences emotionally. She provides meticulous attention to detail and innovative editing techniques.'
        : 'Ana es una maestra de la post-producción con experiencia en Adobe Premiere Pro, After Effects y DaVinci Resolve. Educada en el Instituto de Cine de Los Ángeles, se especializa en narrativa a través de edición precisa. Su inspiración viene del cine clásico y efectos visuales modernos. Ana aspira a crear contenido que mueva emocionalmente a las audiencias. Aporta atención meticulosa al detalle y técnicas innovadoras de edición.'
    },
    {
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwwfHx8fDE3NjI2MzEzNDN8MA&ixlib=rb-4.1.0&q=85',
      name: language === 'en' ? 'Michael Chen' : 'Michael Chen',
      specialty: language === 'en' ? 'Business Development' : 'Desarrollo de Negocios',
      experience: language === 'en' ? '10 years' : '10 años',
      bio: language === 'en'
        ? 'Michael leads our business strategy with extensive experience in digital media and creative services. With an MBA from Harvard and a background in production management, he bridges creative vision with business objectives. His strategic partnerships have expanded our studio\'s reach across international markets.'
        : 'Michael lidera nuestra estrategia de negocios con amplia experiencia en medios digitales y servicios creativos. Con un MBA de Harvard y experiencia en gestión de producción, conecta la visión creativa con objetivos de negocio. Sus asociaciones estratégicas han expandido el alcance de nuestro estudio en mercados internacionales.'
    },
    {
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwyfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwwfHx8fDE3NjI2MzEzNDN8MA&ixlib=rb-4.1.0&q=85',
      name: language === 'en' ? 'Laura Thompson' : 'Laura Thompson',
      specialty: language === 'en' ? 'Creative Producer' : 'Productora Creativa',
      experience: language === 'en' ? '9 years' : '9 años',
      bio: language === 'en'
        ? 'Laura manages complex productions from concept to final delivery. With experience producing for major brands and networks, she ensures every project meets the highest standards. Her organizational skills and creative insight make her invaluable to our team\'s success.'
        : 'Laura gestiona producciones complejas desde el concepto hasta la entrega final. Con experiencia produciendo para marcas importantes y redes, asegura que cada proyecto cumpla con los más altos estándares. Sus habilidades organizacionales y perspicacia creativa la hacen invaluable para el éxito de nuestro equipo.'
    },
    {
      image: 'https://images.unsplash.com/photo-1719257751404-1dea075324bd?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMGhlYWRzaG90fGVufDB8fHx8MTc2MjcyNDI5N3ww&ixlib=rb-4.1.0&q=85',
      name: language === 'en' ? 'Marcus Wilson' : 'Marcus Wilson',
      specialty: language === 'en' ? 'Senior Photographer' : 'Fotógrafo Senior',
      experience: language === 'en' ? '13 years' : '13 años',
      bio: language === 'en'
        ? 'Marcus is a versatile photographer specializing in both studio and location work. His technical mastery and creative eye have made him a sought-after professional in fashion and commercial photography. Trained at the New York Institute of Photography, Marcus brings passion and precision to every shoot.'
        : 'Marcus es un fotógrafo versátil especializado tanto en trabajo de estudio como en locación. Su dominio técnico y ojo creativo lo han convertido en un profesional buscado en fotografía de moda y comercial. Entrenado en el Instituto de Fotografía de Nueva York, Marcus aporta pasión y precisión a cada sesión.'
    },
    {
      image: 'https://images.unsplash.com/photo-1581065178047-8ee15951ede6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwzfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwwfHx8fDE3NjI2MzEzNDN8MA&ixlib=rb-4.1.0&q=85',
      name: language === 'en' ? 'Sophia Martinez' : 'Sophia Martínez',
      specialty: language === 'en' ? 'Art Director' : 'Directora de Arte',
      experience: language === 'en' ? '11 years' : '11 años',
      bio: language === 'en'
        ? 'Sophia shapes the visual direction of our projects with her exceptional design sensibility. Graduate of the Rhode Island School of Design, she has art directed campaigns for Fortune 500 companies. Her innovative approach to visual storytelling consistently delivers impactful results.'
        : 'Sophia da forma a la dirección visual de nuestros proyectos con su excepcional sensibilidad de diseño. Graduada de la Escuela de Diseño de Rhode Island, ha dirigido artísticamente campañas para empresas Fortune 500. Su enfoque innovador de narrativa visual entrega consistentemente resultados impactantes.'
    }
  ];

  const handleCardClick = (index) => {
    setFlippedCard(flippedCard === index ? null : index);
  };

  return (
    <div className="page">
      <div className="page-body">
        <div className="frame frame--6xl">
          <h1 className="page-title">
            {language === 'en' ? 'Talents' : 'Talentos'}
          </h1>

          <div className="talents-grid">
            {talents.map((talent, index) => (
              <div
                key={index}
                className="talent-card"
                onClick={() => handleCardClick(index)}
              >
                <div
                  className={`talent-card__inner ${flippedCard === index ? 'talent-card__inner--flipped' : ''}`}
                >
                  <div className="talent-card__face">
                    <div className="talent-card__media">
                      <img
                        src={talent.image}
                        alt={talent.name}
                        loading="lazy"
                        decoding="async"
                        className="talent-card__photo"
                      />
                      <div className="talent-card__info">
                        <h3 className="talent-card__name">
                          {talent.name}
                        </h3>
                        <p className="talent-card__specialty">
                          {talent.specialty}
                        </p>
                        <p className="talent-card__hint">
                          {language === 'en' ? 'Click to learn more' : 'Clic para conocer más'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="talent-card__face talent-card__face--back">
                    <div className="talent-card__body">
                      <div className="talent-card__head">
                        <img
                          src={talent.image}
                          alt={talent.name}
                          loading="lazy"
                          decoding="async"
                          className="talent-card__avatar"
                        />
                        <div className="talent-card__head-main">
                          <h3 className="talent-card__name--small">
                            {talent.name}
                          </h3>
                          <p className="talent-card__specialty--small">
                            {talent.specialty}
                          </p>
                          <p className="talent-card__exp">
                            {language === 'en' ? 'Experience:' : 'Experiencia:'} {talent.experience}
                          </p>
                        </div>
                      </div>
                      <div className="talent-card__bio">
                        <p>
                          {talent.bio}
                        </p>
                      </div>
                      <p className="talent-card__flip-hint">
                        {language === 'en' ? 'Click to flip back' : 'Clic para regresar'}
                      </p>
                    </div>
                  </div>
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

export default Talents;