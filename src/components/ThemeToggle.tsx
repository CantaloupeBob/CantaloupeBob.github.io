import { useThemeStore } from '../store/themeStore';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();
  const next = theme === 'light' ? 'dark' : 'light';

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${next} mode`}
    >
      {next}
    </button>
  );
}
