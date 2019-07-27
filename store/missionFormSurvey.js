import uuidv4 from 'uuid'
import {
  MISSION_SURVEY_ITEMS,
  MISSION_SURVEY_USABILITY_LAB_ITEMS,
  MISSION_SURVEY_USABILITY_LAB_FOLLOW_UP_REQUIRED,
  MISSION_SURVEY_USABILITY_LAB_ITEM_DEVICE_FRAMES,
  LANGUAGES,
  MISSION_SURVEY_CUSTOM_SCREEN_TYPES,
  MISSION_SURVEY_CUSTOM_SCREEN_DEFAULT_COLOR
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

const { WELCOME, CLOSING } = MISSION_SURVEY_CUSTOM_SCREEN_TYPES

const defaultWelcomeScreen = {
  welcomeTitle: null,
  welcomeDescription: null,
  welcomeLogoId: null
}
const defaultClosingScreen = {
  closingTitle: null,
  closingDescription: null,
  closingLogoId: null
}

const defaultState = {
  language: LANGUAGES.EN,
  customizeWelcome: false,
  ...defaultWelcomeScreen,
  ...defaultClosingScreen,
  customizeClosing: false,
  welcomeColorPickerOpened: false,
  closingColorPickerOpened: false,
  color: null,
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
  },
  buildMission: state => ({ missionForm }) => {
    const { title, titlePlaceholder } = missionForm
    const mission = {
      ...copy(state),
      ...copy(missionForm),
      title: title !== '' ? title : titlePlaceholder
    }
    function formatItems(items) {
      const { SINGLE_SELECT, MULTI_SELECT } = MISSION_SURVEY_ITEMS
      return items.map((item) => {
        // clear empty choices
        if ([SINGLE_SELECT, MULTI_SELECT].includes(item.type)) {
          item.choices = item.choices.filter(choice => choice !== '')
        }
        if (item.followUps) {
          item.followUps = formatItems(item.followUps)
        }
        return item
      })
    }
    mission.items = formatItems(mission.items)
    mission.color = mission.color ? mission.color.hex : null

    return mission
  },
  buildSurvey: (state, getters) => ({ missionForm, dropzoneUploads }) => {
    const survey = getters.buildMission({ missionForm })
    survey.welcomeLogoId = survey.welcomeLogoId ? dropzoneUploads[survey.welcomeLogoId] : null
    survey.closingLogoId = survey.closingLogoId ? dropzoneUploads[survey.closingLogoId] : null
    survey.items.forEach((item, x) => {
      item.id = uuidv4()
      item.index = x
      if (item.followUps) {
        item.followUps.forEach((followUp, y) => {
          followUp.id = uuidv4()
          followUp.index = y
        })
      }
      item.image = item.imageMediaId ? dropzoneUploads[item.imageMediaId] : null
      item.images = item.imageMediaIds ? item.imageMediaIds.map(id => ({ url: dropzoneUploads[id] })) : null
    })
    return survey
  }
}

export const mutations = {
  init(state) {
    for (const key in defaultState) {
      state[key] = defaultState[key]
    }
  },
  initExisting(state, { survey, mission }) {
    for (const key in defaultState) {
      state[key] = defaultState[key]
    }
    const {
      language,
      customizeWelcome,
      customizeClosing,
      welcomeTitle,
      welcomeDescription,
      closingTitle,
      closingDescription,
      color,
      redirectLink,
      items
    } = survey
    const {
      welcomeLogo,
      closingLogo
    } = mission

    state.language = language || defaultState.language
    state.customizeWelcome = customizeWelcome || defaultState.customizeWelcome
    state.customizeClosing = customizeClosing || defaultState.customizeClosing
    state.welcomeTitle = welcomeTitle || defaultState.welcomeTitle
    state.welcomeDescription = welcomeDescription || defaultState.welcomeDescription
    state.welcomeLogoId = welcomeLogo ? welcomeLogo.id : defaultState.welcomeLogoId
    state.closingTitle = closingTitle || defaultState.closingTitle
    state.closingDescription = closingDescription || defaultState.closingDescription
    state.closingLogoId = closingLogo ? closingLogo.id : defaultState.closingLogoId
    state.color = { hex: color }
    state.redirectLink = redirectLink || defaultState.redirectLink
    state.items = items.slice().sort((a, b) => a.index > b.index ? 1 : -1).map((item) => {
      if (item.image) {
        item.imageMediaId = item.image.id
      } else if (item.images) {
        item.imageMediaIds = item.images.map(image => image.id)
      }
      return item
    })
    state.itemAddIndex = -1
  },
  setLanguage(state, language) {
    state.language = language
  },
  setCustomizeWelcome(state, customizeWelcome) {
    state.customizeWelcome = customizeWelcome
  },
  setCustomizeClosing(state, customizeClosing) {
    state.customizeClosing = customizeClosing
  },
  setColor(state, color) {
    state.color = color
  },
  resetColor(state) {
    state.color = null
  },
  initWelcomeScreen(state, { title, description }) {
    state.welcomeTitle = title
    state.welcomeDescription = description
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
    state.welcomeTitle = null
    state.welcomeDescription = null
    state.welcomeLogoId = null
  },
  initClosingScreen(state, { title, description }) {
    state.closingTitle = title
    state.closingDescription = description
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
    state.closingTitle = null
    state.closingDescription = null
    state.closingLogoId = null
    state.redirectLink = null
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
  switchCustomize({ state, commit }, { type, defaultValues }) {
    let customScreenIsOpen, otherCustomScreenIsOpen, initMutation, resetMutation, switchMutation
    switch (type) {
      case WELCOME:
        customScreenIsOpen = state.customizeWelcome
        otherCustomScreenIsOpen = state.customizeClosing
        initMutation = 'initWelcomeScreen'
        resetMutation = 'resetWelcomeScreen'
        switchMutation = 'setCustomizeWelcome'
        break
      case CLOSING:
        customScreenIsOpen = state.customizeClosing
        otherCustomScreenIsOpen = state.customizeWelcome
        initMutation = 'initClosingScreen'
        resetMutation = 'resetClosingScreen'
        switchMutation = 'setCustomizeClosing'
        break
    }

    if (!customScreenIsOpen) {
      commit(initMutation, defaultValues)
      if (!otherCustomScreenIsOpen) {
        commit('setColor', getColorByHex(MISSION_SURVEY_CUSTOM_SCREEN_DEFAULT_COLOR))
      }
    } else {
      commit(resetMutation)
      if (!otherCustomScreenIsOpen) {
        commit('resetColor')
      }
    }
    commit(switchMutation, !customScreenIsOpen)
  },
  fetchPricing({ state, commit, getters }, { globalGetters, missionForm, missionFormPersona }) {
    if (globalGetters['missionForm/participantsError']) {
      return
    }
    return new Promise((resolve) => {
      this.$axios({
        method: 'post',
        url: '/pricing/quantitativee',
        data: {
          items: {
            ...getters.itemsCountByType
          },
          participants: parseInt(missionForm.participants),
          country: missionFormPersona.countries[0]
        }
      })
        .then(({ data }) => {
          commit('setPricing', data)
          resolve()
        })
        .catch(this.$axios.handleErrorWithNuxt)
    })
  },
  submit({ state, getters }, { missionForm }) {
    const mission = getters.buildMission({ missionForm })
    return missionForm.editExisting
      ? this.$push.updateMissionSurvey(mission)
      : this.$push.createMissionSurvey(mission)
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

function getColorByHex(hex) {
  return { hex }
}
