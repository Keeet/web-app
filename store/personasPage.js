export const state = () => ({
  sidebarPersona: null,
  sidebarActive: false,
  deletePopup: false,
  deletePending: false
})

export const mutations = {
  setSidebarPersona(state, sidebarPersona) {
    state.sidebarPersona = sidebarPersona
  },
  setSidebarActive(state, sidebarActive) {
    state.sidebarActive = sidebarActive
  },
  showDeletePopup(state) {
    state.deletePopup = true
  },
  hideDeletePopup(state) {
    state.deletePopup = false
  },
  setDeletePending(state, pending) {
    state.deletePending = pending
  }
}
