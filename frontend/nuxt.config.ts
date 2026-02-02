// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true
  },
  modules: ['@nuxtjs/tailwindcss'],
  css: [
    '@mdi/font/css/materialdesignicons.min.css'
  ],
  routeRules: {
    '/': { prerender: true }
  },

  compatibilityDate: '2025-01-15',
})
