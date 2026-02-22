// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: false,

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    // Server-only config - override with NUXT_CMS_BASE_URL env var
    cmsBaseUrl: process.env.NUXT_CMS_BASE_URL || 'http://localhost:8787',
    mediaBaseUrl: process.env.NUXT_MEDIA_BASE_URL || 'http://localhost:8787',
  },

  app: {
    head: {
      title: 'thekevshot | Street Photography by Kevin Rodriguez',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Street photography portfolio by Kevin Rodriguez'
        }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: ''
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Hind:wght@400&family=Oswald:wght@800&display=swap'
        }
      ]
    }
  }
})
