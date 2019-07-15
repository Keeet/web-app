import Vue from 'vue'
import LoadScript from 'vue-plugin-load-script'

Vue.use(LoadScript)

Vue.prototype.$loadHeatmap = Vue.loadScript('/js/heatmap.js')
