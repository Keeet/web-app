const defaultState = {
  items: null,
  activeWelcome: true,
  activeClosing: false,
  activeItemIndex: null,
  activeFollowUpIndex: null,
  progress: 0
}

export const state = () => (defaultState)

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
  },
  nextFollowUp(state) {
    if (state.activeFollowUpIndex === null) {
      state.activeFollowUpIndex = 0
    } else {
      state.activeFollowUpIndex++
    }
  },
  showClosing(state) {
    state.activeClosing = true
  },
  setProgress(state, progress) {
    state.progress = progress
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
    const nextFollowUp = activeItem.followUps !== null
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
        isItemAnswered,
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
