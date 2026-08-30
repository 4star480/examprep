import { useState, useEffect } from 'react';
import { getFromStorage, saveToStorage } from '@/utils/storage';

type Theme = 'dark' | 'light';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    return getFromStorage<Theme>('tradewise_theme') || 'dark';
  });

  useEffect(() => {
    saveToStorage('tradewise_theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
    if (theme === 'dark') {
      document.body.className = 'bg-slate-950 text-slate-100 antialiased';
    } else {
      document.body.className = 'bg-gray-50 text-gray-900 antialiased';
    }
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  return { theme, toggleTheme };
}
