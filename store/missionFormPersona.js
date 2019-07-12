const defaultState = {
  minAge: null,
  maxAge: null,
  genders: [],
  countries: [],

  ageOpened: false,
  gendersOpened: false,
  countriesOpened: false,
  pending: false
}

export const state = () => (defaultState)

export const mutations = {
  init(state) {
    for (const key in defaultState) {
      state[key] = defaultState[key]
    }
  },
  setAgeRange(state, ageRange) {
    state.minAge = ageRange[0]
    state.maxAge = ageRange[1]
  },
  setGenders(state, genders) {
    state.genders = genders
  },
  setCountries(state, countries) {
    state.countries = countries
  },

  switchAgeOpened(state) {
    if (state.ageOpened) {
      state.minAge = defaultState.minAge
      state.maxAge = defaultState.maxAge
    }
    state.ageOpened = !state.ageOpened
  },
  switchGendersOpened(state) {
    if (state.gendersOpened) {
      state.genders = defaultState.genders
    }
    state.gendersOpened = !state.gendersOpened
  },
  switchCountriesOpened(state) {
    state.countriesOpened = !state.countriesOpened
  },
  pending(state) {
    state.pending = true
  },
  submitted(state) {
    state.pending = false
  }
}
