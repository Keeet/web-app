import Vue from 'vue'
import VueAnalytics from 'vue-analytics'

Vue.use(VueAnalytics, {
  id: 'UA-130305216-5',
  disabled: process.env.NODE_ENV === 'development',
  set: [
    { field: 'anonymizeIp', value: true }
  ]
})
