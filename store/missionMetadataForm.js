const defaultState = {
  id: null,
  title: '',
  description: '',

  overlayOpened: false,
  pending: false
}

export const state = () => (defaultState)

export const mutations = {
  init(state, mission) {
    if (mission) {
      const { id, title, description } = mission
      state.id = id
      state.title = title
      state.description = description || defaultState.description

      state.overlayOpened = defaultState.overlayOpened
      state.pending = defaultState.pending
    } else {
      for (const key in defaultState) {
        state[key] = defaultState[key]
      }
    }
  },
  setTitle(state, title) {
    state.title = title
  },
  setDescription(state, description) {
    state.description = description
  },

  setOverlayOpened(state, overlayOpened) {
    state.overlayOpened = overlayOpened
  },
  pending(state) {
    state.pending = true
  },
  submitted(state) {
    state.pending = false
  }
}

export const actions = {
  submit({ state, commit }) {
    commit('pending')
    this.$push.updateMissionMetadata({
      ...state,
      description: state.description !== '' ? state.description : null
    }).then(() => {
      commit('submitted')
      commit('setOverlayOpened', false)
    })
  }
}
