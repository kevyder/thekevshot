export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: "static",

  ssr: true,

  env: {
    hostname: process.env.HOSTNAME || 'http://localhost:3000',
    debug: process.env.DEBUG || true,
    gtmId: process.env.GTM_ID
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Kevin Rodríguez - Street Photography | thekevshot",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "Explore the vibrant streets of Colombia through Kevin Rodríguez's lens. Capturing the essence of daily life in Colombia, Kevin's street photography brings the urban landscape to life. Discover the colors, shadows, shapes, and moments that make his photography unique. Browse his gallery and immerse yourself in the heart of this dynamic body of work."
      }
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico"
      },
      {
        rel: 'preconnect',
        href: "https://www.googletagmanager.com/",
        crossorigin: true
      },
      {
        rel: 'preconnect',
        href: "https://www.google-analytics.com/",
        crossorigin: true
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/main.scss',
  ],

  script: [],

  devServerHandlers: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/vue-stack-grid.client.js' },
    { src: '~/plugins/gtm.js' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    "@nuxtjs/google-fonts",
    "@nuxt/image"
  ],

  googleFonts: {
    display: "swap",
    families: {
      "Oswald": [700],
      "Hind": [300]
    }
  },
  
  image: {
    provider: 'netlify',
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "@nuxt/content",
    "bootstrap-vue/nuxt",
    "@nuxtjs/sitemap",
    "@nuxtjs/gtm",
  ],

  content: {
    // Options
    apiPrefix: "content-api",
    dir: "content"
  },

  bootstrapVue: {
    componentPlugins: [
      'LayoutPlugin',
      'ModalPlugin',
      'NavbarPlugin',
      'ButtonPlugin',
      'LinkPlugin',
    ],
  },

  sitemap: {
    hostname: 'https://thekevshot.com/',
    gzip: true,
    exclude: [
      "/admin",
      "/admin/**",
    ]
  },

  router: {},

  render: {
    compressor: true,
    ssr: true,
    asyncScripts: false,
    http2: {
      push: true
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    minimize: true,
    minifyCSS: true,
    minifyJS: true,
    extractCSS: true,
    html: {
      minifyCSS: false,
      minifyJS: false
    },
    splitChunks: {
      pages: true,
      vendor: true,
      commons: true,
      runtime: true,
      layouts: true
    },
    optimization: {
      splitChunks: {
        name: false
      }
    }
  }
};
