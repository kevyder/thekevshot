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
    quality: 80,
    cloudflare: {
      baseURL: process.env.NUXT_CLOUDFLARE_IMAGE_BASE_URL || '',
    }
  },

  gtag: {
    enabled: process.env.NODE_ENV === 'production',
    id: process.env.NUXT_PUBLIC_GTAG_ID,
  },
   turnstile: {
    siteKey: process.env.NUXT_PUBLIC_TURNSTILE_SITE_KEY,
  },

  // Nitro server engine configuration
  nitro: {
    // Use Cloudflare Workers preset for deployment
    preset: 'cloudflare_module',
    // @react-email/render is an optional dynamic import in the Resend SDK.
    // We never use React email templates (we pass raw HTML), so it must be
    // externalised to prevent Rollup from failing on the Cloudflare Workers
    // preset where unresolved externals are not allowed.
    rollupConfig: {
      external: ['@react-email/render'],
    },
    // Enable Node.js API compatibility for Cloudflare Workers.
    // Required by dependencies like the Resend SDK that use Node built-ins.
    cloudflare: {
      deployConfig: true,
      nodeCompat: true,
    },
  },

  runtimeConfig: {
    // Server-only config — auto-mapped from NUXT_CMS_BASE_URL, NUXT_MEDIA_BASE_URL
    cmsBaseUrl: 'http://localhost:8787',
    mediaBaseUrl: 'http://localhost:8787',

    // Contact form / Resend - server-only
    // Auto-mapped from NUXT_RESEND_API_KEY, NUXT_CONTACT_TO_ADDRESS, NUXT_CONTACT_FROM_ADDRESS
    resendApiKey: '',
    contactToAddress: '',
    contactFromAddress: '',

    turnstile: {
      // Auto-mapped from NUXT_TURNSTILE_SECRET_KEY
      secretKey: '',
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