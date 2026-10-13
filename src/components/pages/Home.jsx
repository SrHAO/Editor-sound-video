import React, { useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { Film, Clapperboard, Camera, Sparkles, X } from 'lucide-react';
import Footer from '../Footer';
import ServiceModal from '../ServiceModal';

const Home = () => {
  const { language } = useLanguage();
  const [selectedService, setSelectedService] = useState(null);
  const [selectedVfx, setSelectedVfx] = useState(null);

  const services = [
    {
      id: 'postproduction',
      icon: Film,
      title: language === 'en' ? 'Post Production' : 'Post Producción',
      items: language === 'en'
        ? ['Offline Editing', 'Online Editing', 'Mastering', 'Color Grading', 'AV Localization', 'Sound Design']
        : ['Edición Offline', 'Edición Online', 'Masterización', 'Corrección de Color', 'Localización AV', 'Diseño de Sonido']
    },
    {
      id: 'onset',
      icon: Clapperboard,
      title: language === 'en' ? 'On Set' : 'En Set',
      items: language === 'en'
        ? ['Data Managing', 'Color Dailies', 'Post & VFX Supervisor', 'Digital Image Technician', 'Streaming Operator', 'Drone Pilot']
        : ['Gestión de Datos', 'Dailies de Color', 'Supervisor Post & VFX', 'Técnico de Imagen Digital', 'Operador de Streaming', 'Piloto de Dron']
    },
    {
      id: 'animation',
      icon: Sparkles,
      title: language === 'en' ? 'Animation & VFX' : 'Animación y VFX',
      items: language === 'en'
        ? ['Motion Graphics', 'Rotoscoping', 'Tracking', 'Compositing', 'Clean Ups', 'Digital Laboratory']
        : ['Motion Graphics', 'Rotoscopia', 'Tracking', 'Compositing', 'Limpieza', 'Laboratorio Digital']
    },
    {
      id: 'photography',
      icon: Camera,
      title: language === 'en' ? 'Photography Services' : 'Servicios de Fotografía',
      items: language === 'en'
        ? ['Commercial Photography', 'Portrait Sessions', 'Product Photography', 'Event Coverage', 'Fashion Photography', 'Aerial Photography']
        : ['Fotografía Comercial', 'Sesiones de Retrato', 'Fotografía de Producto', 'Cobertura de Eventos', 'Fotografía de Moda', 'Fotografía Aérea']
    }
  ];

  const experiences = [
    {
      image: 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=800&q=80',
      title: language === 'en' ? 'Creative Collaboration' : 'Colaboración Creativa',
      description: language === 'en'
        ? 'Working together to bring your vision to life with cutting-edge technology and artistic expertise.'
        : 'Trabajando juntos para dar vida a tu visión con tecnología de vanguardia y experiencia artística.'
    },
    {
      image: 'https://images.unsplash.com/photo-1574717024757-c1ec4d86ae82?w=800&q=80',
      title: language === 'en' ? 'Professional Excellence' : 'Excelencia Profesional',
      description: language === 'en'
        ? 'Delivering exceptional results through meticulous attention to detail and industry-leading standards.'
        : 'Entregando resultados excepcionales a través de atención meticulosa al detalle y estándares líderes en la industria.'
    },
    {
      image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&q=80',
      title: language === 'en' ? 'Creative Innovation' : 'Innovación Creativa',
      description: language === 'en'
        ? 'Pushing boundaries with innovative techniques and creative solutions for every project.'
        : 'Empujando límites con técnicas innovadoras y soluciones creativas para cada proyecto.'
    },
    {
      image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=800&q=80',
      title: language === 'en' ? 'State-of-the-Art Technology' : 'Tecnología de Vanguardia',
      description: language === 'en'
        ? 'Utilizing the latest equipment and software to produce stunning visual content.'
        : 'Utilizando el equipo y software más reciente para producir contenido visual impresionante.'
    }
  ];

  const logos = [
    { src: '/cf.svg', invert: false, name: 'CF' },
    { src: '/avid.svg', invert: false, name: 'Avid' },
    { src: '/logos/maxon-one.svg', invert: false, name: 'Maxon One', big: true },
    { src: '/Adobe_Creative_Cloud.svg', invert: false, name: 'Adobe Creative Cloud' },
    { src: '/C4D_icon.svg', invert: false, name: 'Cinema 4D' },
    { src: '/dolby_logo_white.svg', invert: false, name: 'Dolby' },
    { src: '/ak2d8-xfx77.svg', invert: false, name: 'OBS Studio' },
    { src: '/Maxon-thumbnail-Photoroom.svg', invert: false, name: 'Maxon' },
    { src: '/Davinci.png', invert: false, name: 'DaVinci Resolve' },
    { src: '/logos/red-giant.svg', invert: false, name: 'Red Giant', big: true }
  ];

  const vfxItems = [
    {
      image: '/modelado 3d.webp',
      label: language === 'en' ? '3D Modeling' : 'Modelado 3D',
      description: language === 'en'
        ? 'Asset creation is the backbone of modern production. From the robots in "Transformers" to the product renders you see in advertising, 3D artists sculpt, retopologize, texture and light digital objects until they are production-ready. This discipline also powers architectural visualization and character design for feature animation.'
        : 'La creación de assets es el pilar de la producción moderna. Desde los robots de "Transformers" hasta los renders de producto publicitarios, los artistas 3D esculpen, retopologizan, texturizan e iluminan objetos digitales hasta dejarlos listos para producción. Esta disciplina también impulsa la visualización arquitectónica y el diseño de personajes para cine de animación.'
    },
    {
      image: '/Integracion CGI.webp',
      label: language === 'en' ? 'CGI Integration' : 'Integración CGI',
      description: language === 'en'
        ? 'CGI is only convincing when it disappears into the shot. In films like "Jurassic World", digital creatures share light, shadow and lens characteristics with the live-action plate. We match perspective, color, grain and motion blur so 3D elements sit seamlessly over real footage.'
        : 'El CGI solo convence cuando desaparece dentro del plano. En películas como "Jurassic World", las criaturas digitales comparten luz, sombra y características de lente con el material rodado. Igualamos perspectiva, color, grano y desenfoque de movimiento para que los elementos 3D se asienten sin fisuras sobre el material real.'
    },
    {
      image: '/Efectos de partic.webp',
      label: language === 'en' ? 'Particle Effects' : 'Efectos de Partículas',
      description: language === 'en'
        ? "Particle simulations recreate nature's unpredictable behavior: smoke, fire, water splashes, dust and explosions. Big-budget sequences like the volcanic ash in \"Pompeii\" or the debris in \"Interstellar\" run on solver-based simulations that combine physics with art direction so every frame reads as real."
        : 'Las simulaciones de partículas recrean el comportamiento impredecible de la naturaleza: humo, fuego, salpicaduras, polvo y explosiones. Secuencias de gran presupuesto como la ceniza volcánica de "Pompeya" o los escombros de "Interstellar" se construyen con simuladores que combinan física y dirección de arte para que cada fotograma parezca real.'
    },
    {
      image: '/Entorno Dig.webp',
      label: language === 'en' ? 'Digital Environments' : 'Entornos Digitales',
      description: language === 'en'
        ? 'When a location does not exist, it gets built. Digital environments replace or extend real sets: the cities of "Blade Runner" rescaled and relit, or fully CG worlds like Pandora. Set extensions, digital matte painting and complete CG worlds are modeled in 3D and integrated behind or around the actors.'
        : 'Cuando una localización no existe, se construye. Los entornos digitales sustituyen o amplían escenarios reales: las ciudades de "Blade Runner" reescaladas y reiluminadas, o mundos íntegramente CGI como Pandora. Las ampliaciones de escenario, el matte painting digital y los mundos CG completos se modelan en 3D y se integran detrás o alrededor de los actores.'
    }
  ];

  return (
    <div className="page">
      <div className="page-body">
        <div className="frame frame--7xl">
          <div className="home-hero">
            <h1 className="home-hero__title">
              {language === 'en' ? 'Creative Studio' : 'Estudio Creativo'}
            </h1>
            <p className="home-hero__subtitle">
              {language === 'en'
                ? 'Transforming Ideas into Visual Masterpieces'
                : 'Transformando Ideas en Obras Maestras Visuales'}
            </p>
          </div>

          <div className="home-services">
            <h2 className="section-title">
              {language === 'en' ? 'Services' : 'Servicios'}
            </h2>
            <div className="home-services__grid">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <button
                    key={service.id}
                    onClick={() => setSelectedService(service)}
                    className="service-card"
                  >
                    <span className="service-card__iconbox">
                      <Icon className="service-card__icon" />
                    </span>
                    <span className="service-card__label">
                      {service.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="home-experiences">
            <h2 className="section-title">
              {language === 'en' ? 'Experiences' : 'Experiencias'}
            </h2>
            <div className="home-experiences__grid">
              {experiences.map((exp, index) => (
                <div key={index} className="experience-card">
                  <div className="experience-card__media">
                    <img
                      src={exp.image}
                      alt={exp.title}
                      loading="lazy"
                      decoding="async"
                      className="experience-card__img"
                    />
                    <div className="experience-card__gradient" />
                    <h3 className="experience-card__title">
                      {exp.title}
                    </h3>
                  </div>
                  <div className="experience-card__body">
                    <p className="experience-card__desc">
                      {exp.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="home-logos">
            <h2 className="section-title">
              {language === 'en' ? 'Tools' : 'Herramientas'}
            </h2>
            <div className="logo-marquee">
              <div className="logo-marquee__track">
                {logos.concat(logos).map((logo, i) => (
                  <span key={i} className="logo-marquee__item">
                    <img
                      src={logo.src}
                      alt={logo.name}
                      loading="lazy"
                      className={`logo-marquee__img${logo.big ? ' logo-marquee__img--lg' : ''}`}
                    />
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="home-vfx-section">
            <h2 className="section-title">
              {language === 'en' ? 'Visual Effects' : 'Efectos Visuales'}
            </h2>
            <div className="home-vfx">
              <p className="home-vfx__text">
                {language === 'en'
                  ? 'Transform your vision with cutting-edge visual effects. From subtle enhancements to complex CGI, our VFX team creates stunning visuals that bring stories to life. We specialize in compositing, motion graphics, 3D animation, and digital environments that seamlessly integrate with live-action footage.'
                  : 'Transforma tu visión con efectos visuales de vanguardia. Desde mejoras sutiles hasta CGI complejo, nuestro equipo de VFX crea visuales impresionantes que dan vida a las historias. Nos especializamos en compositing, motion graphics, animación 3D y entornos digitales que se integran perfectamente con material de acción en vivo.'}
              </p>
              <div className="home-vfx__grid">
                {vfxItems.map((item, i) => (
                  <figure
                    key={i}
                    className="vfx-card"
                    role="button"
                    tabIndex={0}
                    onClick={() => setSelectedVfx(item)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedVfx(item);
                      }
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.label}
                      loading="lazy"
                      decoding="async"
                      className="vfx-card__img"
                    />
                    <figcaption className="vfx-card__text">
                      {item.label}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ServiceModal
        isOpen={selectedService !== null}
        onClose={() => setSelectedService(null)}
        title={selectedService?.title || ''}
        services={selectedService?.items || []}
      />

      {selectedVfx && (
        <div
          className="vfx-modal-overlay"
          onClick={() => setSelectedVfx(null)}
        >
          <div
            className="vfx-modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={selectedVfx.label}
          >
            <button
              onClick={() => setSelectedVfx(null)}
              className="vfx-modal__close"
              aria-label="Close"
            >
              <X />
            </button>
            <img
              src={selectedVfx.image}
              alt={selectedVfx.label}
              className="vfx-modal__img"
            />
            <div className="vfx-modal__body">
              <h3 className="vfx-modal__title">{selectedVfx.label}</h3>
              <p className="vfx-modal__text">{selectedVfx.description}</p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Home;