import { copy } from '../utils/objectUtils'
import { MISSION_SURVEY_ITEMS, MISSION_SURVEY_USABILITY_LAB_ITEMS } from '../components/constants'

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
  PREFERENCE_TEST
} = MISSION_SURVEY_USABILITY_LAB_ITEMS

const SKIP_ITEMS = [QUESTION_LIST, DESIGN_QUESTION]

const defaultResponse = {
  SHORT_TEXT: {
    type: SHORT_TEXT,
    answerText: ''
  },
  LONG_TEXT: {
    type: LONG_TEXT,
    answerText: ''
  },
  SINGLE_SELECT: {
    type: SINGLE_SELECT,
    selected: null
  },
  MULTI_SELECT: {
    type: MULTI_SELECT,
    selected: []
  },
  LIKERT: {
    type: LIKERT,
    value: null
  },
  LINEAR_SCALE: {
    type: LINEAR_SCALE,
    value: null
  },
  FIRST_CLICK: {
    type: FIRST_CLICK,
    started: false,
    x: null,
    y: null,
    confirmed: false,
    followUps: []
  },
  FIVE_SECOND_TEST: {
    type: FIVE_SECOND_TEST,
    started: false,
    followUps: []
  },
  DESIGN_QUESTION: {
    type: DESIGN_QUESTION,
    followUps: []
  },
  QUESTION_LIST: {
    type: QUESTION_LIST,
    followUps: []
  },
  PREFERENCE_TEST: {
    type: PREFERENCE_TEST,
    sliderActive: false,
    followUps: []
  }
}

const defaultState = {
  items: null,
  activeWelcome: true,
  activeClosing: false,
  activeItemIndex: null,
  activeFollowUpIndex: null,
  activeItemValid: false, // TODO: set to false later
  progress: 0,
  duration: null,
  responses: []
}

export const state = () => (defaultState)

export const getters = {
  activeItem({ activeItemIndex, activeFollowUpIndex, items }) {
    if (activeItemIndex === null) {
      return null
    }
    const item = items[activeItemIndex]
    if (activeFollowUpIndex !== null) {
      return item.followUps[activeFollowUpIndex]
    }
    return item
  },
  activeRootItem({ activeItemIndex, items }) {
    if (activeItemIndex === null) {
      return null
    }
    return items[activeItemIndex]
  },
  activeResponse({ responses }, getters) {
    const item = getters.activeItem
    return responses
      .map(r => [r, ...(r.followUps ? r.followUps : [])])
      .flatMap(r => r)
      .find(r => r.id === item.id)
  }
}

export const mutations = {
  init(state, items) {
    for (const key in defaultState) {
      state[key] = defaultState[key]
    }
    state.items = items
  },
  hideWelcome(state) {
    state.activeWelcome = false
  },
  nextItem(state) {
    if (state.activeItemIndex === null) {
      state.activeItemIndex = 0
    } else {
      state.activeItemIndex++
    }
    state.activeFollowUpIndex = null
    setResponse(state, res => res)
    if (SKIP_ITEMS.includes(state.items[state.activeItemIndex].type)) {
      state.activeFollowUpIndex = 0
      setResponse(state, res => res)
    }
  },
  nextFollowUp(state) {
    if (state.activeFollowUpIndex === null) {
      state.activeFollowUpIndex = 0
    } else {
      state.activeFollowUpIndex++
    }
    setResponse(state, res => res)
  },
  showClosing(state) {
    state.activeClosing = true
  },
  setActiveItemValid(state, valid) {
    state.activeItemValid = valid
  },
  setProgress(state, progress) {
    state.progress = progress
  },
  setAnswerText(state, answerText) {
    setResponse(state, (response) => {
      return {
        ...response,
        answerText
      }
    })
  },
  singleSelect(state, choice) {
    setResponse(state, (response) => {
      return {
        ...response,
        selected: choice
      }
    })
  },
  multiSelect(state, choice) {
    setResponse(state, (response) => {
      const selectedIndex = response.selected.indexOf(choice)
      if (selectedIndex !== -1) {
        response.selected.splice(selectedIndex, 1)
      } else {
        response.selected.push(choice)
      }
      return response
    })
  },
  setLinearScaleValue(state, value) {
    setResponse(state, (response) => {
      return {
        ...response,
        value
      }
    })
  },
  setLikertValue(state, value) {
    setResponse(state, (response) => {
      return {
        ...response,
        value
      }
    })
  },
  setFirstClickCoordinates(state, { x, y }) {
    x = x ? Math.round(x * 100000) / 100000 : x
    y = y ? Math.round(y * 100000) / 100000 : y
    setResponse(state, (response) => {
      return {
        ...response,
        x,
        y
      }
    })
  },
  confirmFirstClickCoordinates(state) {
    setResponse(state, (response) => {
      return {
        ...response,
        confirmed: true
      }
    })
  },
  startUsabilityTest(state) {
    setResponse(state, (response) => {
      return {
        ...response,
        started: true
      }
    })
  },
  setFirstClickTimeout(state, timeout) {
    setResponse(state, (response) => {
      return {
        ...response,
        timeout
      }
    })
  },
  setPreferenceTestSliderActive(state, sliderActive) {
    setResponse(state, (response) => {
      return {
        ...response,
        sliderActive
      }
    })
  },
  setPreferenceTestSelectedImageId(state, selectedImageId) {
    setResponse(state, (response) => {
      return {
        ...response,
        selectedImageId
      }
    })
  }
}

export const actions = {
  nextStep({ state, commit }) {
    const itemIndex = state.activeItemIndex
    const followUpIndex = state.activeFollowUpIndex

    if (state.activeWelcome) {
      commit('hideWelcome')
      commit('nextItem')
      return
    }

    const activeItem = state.items[itemIndex]
    const nextItem = state.items[itemIndex + 1]
    const nextFollowUp = activeItem.followUps && activeItem.followUps.length
      ? followUpIndex !== null ? activeItem.followUps[followUpIndex + 1] : activeItem.followUps[0]
      : undefined

    if (nextFollowUp) {
      commit('nextFollowUp')
    } else if (nextItem) {
      commit('nextItem')
    } else {
      commit('showClosing')
    }

    commit('setProgress', calculateProgress(state))
  },
  handleValidationError({ commit }, { error }) {
    commit('setActiveItemValid', !error)
  }
}

function setResponse(state, modifyFunction) {
  const activeItem = state.items[state.activeItemIndex]
  const activeFollowUp = state.activeFollowUpIndex !== null ? activeItem.followUps[state.activeFollowUpIndex] : null

  const responses = copy(state.responses)
  const responseItemIndex = responses.findIndex(r => r.id === activeItem.id)
  const responseFollowUpIndex = responseItemIndex !== -1 && activeFollowUp
    ? responses[responseItemIndex].followUps.findIndex(r => r.id === activeFollowUp.id)
    : -1

  if (responseItemIndex !== -1 && responseFollowUpIndex !== -1) {
    // modify existing follow up response
    responses[responseItemIndex].followUps[responseFollowUpIndex] =
      modifyFunction(responses[responseItemIndex].followUps[responseFollowUpIndex])
  } else if (responseItemIndex !== -1 && activeFollowUp) {
    // add new follow up response
    const newResponse = modifyFunction(getDefaultResponse(activeFollowUp || activeItem))
    responses[responseItemIndex].followUps.push(newResponse)
  } else if (responseItemIndex !== -1) {
    // modify existing response
    responses[responseItemIndex] = modifyFunction(responses[responseItemIndex])
  } else {
    // add new response
    const newResponse = modifyFunction(getDefaultResponse(activeFollowUp || activeItem))
    responses.push(modifyFunction(newResponse))
  }

  state.responses = responses
}

function getDefaultResponse({ type, id }) {
  return {
    ...copy(defaultResponse[type]),
    id
  }
}

function calculateProgress({ items, activeItemIndex, activeFollowUpIndex, activeWelcome, activeClosing }) {
  if (activeWelcome) {
    return 0
  }
  if (activeClosing) {
    return 1
  }
  /*
  * labeledItems is an array containing Booleans that label answered items and followUps
  * example:
  *   params: items = [{ ...i0 }, { ...i1, followUps: [{ ...fu0, ...fu1 }]}, { ...i2 }]
  *           activeItemIndex = 2
  *           activeFollowUpIndex = null
  *   result: [true, true, true, true, false]
  * */
  const labeledItems = items
    .map((item, x) => {
      const itemFollowUps = item.followUps || []
      const isItemFollowUpActive = x === activeItemIndex && activeFollowUpIndex !== null
      const isItemAnswered = x < activeItemIndex || isItemFollowUpActive

      return [
        SKIP_ITEMS.includes(item.type) ? [] : isItemAnswered,
        ...(itemFollowUps.map(
          (followUp, y) => {
            return x < activeItemIndex || (isItemFollowUpActive && y < activeFollowUpIndex)
          }
        ))
      ]
    })
    .flatMap(isAnswered => isAnswered)

  return labeledItems.filter(isAnswered => isAnswered).length / labeledItems.length
}
