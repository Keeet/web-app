const defaultState = {
  id: null,
  name: '',

  pending: false
}

export const state = () => ({ ...defaultState })

export const mutations = {
  init(state, company) {
    if (company) {
      const { id, name } = company
      state.id = id
      state.name = name

      state.pending = false
    } else {
      for (const key in defaultState) {
        state[key] = defaultState[key]
      }
    }
  },
  setName(state, name) {
    state.name = name
  },

  pending(state) {
    state.pending = true
  },
  submitted(state) {
    state.pending = false
  }
}

export const actions = {
  submit({ commit, state }) {
    commit('pending')
    return new Promise((resolve) => {
      this.$push.upsertCompany(state).then(() => {
        commit('submitted')
        resolve()
      })
    })
  }
}
