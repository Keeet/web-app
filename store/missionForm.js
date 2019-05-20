const defaultState = {
  type: 'IN_HOUSE',
  title: '',
  persona: null,
  nbParticipants: 5,
  duration: 60,
  language: 'EN',

  activeStep: 1,
  inProgress: true,
  pending: false,

  tempPersonas: []
}

export const state = () => (defaultState)

export const mutations = {
  init(state) {
    if (!state.inProgress) {
      for (const key in defaultState) {
        state[key] = defaultState[key]
      }
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
