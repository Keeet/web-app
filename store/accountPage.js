import { ACCOUNT_PAGES } from '../components/constants'

export const state = () => ({
  activePage: null
})

export const mutations = {
  showProfile(state) {
    state.activePage = ACCOUNT_PAGES.PROFILE
  },
  showTeam(state) {
    state.activePage = ACCOUNT_PAGES.TEAM
  }
}
