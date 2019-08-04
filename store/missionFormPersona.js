import { LANGUAGES, COUNTRIES } from '../components/constants'

const defaultState = {
  /**
   * REMINDER:
   * If you want to add/modify/delete any criteria, remember to
   * adjust the pricingChecksum (getter in missionFormRecruit
   * and missionFormSurvey). Otherwise the pricing table inside
   * MissionOrderSummary won't refresh correctly!
    */
  minAge: null,
  maxAge: null,
  genders: [],
  countries: [COUNTRIES.DE],
  languages: [LANGUAGES.EN],
  deviceSkills: [],
  specialCriteria: [],
  newSpecialCriteria: '',

  ageOpened: false,
  gendersOpened: false,
  countriesOpened: false,
  languagesOpened: false,
  deviceSkillsOpened: false,
  specialCriteriaOpened: false
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
  setGender(state, gender) {
    if (gender === null) {
      state.genders = defaultState.genders
      return
    }
    state.genders = [gender]
  },
  setGenders(state, genders) {
    state.genders = genders
  },
  setCountry(state, country) {
    state.countries = [country]
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
  setDeviceSkills(state, deviceSkills) {
    state.deviceSkills = deviceSkills
  },
  addSpecialCriteria(state, value) {
    const sc = state.specialCriteria.slice()
    sc.push({ value })
    state.specialCriteria = sc
  },
  setSpecialCriteria(state, { value, index }) {
    const sc = state.specialCriteria.slice()
    sc[index].value = value
    state.specialCriteria = sc
  },
  deleteSpecialCriteria(state, index) {
    const sc = state.specialCriteria.slice()
    sc.splice(index, 1)
    state.specialCriteria = sc
  },
  setNewSpecialCriteria(state, value) {
    if (!value) {
      state.newSpecialCriteria = defaultState.newSpecialCriteria
      return
    }
    state.newSpecialCriteria = value
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
    if (state.countriesOpened) {
      state.countries = defaultState.countries
    }
    state.countriesOpened = !state.countriesOpened
  },
  switchDeviceSkillsOpened(state) {
    if (state.deviceSkillsOpened) {
      state.deviceSkills = defaultState.deviceSkills
    }
    state.deviceSkillsOpened = !state.deviceSkillsOpened
  },
  switchSpecialCriteriaOpened(state) {
    if (state.specialCriteriaOpened) {
      state.specialCriteria = defaultState.specialCriteria
    }
    state.specialCriteriaOpened = !state.specialCriteriaOpened
  }
}
