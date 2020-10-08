import { MISSION_RECRUIT_INSIGHT_LINKS } from '../components/constants'

const defaultState = {
  missionId: null,
  url: '',
  title: '',
  description: '',

  pending: false
}

export const state = () => ({ ...defaultState })

export const mutations = {
  init(state, mission) {
    for (const key in defaultState) {
      state[key] = defaultState[key]
    }
    state.missionId = mission.id
  },
  setUrl(state, url) {
    state.url = url
  },
  setTitle(state, title) {
    state.title = title
  },
  setDescription(state, description) {
    state.description = description
  },

  pending(state) {
    state.pending = true
  },
  submitted(state) {
    state.pending = false
  }
}

export const actions = {
  submit({ state, commit }) {
    return new Promise((resolve) => {
      const { url } = state
      commit('pending')
      this.$push.createMissionInsightLink({
        ...state,
        url: url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`,
        linkType: getLinkType(url)
      }).then(() => {
        commit('submitted')
        resolve()
      })
    })
  }
}

function getLinkType(url) {
  if (url.includes('airtable.com')) {
    return MISSION_RECRUIT_INSIGHT_LINKS.AIR_TABLE
  }
  if (url.includes('google.com')) {
    return MISSION_RECRUIT_INSIGHT_LINKS.GOOGLE_DOCS
  }
  return MISSION_RECRUIT_INSIGHT_LINKS.GENERIC
}
