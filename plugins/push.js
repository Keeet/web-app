const OPERATIONS = {
  CREATE_COMPANY: 'CREATE_COMPANY',
  UPDATE_COMPANY: 'UPDATE_COMPANY',
  CREATE_COMPANY_ADDRESS: 'CREATE_COMPANY_ADDRESS',
  UPDATE_COMPANY_USER_ROLE: 'UPDATE_COMPANY_USER_ROLE',
  INVITE_COMPANY_USER: 'INVITE_COMPANY_USER',
  UPSERT_PERSONA: 'UPSERT_PERSONA',
  DELETE_PERSONA: 'DELETE_PERSONA',
  UPSERT_PROJECT: 'UPSERT_PROJECT',
  CREATE_MISSION: 'CREATE_MISSION',
  UPDATE_MISSION: 'UPDATE_MISSION',
  CREATE_MISSION_INSIGHT_LINK: 'CREATE_MISSION_INSIGHT_LINK',
  SUBMIT_SURVEY: 'SUBMIT_SURVEY'
}

export default function ({ $axios, app: { $fetch, $auth }, redirect }, inject) {
  inject('push', {

    upsertCompany({ id, name, country, city, zipCode, street, houseNumber, addressDescription }) {
      const onCreate = !id
      const method = onCreate ? 'post' : 'put'
      return new Promise((resolve, reject) => {
        $axios({
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
        }).then((res) => {
          if (onCreate) {
            // renew token to get token with company id
            $auth.renewTokens().then(() => {
              handleResponse(OPERATIONS.CREATE_COMPANY, null, resolve, reject, res)
            }).catch(() => {
              redirect(`/auth/login?redirectUrl=${encodeURI('/')}`)
            })
          } else {
            handleResponse(OPERATIONS.UPDATE_COMPANY, null, resolve, reject, res)
          }
        }).catch(handleError)
      })
    },

    createCompanyAddress({ name, street, houseNumber, addressDescription, zipCode, city, country }) {
      return new Promise((resolve, reject) => {
        const handleRes = handleResponse.bind(this, OPERATIONS.CREATE_COMPANY_ADDRESS, null, resolve, reject)
        $axios({
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
        }).then(handleRes).catch(handleError)
      })
    },

    updateCompanyUserRole({ id, role }) {
      return new Promise((resolve, reject) => {
        const handleRes = handleResponse.bind(this, OPERATIONS.UPDATE_COMPANY_USER_ROLE, null, resolve, reject)
        $axios({
          method: 'put',
          url: `/users/${id}/role`,
          data: {
            role
          }
        }).then(handleRes).catch(handleError)
      })
    },

    inviteCompanyUser({ email, role }) {
      return new Promise((resolve, reject) => {
        const handleRes = handleResponse.bind(this, OPERATIONS.INVITE_COMPANY_USER, null, resolve, reject)
        $axios({
          method: 'post',
          url: `/invitations`,
          data: {
            email,
            role
          }
        }).then(handleRes).catch(handleError)
      })
    },

    upsertPersona({ id, name, icon, demographicDataReq: { minAge, maxAge, occupations, genders }, screenerQuestions }) {
      const method = !id ? 'post' : 'put'
      const url = !id ? '/personas' : `/personas/${id}`
      return new Promise((resolve, reject) => {
        const handleRes = handleResponse.bind(this, OPERATIONS.UPSERT_PERSONA, null, resolve, reject)
        $axios({
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
        }).then(handleRes).catch(handleError)
      })
    },
    deletePersona({ id }) {
      return new Promise((resolve, reject) => {
        const handleRes = handleResponse.bind(this, OPERATIONS.DELETE_PERSONA, null, resolve, reject)
        $axios({
          method: 'delete',
          url: `/personas/${id}`
        }).then(handleRes).catch(handleError)
      })
    },

    upsertProject({ id, title, description }) {
      const method = !id ? 'post' : 'put'
      const url = !id ? '/projects' : `/projects/${id}`
      return new Promise((resolve, reject) => {
        const handleRes = handleResponse.bind(this, OPERATIONS.UPSERT_PROJECT, null, resolve, reject)
        $axios({
          method,
          url,
          data: {
            title,
            description
          }
        }).then(handleRes).catch(handleError)
      })
    },

    createMissionRecruit({
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
    }) {
      return new Promise((resolve, reject) => {
        const handleRes = handleResponse.bind(this, OPERATIONS.CREATE_MISSION, null, resolve, reject)
        $axios({
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
        }).then(handleRes).catch(handleError)
      })
    },
    createMissionSurvey({
      projectId,
      type,
      title,
      description,
      language,
      welcomeTitle,
      welcomeDescription,
      welcomeLogoId,
      closingTitle,
      closingDescription,
      closingLogoId,
      redirectLink,
      color,
      items,
      requiredCount
    }) {
      return new Promise((resolve, reject) => {
        const handleRes = handleResponse.bind(this, OPERATIONS.CREATE_MISSION, null, resolve, reject)
        $axios({
          method: 'post',
          url: '/missions',
          data: {
            projectId,
            type,
            title,
            description,
            language,
            welcomeTitle,
            welcomeDescription,
            welcomeLogoId,
            closingTitle,
            closingDescription,
            closingLogoId,
            redirectLink,
            color,
            items,
            requiredCount
          }
        }).then(handleRes).catch(handleError)
      })
    },
    updateMission({ id, title, description }) {
      return new Promise((resolve, reject) => {
        const handleRes = handleResponse.bind(this, OPERATIONS.UPDATE_MISSION, null, resolve, reject)
        $axios({
          method: 'put',
          url: `/missions/${id}`,
          data: {
            title,
            description
          }
        }).then(handleRes).catch(handleError)
      })
    },
    createMissionInsightLink({ missionId, url, title, description, linkType }) {
      return new Promise((resolve, reject) => {
        const handleRes = handleResponse.bind(this, OPERATIONS.CREATE_MISSION_INSIGHT_LINK, { missionId }, resolve, reject)
        $axios({
          method: 'post',
          url: `/missions/${missionId}/insights/link`,
          data: {
            title,
            linkType,
            description,
            url
          }
        }).then(handleRes).catch(handleError)
      })
    },
    submitSurvey({ missionId, responses, duration, browser, deviceType, os }) {
      return new Promise((resolve) => {
        $axios({
          method: 'post',
          url: `/public/missions/${missionId}`,
          data: {
            missionId,
            responses,
            duration,
            browser,
            deviceType,
            os
          }
        }).then(resolve)
      })
    }
  })

  function handleResponse(operation, params, resolve, reject, { data }) {
    let fetchCfg
    switch (operation) {
      case OPERATIONS.CREATE_COMPANY:
        fetchCfg = [{ name: 'COMPANY', forced: true }, { name: 'USER', forced: true }]
        break
      case OPERATIONS.UPDATE_COMPANY:
        fetchCfg = [{ name: 'COMPANY', forced: true }]
        break
      case OPERATIONS.CREATE_COMPANY_ADDRESS:
        fetchCfg = [{ name: 'COMPANY', forced: true }]
        break
      case OPERATIONS.UPDATE_COMPANY_USER_ROLE:
        fetchCfg = [{ name: 'COMPANY_USERS', forced: true }]
        break
      case OPERATIONS.UPSERT_PERSONA:
        fetchCfg = [{ name: 'PERSONAS', forced: true }]
        break
      case OPERATIONS.DELETE_PERSONA:
        fetchCfg = [{ name: 'PERSONAS', forced: true }]
        break
      case OPERATIONS.UPSERT_PROJECT:
        fetchCfg = [{ name: 'PROJECT', id: data.id, forced: true }, { name: 'PROJECTS', forced: true }]
        break
      case OPERATIONS.CREATE_MISSION:
        fetchCfg = [{ name: 'MISSION', id: data.id, forced: true }, { name: 'PROJECT', id: data.projectId, forced: true }]
        break
      case OPERATIONS.UPDATE_MISSION:
        fetchCfg = [{ name: 'MISSION', id: data.id, forced: true }, { name: 'PROJECT', id: data.projectId, forced: true }]
        break
      case OPERATIONS.CREATE_MISSION_INSIGHT_LINK:
        fetchCfg = [{ name: 'MISSION_INSIGHTS', id: params.missionId, forced: true }]
        break
      default:
        fetchCfg = []
    }

    $fetch(fetchCfg)
      .then(() => resolve(data)).catch(handleError)
  }

  function handleError(e) {
    // eslint-disable-next-line no-console
    console.error(e)
  }
}
