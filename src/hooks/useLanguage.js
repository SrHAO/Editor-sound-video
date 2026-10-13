import { useStore } from '@nanostores/react';
import { languageStore, toggleLanguage as toggle } from '../stores/ui';
import { translations } from '../i18n/translations';

export function useLanguage() {
  const language = useStore(languageStore);
  const t = (key) => translations[language]?.[key] ?? key;
  return { language, toggleLanguage: toggle, t };
}
