const defaultState = {
  projectId: null,
  type: null,
  title: '',
  persona: null,
  personaDropdownOpened: false,
  nbParticipants: 5,
  duration: 60,
  language: 'DE',
  location: null,
  locationId: null,
  locationFormOpened: false,
  formValid: false,
  sessions: [],
  activeCalendarDay: null,
  sessionErrorPopup: false,
  submittedPopup: false,
  submittedMissionId: null,

  init: false,
  activeStep: 0,
  inProgress: true,
  pending: false,

  tempPersonas: [],
  personaSidebarActive: false
}

export const state = () => (defaultState)

const COMPANY_LOCATION_ID = 'COMPANY'

export const mutations = {
  init(state, { company, project }) {
    if (!state.inProgress || !state.init || project.id !== state.projectId) {
      for (const key in defaultState) {
        state[key] = defaultState[key]
      }
      const { name, street, houseNumber, addressDescription, zipCode, city, country } = company
      state.location = { name, street, houseNumber, addressDescription, zipCode, city, country }
      state.locationId = COMPANY_LOCATION_ID
      state.projectId = project.id
    }
    state.init = true
  },
  setType(state, type) {
    state.type = type
  },
  setTitle(state, title) {
    state.title = title
  },
  setPersona(state, persona) {
    state.persona = {
      ...persona,
      screenerQuestions: persona.screenerQuestions.map(sq => sq.value)
    }
  },
  switchPersonaDropdown(state) {
    state.personaDropdownOpened = !state.personaDropdownOpened
  },
  setNbParticipants(state, nbParticipants) {
    state.nbParticipants = nbParticipants
  },
  setDuration(state, duration) {
    state.duration = duration
  },
  setLanguage(state, language) {
    state.language = language
  },
  setLocation(state, location) {
    state.locationId = location.id ? location.id : COMPANY_LOCATION_ID
    state.location = location
  },
  openLocationForm(state) {
    state.locationFormOpened = true
  },
  closeLocationForm(state) {
    state.locationFormOpened = false
  },
  setFormValid(state, valid) {
    state.formValid = valid
  },
  addSession(state, session) {
    const sessions = state.sessions.slice()
    sessions.push(session)
    state.sessions = sessions
  },
  changeSession(state, changedSession) {
    const sessions = state.sessions.slice()
    const toChange = sessions.filter(s => s.id === changedSession.id)[0]
    const { start, end } = changedSession
    toChange.start = start
    toChange.end = end
    state.sessions = sessions
  },
  removeSession(state, sessionId) {
    state.sessions = state.sessions.filter(s => s.id !== sessionId)
  },
  resetSessions(state) {
    state.sessions = []
  },
  setActiveCalendarDay(state, date) {
    state.activeCalendarDay = date
  },
  showSessionErrorPopup(state) {
    state.sessionErrorPopup = true
  },
  hideSessionErrorPopup(state) {
    state.sessionErrorPopup = false
  },
  showSubmittedPopup(state) {
    state.submittedPopup = true
  },
  hideSubmittedPopup(state) {
    state.submittedPopup = false
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
  },

  addTempPersona(state, persona) {
    const personas = state.tempPersonas.slice()
    personas.push(persona)
    state.tempPersonas = personas
  }
}
