const cookieParser = process.server ? require('cookieparser') : undefined
const jwtDecode = require('jwt-decode')

export const state = () => ({
  accessToken: null,
  idToken: null,
  auth0User: null,
  user: null,
  company: null
})

export const mutations = {
  setTokens(state, tokens) {
    if (!tokens) {
      state.accessToken = null
      state.idToken = null
      state.auth0User = null
      return
    }
    const { accessToken, idToken } = tokens
    state.accessToken = accessToken
    state.idToken = idToken
    state.auth0User = jwtDecode(idToken)
  },
  setUser(state, user) {
    state.user = user
  },
  setCompany(state, company) {
    state.company = company
  }
}

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    if (req.headers.cookie) {
      const parsed = cookieParser.parse(req.headers.cookie)
      if (parsed && parsed.auth && parsed.id_token) {
        commit('setTokens', { accessToken: parsed.auth, idToken: parsed.id_token })
      }
    }
  }
}
