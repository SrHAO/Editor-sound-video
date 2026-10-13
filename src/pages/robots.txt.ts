import type { APIRoute } from 'astro';

const SITE_URL = import.meta.env.PUBLIC_SITE_URL ?? 'http://localhost:4321';

export const GET: APIRoute = () =>
  new Response(
    ['User-agent: *', 'Allow: /', '', `Sitemap: ${SITE_URL}/sitemap-index.xml`, ''].join(
      '\n'
    ),
    {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    }
  );