import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";

// https://vite.dev/config/
export default defineConfig({
  // Enables the SPA fallback: both dev server and `vite preview` will serve
  // index.html for any path that doesn't match a static file, which is
  // required for client-side routing with the HTML5 History API.
  appType: "spa",
  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
});
