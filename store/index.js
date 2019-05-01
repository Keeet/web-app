const cookieParser = process.server ? require('cookieparser') : undefined

export const state = () => ({
  accessToken: null
})

export const mutations = {
  setAccessToken(state, accessToken) {
    state.accessToken = accessToken
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
