import { LANGUAGES } from '../components/constants'

const defaultState = {
  minAge: null,
  maxAge: null,
  genders: [],
  countries: [],
  languages: [LANGUAGES.EN],

  ageOpened: false,
  gendersOpened: false,
  countriesOpened: false,
  languagesOpened: false,
  pending: false
}

export const state = () => (defaultState)

export const getters = {
  primaryLanguage(state) {
    return state.languages[0]
  },
  secondaryLanguage(state) {
    return state.languages.length === 2
      ? state.languages[1]
      : null
  }
}

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
  setPrimaryLanguage(state, language) {
    const languages = state.languages.slice()
    languages[0] = language
    state.languages = languages
  },
  setSecondaryLanguage(state, language) {
    const languages = state.languages.slice()
    if (language === null && languages.length === 2) {
      languages.splice(1, 1)
      state.languages = languages
      return
    }
    if (languages.length === 1) {
      languages.push(language)
    } else {
      languages[1] = language
    }
    state.languages = languages
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
  switchLanguagesOpened(state) {
    state.languagesOpened = !state.languagesOpened
  },
  pending(state) {
    state.pending = true
  },
  submitted(state) {
    state.pending = false
  }
}
