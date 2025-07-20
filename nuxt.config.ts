// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@nuxtjs/google-fonts"],
  css: ["~/assets/css/main.css"],
  googleFonts: {
    families: {
      "Press Start 2P": true,
    },
  },
  // @ts-ignore
  tailwindcss: {
    configPath: "tailwind.config.js",
  },
});
