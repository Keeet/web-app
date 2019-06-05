const defaultState = {
  id: null,
  isCompany: false,
  sessionId: null,
  token: null,
  room: null,

  loading: null,
  joinButtonActive: false,
  remoteStreamActive: false,
  callActive: false
}
export const state = () => (defaultState)

export const mutations = {
  initCompany(state, { sessionId, token }) {
    for (const key in defaultState) {
      state[key] = defaultState[key]
    }
    state.isCompany = true
    state.sessionId = sessionId
    state.token = token
  },
  initUser(state, { sessionId, token }) {
    state.isCompany = false
    state.sessionId = sessionId
    state.token = token
  },
  setRoom(state, room) {
    state.room = room
  },

  showLoading(state, text) {
    state.loading = text
  },
  hideLoading(state) {
    state.loading = null
  },
  showJoinButton(state) {
    state.joinButtonActive = true
  },
  hideJoinButton(state) {
    state.joinButtonActive = false
  },
  showRemoteStream(state) {
    state.remoteStreamActive = true
  },
  hideRemoteStream(state) {
    state.remoteStreamActive = false
  },
  showCall(state) {
    state.callActive = true
  },
  hideCall(state) {
    state.callActive = false
  }
}
