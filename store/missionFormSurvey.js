import {
  MISSION_SURVEY_ITEMS,
  MISSION_SURVEY_USABILITY_LAB_ITEMS,
  MISSION_SURVEY_USABILITY_LAB_FOLLOW_UP_REQUIRED,
  MISSION_SURVEY_USABILITY_LAB_ITEM_DEVICE_FRAMES
} from '../components/constants'
import { copy, flatMap, groupBy } from '../utils/objectUtils'

const {
  SHORT_TEXT,
  LONG_TEXT,
  SINGLE_SELECT,
  MULTI_SELECT,
  LINEAR_SCALE,
  LIKERT
} = MISSION_SURVEY_ITEMS

const {
  FIRST_CLICK,
  FIVE_SECOND_TEST,
  DESIGN_QUESTION,
  QUESTION_LIST,
  PREFERENCE_TEST,
  INSTRUCTION
} = MISSION_SURVEY_USABILITY_LAB_ITEMS

const { NO_FRAME } = MISSION_SURVEY_USABILITY_LAB_ITEM_DEVICE_FRAMES

const defaultWelcomeScreen = {
  welcomeTitle: 'Hey there!',
  welcomeDescription: 'You have been invited to participate in a short test. Ready?',
  welcomeLogoId: null
}
const defaultClosingScreen = {
  closingTitle: 'Cheers!',
  closingDescription: 'Thank you for taking the time. We really appreciate you commitment. We hope to see you again soon. Have a good one!',
  closingLogoId: null
}

const defaultState = {
  customizeWelcome: false,
  customizeClosing: false,
  ...defaultWelcomeScreen,
  ...defaultClosingScreen,
  welcomeColorPickerOpened: false,
  closingColorPickerOpened: false,
  color: { hex: '#0FBCF9' },
  redirectLink: null,
  itemAddIndex: 0,
  items: [],
  pricing: null
}

const defaultStateItem = {
  SHORT_TEXT: {
    type: SHORT_TEXT,
    required: true,
    text: ''
  },
  LONG_TEXT: {
    type: LONG_TEXT,
    required: true,
    text: ''
  },
  SINGLE_SELECT: {
    type: SINGLE_SELECT,
    required: true,
    text: '',
    choices: ['', ''],
    otherAvailable: false
  },
  MULTI_SELECT: {
    type: MULTI_SELECT,
    required: true,
    text: '',
    choices: ['', ''],
    otherAvailable: false
  },
  LINEAR_SCALE: {
    type: LINEAR_SCALE,
    required: true,
    text: '',
    startValue: 0,
    startLabel: '',
    endValue: 10,
    endLabel: ''
  },
  LIKERT: {
    type: LIKERT,
    required: true,
    text: '',
    answerType: 'AGREEMENT'
  },
  FIRST_CLICK: {
    type: FIRST_CLICK,
    instruction: '',
    imageMediaId: null,
    deviceFrame: NO_FRAME,
    followUps: []
  },
  FIVE_SECOND_TEST: {
    type: FIVE_SECOND_TEST,
    duration: 5,
    imageMediaId: null,
    deviceFrame: NO_FRAME,
    followUps: []
  },
  QUESTION_LIST: {
    type: QUESTION_LIST,
    followUps: []
  },
  DESIGN_QUESTION: {
    type: DESIGN_QUESTION,
    imageMediaId: null,
    deviceFrame: NO_FRAME,
    followUps: []
  },
  PREFERENCE_TEST: {
    type: PREFERENCE_TEST,
    instruction: '',
    imageMediaIds: [],
    followUps: []
  },
  INSTRUCTION: {
    type: INSTRUCTION,
    text: ''
  }
}

export const state = () => defaultState

export const getters = {
  itemsCountByType(state) {
    const groupedByType = groupBy(getFlatMappedItems(state.items), 'type')
    const countByType = {}
    Object.keys(groupedByType).forEach((type) => {
      countByType[type] = groupedByType[type].length
    })
    return countByType
  },
  pricingChecksum: (state, getters) => ({ missionForm }) => {
    const { participants } = missionForm
    return JSON.stringify({
      participants,
      items: getters.itemsCountByType
    })
  }
}

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
  resetColor(state) {
    state.color = defaultState.color
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
  resetWelcomeScreen(state) {
    const { welcomeTitle, welcomeDescription, welcomeLogoId } = defaultWelcomeScreen
    state.welcomeTitle = welcomeTitle
    state.welcomeDescription = welcomeDescription
    state.welcomeLogoId = welcomeLogoId
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
  resetClosingScreen(state) {
    const { closingTitle, closingDescription, closingLogoId } = defaultClosingScreen
    state.closingTitle = closingTitle
    state.closingDescription = closingDescription
    state.closingLogoId = closingLogoId
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
    items.splice(state.itemAddIndex, 0, getDefaultItem(type))
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
  addItemFollowUp(state, { type, itemIndex }) {
    const items = state.items.slice()
    items[itemIndex].followUps.push(getDefaultItem(type || SHORT_TEXT))
    state.items = items
  },
  setItemFollowUps(state, { itemIndex, followUps }) {
    const items = state.items.slice()
    items[itemIndex].followUps = followUps
    state.items = items
  },
  changeItemFollowUp(state, { type, itemIndex, followUpIndex }) {
    const items = state.items.slice()
    const followUps = items[itemIndex].followUps
    followUps[followUpIndex] = {
      ...getDefaultItem(type),
      text: followUps[followUpIndex].text
    }
    state.items = items
  },
  deleteItemFollowUp(state, { itemIndex, followUpIndex }) {
    const items = state.items.slice()
    items[itemIndex].followUps.splice(followUpIndex, 1)
    state.items = items
  },
  setItemQuestion(state, { itemIndex, followUpIndex, question }) {
    state.items = modifyItem(state, itemIndex, followUpIndex, (item) => {
      return {
        ...item,
        text: question
      }
    })
  },
  setItemQuestionRequired(state, { itemIndex, followUpIndex, required }) {
    state.items = modifyItem(state, itemIndex, followUpIndex, (item) => {
      return {
        ...item,
        required
      }
    })
  },
  setItemSelectChoices(state, { itemIndex, followUpIndex, choices }) {
    state.items = modifyItem(state, itemIndex, followUpIndex, (item) => {
      return {
        ...item,
        choices
      }
    })
  },
  setItemSelectChoice(state, { itemIndex, followUpIndex, choiceIndex, choice }) {
    state.items = modifyItem(state, itemIndex, followUpIndex, (item) => {
      item.choices[choiceIndex] = choice
      return item
    })
  },
  addEmptyItemSelectChoice(state, { itemIndex, followUpIndex }) {
    state.items = modifyItem(state, itemIndex, followUpIndex, (item) => {
      item.choices.push('')
      return item
    })
  },
  deleteItemSelectChoice(state, { itemIndex, followUpIndex, choiceIndex }) {
    state.items = modifyItem(state, itemIndex, followUpIndex, (item) => {
      item.choices.splice(choiceIndex, 1)
      return item
    })
  },
  switchItemSelectOtherAvailable(state, { itemIndex, followUpIndex }) {
    state.items = modifyItem(state, itemIndex, followUpIndex, (item) => {
      item.otherAvailable = !item.otherAvailable
      return item
    })
  },
  setItemLinearScaleStartValue(state, { value, itemIndex, followUpIndex }) {
    state.items = modifyItem(state, itemIndex, followUpIndex, (item) => {
      return {
        ...item,
        startValue: value
      }
    })
  },
  setItemLinearScaleStartLabel(state, { label, itemIndex, followUpIndex }) {
    state.items = modifyItem(state, itemIndex, followUpIndex, (item) => {
      return {
        ...item,
        startLabel: label
      }
    })
  },
  setItemLinearScaleEndValue(state, { value, itemIndex, followUpIndex }) {
    state.items = modifyItem(state, itemIndex, followUpIndex, (item) => {
      return {
        ...item,
        endValue: value
      }
    })
  },
  setItemLinearScaleEndLabel(state, { label, itemIndex, followUpIndex }) {
    state.items = modifyItem(state, itemIndex, followUpIndex, (item) => {
      return {
        ...item,
        endLabel: label
      }
    })
  },
  setItemLikertAnswerType(state, { answerType, itemIndex, followUpIndex }) {
    state.items = modifyItem(state, itemIndex, followUpIndex, (item) => {
      return {
        ...item,
        answerType
      }
    })
  },
  setItemImageMediaId(state, { imageMediaId, itemIndex }) {
    state.items = modifyItem(state, itemIndex, null, (item) => {
      return {
        ...item,
        imageMediaId
      }
    })
  },
  setItemImageMediaIds(state, { imageMediaIds, itemIndex }) {
    state.items = modifyItem(state, itemIndex, null, (item) => {
      return {
        ...item,
        imageMediaIds
      }
    })
  },
  setItemDeviceFrame(state, { deviceFrame, itemIndex }) {
    state.items = modifyItem(state, itemIndex, null, (item) => {
      return {
        ...item,
        deviceFrame
      }
    })
  },
  setItemInstruction(state, { instruction, itemIndex }) {
    state.items = modifyItem(state, itemIndex, null, (item) => {
      return {
        ...item,
        instruction
      }
    })
  },
  setItemFiveSecondTestDuration(state, { duration, itemIndex }) {
    state.items = modifyItem(state, itemIndex, null, (item) => {
      return {
        ...item,
        duration
      }
    })
  },
  setItemInstructionText(state, { text, itemIndex }) {
    state.items = modifyItem(state, itemIndex, null, (item) => {
      return {
        ...item,
        text
      }
    })
  },
  setPricing(state, pricing) {
    state.pricing = pricing
  }
}

export const actions = {
  fetchPricing({ state, commit, getters }, { missionForm }) {
    return new Promise((resolve, reject) => {
      this.$axios({
        method: 'post',
        url: '/pricing/quantitative',
        data: {
          items: {
            ...getters.itemsCountByType
          },
          participants: parseInt(missionForm.participants)
        }
      })
        .then(({ data }) => {
          commit('setPricing', data)
          resolve()
        })
        .catch(reject)
    })
  }
}

function modifyItem(state, itemIndex, followUpIndex, modifyFunction) {
  const items = state.items.slice()
  const item = followUpIndex !== null
    ? items[itemIndex].followUps[followUpIndex]
    : items[itemIndex]

  const modifiedItem = modifyFunction(item)
  if (followUpIndex !== null) {
    items[itemIndex].followUps[followUpIndex] = modifiedItem
  } else {
    items[itemIndex] = modifiedItem
  }
  return items
}

function getDefaultItem(type) {
  const newItem = copyDefaultItem(type)
  if (newItem.followUps) {
    newItem.followUps = getDefaultFollowUp(type)
  }
  return newItem
}

function getDefaultFollowUp(type) {
  return MISSION_SURVEY_USABILITY_LAB_FOLLOW_UP_REQUIRED.includes(type)
    ? [copyDefaultItem(SHORT_TEXT)]
    : []
}

function copyDefaultItem(type) {
  const defaultItem = defaultStateItem[type]
  return copy(defaultItem)
}

function getFlatMappedItems(items) {
  const itemsDeepArray = items
    .map(i => [i, ...(i.followUps ? i.followUps : [])])
  return flatMap(itemsDeepArray)
}
