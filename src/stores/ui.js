import { atom } from 'nanostores';

const getStored = (key, fallback) => {
  if (typeof localStorage === 'undefined') return fallback;
  const saved = localStorage.getItem(key);
  return saved ?? fallback;
};

const getSystemTheme = () => {
  if (typeof window === 'undefined' || !window.matchMedia) return 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

// Resolve the runtime preference (saved theme > system preference).
export const getPreferredTheme = () => getStored('theme', null) ?? getSystemTheme();

// Initial value must match what the server rendered to avoid a hydration
// mismatch; the real preference is applied on mount (see useTheme).
export const themeStore = atom('dark');
export const languageStore = atom(getStored('language', 'en'));
export const sidebarStore = atom(false);

if (typeof document !== 'undefined') {
  const applyTheme = (value) => {
    document.documentElement.classList.toggle('dark', value === 'dark');
  };
  // Apply the resolved preference once. `listen` (unlike `subscribe`) does not
  // fire immediately, so it never overwrites the saved/system theme on load.
  applyTheme(getPreferredTheme());
  themeStore.listen(applyTheme);
}

export function toggleTheme() {
  const next = themeStore.get() === 'dark' ? 'light' : 'dark';
  themeStore.set(next);
  // Persist only on explicit user action, so navigation never changes the theme.
  if (typeof localStorage !== 'undefined') localStorage.setItem('theme', next);
}

export function toggleLanguage() {
  const next = languageStore.get() === 'en' ? 'es' : 'en';
  languageStore.set(next);
  if (typeof localStorage !== 'undefined') localStorage.setItem('language', next);
}

export function openSidebar() {
  sidebarStore.set(true);
}

export function closeSidebar() {
  sidebarStore.set(false);
}

export function toggleSidebar() {
  sidebarStore.set(!sidebarStore.get());
}
