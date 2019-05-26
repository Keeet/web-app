import { MISSION_PAGES } from '../components/constants'

export const state = () => ({
  activePage: null,
  disableSidebarAnimation: false
})

export const mutations = {
  showOverview(state) {
    state.activePage = MISSION_PAGES.OVERVIEW
  },
  showInsights(state) {
    state.activePage = MISSION_PAGES.INSIGHTS
  },
  disableSidebarAnimation(state, value) {
    state.disableSidebarAnimation = value
  }
}
