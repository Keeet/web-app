const defaultState = {
  projectId: null,
  type: null,
  title: '',
  language: 'DE',
  submittedMissionId: null,

  init: false,
  activeStep: 0,
  inProgress: true,
  pending: false
}

export const state = () => (defaultState)

export const mutations = {
  init(state, { project }) {
    for (const key in defaultState) {
      state[key] = defaultState[key]
    }
    state.projectId = project.id
    state.init = true
  },
  setType(state, type) {
    state.type = type
  },
  setTitle(state, title) {
    state.title = title
  },
  setLanguage(state, language) {
    state.language = language
  },
  setSubmittedMissionId(state, missionId) {
    state.submittedMissionId = missionId
  },

  nextStep(state) {
    state.activeStep++
  },
  previousStep(state) {
    state.activeStep--
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
  init({ commit, state }, { project }) {
    if (!state.init || !state.inProgress || project.id !== state.projectId) {
      commit('init', { project })
      return true
    }
    return false
  }
}
