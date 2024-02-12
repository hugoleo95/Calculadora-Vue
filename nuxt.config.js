export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: "Calculadora especial",
    link: [
      {
        rel: "preconnect",
        href:
          "https://fonts.gstatic.com"
      },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700;800&display=swap"
      },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap"
      },
      {
        rel: "stylesheet",
        href:
          "https://cdn.jsdelivr.net/npm/animate.css@3.5.2/animate.min.css"
      }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],
  router: {
  },

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: ["@nuxtjs/moment", '@nuxtjs/tailwindcss'],


  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    "nuxt-vuex-localstorage",
    "nuxt-fontawesome",
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extractCSS: true,
  },
  server: {
    // port: process.env.PORT, // default: 3000
    port: process.env.PORT || 7500,
    host: "0.0.0.0" // default: localhost
  },
  loading: {
    continuous: true,
    color: "#00cc99",
    height: "5px"
  },
  env: {
    environment: process.env.ENVIRONMENT || '',
    apiUrl: process.env.NUXT_ENV_API_URL || '',
    baseUrl: process.env.WEB_URL || 'http://localhost:7500'
  }
};
