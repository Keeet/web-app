const defaultState = {
  name: '',
  icon: null,
  minAge: null,
  maxAge: null,
  genders: [],
  occupations: [],

  ageOpened: false,
  gendersOpened: false,
  occupationsOpened: false
}

export const state = () => (defaultState)

export const mutations = {
  init(state, persona) {
    if (persona) {
      const { name, icon } = persona
      state.name = name
      state.icon = icon
    } else {
      state = defaultState
    }
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
    }
    state.genders = genders
  },
  setOccupations(state, occupations) {
    if (!occupations) {
      state.occupations = defaultState.occupations
    }
    state.occupations = occupations
  },
  setAgeOpened(state, ageOpened) {
    state.ageOpened = ageOpened
  },
  setGendersOpened(state, gendersOpened) {
    state.gendersOpened = gendersOpened
  },
  setOccupationsOpened(state, occupationsOpened) {
    state.occupationsOpened = occupationsOpened
  }
}
