const defaultState = {
  email: '',
  role: null,

  roleDropdownOpened: false,
  pending: false
}

export const state = () => (defaultState)

export const mutations = {
  init(state, role) {
    for (const key in defaultState) {
      state[key] = defaultState[key]
    }
    state.role = role
  },
  setEmail(state, email) {
    state.email = email
  },
  setRole(state, role) {
    state.role = role
  },

  switchRoleDropdown(state) {
    state.roleDropdownOpened = !state.roleDropdownOpened
  },
  pending(state) {
    state.pending = true
  },
  submitted(state) {
    state.pending = false
  }
}
