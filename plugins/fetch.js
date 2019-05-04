const config = {
  USER: {
    path: '/user',
    mutation: 'setUser',
    key: 'user',
    mockData: {
      id: 'u1',
      companyId: 'c1',
      authId: 'a1',
      firstName: 'Mika',
      lastName: 'Hally',
      email: 'mika@keeet.io',
      createdAt: '2019-05-04T22:43:15Z',
      updatedAt: '2019-05-04T22:43:15Z'
    }
  }
}

export default function ({ $axios, store }, inject) {
  inject('fetch', (resources, forced = false) => {
    const promises = resources.map((resource) => {
      return new Promise((resolve) => {
        if (!config[resource]) {
          // eslint-disable-next-line no-console
          console.error(`resource ${resource} is not configured`)
          return
        }
        const { path, mutation, key, mockData } = config[resource]
        if (!forced && store.state[key] !== undefined && store.state[key] !== null) {
          resolve('ALREADY_FETCHED')
          return
        }
        if (mockData) {
          store.commit(mutation, mockData)
          resolve()
          return
        }
        $axios.get(path).then((res) => {
          store.commit(mutation, res)
          resolve()
        })
      })
    })
    return Promise.all(promises)
  })
};
