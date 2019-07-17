import { COUNTRIES } from '../components/constants'

const defaultState = {
  id: null,
  type: 'BILL',
  firstName: '',
  lastName: '',
  email: '',
  street: '',
  houseNumber: '',
  zipCode: '',
  city: '',
  country: COUNTRIES.DE,
  vatTaxId: '',

  pending: false
}

export const state = () => (defaultState)

export const mutations = {
  init(state, billing) {
    if (billing) {
      const { id, firstName, lastName, street, houseNumber, city, zipCode, country, vatTaxId } = billing
      state.id = id
      state.firstName = firstName
      state.lastName = lastName
      state.street = street
      state.houseNumber = houseNumber
      state.city = city
      state.zipCode = zipCode
      state.country = country
      state.vatTaxId = vatTaxId

      state.pending = false
    } else {
      for (const key in defaultState) {
        state[key] = defaultState[key]
      }
    }
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
  setVatTaxId(state, vatTaxId) {
    state.vatTaxId = vatTaxId
  },

  pending(state) {
    state.pending = true
  },
  submitted(state) {
    state.pending = false
  }
}
