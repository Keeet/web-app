const cookieParser = process.server ? require('cookieparser') : undefined

export const state = () => ({
  accessToken: null,
  user: null
})

export const mutations = {
  setAccessToken(state, accessToken) {
    state.accessToken = accessToken
  },
  setUser(state, user) {
    state.user = user
  }
}

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    let auth = null
    if (req.headers.cookie) {
      const parsed = cookieParser.parse(req.headers.cookie)
      if (parsed && parsed.auth) {
        auth = parsed.auth
      }
    }
    commit('setAccessToken', auth)
  }
}
