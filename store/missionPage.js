import { MISSION_PAGES } from '../components/constants'

export const state = () => ({
  activePage: null,
  disableAnimation: false,
  insightFormOpened: false
})

export const mutations = {
  showOverview(state) {
    state.activePage = MISSION_PAGES.OVERVIEW
  },
  showInsights(state) {
    state.activePage = MISSION_PAGES.INSIGHTS
  },
  disableAnimation(state, value) {
    state.disableAnimation = value
  },
  openInsightForm(state) {
    state.insightFormOpened = true
  },
  closeInsightForm(state) {
    state.insightFormOpened = false
  }
}
