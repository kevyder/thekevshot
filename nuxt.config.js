export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: "static",

  ssr: true,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Kevin Rodríguez - Street Photographer | thekevshot",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "Kevin Rodríguez is a street photographer based in Bogotá D.C - Colombia | thekevshot"
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
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
  buildModules: ["@nuxtjs/google-fonts", "@nuxt/image"],

  googleFonts: {
    display: "swap",
    families: {
      "Oswald": [700],
      "Fira+Sans": [200, 600]
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
    "@nuxtjs/sitemap"
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
    debug: false
  },

  sitemap: {
    hostname: process.env.HOSTNAME,
    gzip: true,
    exclude: [
      "/admin",
      "/admin/**"
    ]
  },

  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'black-and-white',
        path: '/black-and-white',
        component: resolve(__dirname, 'pages/bw.vue')
      })
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    minimize: true,
    minifyCSS: true,
    minifyJS: true
  }
};
