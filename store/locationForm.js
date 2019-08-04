import { COUNTRIES, COUNTRIES_MISSION_RECRUIT } from '../components/constants'

const defaultState = {
  id: null,
  name: '',
  street: '',
  houseNumber: '',
  addressDescription: '',
  zipCode: '',
  city: '',
  country: null,

  pending: false
}

export const state = () => (defaultState)

export const mutations = {
  init(state, { company }) {
    for (const key in defaultState) {
      state[key] = defaultState[key]
    }
    state.country = company.locations && company.locations.length && COUNTRIES_MISSION_RECRUIT.includes(company.locations[0].country)
      ? company.locations[0].country
      : COUNTRIES.DE
  },
  setName(state, name) {
    state.name = name
  },
  setStreet(state, street) {
    state.street = street
  },
  setHouseNumber(state, houseNumber) {
    state.houseNumber = houseNumber
  },
  setAddressDescription(state, addressDescription) {
    state.addressDescription = addressDescription
  },
  setCity(state, city) {
    state.city = city
  },
  setZipCode(state, zipCode) {
    state.zipCode = zipCode
  },
  setCountry(state, country) {
    state.country = country
  },

  pending(state) {
    state.pending = true
  },
  submitted(state) {
    state.pending = false
  }
}

export const actions = {
  submitCompanyLocation({ commit, state }) {
    commit('pending')
    return new Promise((resolve) => {
      this.$push.createCompanyLocation(state).then((newLocation) => {
        commit('submitted')
        resolve(newLocation)
      })
    })
  }
}
