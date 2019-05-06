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
    },
    mockDataNoCompany: {
      id: 'u1',
      authId: 'a1',
      firstName: 'Mika',
      lastName: 'Hally',
      email: 'mika@keeet.io',
      createdAt: '2019-05-04T22:43:15Z',
      updatedAt: '2019-05-04T22:43:15Z'
    }
  },
  COMPANY: {
    path: '/company',
    mutation: 'setCompany',
    key: 'company',
    mockData: {
      id: 'c1',
      name: 'Keeet UG',
      street: 'Rosenthaler Strasse',
      houseNb: '101',
      zip: '10369',
      country: 'Deutschland',
      createdAt: '2019-05-04T22:43:15Z',
      updatedAt: '2019-05-04T22:43:15Z'
    }
  },
  PROJECTS: {
    path: '/projects',
    mutation: 'setProjects',
    key: 'projects',
    mockData: [
      {
        id: 'p1',
        companyId: 'c1',
        owner: {
          firstName: 'Mika',
          lastName: 'Hally',
          profileImage: 'https://media.licdn.com/dms/image/C5603AQF4zYm5IZIdkg/profile-displayphoto-shrink_800_800/0?e=1562803200&v=beta&t=pOTiQ54Atrb-Duk-K9PX-DKEIVOdoBqxGXoEZznqgNA'
        },
        title: 'Project A',
        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.',
        createdAt: '2019-05-04T22:43:15Z',
        updatedAt: '2019-05-04T22:43:15Z'
      },
      {
        id: 'p2',
        companyId: 'c1',
        owner: {
          firstName: 'Tobias',
          lastName: 'Trinks',
          profileImage: 'https://s.gravatar.com/avatar/d7b57d223c63258c625151163eb77c12?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fto.png'
        },
        title: 'Project B',
        createdAt: '2019-05-04T22:43:15Z',
        updatedAt: '2019-05-04T22:43:15Z'
      }
    ],
    mockDataEmpty: []
  }
}

export default function ({ $axios, store }, inject) {
  inject('fetch', (resources) => {
    const promises = resources.map((resource) => {
      return new Promise((resolve) => {
        const { name, forced, mockDataKey } = resource
        if (!config[name]) {
          // eslint-disable-next-line no-console
          console.error(`resource ${name} is not configured`)
          return
        }
        const { path, mutation, key, mockData } = config[name]
        if (!forced && store.state[key] !== undefined && store.state[key] !== null) {
          resolve('ALREADY_FETCHED')
          return
        }
        if (mockData || mockDataKey) {
          store.commit(mutation, mockDataKey ? config[name][mockDataKey] : mockData)
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
