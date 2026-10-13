import { useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { getPreferredTheme, themeStore, toggleTheme } from '../stores/ui';

export function useTheme() {
  const theme = useStore(themeStore);

  useEffect(() => {
    themeStore.set(getPreferredTheme());
  }, []);

  return { isDark: theme === 'dark', toggleTheme };
}