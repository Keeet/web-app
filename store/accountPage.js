import { ACCOUNT_PAGES } from '../components/constants'

export const state = () => ({
  activePage: null,
  disableAnimation: false,
  showEditCompany: false,
  roleDropdownOpenedIndex: null
})

export const mutations = {
  showProfile(state) {
    state.activePage = ACCOUNT_PAGES.PROFILE
  },
  showTeam(state) {
    state.activePage = ACCOUNT_PAGES.TEAM
  },
  showBilling(state) {
    state.activePage = ACCOUNT_PAGES.BILLING
  },
  disableAnimation(state, value = true) {
    state.disableAnimation = value
  },
  showEditCompany(state) {
    state.showEditCompany = true
  },
  hideEditCompany(state) {
    state.showEditCompany = false
  },
  openRoleDropdown(state, index) {
    state.roleDropdownOpenedIndex = index
  },
  closeRoleDropdown(state) {
    state.roleDropdownOpenedIndex = null
  }
}
