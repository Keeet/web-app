const USE_MOCKS = false
const MOCK_PROMISE = () => {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      resolve({ data: { id: '12345' } })
    }, 500)
  })
}

export default function (context, inject) {
  const $axios = USE_MOCKS ? MOCK_PROMISE : context.$axios

  inject('push', {

    upsertCompany({ id, name, country, city, zipCode, street, houseNumber, addressDescription }) {
      const method = !id ? 'post' : 'put'
      return $axios({
        method,
        url: '/companies',
        data: {
          id,
          name,
          country,
          city,
          zipCode,
          street,
          houseNumber,
          addressDescription
        }
      })
    },

    createCompanyAddress({ name, street, houseNumber, addressDescription, zipCode, city, country }) {
      return $axios({
        method: 'post',
        url: '/companies/locations',
        data: {
          name,
          street,
          houseNumber,
          addressDescription,
          zipCode,
          city,
          country
        }
      })
    },

    updateUserRole({ id, role }) {
      return $axios({
        method: 'put',
        url: `/users/${id}/role`,
        data: {
          role
        }
      })
    },

    inviteUser({ email, role }) {
      return $axios({
        method: 'post',
        url: `/invitations`,
        data: {
          email,
          role
        }
      })
    },

    upsertPersona({ id, name, icon, demographicDataReq: { minAge, maxAge, occupations, genders }, screenerQuestions }) {
      const method = !id ? 'post' : 'put'
      const url = !id ? '/personas' : `/personas/${id}`
      return $axios({
        method,
        url,
        data: {
          name,
          icon,
          demographicDataReq: {
            minAge,
            maxAge,
            occupations,
            genders
          },
          screenerQuestions
        }
      })
    },
    deletePersona({ id }) {
      return $axios({
        method: 'delete',
        url: `/personas/${id}`
      })
    },

    upsertProject({ id, title, description }) {
      const method = !id ? 'post' : 'put'
      const url = !id ? '/projects' : `/projects/${id}`
      return $axios({
        method,
        url,
        data: {
          title,
          description
        }
      })
    },

    createMission({ projectId, type, title, description, duration, language, sessions, country, city, zipCode, street, houseNumber, addressDescription, persona: { name, icon, demographicDataReq: { minAge, maxAge, occupations, genders }, screenerQuestions } }) {
      return $axios({
        method: 'post',
        url: '/missions',
        data: {
          projectId,
          type,
          title,
          description,
          duration,
          language,
          sessions,
          country,
          city,
          zipCode,
          street,
          houseNumber,
          addressDescription,
          persona: {
            name,
            icon,
            demographicDataReq: { minAge, maxAge, occupations, genders },
            screenerQuestions
          }
        }
      })
    },
    updateMission({ id, title, description }) {
      return $axios({
        method: 'put',
        path: `/missions/${id}`,
        data: {
          title,
          description
        }
      })
    },
    createMissionInsightLink({ missionId, url, title, description, linkType }) {
      return $axios({
        method: 'post',
        url: `/missions/${missionId}/insights/link`,
        data: {
          title,
          linkType,
          description,
          url
        }
      })
    }
  })
}
