const defaultState = {
  projectId: null,
  type: null,
  title: '',
  participants: 0,
  submittedMissionId: null,
  invalidFields: [],
  showErrors: false,

  init: false,
  activeStep: 0,
  inProgress: true,
  pending: false
}

export const state = () => (defaultState)

export const mutations = {
  init(state, { project, participants = null }) {
    if (!state.init || !state.inProgress || !project || project.id !== state.projectId) {
      for (const key in defaultState) {
        state[key] = defaultState[key]
      }
      if (project) {
        state.projectId = project.id
      }
      state.participants = participants
      state.init = true
    }
  },
  setType(state, type) {
    state.type = type
  },
  setTitle(state, title) {
    state.title = title
  },
  setParticipants(state, participants) {
    state.participants = participants
  },
  setSubmittedMissionId(state, missionId) {
    state.submittedMissionId = missionId
  },
  addInvalidField(state, invalidField) {
    const invalidFields = state.invalidFields.slice()
    invalidFields.push(invalidField)
    state.invalidFields = invalidFields
  },
  removeInvalidField(state, id) {
    const invalidFields = state.invalidFields.slice()
    const index = invalidFields.findIndex(field => field.id === id)
    if (index !== undefined) {
      invalidFields.splice(index, 1)
      state.invalidFields = invalidFields
    }
  },
  showErrors(state) {
    state.showErrors = true
  },
  hideErrors(state) {
    state.showErrors = false
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
  handleValidationError(context, { id, error }) {
    const invalidField = context.state.invalidFields.find(field => field.id === id)

    if (error !== null && !invalidField) {
      context.commit('addInvalidField', {
        id,
        error
      })
    } else if (error === null && invalidField) {
      context.commit('removeInvalidField', id)
    }
  }
}
