const pkg = require('./package')

module.exports = {
  mode: 'universal',

  env: {
    baseUrl: process.env.BASE_URL || 'https://api.keeet.io'
  },

  server: {
    port: 3000,
    host: '0.0.0.0'
  },

  router: {
    middleware: ['unauthenticated', 'redirect']
  },

  head: {
    title: 'Keeet | User Research Made Easy',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { hid: 'crisp', src: '/js/crisp.js' }
    ]
  },

  loading: false,

  css: [
    '~/assets/style/global.scss'
  ],

  styleResources: {
    scss: [
      'assets/style/vars.scss'
    ]
  },

  plugins: [
    '~/plugins/auth',
    '~/plugins/axios',
    '~/plugins/fetch',
    '~/plugins/push',
    '~/plugins/icons',
    '~/plugins/directives',
    '~/plugins/helpers',
    '~/plugins/i18n',
    { src: '~/plugins/timeago', ssr: false },
    { src: '~/plugins/vueDraggable', ssr: false },
    { src: '~/plugins/vueCarousel', ssr: false },
    { src: '~/plugins/ellipsis.js', ssr: false },
    { src: '~/plugins/missionCreateRecruitCalendar.js', ssr: false },
    { src: '~/plugins/twilioHelper.js', ssr: false },
    { src: '~/plugins/nuxtClientInit.js', ssr: false },
    { src: '~/plugins/uaParser.js', ssr: false },
    { src: '~/plugins/loadScripts.js', ssr: false },
    { src: '~/plugins/mixpanel.js', ssr: false },
    { src: '~/plugins/googleAnalytics.js', ssr: false }
  ],

  modules: [
    '@nuxtjs/axios',
    ['nuxt-rfg-icon', { staticPath: '/_favicons/', masterPicture: 'static/favicon.png' }],
    '@nuxtjs/manifest',
    '@nuxtjs/style-resources',
    '@nuxtjs/sentry',
    ['@netsells/nuxt-hotjar', { id: '1375940', sv: '6' }]
  ],

  sentry: {
    dsn: 'https://af6d2d50fc6941a58a7d83f814e45e26@sentry.io/1505080',
    disabled: process.env.NODE_ENV === 'development'
  },

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
