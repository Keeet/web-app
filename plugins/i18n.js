import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { LANGUAGES_PLATFORM } from '../components/constants'

Vue.use(VueI18n)

export default ({ app, store }) => {
  const messages = {}
  LANGUAGES_PLATFORM.forEach((lang) => {
    messages[lang] = require(`~/locales/${lang.toLowerCase()}.json`)
  })

  app.i18n = new VueI18n({
    locale: store.state.locale,
    messages
  })
}
