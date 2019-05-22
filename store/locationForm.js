const defaultState = {
  id: null,
  name: '',
  street: '',
  houseNb: '',
  addressDescription: '',
  zip: '',
  city: '',
  country: 'DE',

  pending: false
}

export const state = () => (defaultState)

export const mutations = {
  init(state, location) {
    if (location) {
      const { id, name, street, houseNb, city, addressDescription, zip, country } = location
      state.id = id
      state.name = name
      state.street = street
      state.houseNb = houseNb
      state.addressDescription = addressDescription
      state.city = city
      state.zip = zip
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
  setHouseNb(state, houseNb) {
    state.houseNb = houseNb
  },
  setAddressDescription(state, addressDescription) {
    state.addressDescription = addressDescription
  },
  setCity(state, city) {
    state.city = city
  },
  setZip(state, zip) {
    state.zip = zip
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
