const defaultState = {
  id: null,
  title: '',
  description: ''
}

export const state = () => (defaultState)

export const mutations = {
  init(state, project) {
    if (project) {
      const { id, title, description } = project
      state.id = id
      state.title = title
      state.description = description
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
  }
}
