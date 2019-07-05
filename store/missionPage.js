import { MISSION_RECRUIT_PAGES, MISSION_SURVEY_PAGES } from '../components/constants'

const { OVERVIEW, INSIGHTS } = MISSION_RECRUIT_PAGES
const { RESULTS, SHARE } = MISSION_SURVEY_PAGES

export const state = () => ({
  activePage: null,
  disableAnimation: false,
  insightFormOpened: false
})

export const mutations = {
  showRecruitOverview(state) {
    state.activePage = OVERVIEW
  },
  showRecruitInsights(state) {
    state.activePage = INSIGHTS
  },
  showSurveyResults(state) {
    state.activePage = RESULTS
  },
  showSurveyShare(state) {
    state.activePage = SHARE
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
