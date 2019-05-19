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
      addressDescription: 'third backyard',
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
  },
  PROJECT: {
    path: '/project/{id}',
    mutation: 'setProject',
    key: 'project',
    mockData: {
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
      updatedAt: '2019-05-04T22:43:15Z',
      missions: [
        {
          startDate: '2019-06-06T15:42:38.032Z',
          demographicDataReq: {
            id: '5b9eeb55-e429-41f4-b0b9-2477ddc7f929',
            updatedAt: '2019-05-08T17:17:55.796Z',
            createdAt: '2019-05-08T17:17:55.796Z',
            minAge: 18,
            maxAge: 30,
            occupations: [
              'STUDENT'
            ],
            gender: [
              'MALE'
            ]
          },
          id: 'ad9e746a-ada5-45ef-8c95-0d963c056cb7',
          updatedAt: '2019-05-08T17:17:55.876Z',
          createdAt: '2019-05-08T17:17:55.798Z',
          type: 'REMOTE',
          description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
          screenerQuestions: [
            {
              value: 'A',
              id: '8056c88e-f31f-476a-a101-8c988965617c',
              updatedAt: '2019-05-08T17:17:55.798Z',
              createdAt: '2019-05-08T17:17:55.798Z'
            },
            {
              value: 'B',
              id: '00651ba0-8c5f-494b-a16a-4a7bf85fd258',
              updatedAt: '2019-05-08T17:17:55.798Z',
              createdAt: '2019-05-08T17:17:55.798Z'
            }
          ],
          owner: {
            id: '93c254cb-26af-4d6d-8fcc-e1522887788c',
            updatedAt: '2019-05-08T17:17:11.596Z',
            createdAt: '2019-05-08T17:17:08.755Z',
            auth0Id: 'google-oauth2|110273771171828458843',
            firstName: 'henrik',
            lastName: 'engelbrink',
            email: 'henrik@keeet.io',
            profileImage: 'https://media.licdn.com/dms/image/C5603AQF4zYm5IZIdkg/profile-displayphoto-shrink_800_800/0?e=1562803200&v=beta&t=pOTiQ54Atrb-Duk-K9PX-DKEIVOdoBqxGXoEZznqgNA'
          },
          duration: 60,
          sessions: [
            {
              startsAt: '2019-06-06T15:42:38.032Z',
              id: 'db43d968-f248-419f-aeaa-6e6420f3550d',
              updatedAt: '2019-05-08T17:20:02.293Z',
              createdAt: '2019-05-08T17:17:55.799Z',
              testUser: {
                firstName: 'Henrik',
                lastName: 'Engelbrink',
                email: 'hengel2810@gmail.com',
                phone: '123456789',
                id: 'f0e33d68-0f24-4035-b98c-94a3fc5eeee7',
                updatedAt: '2019-05-08T17:20:02.286Z',
                createdAt: '2019-05-08T17:20:02.286Z'
              }
            },
            {
              startsAt: '2019-06-06T17:42:38.032Z',
              id: '7f94cf90-71d1-414b-b882-59dcbbb039e4',
              updatedAt: '2019-05-08T17:17:55.799Z',
              createdAt: '2019-05-08T17:17:55.799Z',
              testUser: null
            },
            {
              startsAt: '2019-06-06T16:42:38.032Z',
              id: '8893f3d8-5b19-44ba-8227-d22a03afd72b',
              updatedAt: '2019-05-08T17:17:55.799Z',
              createdAt: '2019-05-08T17:17:55.799Z',
              testUser: null
            }
          ]
        }
      ]
    },
    mockDataNoMissions: {
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
    }
  },
  PERSONAS: {
    path: '/personas',
    mutation: 'setPersonas',
    key: 'personas',
    mockData: [
      {
        id: '30fc1872-ecc3-4639-b2bb-a94054d1d8ee',
        updatedAt: '2019-05-04T22:43:15Z',
        createdAt: '2019-05-04T22:43:15Z',
        name: 'Chantal',
        icon: 'CHANTAL',
        screenerQuestions: [
          {
            value: 'Has to be a customer at either Netflix or Amazon Prime.',
            id: '0248537a-31f0-4405-9936-96ea806321be',
            updatedAt: '2019-05-04T22:43:15Z',
            createdAt: '2019-05-04T22:43:15Z'
          },
          {
            value: 'Has to spend at least around 2 hours per week on Netflix or Amazon Prime.',
            id: 'e1918233-2fe0-43e3-82d2-1efae7723d86',
            updatedAt: '2019-05-04T22:43:15Z',
            createdAt: '2019-05-04T22:43:15Z'
          }
        ],
        demographicDataReq: {
          id: '5993eca3-8b46-4a69-90ee-d1d1ffc7037b',
          updatedAt: '2019-05-04T22:43:15Z',
          createdAt: '2019-05-04T22:43:15Z',
          minAge: 18,
          maxAge: 30,
          occupations: [
            'STUDENT'
          ],
          genders: [
            'MALE'
          ]
        }
      },
      {
        id: '30fc1872-ecc3-4639-b2bb-a94054d1d8ee',
        updatedAt: '2019-05-04T22:43:15Z',
        createdAt: '2019-05-04T22:43:15Z',
        name: 'Mika',
        icon: 'MIKA',
        screenerQuestions: [
          {
            value: 'Must live in a flat sharing community in Berlin.',
            id: '0248537a-31f0-4405-9936-96ea806321be',
            updatedAt: '2019-05-04T22:43:15Z',
            createdAt: '2019-05-04T22:43:15Z'
          },
          {
            value: 'Has to spend at least around 2 hours per week on Netflix or Amazon Prime.',
            id: 'e1918233-2fe0-43e3-82d2-1efae7723d86',
            updatedAt: '2019-05-04T22:43:15Z',
            createdAt: '2019-05-04T22:43:15Z'
          }
        ],
        demographicDataReq: {
          id: '5993eca3-8b46-4a69-90ee-d1d1ffc7037b',
          updatedAt: '2019-05-04T22:43:15Z',
          createdAt: '2019-05-04T22:43:15Z',
          minAge: 18,
          maxAge: 30,
          occupations: [
            'STUDENT'
          ],
          genders: [
            'MALE'
          ]
        }
      }
    ],
    mockDataEmpty: []
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
        const pathWithParams = path.replace('{id}', id)
        $axios.get(pathWithParams).then((res) => {
          store.commit(mutation, res)
          resolve()
        })
      })
    })
    return Promise.all(promises)
  })
};
