const MOCK_PROMISE = () => {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      resolve({ data: { id: '12345' } })
    }, 500)
  })
}

export default function (context, inject) {
  // const { $axios } = context
  const $axios = MOCK_PROMISE

  inject('push', {

    upsertCompany({ id, name, country, city, zipCode, street, houseNumber, addressDescription }) {
      const method = !id ? 'POST' : 'PUT'
      const path = !id ? '/companies' : `/companies/${id}`
      return $axios(method, path, {
        name,
        country,
        city,
        zipCode,
        street,
        houseNumber,
        addressDescription
      })
    },

    createCompanyAddress({ name, street, houseNumber, addressDescription, zipCode, city, country }) {
      return $axios('POST', '/companies/address', {
        name,
        street,
        houseNumber,
        addressDescription,
        zipCode,
        city,
        country
      })
    },

    upsertPersona({ id, name, icon, demographicDataReq: { minAge, maxAge, occupations, genders }, screenerQuestions }) {
      const method = !id ? 'POST' : 'PUT'
      const path = !id ? '/personas' : `/personas/${id}`
      return $axios(method, path, {
        name,
        icon,
        demographicDataReq: {
          minAge,
          maxAge,
          occupations,
          genders
        },
        screenerQuestions
      })
    },

    upsertProject({ id, title, description }) {
      const method = !id ? 'POST' : 'PUT'
      const path = !id ? '/projects' : `/projects/${id}`
      return $axios(method, path, {
        title,
        description
      })
    },

    createMission({ projectId, type, title, description, duration, sessions, country, city, zipCode, street, houseNumber, addressDescription, persona: { name, icon, demographicDataReq: { minAge, maxAge, occupations, genders }, screenerQuestions } }) {
      return $axios('POST', '/missions', {
        projectId,
        type,
        title,
        description,
        duration,
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
      })
    },
    updateMissionMetadata({ id, title, description }) {
      // TODO: confirm endpoint with backend
      return $axios('PUT', `/missions/${id}/metadata`, {
        title,
        description
      })
    }
  })
}