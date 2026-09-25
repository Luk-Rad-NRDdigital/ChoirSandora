import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";

export default defineConfig({
  // Relative URLs work on both custom domains and GitHub project sites.
  base: "./",
  build: {
    rollupOptions: {
      input: {
        home: fileURLToPath(new URL("./index.html", import.meta.url)),
        about: fileURLToPath(new URL("./apie-mus.html", import.meta.url)),
        gallery: fileURLToPath(new URL("./galerija.html", import.meta.url)),
        contact: fileURLToPath(new URL("./kontaktai.html", import.meta.url)),
      },
    },
  },
});
