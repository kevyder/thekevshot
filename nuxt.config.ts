// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: true,
  css: ['~/assets/css/main.css'],

  // Modules
  modules: ['@nuxt/image', 'nuxt-gtag', '@nuxtjs/turnstile'],

  // Modules configuration
  image: {
    provider: 'cloudflare',
    format: ['webp'],
    cloudflare: {
      baseURL: process.env.NUXT_MEDIA_BASE_URL || 'http://localhost:8787',
    }
  },

  gtag: {
    enabled: process.env.NODE_ENV === 'production',
    id: process.env.NUXT_GTAG_ID,
  },
   turnstile: {
    siteKey: process.env.NUXT_PUBLIC_TURNSTILE_SITE_KEY,
  },

  // Nitro server engine configuration
  nitro: {
    // @react-email/render is an optional dynamic import in the Resend SDK.
    // We never use React email templates (we pass raw HTML), so it must be
    // externalised to prevent Rollup from failing on the Cloudflare Pages
    // preset where unresolved externals are not allowed.
    rollupConfig: {
      external: ['@react-email/render'],
    },
    // Enable Node.js API compatibility for Cloudflare Workers/Pages.
    // Required by dependencies like the Resend SDK that use Node built-ins.
    cloudflare: {
      nodeCompat: true,
    },
  },

  runtimeConfig: {
    // Server-only config - override with NUXT_CMS_BASE_URL env var
    cmsBaseUrl: process.env.NUXT_CMS_BASE_URL || 'http://localhost:8787',
    mediaBaseUrl: process.env.NUXT_MEDIA_BASE_URL || 'http://localhost:8787',

    // Contact form / Resend - server-only
    resendApiKey: process.env.NUXT_PUBLIC_RESEND_API_KEY,
    contactToAddress: process.env.NUXT_CONTACT_TO_ADDRESS,
    contactFromAddress: process.env.NUXT_CONTACT_FROM_ADDRESS,

    turnstile: {
      // This can be overridden at runtime via the NUXT_TURNSTILE_SECRET_KEY
      // environment variable.
      secretKey: process.env.NUXT_TURNSTILE_SECRET_KEY,
    },
  },

  app: {
    head: {
      title: 'Kevin Rodríguez - Street Photography | thekevshot',
      htmlAttrs: {
        lang: "en"
      },
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
  },
})