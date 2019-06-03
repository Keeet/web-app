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
    path: '/sessions/{id}/company',
    mutation: 'twilio/initCompany',
    baseUrl: 'https://streaming.keeet.io'
  },
  VIDEO_SESSION_USER: {
    path: '/sessions/{id}/user',
    mutation: 'twilio/initUser',
    baseUrl: 'https://streaming.keeet.io',
    noAuth: true
  }
}

export default function ({ $axios, store }, inject) {
  inject('fetch', (resources) => {
    const promises = resources.map((resource) => {
      return new Promise((resolve) => {
        const { name, forced, mockDataKey, id } = resource
        if (!config[name]) {
          // eslint-disable-next-line no-console
          console.error(`resource ${name} is not configured`)
          return
        }
        const { path, mutation, key, mockData, baseUrl, noAuth } = config[name]
        const alreadyFetched = store.state[key] && (!id || id === store.state[key].id)
        if (!forced && alreadyFetched) {
          resolve('ALREADY_FETCHED')
          return
        }
        if (USE_MOCKS && (mockData || mockDataKey)) {
          store.commit(mutation, mockDataKey ? config[name][mockDataKey] : mockData)
          resolve()
          return
        }
        const pathWithParams = path.replace('{id}', id)
        const axiosCfg = { noAuth }
        if (baseUrl) {
          axiosCfg.baseURL = baseUrl
        }
        $axios.get(pathWithParams, axiosCfg).then((res) => {
          store.commit(mutation, res.data)
          resolve()
          // eslint-disable-next-line no-console
        }).catch(console.error)
      })
    })
    return Promise.all(promises)
  })
};
