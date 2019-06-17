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
  itemAddIndex: 0,
  items: [],
  showErrors: false
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
  },
  SINGLE_SELECT: {
    type: MISSION_SURVEY_ITEMS.SINGLE_SELECT,
    required: true,
    text: '',
    choices: ['', ''],
    otherAvailable: false
  },
  MULTI_SELECT: {
    type: MISSION_SURVEY_ITEMS.MULTI_SELECT,
    required: true,
    text: '',
    choices: ['', ''],
    otherAvailable: false
  },
  LINEAR_SCALE: {
    type: MISSION_SURVEY_ITEMS.LINEAR_SCALE,
    required: true,
    text: '',
    startValue: 0,
    startLabel: '',
    endValue: 10,
    endLabel: ''
  },
  LIKERT: {
    type: MISSION_SURVEY_ITEMS.LIKERT,
    required: true,
    text: '',
    answerType: 'AGREEMENT'
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

  setItemAddIndex(state, index) {
    state.itemAddIndex = index
  },
  addItem(state, type) {
    const items = state.items.slice()
    items.splice(state.itemAddIndex, 0, { ...defaultStateItem[type] })
    state.items = items
    state.itemAddIndex = state.items.length
  },
  setItems(state, items) {
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
  },
  setItemSelectChoices(state, { itemIndex, choices }) {
    const items = state.items.slice()
    items[itemIndex].choices = choices
    state.items = items
  },
  setItemSelectChoice(state, { itemIndex, choiceIndex, choice }) {
    const items = state.items.slice()
    items[itemIndex].choices[choiceIndex] = choice
    state.items = items
  },
  addEmptyItemSelectChoice(state, itemIndex) {
    const items = state.items.slice()
    const choices = items[itemIndex].choices
    choices.push('')
    state.items = items
  },
  deleteItemSelectChoice(state, { itemIndex, choiceIndex }) {
    const items = state.items.slice()
    items[itemIndex].choices.splice(choiceIndex, 1)
    state.items = items
  },
  switchItemSelectOtherAvailable(state, itemIndex) {
    const items = state.items.slice()
    items[itemIndex].otherAvailable = !items[itemIndex].otherAvailable
    state.items = items
  },
  setItemLinearScaleStartValue(state, { value, itemIndex }) {
    const items = state.items.slice()
    items[itemIndex].startValue = value
    state.items = items
  },
  setItemLinearScaleStartLabel(state, { label, itemIndex }) {
    const items = state.items.slice()
    items[itemIndex].startLabel = label
    state.items = items
  },
  setItemLinearScaleEndValue(state, { value, itemIndex }) {
    const items = state.items.slice()
    items[itemIndex].endValue = value
    state.items = items
  },
  setItemLinearScaleEndLabel(state, { label, itemIndex }) {
    const items = state.items.slice()
    items[itemIndex].endLabel = label
    state.items = items
  },
  setItemLikertAnswerType(state, { answerType, itemIndex }) {
    const items = state.items.slice()
    items[itemIndex].answerType = answerType
    state.items = items
  },
  showErrors(state) {
    state.showErrors = true
  }
}
