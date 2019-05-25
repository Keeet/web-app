const defaultState = {
  id: null,
  name: '',
  street: '',
  houseNumber: '',
  addressDescription: '',
  zipCode: '',
  city: '',
  country: 'DE',

  pending: false
}

export const state = () => (defaultState)

export const mutations = {
  init(state, location) {
    if (location) {
      const { id, name, street, houseNumber, city, addressDescription, zipCode, country } = location
      state.id = id
      state.name = name
      state.street = street
      state.houseNumber = houseNumber
      state.addressDescription = addressDescription
      state.city = city
      state.zipCode = zipCode
      state.country = country

      state.pending = false
    } else {
      for (const key in defaultState) {
        state[key] = defaultState[key]
      }
    }
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
