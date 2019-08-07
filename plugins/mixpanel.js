import Vue from 'vue'

const devMock = {
  track: () => {}
}

const mpSurvey = require('mixpanel-browser')
mpSurvey.init('9cb45f865cae08d46aaf988c7acc4026')
Vue.prototype.$mpSurvey = process.env.NODE_ENV === 'production'
  ? mpSurvey
  : devMock
