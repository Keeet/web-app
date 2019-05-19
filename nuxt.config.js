const pkg = require('./package')

module.exports = {
  mode: 'universal',

  server: {
    port: 3000,
    host: '0.0.0.0'
  },

  router: {
    middleware: 'unauthenticated'
  },

  /*
  ** Headers of the page
  */
  head: {
    title: 'Keeet | User Research Made Easy',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    '~/assets/style/global.scss',
    'aos/dist/aos.css'
  ],

  styleResources: {
    scss: [
      'assets/style/vars.scss'
    ]
  },

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/auth',
    '~/plugins/axios',
    '~/plugins/fetch',
    '~/plugins/icons',
    '~/plugins/directives',
    { src: '~/plugins/timeago', ssr: false },
    { src: '~/plugins/aos.js', ssr: false }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    ['nuxt-rfg-icon', { staticPath: '/_favicons/', masterPicture: 'static/favicon.png' }],
    '@nuxtjs/manifest',
    '@nuxtjs/style-resources'
  ],

  axios: {
    baseURL: 'https://api.keeet.io'
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      const svgRule = config.module.rules.find(rule => rule.test.test('.svg'))
      svgRule.test = /\.(png|jpe?g|gif|webp)$/
      config.module.rules.push({
        test: /\.svg$/,
        loader: 'vue-svg-loader'
      })
    }
  }
}
