const defaultState = {
  id: null,
  title: '',
  description: '',

  overlayOpened: false,
  pending: false,
  inProgress: true
}

export const state = () => ({ ...defaultState })

export const mutations = {
  init(state, project) {
    if (project) {
      const { id, title, description } = project
      state.id = id
      state.title = title
      state.description = description || defaultState.description

      state.overlayOpened = defaultState.overlayOpened
      state.pending = defaultState.pending
      state.inProgress = false
    } else if (!state.inProgress) {
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
    state.inProgress = false
  }
}

export const actions = {
  submit({ state, commit }, { redirectToProject = false } = {}) {
    commit('pending')
    this.$push.upsertProject({
      ...state,
      description: state.description !== '' ? state.description : null
    }).then((data) => {
      if (redirectToProject) {
        const { id } = data
        this.$router.push(`/projects/${id}`, () => {
          commit('submitted')
        })
        return
      }
      commit('setOverlayOpened', false)
      commit('submitted')
    })
  }
}
