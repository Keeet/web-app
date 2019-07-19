import { flatMap } from '../utils/objectUtils'

const cookieParser = process.server ? require('cookieparser') : undefined
const jwtDecode = require('jwt-decode')

export const state = () => ({
  accessToken: null,
  idToken: null,
  auth0User: null,
  tokenCompanyId: null,
  user: null,
  company: null,
  companyUsers: null,
  projects: null,
  project: null,
  mission: null,
  missionInsights: null,
  survey: null,
  personas: null,
  dropzoneUploads: {}
})

export const getters = {
  getSurveyItemById(state) {
    return (id) => {
      const deepArray = state.survey.items.slice()
        .map(i => [
          i,
          ...(i.followUps ? i.followUps : [])
        ])
      return flatMap(deepArray)
        .find(i => i.id === id)
    }
  },
  getCompanyLocationById(state) {
    return (id) => {
      const { locations } = state.company
      if (!locations || !locations.length) {
        return
      }
      return locations.find(l => l.id === id)
    }
  }
}

export const mutations = {
  setTokens(state, tokens) {
    const { accessToken, idToken } = tokens
    state.accessToken = accessToken
    state.idToken = idToken
    state.auth0User = jwtDecode(idToken)
    state.tokenCompanyId = jwtDecode(accessToken)['https://keeet.io/companyId']
  },
  setUser(state, user) {
    state.user = user
  },
  setCompany(state, company) {
    state.company = company
  },
  setCompanyUsers(state, companyUsers) {
    state.companyUsers = companyUsers
  },
  setProjects(state, projects) {
    state.projects = projects.map((project) => {
      return {
        ...project,
        owner: {
          firstName: project.ownerFirstName,
          lastName: project.ownerLastName,
          profileImage: project.ownerProfileImage
        }
      }
    })
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
  setSurvey(state, survey) {
    survey.items = survey.items
      .map((item) => {
        if (item.followUps) {
          item.followUps = item.followUps.sort((a, b) => a.index > b.index ? 1 : -1)
        }
        return item
      })
      .sort((a, b) => a.index > b.index ? 1 : -1)
    state.survey = survey
  },
  setPersonas(state, personas) {
    state.personas = personas.map((persona) => {
      return {
        ...persona,
        demographicDataReq: persona.demographicDataReq
          ? persona.demographicDataReq
          : {
            occupations: [],
            genders: []
          }
      }
    })
  },
  addDropzoneUpload(state, { id, url }) {
    const dropzoneUploads = { ...state.dropzoneUploads }
    dropzoneUploads[id] = url
    state.dropzoneUploads = dropzoneUploads
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
