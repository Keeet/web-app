const defaultState = {
  name: '',
  street: '',
  houseNb: '',
  addressDescription: '',
  zip: '',
  country: 'DE'
}

export const state = () => (defaultState)

export const mutations = {
  init(state, company) {
    if (company) {
      const { name, street, houseNb, addressDescription, zip, country } = company
      state.name = name
      state.street = street
      state.houseNb = houseNb
      state.addressDescription = addressDescription
      state.zip = zip
      state.country = country
    } else {
      state = defaultState
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
  setZip(state, zip) {
    state.zip = zip
  },
  setCountry(state, country) {
    state.country = country
  }
}
