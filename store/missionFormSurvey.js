import { MISSION_SURVEY_ITEMS } from '../components/constants'

const defaultState = {
  customizeWelcome: false,
  customizeClosing: false,
  welcomeTitle: 'Hey there!',
  welcomeDescription: 'You have been invited to participate in a short test. Ready?',
  welcomeLogoId: null,
  closingTitle: 'Cheers!',
  closingDescription: 'Thank you for taking the time. We really appreciate you commitment. We hope to see you again soon. Have a good one!',
  closingLogoId: null,
  welcomeColorPickerOpened: false,
  closingColorPickerOpened: false,
  color: { hex: '#0FBCF9' },
  redirectLink: null,
  items: []
}

const defaultStateItem = {
  SHORT_TEXT: {
    type: MISSION_SURVEY_ITEMS.SHORT_TEXT,
    required: true,
    text: ''
  },
  LONG_TEXT: {
    type: MISSION_SURVEY_ITEMS.LONG_TEXT,
    required: true,
    text: ''
  }
}

export const state = () => defaultState

export const mutations = {
  init(state) {
    for (const key in defaultState) {
      state[key] = defaultState[key]
    }
  },
  switchCustomizeWelcome(state) {
    state.customizeWelcome = !state.customizeWelcome
  },
  switchCustomizeClosing(state) {
    state.customizeClosing = !state.customizeClosing
  },
  setColor(state, color) {
    state.color = color
  },
  setWelcomeTitle(state, title) {
    state.welcomeTitle = title
  },
  setWelcomeDescription(state, description) {
    state.welcomeDescription = description
  },
  setWelcomeLogoId(state, id) {
    state.welcomeLogoId = id
  },
  openWelcomeColorPicker(state) {
    state.welcomeColorPickerOpened = true
  },
  closeWelcomeColorPicker(state) {
    state.welcomeColorPickerOpened = false
  },
  setClosingTitle(state, title) {
    state.closingTitle = title
  },
  setClosingDescription(state, description) {
    state.closingDescription = description
  },
  setClosingLogoId(state, id) {
    state.closingLogoId = id
  },
  openClosingColorPicker(state) {
    state.closingColorPickerOpened = true
  },
  closeClosingColorPicker(state) {
    state.closingColorPickerOpened = false
  },
  setRedirectLink(state, redirectLink) {
    if (redirectLink === '') {
      state.redirectLink = null
      return
    }
    state.redirectLink = redirectLink
  },

  addItem(state, type) {
    const items = state.items.slice()
    items.push({ ...defaultStateItem[type] })
    state.items = items
  },
  deleteItem(state, index) {
    const items = state.items.slice()
    items.splice(index, 1)
    state.items = items
  },
  setItemQuestion(state, { index, question }) {
    const items = state.items.slice()
    items[index].text = question
    state.items = items
  },
  setItemQuestionRequired(state, { index, required }) {
    const items = state.items.slice()
    items[index].required = required
    state.items = items
  }
}
