import { useEffect } from "react";
import { RouterProvider } from "react-router";
import { router } from "./router";
import { useThemeStore } from "./store/themeStore";

export default function App() {
  const theme = useThemeStore((s) => s.theme);

  // Keep the `dark` class on <html> in sync with the store.
  // The inline script in index.html handles the initial paint to prevent flash.
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return <RouterProvider router={router} />;
}
