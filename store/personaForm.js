const defaultState = {
  id: null,
  name: '',
  icon: null,
  minAge: null,
  maxAge: null,
  genders: [],
  occupations: [],
  screenerQuestions: [],

  init: false,
  ageOpened: false,
  gendersOpened: false,
  occupationsOpened: false,
  newScreenerQuestion: '',
  missionEntrypoint: false,
  showSaveTemp: false,
  activeStep: 0,
  inProgress: true,
  pending: false
}

export const state = () => (defaultState)

export const mutations = {
  init(state, persona) {
    if (persona) {
      const {
        id,
        name,
        icon,
        demographicDataReq: { minAge, maxAge, genders, occupations },
        screenerQuestions
      } = persona
      state.id = id
      state.name = name
      state.icon = icon
      state.minAge = minAge || defaultState.minAge
      state.maxAge = maxAge || defaultState.minAge
      state.genders = genders
      state.occupations = occupations
      state.screenerQuestions = screenerQuestions

      if (state.minAge && state.maxAge) {
        state.ageOpened = true
      }
      if (state.genders.length) {
        state.gendersOpened = true
      }
      if (state.occupations.length) {
        state.occupationsOpened = true
      }
      state.activeStep = defaultState.activeStep
      state.pending = defaultState.pending
      state.inProgress = false
    } else if (!state.inProgress) {
      for (const key in defaultState) {
        state[key] = defaultState[key]
      }
    }
    state.missionEntrypoint = false
    state.init = true
  },
  setName(state, name) {
    state.name = name
  },
  setIcon(state, icon) {
    state.icon = icon
  },
  setAgeRange(state, ageRange) {
    state.minAge = ageRange[0]
    state.maxAge = ageRange[1]
  },
  setGenders(state, genders) {
    if (!genders) {
      state.genders = defaultState.genders
      return
    }
    state.genders = genders
  },
  setOccupations(state, occupations) {
    if (!occupations) {
      state.occupations = defaultState.occupations
      return
    }
    state.occupations = occupations
  },
  addScreenerQuestion(state, value) {
    const sq = state.screenerQuestions.slice()
    sq.push({ value })
    state.screenerQuestions = sq
  },
  setScreenerQuestion(state, { value, index }) {
    const sq = state.screenerQuestions.slice()
    sq[index].value = value
    state.screenerQuestions = sq
  },
  deleteScreenerQuestion(state, index) {
    const sq = state.screenerQuestions.slice()
    sq.splice(index, 1)
    state.screenerQuestions = sq
  },

  setAgeOpened(state, ageOpened) {
    state.ageOpened = ageOpened
  },
  setGendersOpened(state, gendersOpened) {
    state.gendersOpened = gendersOpened
  },
  setOccupationsOpened(state, occupationsOpened) {
    state.occupationsOpened = occupationsOpened
  },
  setNewScreenerQuestion(state, value) {
    if (!value) {
      state.newScreenerQuestion = defaultState.newScreenerQuestion
      return
    }
    state.newScreenerQuestion = value
  },
  setMissionEntrypoint(state) {
    state.missionEntrypoint = true
  },
  setShowSaveTemp(state, value) {
    state.showSaveTemp = value
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
