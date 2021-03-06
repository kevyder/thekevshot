export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: "static",

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Photographs by Kevin Rodríguez | thekevshot",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "Kevin Rodríguez is an amateur photographer based in Bogotá D.C - Colombia | thekevshot"
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  script: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{ src: "~/plugins/splide.client.js", ssr: false }],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxtjs/google-fonts", "@nuxtjs/google-analytics"],

  googleFonts: {
    families: {
      "Oswald": [700],
      "Fira+Sans": [200, 600]
    }
  },

  googleAnalytics: {
    id: 'UA-78422400-5'
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxt/content", "bootstrap-vue/nuxt"],

  bootstrapVue: {
    componentPlugins: ["LayoutPlugin", "OverlayPlugin"]
  },

  content: {
    // Options
    apiPrefix: "content-api",
    dir: "content"
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
};
