const defaultState = {
  name: '',
  icon: null
}

export const state = () => (defaultState)

export const mutations = {
  init(state, persona) {
    if (persona) {
      const { name, icon } = persona
      state.name = name
      state.icon = icon
    } else {
      state = defaultState
    }
  },
  setName(state, name) {
    state.name = name
  },
  setIcon(state, icon) {
    state.icon = icon
  }
}
