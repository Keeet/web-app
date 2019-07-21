import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { LANGUAGES } from '../components/constants'

Vue.use(VueI18n)

export default ({ app, store }) => {
  const messages = {}
  for (const lang in LANGUAGES) {
    messages[lang] = require(`~/locales/${lang.toLowerCase()}.json`)
  }

  app.i18n = new VueI18n({
    locale: store.state.locale,
    messages
  })
}
