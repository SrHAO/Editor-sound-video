import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { X } from 'lucide-react';
import Footer from '../Footer';

const Gallery = () => {
  const { language } = useLanguage();
  const [selectedImage, setSelectedImage] = useState(null);
  const [radius, setRadius] = useState(190);

  const sphereRef = useRef(null);
  const stageRef = useRef(null);
  const rotation = useRef({ yaw: 0, pitch: -10 });
  const dragging = useRef(false);
  const moved = useRef(0);
  const lastPoint = useRef({ x: 0, y: 0 });
  const onWindowMove = useRef(null);
  const onWindowUp = useRef(null);

  const images = [
    {
      url: 'https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea',
      title: language === 'en' ? 'Studio Setup' : 'Configuración de Estudio',
      session: language === 'en' ? 'Indoor Studio Session' : 'Sesión de Estudio Interior',
      location: language === 'en' ? 'Main Studio, Los Angeles' : 'Estudio Principal, Los Ángeles',
      shotType: language === 'en' ? 'Wide angle studio setup shot' : 'Toma de configuración de estudio gran angular',
      photographer: 'Sarah Mitchell'
    },
    {
      url: 'https://images.unsplash.com/photo-1669789758542-8b7746dd0612',
      title: language === 'en' ? 'Group Session' : 'Sesión Grupal',
      session: language === 'en' ? 'Indoor Group Photography' : 'Fotografía Grupal Interior',
      location: language === 'en' ? 'Creative Space, New York' : 'Espacio Creativo, Nueva York',
      shotType: language === 'en' ? 'Group portrait with natural poses' : 'Retrato grupal con poses naturales',
      photographer: 'Marcus Johnson'
    },
    {
      url: 'https://images.unsplash.com/photo-1614181861684-f91fed70c192',
      title: language === 'en' ? 'Portrait Session' : 'Sesión de Retrato',
      session: language === 'en' ? 'Professional Portrait' : 'Retrato Profesional',
      location: language === 'en' ? 'Downtown Studio, Miami' : 'Estudio Centro, Miami',
      shotType: language === 'en' ? 'Close-up portrait with dramatic lighting' : 'Retrato de primer plano con iluminación dramática',
      photographer: 'Daniel Cooper'
    },
    {
      url: 'https://images.unsplash.com/photo-1611093791822-15086535830b',
      title: language === 'en' ? 'Behind the Scenes' : 'Detrás de Cámaras',
      session: language === 'en' ? 'Production Process' : 'Proceso de Producción',
      location: language === 'en' ? 'Studio 5, Chicago' : 'Estudio 5, Chicago',
      shotType: language === 'en' ? 'Behind-the-scenes documentary style' : 'Estilo documental detrás de cámaras',
      photographer: 'Emily Watson'
    },
    {
      url: 'https://images.unsplash.com/photo-1557053910-d9eadeed1c58',
      title: language === 'en' ? 'Studio Portrait' : 'Retrato de Estudio',
      session: language === 'en' ? 'Professional Headshot' : 'Foto Profesional de Cabeza',
      location: language === 'en' ? 'Portrait Studio, Boston' : 'Estudio de Retratos, Boston',
      shotType: language === 'en' ? 'Professional headshot with solid background' : 'Foto profesional con fondo sólido',
      photographer: 'Ana Rodríguez'
    },
    {
      url: 'https://images.unsplash.com/photo-1615458509636-856366d3396e',
      title: language === 'en' ? 'Equipment Setup' : 'Configuración de Equipo',
      session: language === 'en' ? 'Production Setup' : 'Configuración de Producción',
      location: language === 'en' ? 'Tech Studio, San Francisco' : 'Estudio Técnico, San Francisco',
      shotType: language === 'en' ? 'Equipment and gear showcase shot' : 'Toma de exhibición de equipo y accesorios',
      photographer: 'Miguel Torres'
    },
    {
      url: 'https://images.unsplash.com/photo-1707454464101-b39888037cb3',
      title: language === 'en' ? 'Outdoor Session' : 'Sesión Exterior',
      session: language === 'en' ? 'Environmental Portrait Session' : 'Sesión de Retrato Ambiental',
      location: language === 'en' ? 'Urban Setting, Seattle' : 'Entorno Urbano, Seattle',
      shotType: language === 'en' ? 'Urban environmental portrait' : 'Retrato ambiental urbano',
      photographer: 'Roberto Silva'
    },
    {
      url: 'https://images.unsplash.com/photo-1618819950252-2205671df5e5',
      title: language === 'en' ? 'Pet Photography' : 'Fotografía de Mascotas',
      session: language === 'en' ? 'Pet Portrait Session' : 'Sesión de Retrato de Mascotas',
      location: language === 'en' ? 'Pet Studio, Portland' : 'Estudio de Mascotas, Portland',
      shotType: language === 'en' ? 'Studio pet portrait with professional lighting' : 'Retrato de mascota en estudio con iluminación profesional',
      photographer: 'Jennifer Lee'
    },
    {
      url: '/images.webp',
      title: language === 'en' ? 'Session Shoot' : 'Sesión Fotográfica',
      session: language === 'en' ? 'Outdoor Photo Session' : 'Sesión Fotográfica Exterior',
      location: language === 'en' ? 'Studio Backlot, Austin' : 'Backlot de Estudio, Austin',
      shotType: language === 'en' ? 'Candid shoot with natural light' : 'Toma espontánea con luz natural',
      photographer: 'Laura Méndez'
    },
    {
      url: '/images12.webp',
      title: language === 'en' ? 'Studio Work' : 'Trabajo de Estudio',
      session: language === 'en' ? 'Indoor Studio Session' : 'Sesión de Estudio Interior',
      location: language === 'en' ? 'Production Studio, Denver' : 'Estudio de Producción, Denver',
      shotType: language === 'en' ? 'Controlled studio lighting setup' : 'Montaje de iluminación de estudio controlada',
      photographer: 'Kevin Park'
    },
    {
      url: '/image_thumb1.webp',
      title: language === 'en' ? 'Editorial Shot' : 'Toma Editorial',
      session: language === 'en' ? 'Editorial Photography' : 'Fotografía Editorial',
      location: language === 'en' ? 'Downtown Loft, New York' : 'Loft del Centro, Nueva York',
      shotType: language === 'en' ? 'Editorial portrait composition' : 'Composición de retrato editorial',
      photographer: 'Sofía Herrera'
    },
    {
      url: '/supervision-poster.jpg',
      title: language === 'en' ? 'Production Supervision' : 'Supervisión de Producción',
      session: language === 'en' ? 'Audiovisual Production Supervision' : 'Supervisión de Producción Audiovisual',
      location: language === 'en' ? 'Film Set, Los Angeles' : 'Set de Rodaje, Los Ángeles',
      shotType: language === 'en' ? 'Production supervision still' : 'Fotograma de supervisión de producción',
      photographer: 'Daniel Cooper'
    },
    {
      url: '/Virtual-Laboratories-and-Their-Contribution-to-the-Future-of-Education-1.webp',
      title: language === 'en' ? 'Virtual Laboratory' : 'Laboratorio Virtual',
      session: language === 'en' ? 'Educational Virtual Lab' : 'Laboratorio Virtual Educativo',
      location: language === 'en' ? 'Educational Studio, Boston' : 'Estudio Educativo, Boston',
      shotType: language === 'en' ? 'Virtual laboratory visualization' : 'Visualización de laboratorio virtual',
      photographer: 'Miguel Torres'
    }
  ];

  const layout = useMemo(() => {
    const N = images.length;
    const golden = Math.PI * (3 - Math.sqrt(5));
    return images.map((_, i) => {
      const y = 1 - (2 * (i + 0.5)) / N;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = golden * i;
      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;
      const lat = Math.asin(y) * (180 / Math.PI);
      const lon = Math.atan2(x, z) * (180 / Math.PI);
      return { x, y, z, lat, lon };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images.length]);

  const applyRotation = useCallback(() => {
    if (stageRef.current) {
      stageRef.current.style.transform =
        `rotateX(${rotation.current.pitch}deg) rotateY(${rotation.current.yaw}deg)`;
    }
  }, []);

  useEffect(() => {
    onWindowMove.current = (e) => {
      if (!dragging.current) return;
      const dx = e.clientX - lastPoint.current.x;
      const dy = e.clientY - lastPoint.current.y;
      lastPoint.current = { x: e.clientX, y: e.clientY };
      moved.current += Math.abs(dx) + Math.abs(dy);
      rotation.current.yaw += dx * 0.35;
      rotation.current.pitch = Math.max(-75, Math.min(75, rotation.current.pitch + dy * 0.35));
      applyRotation();
    };
    onWindowUp.current = () => {
      dragging.current = false;
      window.removeEventListener('pointermove', onWindowMove.current);
      window.removeEventListener('pointerup', onWindowUp.current);
    };
    return () => {
      window.removeEventListener('pointermove', onWindowMove.current);
      window.removeEventListener('pointerup', onWindowUp.current);
    };
  }, [applyRotation]);

  useEffect(() => {
    const el = sphereRef.current;
    if (!el) return;
    const update = () => {
      const size = Math.min(el.clientWidth, el.clientHeight);
      setRadius(Math.max(228, Math.min(size * 0.5, 423)));
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    let raf = 0;
    const tick = () => {
      if (!dragging.current && !reduce.matches) {
        rotation.current.yaw += 0.12;
        applyRotation();
      }
      raf = requestAnimationFrame(tick);
    };
    applyRotation();
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [applyRotation]);

  const handlePointerDown = (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    dragging.current = true;
    moved.current = 0;
    lastPoint.current = { x: e.clientX, y: e.clientY };
    window.addEventListener('pointermove', onWindowMove.current);
    window.addEventListener('pointerup', onWindowUp.current);
  };

  const handleItemClick = (image) => {
    if (moved.current > 6) return;
    setSelectedImage(image);
  };

  return (
    <div className="page">
      <div className="page-body">
        <div className="frame frame--7xl">
          <h1 className="page-title">
            {language === 'en' ? 'Gallery' : 'Galería'}
          </h1>

          <div
            className="sphere"
            ref={sphereRef}
            onPointerDown={handlePointerDown}
          >
            <div className="sphere__stage" ref={stageRef}>
              {images.map((image, index) => {
                const p = layout[index];
                const transform =
                  `translate3d(${(p.x * radius).toFixed(1)}px, ${(-p.y * radius).toFixed(1)}px, ${(p.z * radius).toFixed(1)}px) ` +
                  `rotateY(${p.lon.toFixed(1)}deg) rotateX(${p.lat.toFixed(1)}deg)`;
                return (
                  <div
                    key={index}
                    className="sphere__item"
                    style={{ transform }}
                    onClick={() => handleItemClick(image)}
                  >
                    <img
                      src={image.url}
                      alt={image.title}
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="sphere__label">
                      <span>{image.title}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="sphere__quote">
              <p className="sphere__quote-text">
                {language === 'en'
                  ? '"Quality is not an act, it is a habit"'
                  : '"La calidad no es un acto, es un hábito"'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {selectedImage && (
        <div
          className="lightbox-overlay gallery-overlay"
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
                    {language === 'en' ? 'Session:' : 'Sesión:'}
                  </span>{' '}
                  {selectedImage.session}
                </p>
                <p>
                  <span className="lightbox__label">
                    {language === 'en' ? 'Location:' : 'Ubicación:'}
                  </span>{' '}
                  {selectedImage.location}
                </p>
                <p>
                  <span className="lightbox__label">
                    {language === 'en' ? 'Shot Type:' : 'Tipo de Toma:'}
                  </span>{' '}
                  {selectedImage.shotType}
                </p>
                <p>
                  <span className="lightbox__label">
                    {language === 'en' ? 'Photographer:' : 'Fotógrafo:'}
                  </span>{' '}
                  {selectedImage.photographer}
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

export default Gallery;
