import { MISSION_RECRUIT_PAGES, MISSION_SURVEY_PAGES } from '../components/constants'

const { OVERVIEW, INSIGHTS } = MISSION_RECRUIT_PAGES
const { RESULTS, SHARE } = MISSION_SURVEY_PAGES

export const state = () => ({
  activePage: null,
  disableAnimation: false,
  insightFormOpened: false,
  deleteConfirmOpened: false,
  surveyOrderBillingAddressOpened: false,
  surveyOrderPending: false,
  surveyReleaseOpened: false
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
  },
  openDeleteConfirm(state) {
    state.deleteConfirmOpened = true
  },
  closeDeleteConfirm(state) {
    state.deleteConfirmOpened = false
  },
  showSurveyOrderBillingAddress(state) {
    state.surveyOrderBillingAddressOpened = true
  },
  hideSurveyOrderBillingAddress(state) {
    state.surveyOrderBillingAddressOpened = false
  },
  surveyOrderPending(state) {
    state.surveyOrderPending = true
  },
  surveyOrderSubmitted(state) {
    state.surveyOrderPending = false
  },
  showSurveyRelease(state) {
    state.surveyReleaseOpened = true
  },
  hideSurveyRelease(state) {
    state.surveyReleaseOpened = false
  }
}
