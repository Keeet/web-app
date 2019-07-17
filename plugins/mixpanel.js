import Vue from 'vue'
import Mixpanel from 'mixpanel'

const devMock = {
  track: () => {}
}

const protocol = 'https'

Vue.prototype.$mpSurvey = process.env.NODE_ENV === 'production'
  ? Mixpanel.init('9cb45f865cae08d46aaf988c7acc4026', { protocol })
  : devMock
