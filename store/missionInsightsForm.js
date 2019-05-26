const defaultState = {
  missionId: null,
  url: '',
  title: '',
  description: '',

  pending: false
}

export const state = () => (defaultState)

export const mutations = {
  init(state, mission) {
    for (const key in defaultState) {
      state[key] = defaultState[key]
    }
    state.missionId = mission.id
  },
  setUrl(state, url) {
    state.url = url
  },
  setTitle(state, title) {
    state.title = title
  },
  setDescription(state, description) {
    state.description = description
  },

  pending(state) {
    state.pending = true
  },
  submitted(state) {
    state.pending = false
  }
}
