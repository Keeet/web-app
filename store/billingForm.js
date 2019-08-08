import { BILLING_TYPES, COUNTRIES } from '../components/constants'
import { isEmail, isNum } from '../utils/stringUtils'

const defaultState = {
  initialBillingConfig: '',
  type: BILLING_TYPES.CREDIT_CARD,
  email: '',
  street: '',
  houseNumber: '',
  zipCode: '',
  city: '',
  country: COUNTRIES.DE,
  vatTaxId: '',
  invalidFields: [],
  bankTransferCheckbox: false,
  creditCardError: null,

  showErrors: false,
  pending: false
}

export const state = () => (defaultState)

export const getters = {
  emailError(state) {
    return isEmail(state.email) ? null : 'invalid email'
  },
  streetError(state) {
    return state.street !== '' ? null : 'required'
  },
  houseNumberError(state) {
    return state.houseNumber !== '' ? null : 'required'
  },
  cityError(state) {
    return state.city !== '' ? null : 'required'
  },
  zipCodeError(state) {
    return isNum(state.zipCode) ? null : 'number required'
  },
  hasChanged(state) {
    if (state.initialBillingConfig) {
      return !!Object.keys(state.initialBillingConfig)
        .find(key => state[key] !== state.initialBillingConfig[key])
    }
    return true
  }
}

export const mutations = {
  init(state, billing) {
    for (const key in defaultState) {
      state[key] = defaultState[key]
    }
    if (billing) {
      state.initialBillingConfig = billing
      for (const key in billing) {
        state[key] = billing[key]
      }
    }
  },
  setEmail(state, email) {
    state.email = email
  },
  setStreet(state, street) {
    state.street = street
  },
  setHouseNumber(state, houseNumber) {
    state.houseNumber = houseNumber
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
  setBankTransferCheckbox(state, bankTransferCheckbox) {
    state.bankTransferCheckbox = bankTransferCheckbox
  },
  setCreditCardError(state, creditCardError) {
    state.creditCardError = creditCardError
  },

  addInvalidField(state, invalidField) {
    const invalidFields = state.invalidFields.slice()
    invalidFields.push(invalidField)
    state.invalidFields = invalidFields
  },
  removeInvalidField(state, id) {
    const invalidFields = state.invalidFields.slice()
    const index = invalidFields.findIndex(field => field.id === id)
    if (index !== undefined) {
      invalidFields.splice(index, 1)
      state.invalidFields = invalidFields
    }
  },
  showErrors(state) {
    state.showErrors = true
  },
  pending(state) {
    state.pending = true
  },
  submitted(state) {
    state.pending = false
  }
}

export const actions = {
  handleValidationError(context, { id, error }) {
    const invalidField = context.state.invalidFields.find(field => field.id === id)

    if (error !== null && !invalidField) {
      context.commit('addInvalidField', {
        id,
        error
      })
    } else if (error === null && invalidField) {
      context.commit('removeInvalidField', id)
    }
  },
  submit({ state, commit }) {
    commit('pending')
    return new Promise((resolve) => {
      this.$push.upsertCompanyBilling(state)
        .then(() => {
          commit('submitted')
          resolve()
        })
    })
  }
}
