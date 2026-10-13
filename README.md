# Editor Sound & Video — Portfolio

Sitio estático construido con **Astro + islas React**. Replica el template
`TemplateA1.1.1` (React/CRA) conservando las animaciones y gran parte del
contenido, migrado a Astro con CSS propietario (sin framework de estilos).

## Stack

- Astro 7 + `@astrojs/react` (islas React con `client:idle` en páginas y
  `client:load` en el chrome compartido: Header, Sidebar, FloatingButtons)
- React 19
- CSS propio (CSS variables + BEM), sin Tailwind
- `lucide-react@0.507.0` (la 1.x eliminó los iconos de marca YouTube/Instagram)
- Nano Stores + `@nanostores/react` para estado compartido entre islas
  (tema, idioma, sidebar)
- `@astrojs/sitemap` (sitemap generado en el build, junto a `robots.txt`)

## Rutas

| Ruta       | Página            |
| :--------- | :---------------- |
| `/`        | Home              |
| `/about`   | About Us          |
| `/gallery` | Gallery           |
| `/reels`   | Our Reel's        |
| `/talents` | Talents (flip 3D) |
| `/work`    | Selected Work     |

## Comandos

Todos los comandos se ejecutan desde la raíz del proyecto, desde una terminal:

| Comando                       | Acción                                       |
| :---------------------------- | :------------------------------------------- |
| `npm install`                 | Instala dependencias                         |
| `npm run dev`                 | Dev server en `localhost:4321`               |
| `npm run dev -- --background` | Dev server en segundo plano                  |
| `npm run build`               | Build de producción a `./dist/`              |
| `npm run preview`             | Sirve el build local antes de desplegar      |
| `npm run astro -- dev stop`   | Detiene el dev server en segundo plano       |
| `npm run astro -- dev status` | Estado del dev server en segundo plano       |
| `node scripts/smoke.mjs`      | Smoke test E2E (Playwright) contra dev server |

## Nota sobre la ruta del proyecto

La carpeta del proyecto es `Editor-sound&video`. El `&` rompe los shims
`.cmd` de `node_modules\.bin` (el comando `astro` directo, `npx astro`, etc.
fallan en Windows). Por eso los scripts de `package.json` invocan Astro vía
`node node_modules/astro/bin/astro.mjs` directamente. Usa siempre `npm run *`
en este proyecto, o lanza las CLIs de `node_modules/.bin` vía `node ...`.

## Smoke test

`node scripts/smoke.mjs` recorre las 6 rutas y verifica en Chromium (Playwright):

- Hidratación sin errores de consola (con `client:idle`).
- Sidebar (abrir/seis enlaces/navegar/cerrar).
- Toggle de tema (clase `dark` + persistencia) e idioma EN/ES sin recarga.
- ServiceModal (Home), lightbox (About/Gallery) y legal modal (carga perezosa).
- Scroll-to-top.
- Carrusel de reels (anterior/siguiente) y flip 3D de tarjetas (Talents).

Requiere dev server en `localhost:4321` y el navegador instalado una vez:

```
npm run astro -- dev --background
node node_modules/@playwright/test/cli.js install chromium
node scripts/smoke.mjs
npm run astro -- dev stop
```

## SEO

- `sitemap-index.xml` y `robots.txt` se generan en el build. La URL base se
  toma de `PUBLIC_SITE_URL` (si no está definida, cae en `localhost:4321`).
- Cada página define su propio `title`/`description`, `canonical`, y tags
  OG/Twitter.

## Limitación conocida

El idioma persiste en `localStorage` y se aplica en cliente. Un usuario con
idioma `es` guardado verá un breve parpadeo del contenido en inglés en cada
carga (SSR es `en` por defecto) y React regenera el árbol (aviso de
hidratación en consola). Es el comportamiento heredado del template (i18n en
cliente). Para eliminarlo habría que mover el idioma a routing/URL o a un
placeholder detallado en `astro.config.mjs`. Se deja como mejora futura.

El tema oscuro ya está alineado entre SSR y cliente: el store inicializa con
el valor renderizado en servidor y se sincroniza con la preferencia real en
`useEffect`, por lo que no produce aviso de hidratación.