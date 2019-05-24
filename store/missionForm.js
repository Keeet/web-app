const defaultState = {
  type: 'IN_HOUSE',
  title: '',
  persona: null,
  nbParticipants: 5,
  duration: 60,
  language: 'EN',
  location: null,
  locationId: 'COMPANY',
  locationFormOpened: false,
  sessions: [],
  activeCalendarDay: null,
  sessionErrorPopup: false,

  activeStep: 0,
  inProgress: true,
  pending: false,

  tempPersonas: []
}

export const state = () => (defaultState)

export const mutations = {
  init(state, company) {
    if (!state.inProgress) {
      for (const key in defaultState) {
        state[key] = defaultState[key]
      }
      const { name, street, houseNb, addressDescription, zip, city, country } = company
      state.location = { name, street, houseNb, addressDescription, zip, city, country }
    }
  },
  setType(state, type) {
    state.type = type
  },
  setTitle(state, title) {
    state.title = title
  },
  setPersona(state, persona) {
    state.persona = persona
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
    state.locationId = location.id ? location.id : defaultState.locationId
    state.location = location
  },
  openLocationForm(state) {
    state.locationFormOpened = true
  },
  closeLocationForm(state) {
    state.locationFormOpened = false
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
