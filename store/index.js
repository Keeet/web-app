const cookieParser = process.server ? require('cookieparser') : undefined
const jwtDecode = require('jwt-decode')

export const state = () => ({
  accessToken: null,
  idToken: null,
  auth0User: null,
  user: null,
  company: null,
  projects: null,
  project: null,
  mission: null,
  missionInsights: null,
  personas: null
})

export const mutations = {
  setTokens(state, tokens) {
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
  },
  setProjects(state, projects) {
    state.projects = projects
  },
  setProject(state, project) {
    state.project = project
  },
  setMission(state, mission) {
    state.mission = mission
  },
  setMissionInsights(state, missionInsights) {
    state.missionInsights = missionInsights
  },
  setPersonas(state, personas) {
    state.personas = personas
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
