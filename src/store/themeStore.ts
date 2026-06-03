import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Theme } from '../types';

interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark');
}

function getSystemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: getSystemTheme(),
      toggleTheme: () => {
        const next: Theme = get().theme === 'light' ? 'dark' : 'light';
        set({ theme: next });
        applyTheme(next);
      },
    }),
    {
      name: 'portfolio-theme',
      onRehydrateStorage: () => (state) => {
        if (state) applyTheme(state.theme);
      },
    }
  )
);
