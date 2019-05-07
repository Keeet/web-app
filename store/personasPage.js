export const state = () => ({
  sidebarPersona: null,
  sidebarActive: false
})

export const mutations = {
  setSidebarPersona(state, sidebarPersona) {
    state.sidebarPersona = sidebarPersona
  },
  setSidebarActive(state, sidebarActive) {
    state.sidebarActive = sidebarActive
  }
}
