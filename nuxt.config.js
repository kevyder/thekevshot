export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: "static",

  ssr: true,

  env: {
    hostname: process.env.HOSTNAME || 'http://localhost:3000',
    debug: process.env.DEBUG || true
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
    { src: '~/plugins/vue-stack-grid.client.js'}
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
    "@nuxtjs/google-gtag",
    "@nuxtjs/sitemap",
  ],

  content: {
    // Options
    apiPrefix: "content-api",
    dir: "content"
  },

  bootstrapVue: {
    // Install the `IconsPlugin` plugin (in addition to `BootstrapVue` plugin)
    icons: false,
    componentPlugins: [
      'LayoutPlugin',
      'ModalPlugin',
      'NavbarPlugin'
    ],
  },

  'google-gtag': {
    id: "G-9JSDM5R8DD",
    debug: process.env.debug
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

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    minimize: true,
    minifyCSS: true,
    minifyJS: true,
    extractCSS: true,
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
