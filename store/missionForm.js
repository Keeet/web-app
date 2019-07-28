import { isNum } from '../utils/stringUtils'

const MAX_PARTICIPANTS = 250

const defaultState = {
  id: null,
  projectId: null,
  projectFirstMission: false,
  type: null,
  title: '',
  titlePlaceholder: '',
  participants: 0,
  participantsInit: 0,
  submittedMissionId: null,
  invalidFields: [],
  showErrors: false,
  editExisting: false,

  activeStep: 0,
  confirmInProgressOpened: false,
  pending: false
}

export const state = () => (defaultState)

export const getters = {
  // TODO: move all validation into getters
  participantsError({ participants }) {
    if (isNum(participants)) {
      if (participants === 0) {
        return 'cannot be null'
      }
      if (participants > MAX_PARTICIPANTS) {
        return `max ${MAX_PARTICIPANTS}`
      }
      return null
    }
    return 'must be a number'
  }
}

export const mutations = {
  init(state, { project, participants = null }) {
    for (const key in defaultState) {
      state[key] = defaultState[key]
    }
    if (project) {
      const HAS_MISSIONS = project.missions && project.missions.length > 0
      state.projectId = project.id
      state.projectFirstMission = !HAS_MISSIONS
    }
    state.participants = participants
    state.participantsInit = participants
  },
  initExisting(state, { mission }) {
    for (const key in defaultState) {
      state[key] = defaultState[key]
    }
    const {
      id,
      projectId,
      type,
      title
    } = mission

    state.id = id
    state.projectId = projectId
    state.type = type
    state.title = title
    state.editExisting = true
  },
  resetForm(state) {
    state.type = null
    state.title = defaultState.title
    state.participants = state.participantsInit
  },
  setType(state, type) {
    state.type = type
  },
  setTitle(state, title) {
    state.title = title
  },
  setTitlePlaceholder(state, titlePlaceholder) {
    state.titlePlaceholder = titlePlaceholder
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

  setActiveStep(state, activeStep) {
    state.activeStep = activeStep
  },
  nextStep(state) {
    state.activeStep++
  },
  previousStep(state) {
    state.activeStep--
  },
  showConfirmInProgress(state) {
    state.confirmInProgressOpened = true
  },
  hideConfirmInProgress(state) {
    state.confirmInProgressOpened = false
  },
  pending(state) {
    state.pending = true
  },
  submitted(state) {
    state.pending = false
  }
}

export const actions = {
  initProjectMission({ state, commit }, { project }) {
    const IS_FIRST_STEP = state.activeStep === 0
    const IS_SAME_PROJECT = state.projectId === project.id
    if (!IS_FIRST_STEP && IS_SAME_PROJECT) {
      return
    }
    commit('init', { project, participants: 5 })
  },
  initSurveyOrder({ commit }, { project }) {
    commit('init', { project, participants: 50 })
  },
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
