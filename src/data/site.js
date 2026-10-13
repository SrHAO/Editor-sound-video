export const SITE_URL =
  import.meta.env.PUBLIC_SITE_URL ?? 'http://localhost:4321';

export const COMPANY = {
  name: 'Ing. Navarrete Sánchez Alan Yoab',
  portfolioUrl: 'https://profile-hao.vercel.app/',
};

export const EMAIL = {
  address: (language) =>
    language === 'es' ? 'contacto@example.com' : 'contact@example.com',
};