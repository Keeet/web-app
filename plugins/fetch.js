const USE_MOCKS = false

const config = {
  USER: {
    path: '/users',
    mutation: 'setUser',
    key: 'user'
  },
  COMPANY: {
    path: '/companies',
    mutation: 'setCompany',
    key: 'company'
  },
  PROJECTS: {
    path: '/projects',
    mutation: 'setProjects',
    key: 'projects'
  },
  PROJECT: {
    path: '/projects/{id}',
    mutation: 'setProject',
    key: 'project',
    forcedLink: ['PROJECTS']
  },
  MISSION: {
    path: '/missions/{id}',
    mutation: 'setMission',
    key: 'mission'
  },
  MISSION_INSIGHTS: {
    path: '/missions/{id}/insights',
    mutation: 'setMissionInsights',
    key: 'missionInsights'
  },
  SURVEY: {
    path: '/public/missions/{id}',
    mutation: 'setSurvey',
    key: 'survey',
    noAuth: true
  },
  PERSONAS: {
    path: '/personas',
    mutation: 'setPersonas',
    key: 'personas'
  },
  COMPANY_USERS: {
    path: '/companies/users',
    mutation: 'setCompanyUsers',
    key: 'companyUsers'
  },
  VIDEO_SESSION_COMPANY: {
    path: '/rooms/token/moderated/company/{id}',
    mutation: 'twilio/initCompany',
    baseUrl: 'https://streaming.keeet.io'
  },
  VIDEO_SESSION_USER: {
    path: '/rooms/token/moderated/user/{id}',
    mutation: 'twilio/initUser',
    baseUrl: 'https://streaming.keeet.io',
    noAuth: true
  }
}

export default function ({ $axios, store, error }, inject) {
  inject('fetch', (resources, handleRes = res => res, handleErr = err => err) => {
    const promises = resources.map((resource) => {
      const { name, forced, mockDataKey, id, queryParams } = resource
      const { path, mutation, key, mockData, baseUrl, noAuth } = config[name]

      return new Promise((resolve, reject) => {
        if (rejectIfInvalidResourceName({ reject, error }, name)) {
          return
        }
        if (resolveIfAlreadyFetchedAndNoForceUpdate({ resolve, store }, key, id, forced)) {
          return
        }
        if (USE_MOCKS && commitMockAndResolveIfExistingByOptionalKey({ resolve, store }, mutation, mockData, mockDataKey)) {
          return
        }

        const pathWithParams = buildPathWithOptionalParams(path, id)
        const axiosCfg = buildAxiosCfg(noAuth, baseUrl, queryParams)

        $axios.get(pathWithParams, axiosCfg).then((res) => {
          store.commit(mutation, res.data)
          resolve(res)
        }).catch((err) => {
          const { status, data } = err.response
          reject(error({ statusCode: status, message: data }))
        })
      })
    })
    return new Promise((resolve) => {
      Promise.all(promises).then((res) => {
        resolve(handleRes(res))
      }).catch((nuxtError) => {
        resolve(handleErr(nuxtError))
      })
    })
  })
};

function rejectIfInvalidResourceName({ reject, error }, name) {
  if (!config[name]) {
    reject(error({ statusCode: 500, message: `resource ${name} is not configured` }))
    return true
  }
}

function resolveIfAlreadyFetchedAndNoForceUpdate({ resolve, store }, key, id, forced) {
  const storeItem = store.state[key]
  const alreadyFetched = storeItem && (!id || id === storeItem.id)
  if (!forced && alreadyFetched) {
    resolve('ALREADY_FETCHED')
    return true
  }
}

function commitMockAndResolveIfExistingByOptionalKey({ resolve, store }, mutation, mockData, mockDataKey) {
  if (mockData || mockDataKey) {
    store.commit(mutation, mockDataKey ? config[name][mockDataKey] : mockData)
    resolve()
    return true
  }
}

function buildPathWithOptionalParams(pathTemplate, id) {
  return pathTemplate.replace('{id}', id)
}

function buildAxiosCfg(noAuth, baseUrl, queryParams) {
  const axiosCfg = { noAuth }
  if (baseUrl) {
    axiosCfg.baseURL = baseUrl
  }
  if (queryParams) {
    axiosCfg.params = queryParams
  }
  return axiosCfg
}
